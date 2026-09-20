# Solution

## Decision

Replace unreliable SQLite development push mode with an explicit migration-only workflow.

## Changes

1. Configure `sqliteAdapter` with `push: false` and an explicit `cms/migrations` directory.
2. Generate a baseline migration from the current Payload schema.
3. Add package commands for applying, creating, and inspecting migrations from both the CMS package and repository root.
4. Adopt the baseline in the existing local database by replacing its `dev` migration marker with the generated migration name. This preserves all authored rows and prevents the baseline from being replayed over an already-current schema.
5. Update the CMS workflow documentation so clean installations migrate before seeding and schema edits always produce a migration.

## Why this approach

- It removes the failing `pushDevSchema` path instead of suppressing one duplicate-index symptom.
- A committed baseline migration initializes fresh databases deterministically.
- Marking the verified current schema as the baseline preserves local content without destructive rebuilds.
- Dropping the reported index alone is rejected: a later schema edit can trigger the same upstream defect on another table or index.
- Deleting and reseeding `payload.db` is rejected because it discards authored content.

## Verification

1. Apply the baseline migration to a temporary empty SQLite database and verify migration status.
2. Compare the temporary database schema with the existing database schema.
3. Start the actual CMS against the preserved database and load `/admin` in a browser.
4. Run CMS TypeScript checking and focused formatting checks for changed files.
