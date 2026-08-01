# Architecture Decision Records — selected

A subset of the decision records written for an HR & payroll platform: a modernization of a
legacy MS Access system.

---

## The records

| Record | Decision |
| --- | --- |
| [ADR-006](./adr-006-enqueue-reliability-reconciliation.md) | Enqueue reliability is handled by a reconciliation sweep, not a transactional outbox |
| [ADR-007](./adr-007-operation-resource-authorization.md) | Async operation resources are owner-scoped, with module permission re-checked on read |
| [ADR-008](./adr-008-idempotency-dedupe-scope.md) | Idempotency dedupe scope is per-operation — exactly-once-forever vs. freshness-windowed |
| [ADR-P01](./adr-p01-opaque-legacy-key-manifest.md) | The legacy period key is opaque — the application resolves monthly identity via a manifest |
| [ADR-P02](./adr-p02-recalculation-safety-row-origins.md) | Safe recalculation via row origins — replace generated rows only |

Five earlier system-wide records (schema isolation, SQL as source of truth, resource-based
async operations, the worker process split, the shared reports schema) are not reproduced
here. They are the decisions that ADR-006, ADR-007, and ADR-008 argue with; the binding
constraints they established are summarized below.

---

## Binding constraints

The rules every module in the system had to comply with:

1. New app-owned tables for any module go in `{module}_app` — never in the legacy schema.
2. Redis holds transient queue state only. Operation status, results, and metadata live in SQL Server.
3. Long-running operations are resources (`POST → 202 + Location`). Function-style routes are forbidden.
4. The universal `platform-worker` process hosts all background processors. New modules add a processor to it — they do not introduce a new Docker service.
5. Modules do not create their own report or export tables. All report and export metadata is written to `reports_app.*` with the correct `module` value.
6. Every `queued` operation row is recoverable without the queue: a reconciliation sweep re-enqueues or finishes orphans (job-absence is the primary signal, disambiguated by output evidence). A transactional outbox is the documented upgrade path only.
7. Async operation resources are owner-scoped: reads, lists, downloads, and cancels authorize against the stored `actor_id` plus the current module permission (404 for non-owners, 403 for revoked permission, 410 for expired).
8. Idempotency dedupe scope is declared per operation: a **global** unique index for immutable-scope operations, a **filtered** unique index for freshness-windowed operations — never a global one for windowed outputs.
