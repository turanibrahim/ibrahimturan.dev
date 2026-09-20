# Solution

## Decision

Use the existing Payload-to-static-JSON pipeline as the deployment source of truth. Import the seven published DEV articles once, store their full Markdown in Payload, export them into `src/data/cms-content.json`, and keep Astro builds independent of DEV or the local CMS at runtime.

## Content model

Extend `Post` and the Payload `posts` collection with:

- `language`: the DEV article language (`en` or `tr`) for document semantics.
- `coverImage`: optional DEV cover/social image URL for article hero and social previews.

Keep the existing title, local slug, excerpt, full Markdown body, curated tags, publication timestamp, reading time, source URL, and explicit order.

Use stable, readable local slugs without DEV's generated suffixes. Preserve the original DEV URL only as attribution.

## Import

Fetch all seven article detail records from the public DEV API during implementation. Populate the snapshot with complete `body_markdown` values and curated topic tags. DEV is not contacted during production builds.

Upsert the snapshot posts into the existing Payload SQLite database through Payload APIs, then run the established export command. This keeps local CMS editing and deployment output synchronized. The one-off import helper is removed after the database and snapshot are verified.

DEV-specific Liquid embed tags are converted to ordinary accessible links before storage. Standard Markdown images remain externally hosted by their original providers; this avoids committing large animated media while preserving the complete articles.

## Frontend

### Blog listing

Retain the established ledger-style list rather than a generic card grid. Add language and tag signals without reducing title/excerpt scanability. Maintain newest-first ordering.

### Article route

- Set the root document language from post metadata.
- Keep the social image in metadata only; do not add a standalone top image to article pages.
- Render full Markdown at build time with syntax highlighting.
- Preserve source attribution to DEV.
- Add accessible heading anchors and safe external-link behavior.

### Metadata

Extend `DefaultLayout` with optional page language, social image, Open Graph type, published time, and article tags. Blog detail pages use local canonicals (`https://ibrahimturan.dev/blog/<slug>`) and `article` Open Graph metadata while retaining the DEV URL only as a source link.

## CMS pipeline

Update these files consistently:

- `cms/collections/posts.ts`
- `cms/scripts/export-content.ts`
- `cms/scripts/seed.ts`
- generated `cms/payload-types.ts`
- `src/types/content.ts`
- `src/data/cms-content.json`

No second content convention or runtime fetch is introduced.

## Verification

1. Payload export reports seven posts.
2. Format, lint, Astro type checks, and production build pass.
3. Build output contains `/blog/index.html` and seven article route documents.
4. Built preview is exercised on desktop and mobile for the index, an English article, and the Turkish article.
5. Article pages show complete prose/code/media and correct local canonical, language, and Open Graph metadata.
