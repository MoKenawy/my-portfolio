# ADR-007: Async Operation Resources Are Owner-Scoped, With Module Permission Re-Checked On Read

## Metadata

| Field | Value |
| --- | --- |
| ADR number | 007 |
| Scope | System-wide |
| Status | Accepted |
| Date | 2026-06-13 |
| Related | ADR-003 (resource-based async operations), ADR-005 (shared reports schema) |

---

## Context

The async operations pattern (ADR-003) standardizes resource lifecycle, status, and idempotency, and the shared reports schema (ADR-005) standardizes report/export storage — but **neither specifies who may read, list, download, or cancel an operation resource.**

For an HR/payroll system this is a primary access-control concern: an operation resource (a calculation run, a payroll export file) embeds data the creator was entitled to. Left unspecified, `GET /api/export-files` defaults to exposing every user's payroll outputs.

A decision is needed for the authorization contract on operation resources.

Options considered:

1. **Permission-only** — any holder of the module permission may read any operation of that module.
2. **Owner-scoped** — only the creator (`actor_id`) may read their operations; the module permission is re-checked at access time.
3. **Owner-scoped + managerial cross-user reads** — owners plus a managerial role can read others' operations.

---

## Decision

Async operation resources are **owner-scoped**. The stored `actor_id` is the access gate; all read-side authorization is computed from the record, not the request.

The read rule is:

- **404** if the resource doesn't exist *or* `actor_id != caller` (non-owners and missing resources are indistinguishable — no cross-user existence leak).
- **403** if it is the caller's *but* they have since lost the module permission (re-checked at access time).
- **410 Gone** if it is the caller's, exists, but has expired / been cleaned up.
- Otherwise serve.

List endpoints return only the caller's own operations; for shared `reports_app` resources they additionally filter by `module` (ADR-005).

**Cross-user / managerial reads are deliberately out of scope.** A future ABAC layer (alongside the existing RBAC) will introduce row/scope-level access (e.g. an org-unit / direct-reports scope). This is explicitly deferred, not implied by the current model.

The format/action permission that gated *creating* a particular output (e.g. choosing PDF) is **not** re-checked on read — generation-time gating does not re-gate retrieval of a file the owner legitimately produced.

---

## Rationale

- **Owner-only is the simplest safe rule** for data an operation embeds; it needs no cross-user reasoning.
- **Re-checking the module permission at read** matters because permissions change between create and download; revoked access to sensitive payroll data must stop retrieval of past outputs.
- **404-not-403 for non-owners** avoids confirming another user's resource id exists.
- **Permission-only (option 1) is rejected**: it would let any module-permission holder read another user's specific export, an information-exposure surface.
- **Managerial cross-user (option 3) is deferred** to the ABAC work rather than hard-coded now.

---

## Consequences

**Positive:** no cross-user exposure of payroll artifacts by default; revocation takes effect on download; consistent error semantics across every module's operations.

**Negative:** a user can create an export and then be denied its download if their permission is revoked in between — a deliberate `403` on a file that demonstrably exists and is theirs. Frontends must handle this gracefully (clear message, not a generic error). No managerial visibility until ABAC lands.

**Constraints:**

1. Every read/list/download/cancel endpoint on an operation resource authorizes against stored `actor_id` + current module permission.
2. Non-owner and missing resources both return `404`.
3. Expired/cleaned resources return `410`, distinct from `404`.
4. List endpoints are owner-scoped (and `module`-filtered for shared report/export resources).
5. Access (download) events are recorded via the system audit service, independently of creation metadata.
