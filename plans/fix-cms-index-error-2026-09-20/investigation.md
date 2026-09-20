# Investigation

## Root cause

- `cms/payload.config.ts:26-30` configures the SQLite adapter without `push: false`, so Payload enables Drizzle schema push on every development initialization.
- `@payloadcms/db-sqlite` calls `pushDevSchema` during development startup when `push` is enabled.
- `cms/payload.db` is structurally valid, already contains `payload_locked_documents_rels_order_idx`, and records a `dev` migration with batch `-1`.
- Drizzle incorrectly generates another `CREATE INDEX payload_locked_documents_rels_order_idx` while reconciling schema changes. SQLite rejects the duplicate and aborts Payload initialization.
- Payload issue `payloadcms/payload#11969` documents the identical SQLite push-mode failure, including this exact index. The issue remains open as of 2026-07-19 and identifies Drizzle's push/index reconciliation as the defect.

## Logic links

1. Next renders the Payload admin route.
2. Payload initializes the SQLite adapter.
3. Development push mode diffs the configured schema against `payload.db`.
4. The faulty diff emits a non-idempotent `CREATE INDEX` for an index already present.
5. SQLite throws before Payload initialization completes, producing the Next runtime overlay.

## Constraints

- The existing SQLite database contains authored CMS content and must not be dropped or reseeded.
- Disabling push without migrations would fix this database but leave clean installations unable to create the schema.
- Payload warns against mixing automatic push and migration workflows on one database.
