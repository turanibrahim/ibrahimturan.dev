# Retrospective

## Executed

- Added an isolated Payload 3.90.1 and Next 16.3.3 application under `cms/` with SQLite, authenticated admin access, drafts, media, profile, experiences, projects, and technologies.
- Added empty-database seeding and published-only static export through Payload Local API.
- Replaced fragmented website data sources with `src/data/cms-content.json` and the typed `src/data/content.ts` boundary.
- Copied referenced CMS media into `public/cms/` and kept Astro production output fully static.
- Added root CMS commands, local-state ignores, generated types/import map, and end-to-end workflow documentation.

## Verification

- Seeded a fresh temporary SQLite database: 1 profile, 6 experiences, 20 projects, 26 technologies.
- Exported the same published record counts and copied the profile image with an identical SHA-256 checksum.
- Opened the real Payload admin at `/admin/create-first-user` and observed the first-user form.
- Stopped Payload, built Astro with zero diagnostics, and served the static output.
- Observed profile, experience, project, technology, and loaded `/cms/` media in the production preview.
- TypeScript, ESLint, and Prettier checks passed.

## Complexity Critique

The separate CMS package is deliberate overhead imposed by Payload’s Next-based admin. Keeping it outside the root package prevents that weight from entering the static deployment. The explicit snapshot adds one publish/export step but creates a reliable runtime boundary and offline deployment.

## Future Improvements

- Add more upload relationships only when portfolio sections need locally managed images.
- Add preview generation only if editors need to inspect drafts before publishing.
- Add schema migrations if the local database becomes shared across developers; automatic SQLite schema push is sufficient for one local author.
