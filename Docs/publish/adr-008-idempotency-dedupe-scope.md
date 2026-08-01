# ADR-008: Idempotency Dedupe Scope Is Per-Operation — Exactly-Once-Forever vs. Freshness-Windowed

## Metadata

| Field | Value |
| --- | --- |
| ADR number | 008 |
| Scope | System-wide |
| Status | Accepted |
| Date | 2026-06-13 |
| Related | ADR-002 (SQL Server is the source of truth), ADR-005 (shared reports schema) |

---

## Context

The async operations pattern enforces idempotency with a deterministic `idempotency_key` and a unique index (ADR-002 relies on this for transactional dedupe). The shared reports schema DDL currently declares a **global** unique index on `idempotency_key`:

```sql
CREATE UNIQUE INDEX UX_report_outputs_idempotency_key
ON reports_app.report_outputs (idempotency_key);
```

A global unique index means "one resource per scope, **forever**." That is correct for some operations and wrong for others:

- A payroll **calculation run** for a *closed* period, or a report of a *finalized* period, is over immutable data — reusing the prior result forever is correct.
- A report or export over *current/mutable* data: reusing a result from hours ago serves **stale** data, and a global unique index makes a `forceRefresh` regeneration **impossible** (it collides with the pinned row).

Two further problems with relying on the application-level lookup:

- **TOCTOU race**: two concurrent identical `POST`s both miss the "does it exist?" lookup and both enqueue — duplicating heavy work at exactly the month-end load dedupe exists to prevent.
- **Key canonicalization**: logically identical requests with different JSON ordering/casing produce different keys and silently miss dedupe.

A decision is needed for how dedupe scope is chosen and enforced.

---

## Decision

**Dedupe scope is declared per operation**, in one of two policies:

1. **Exactly-once-forever** — for operations over immutable scope. Enforced by a **global unique index** on `idempotency_key`.
2. **Freshness-windowed** — for operations over mutable/live data. Dedupe applies only within a configurable freshness window, and a request may carry `forceRefresh: true` to bypass it. Enforced by a **filtered unique index** scoped to the live/fresh set (rows `queued`/`running`, or `completed` within the window), so a new window or a `forceRefresh` can insert a new row without colliding.

In **both** policies:

- **The unique constraint is the arbiter, not the lookup.** The API attempts the insert and, on unique-constraint violation, loads and returns the **existing winner's** resource. The prior lookup is an optimization only. This closes the concurrent-duplicate race.
- **The key is canonicalized** before hashing/comparison (normalized field order, casing, value types). Identical scopes always produce identical keys.
- **The key is server-generated**, never accepted from the client.

---

## Rationale

- **A single global-unique rule is wrong for live-data outputs** — it serves stale results forever and blocks `forceRefresh`. Per-operation policy is the minimum correct model.
- **Constraint-as-arbiter** is the only race-safe dedupe under concurrent load; the lookup alone is TOCTOU-broken.
- **Filtered unique index** expresses "one *fresh* result per scope" directly in the database, where the guarantee belongs.
- **Rejected:** global unique index for every operation (breaks windowed operations); dedupe by application lookup alone (race); time-unbounded dedupe on mutable data (stale results).

---

## Consequences

**Positive:** immutable-scope operations keep simple exactly-once semantics; live-data outputs get correct freshness behavior and a working `forceRefresh`; concurrent duplicates collapse onto one resource safely.

**Negative:** each operation must consciously choose a policy; the filtered-index predicate must be kept consistent with the freshness-window configuration; canonicalization logic must be shared and tested.

**Constraints:**

1. Every async operation declares its dedupe policy (forever vs. windowed).
2. Windowed operations use a **filtered** unique index, never a global one. **The current shipped DDL global unique index must be revised to a filtered index for windowed report/export categories** (tracked in the alignment report).
3. Dedupe correctness is enforced by the unique constraint + catch-and-return-existing, not by the pre-insert lookup.
4. `idempotency_key` is canonicalized and server-generated.
