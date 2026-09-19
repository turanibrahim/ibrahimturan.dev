# Investigation — Add Blog Posts Page and Migrate dev.to Articles

## Stack (verified)

- **Astro 5.14.1** (`output: 'static'`) + **React 19.3** (`@astrojs/react`) + **Payload CMS 3.90** on SQLite.
- **Tailwind CSS 4** via `@tailwindcss/vite`, **daisyui** theme `ibrahimturan-dark`, and **`@tailwindcss/typography`** (loaded via `@plugin` in `src/assets/styles/tailwind.css:8` — `prose` classes are available).
- Repo `AGENTS.md` describes a stale Vue/Pinia architecture; **ignore it**. The live stack is Astro + React + Payload (confirmed by `package.json`, `astro.config.ts`, and the `plans/*migrate-*-from-vue-to-*` history).

## Content pipeline (the established flow to extend)

`cms/collections/<slug>.ts` (Payload config) → SQLite `cms/payload.db` → `cms/scripts/export-content.ts` writes `src/data/cms-content.json` → `src/data/content.ts` exposes typed accessors → Astro pages / React components import them.

- **Collections registered** in `cms/payload.config.ts`: `Users, Media, Experiences, Projects, Technologies`; globals: `Profile`. There is **no `Posts` collection today**.
- **Export script** (`cms/scripts/export-content.ts`): for each collection calls `payload.find(...)` with `_status: published`, maps docs into `content: PortfolioContent`, writes JSON atomically via a `.tmp` + rename dance. Final stdout line (line 158) prints a per-collection count — posts must be added there.
- **Seed script** (`cms/scripts/seed.ts`): requires an empty DB (`managedCollections` guard at line 22), then recreates docs from the JSON snapshot. `managedCollections` const at line 22 must include `posts`; a `payload.create` loop for posts must be added.
- **Types**: `src/types/content.ts` defines `PortfolioContent` (`profile`, `experiences`, `projects`, `technologies`). `src/types/index.ts` re-exports `./content`. `src/data/content.ts` destructures `{ experiences, profile, projects, technologies }` from `cms-content.json`.
- `cms/payload-types.ts` is **generated** (`payload generate:types`) — regenerate after adding the collection, do not hand-edit.

## Blog source content (dev.to, verified via API)

`https://dev.to/api/articles?username=_ibrahimturan` returns **7 published articles**, each with: `title`, `description`, `slug`, `url`, `published_timestamp`, `reading_time_minutes`, `tag_list`, `language`, and per-article `body_markdown` (full article body, valid markdown incl. fenced code blocks).

Ordering (newest first) by `published_timestamp`:

1. Modular Frontend Architecture (2026-06-29)
2. Clean Architecture in Modern Frontend Development: A Comprehensive Guide (2025-01-21)
3. How to parse FormData values with Netlify Functions V2 (2024-01-16)
4. Effortless Animations With `AutoAnimate` in Vue 3 (2023-03-04)
5. Adding PWA to Vite Applications (2022-10-21)
6. Vite Uygulamasına PWA Özelliği Nasıl Eklenir (2022-10-20, Turkish)
7. How to prevent Chrome form auto fill on Vue? (2020-12-05)

**Warning:** dev.to `tag_list` metadata is unreliable (e.g. the "AutoAnimate in Vue 3" post is tagged `python, mcp, claude, llm`). Tags must be re-derived from each article's actual content, not copied verbatim.

## Markdown rendering decision (root cause of the design)

- `@astrojs/markdown-remark` 6.3.7 (Astro's own dep) no longer exposes a top-level string → HTML `render`; it exposes `createMarkdownProcessor().render()` returning **compiled module code**, meant for `.md`-file compilation — not directly embeddable.
- `astro:content` string-based `render()` was **removed** in Astro 5 (runtime.d.ts only exports `renderEntry`); there is no clean public API to render an arbitrary markdown string to embeddable HTML without a content collection.
- **Decision:** add **`marked`** (small, zero-config, returns an HTML string) to the root `dependencies`, render markdown → HTML **at Astro build time** in the page/component frontmatter, and inject with Astro's `<Fragment set:html={...} />`. Style the output with `prose` from the already-installed `@tailwindcss/typography`. This keeps the body markdown-editable in the CMS, renders in the static build (deterministic), and reuses existing tooling — no new runtime coupling in `cms/`, no hand-authored HTML.

## Pages / layout / nav

- **Pages:** only `src/pages/index.astro` and `src/pages/colors.astro` exist. Astro file-based routing means `/blog` = `src/pages/blog/index.astro` and `/blog/[slug]` = `src/pages/blog/[slug].astro` with `getStaticPaths()`.
- **Layout:** `src/layouts/default.layout.astro` takes `{ title, description, path }` props; `path` feeds `canonicalUrl`. Reuse for blog pages; pass the article title and `/blog/[slug]` path.
- **Nav:** inline in `index.astro` (lines ~25-35 in `src/pages/index.astro`): `work`, `projects`, `about`, `contact` anchors, `font-mono text-xs`, `hover:text-primary`. Add a `blog` link here.
- Misc `colors.astro` is a styleguide page — not relevant.

## Component conventions to follow

- `Atoms`: `v-section.tsx` (`VSection`: `id`, `aria-labelledby`, `background`, `paddingY`), `v-heading.tsx` (`VHeading`: `level`, `id`, `weight`). `Molecules`: `project-card.tsx` (editorial `<details>` rows), `experience-card.tsx`, `social-links.tsx`, `v-tech-badge.tsx`.
- List-section pattern (`projects-section.tsx`): `VSection` containing a `1fr/280px` grid — sticky `<aside>` with `VHeading` + an `<ol>`/list of rows.
- **Design system** (DESIGN.md + tailwind.css): Twilight dark palette (`base-100/200/300`), Emerald Signal (`primary`) for links/accents, Cyan Readout (`secondary`) for mono metadata, hairline `border-base-300` (no shadows), Inter prose / JetBrains Mono labels, body line length ≤70ch, `prefers-reduced-motion` honored, WCAG 2.1 AA focus rings.
- Typography plugin is loaded; `prose` (and `prose-invert` for dark) can be applied, but must be tuned to the palette (override `prose-*` defaults toward the Twilight tokens).

## Date formatting

`src/utils/date.ts` exports `formatDate(string) → 'YYYY Mon'` (e.g. "Sep 2026"). Reusable for post listing/detail metadata.

## Gaps to close (implementation summary)

1. New `cms/collections/posts.ts` (slug `posts`, drafts).
2. Register in `cms/payload.config.ts`.
3. Regenerate `cms/payload-types.ts`.
4. Extend `src/types/content.ts` (`Post` + `PortfolioContent.posts`), `src/types/index.ts`, `src/data/content.ts`.
5. Extend `export-content.ts` (query + map posts + stdout count) and `seed.ts` (managedCollections + create loop).
6. Seed DB with the 7 articles (via `seed.ts` from the JSON snapshot) and regenerate `cms-content.json` via `cms:export`.
7. Add `marked` dependency.
8. `src/pages/blog/index.astro` listing + `src/pages/blog/[slug].astro` detail (+ `getStaticPaths`).
9. Post card/detail rendering components under `src/components/` (atomic).
10. Nav `blog` link in `index.astro`.
11. Verify: `lint:check`, `format:check`, `astro build`, manual browser check.
