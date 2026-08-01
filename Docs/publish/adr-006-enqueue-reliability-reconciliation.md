# ADR-006: Enqueue Reliability Is Handled By A Reconciliation Sweep, Not A Transactional Outbox

## Metadata

| Field | Value |
| --- | --- |
| ADR number | 006 |
| Scope | System-wide |
| Status | Accepted |
| Date | 2026-06-13 |
| Related | ADR-002 (SQL Server is the source of truth), ADR-003 (resource-based async operations) |

---

## Context

The async operations pattern (ADR-003) creates a durable resource row in SQL Server and *then* enqueues a BullMQ job carrying only the `resourceId` (ADR-002). This is a **dual write** across two systems with no shared transaction.

If the API process dies between the `INSERT` and the `enqueue`, a row is committed as `queued` with no job behind it — a permanent orphan that no request-path code can fix. The same end-state occurs if Redis loses queued jobs (restart without durable state, flush, eviction).

ADR-002 lists "operations survive Redis restarts" as a benefit, but no mechanism in the existing docs delivers it. A decision is needed for how `queued` rows are guaranteed to make progress.

Options considered:

1. **Transactional outbox** — write the job intent to an outbox table in the same SQL transaction as the resource row; a relay publishes to Redis and marks the outbox row sent.
2. **Enqueue-first, insert-second** — flips the failure to a job referencing a missing row; not airtight.
3. **Reconciliation sweep** — a periodic job finds stale `queued` rows whose BullMQ job is absent and re-enqueues (or finishes) them.

---

## Decision

Enqueue reliability is handled by a **reconciliation sweep**: a BullMQ repeatable (cron) job, hosted on the universal `platform-worker`, that periodically reconciles stale `queued` rows.

A transactional outbox is **not** implemented now. It is the documented upgrade path if export/operation delivery ever requires stronger guarantees.

The sweep keys on **the job's presence in BullMQ, not on row age alone**:

- Job **present** (waiting/active/delayed) → leave it (legitimate backlog or worker outage).
- Job **absent** and row past a threshold → candidate orphan. Because `removeOnComplete` makes a finished-and-reaped job *also* read as absent, the reconciler first checks the **row's own evidence** (deterministic output resolved from `file_ref`/`id`): output present ⇒ finish the record (`completed`); output absent ⇒ true orphan, re-enqueue.

Idempotent generation (compare-and-set transitions + deterministic output) makes even a wrongly re-enqueued job harmless.

---

## Rationale

- **Recovers the dual-write orphan** (API death between insert and enqueue) and **Redis data loss** with one mechanism — this is what actually backs ADR-002's durability claim.
- **Reuses the cron mechanism** already required for retention cleanup; far fewer moving parts than an outbox + relay.
- **Age-only reconciliation is rejected**: it would mark legitimately-backlogged jobs `failed` during a worker outage. Job-absence is the primary signal; age is a secondary guard.
- **Outbox is rejected for now**: most robust, but more infrastructure than warranted at current scale.

---

## Consequences

**Positive:** orphaned `queued` rows always make progress; durability survives Redis loss; one cron pattern covers cleanup + reconciliation.

**Negative:** recovery is eventual (bounded by the sweep interval), not instant; the reconciler must be able to cheaply check output existence (a `stat`/`HEAD`), which couples it to the storage layer.

**Constraints:**

1. Every async operation's `queued` rows must be covered by the reconciliation sweep.
2. Output paths must be **deterministic from the resource `id`** so the reconciler can disambiguate orphan from completed-but-uncommitted.
3. The reconciler is the *only* actor permitted to flip a **stale** `queued` row (re-enqueue, or finish from evidence). It must never touch a row whose job is still present in BullMQ.
4. Reconciler outcomes (orphans detected / re-enqueued / finished-from-evidence) are emitted as metrics.
