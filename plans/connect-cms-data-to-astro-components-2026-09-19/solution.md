# Solution

## Decision

Use the existing seed/export boundary to make the active Payload database authoritative. Seed the empty database from the current static snapshot, immediately export the newly inserted published records, and build Astro from that export.

## Execution

1. Run `npm run cms:seed` against `cms/payload.db`.
2. Confirm Payload creates one published profile plus all snapshot experiences, projects, and technologies, including profile media.
3. Run `npm run cms:export` so `src/data/cms-content.json` and `public/cms/` are generated from the active database.
4. Run the static build and load the rendered site with Payload stopped.
5. Verify representative profile and collection values in both the Payload database and rendered HTML.

## Architecture

```text
Payload admin / cms/payload.db
            │
            │ npm run cms:export
            ▼
src/data/cms-content.json + public/cms/
            │
            │ existing @/data/content imports
            ▼
Astro page and React presentation components
            │
            ▼
       static dist/
```

## Scope

No Astro component API changes are needed. Every relevant component already imports `@/data/content`, the single generated content boundary. The change is to populate the missing source database and prove the complete authoring-to-rendering path.

## Alternatives Rejected

- Query Payload directly from React components: Payload is local-only, while the site is statically deployed; this would add an unavailable production dependency.
- Query Payload during every ordinary Astro build: this would make deployment require the ignored local SQLite database and CMS dependencies.
- Re-enter all records manually through the admin UI: slower and error-prone when the complete typed snapshot and an idempotence-protected seed command already exist.
- Keep editing the snapshot after seeding: creates two authoring sources. After this migration, edits belong in Payload and flow outward through `cms:export`.
