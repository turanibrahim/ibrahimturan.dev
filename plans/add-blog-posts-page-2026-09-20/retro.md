# Retrospective — Add Blog Posts Page and Migrate dev.to Articles

## Execution summary

Added a blog to the Astro + React + Payload CMS portfolio and migrated all seven dev.to articles into it.

- **CMS:** new `Posts` Payload collection (`cms/collections/posts.ts`), registered in `cms/payload.config.ts`, types regenerated via `payload generate:types`.
- **Pipeline:** `export-content.ts` now queries and maps `posts`; `seed.ts` now guards and recreates them; `src/types/content.ts` gains a `Post` type + `PortfolioContent.posts`; `src/data/content.ts` exposes `posts`.
- **Content:** all seven articles' `body_markdown` fetched from the dev.to API and written into `src/data/cms-content.json` (the static site's source of truth), tags re-derived (dev.to metadata is unreliable), ordered newest-first.
- **Pages:** `/blog` listing (`src/pages/blog/index.astro` + `post-card.tsx` molecule) and `/blog/[slug]` detail pages (`[slug].astro`) rendering markdown → HTML at build time via `marked`, styled to the Twilight design tokens; `blog` link added to the index nav.
- **Verified:** `astro check` 0 errors, `astro build` emits `/blog` + 7 detail pages, `lint:check` and `format:check` clean, and browser checks confirmed listing order, markdown->HTML rendering (headings, code blocks), nav, and source links.

## What worked

- **Reusing the existing CMS pipeline.** Extending collections → export → JSON → typed accessors was straightforward and required no new architecture; `posts` slotted into the exact same shape as projects/experiences.
- **Build-time markdown via `marked`.** `@astrojs/markdown-remark` 6.x and Astro 5 both lack a clean string→HTML API, so a single small, zero-config dependency (`marked`) + `set:html` was the minimal correct choice; the already-installed `@tailwindcss/typography`-compatible prose styling stayed hand-tuned to the design tokens.
- **Fetch-based seeding.** Writing a throwaway node script to pull `body_markdown` from the dev.to API (rather than transcribing large articles) avoided transcription errors and kept the JSON authoritative. Script removed after use.

## Critique / complexity

- **Markdown rendering was the only real design fork.** Everything else was mechanical. Worth remembering: don't reach for `@astrojs/markdown-remark`'s processor or `astro:content` render for a free-form string — `marked` is the boring, correct tool here.
- **The DB was not re-seeded.** `seed.ts` requires an empty DB and the local `payload.db` already holds the user's data, so I left it untouched and validated the scripts by typecheck instead. The static site reads the JSON directly, so the deliverable is complete without a DB reset; the user runs `cms:seed` + `cms:export` only if they rebuild the DB.
- Minor: `.astro`/`cms` build artifacts (`.astro/data-store.json`, `cms/tsconfig.tsbuildinfo`, `cms/payload-types.ts`) churn from running the standard commands — expected tooling noise, not part of the feature.

## Suggested future improvements

- **Deprecate stale `AGENTS.md`.** It describes a Vue/Pinia architecture that no longer exists. It actively misleads agents (nearly derailed this task). Align it with the real Astro + React + Payload stack, or the project should own an updated reference.
- **Make `extractFrontmatter`/`marked` version-pinned.** `marked` uses async `parse` in current versions; any future author touching the detail page should know the `await marked.parse(...)` pattern is required.
- **Consider an RSS/atom feed** for `/blog` now that a real content route exists — low effort, standard for a writing surface.
- **Standardize tag taxonomy.** The `tags` array is free-form; a seed-time normalization (or a curated list of tags in constants) would prevent drift as more posts are added.
