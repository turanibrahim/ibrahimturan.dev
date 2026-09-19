# Solution — Add Blog Posts Page and Migrate dev.to Articles

## Decision

Add a **`Posts` Payload collection**, seed it with the seven dev.to articles, extend the existing export pipeline (`cms:export` → `src/data/cms-content.json`), expose typed `posts` via `src/data/content.ts`, and render two static Astro routes: a `/blog` listing and `/blog/[slug]` detail pages. Markdown bodies are rendered to HTML **at Astro build time** with `marked`, styled by the already-installed `@tailwindcss/typography` (`prose`). This reuses the repository's CMS-driven content flow and the existing design tokens — no Vue, no static content-collection divergence.

## Data model

New type in `src/types/content.ts` (append to `PortfolioContent` as `posts`):

```ts
export interface Post {
  title: string;
  slug: string;
  excerpt: string;
  bodyMarkdown: string;
  tags: readonly string[];
  publishedAt: string; // ISO date
  readingTimeMinutes: number;
  sourceUrl?: string;
  order: number;
}
```

Export `posts: Post[]` (newest-first, held stable by `order`).

## Payload `Posts` collection (`cms/collections/posts.ts`)

Follow the `Projects`/`Experiences` collection pattern (same `access`, `versions: { drafts: true }`, `defaultSort: 'order'`).

- `slug: 'posts'`; `admin.useAsTitle: 'title'`; `admin.defaultColumns: ['title', 'publishedAt', '_status']`.
- Fields:
  - `title` — text, required.
  - `slug` — text, required, `index`, `unique`.
  - `excerpt` — textarea, required.
  - `bodyMarkdown` — textarea, required (full `body_markdown` from dev.to).
  - `tags` — array of `{ name: text, required }`, required.
  - `publishedAt` — date, required.
  - `readingTimeMinutes` — number, required.
  - `sourceUrl` — text, optional.
  - `order` — number, `index`, required.

Register in `cms/payload.config.ts`: import `Posts` and add to the `collections` array. Regenerate types with `npm --prefix cms run generate:types` (covers `cms/payload-types.ts` — **do not hand-edit**).

## CMS pipeline updates

### `cms/scripts/export-content.ts`

- Add `postsResult` to the `Promise.all` (same shape: `payload.find({ collection: 'posts', sort: 'order', where: { _status: { equals: 'published' } }, ... })`).
- Map posts into `content.posts` (title, slug, excerpt, bodyMarkdown, tags→names, publishedAt, readingTimeMinutes, sourceUrl?, order).
- Extend the final stdout count string to include posts.

### `cms/scripts/seed.ts`

- Add `'posts'` to `managedCollections` (empty-DB guard).
- Add a `payload.create` loop over `snapshot.posts` (spread doc, tags→`{ name }`, `_status: 'published'`), mirroring the projects loop.
- Extend the stdout summary to count posts.

## Build-time markdown rendering

- Add **`marked`** to root `package.json` `dependencies` (small, zero-config, returns HTML string) and `npm install`.
- In `src/pages/blog/[slug].astro` frontmatter: `import { marked } from 'marked';` then `const bodyHtml = await marked.parse(post.bodyMarkdown);` and render inside a `prose`-styling wrapper with `<Fragment set:html={bodyHtml} />`.
- Content is author-controlled (own articles), so no deeper sanitization is required; `marked` default handling is sufficient.

## Styles — article typography

- The body wrapper uses the Twilight palette and the Inter/Mono pairing. Add scoped `.astro` `<style>` (non-`scoped` unless needed) or a small set of component classes that map `prose`/elements to the design tokens:
  - Paragraphs/headings: `base-content`; links: `primary` with underline on hover; inline code: mono `secondary`; code blocks: `bg-base-200`, `border-base-300`, mono; horizontal rules: `border-base-300`.
  - Body line length capped at `~70ch` (a `max-w-prose`/`max-w-2xl` container), surface `base-100`.
- Keep print behavior consistent (the global print styles already flatten colors and hide non-essential chrome).

## Routes

### `src/pages/blog/index.astro`

- Import `posts` from `@/data/content`; sort by `order` (already newest-first).
- Wrap in `DefaultLayout path="/blog"` with title/description.
- Page header: `VHeading`-style headline ("Writing.") + a short supporting line; mono `label`-style.
- List posts as `PostCard` rows (`<article>` grid rows, hairline `border-t border-base-300` — matches `ProjectCard`): index (optional), title (link to `/blog/${slug}`, `text-primary` on hover), mono date + reading-time metadata, excerpt. No card grid (per DESIGN.md ban).
- Use React `post-card.tsx` molecule so the row is reusable and testable.

### `src/pages/blog/[slug].astro`

- `getStaticPaths()`: return all `posts` mapped to `{ params: { slug }, props: { post } }`.
- Frontmatter renders `bodyHtml` via `marked`; wrap in `DefaultLayout path={`/blog/${slug}`}`.
- Header: mono metadata row (formatted date via `src/utils/date.ts`, reading time), display/headline title, excerpt as intro.
- Body: `<Fragment set:html={bodyHtml} />` inside the prose wrapper.
- Footer: a "Back to all writing" link to `/blog`.
- If `sourceUrl` is set, show a `aria-label`-safe external link to the original dev.to article (`target="_blank"`, `rel="noreferrer noopener"`, "opens in a new tab").

### Components (atomic)

- `src/components/molecules/post-card.tsx` — listing row (props: `post`, optional `index`).
- Optionally `src/components/organisms/post-article-header.tsx` — detail meta header; keep inline in `[slug].astro` if it stays small to avoid over-abstraction.

## Navigation

Add a `blog` link to the inline nav in `src/pages/index.astro` (the `work/projects/about/contact` anchor group): same `font-mono text-xs text-base-content-muted hover:text-primary` styling, linking to `/blog`.

## Seed content (authoritative source)

Seed the seven articles (tags re-derived from content, describing actual topics):

1. `modular-frontend-architecture` — Modular Frontend Architecture — 2026-06-29 — 9 min — tags: `architecture`, `modular`, `frontend`.
2. `clean-architecture-in-modern-frontend-development` — Clean Architecture in Modern Frontend Development: A Comprehensive Guide — 2025-01-21 — 4 min — tags: `architecture`, `clean-architecture`, `frontend`, `javascript`.
3. `parse-formdata-netlify-functions-v2` — How to parse FormData values with Netlify Functions V2 — 2024-01-16 — 1 min — tags: `netlify`, `functions`, `formdata`, `javascript`.
4. `effortless-animations-autoanimate-vue-3` — Effortless Animations With `AutoAnimate` in Vue 3 — 2023-03-04 — 7 min — tags: `vue`, `animation`, `autoanimate`, `frontend`.
5. `adding-pwa-to-vite-applications` — Adding PWA to Vite Applications — 2022-10-21 — 5 min — tags: `pwa`, `vite`, `javascript`.
6. `vite-uygulamasina-pwa-ozelligi-nasil-eklenir` — Vite Uygulamasına PWA Özelliği Nasıl Eklenir — 2022-10-20 — 5 min — tags: `pwa`, `vite`, `javascript` (Turkish).
7. `prevent-chrome-form-autofill-vue` — How to prevent Chrome form auto fill on Vue? — 2020-12-05 — 3 min — tags: `vue`, `chrome`, `autofill`, `javascript`.

`sourceUrl` set to each article's dev.to canonical URL. `excerpt` = dev.to `description`. `bodyMarkdown` = full `body_markdown`.

**Method:** fetch `body_markdown` for each slug from the dev.to API (`https://dev.to/api/articles/_ibrahimturan/<slug>`), write into the JSON snapshot, then run `npm run cms:seed` (fresh DB) + `npm run cms:export` to regenerate `cms-content.json`. (Circle: JSON is the source of truth the seed reads; seed writes the DB; export rewrites the JSON.)

## Alternatives rejected

- **Astro content collections (`.md` files):** diverges from the live, single-source CMS pipeline and splits content ownership; the site standardizes on Payload → JSON.
- **Vue components / Pinia store:** the repo is Astro + React; adding Vue violates the active architecture (AGENTS.md is stale).
- **Store pre-rendered HTML in the CMS:** couples authoring to HTML, loses markdown editability, and duplicates the renderer inside `cms/` (where no markdown lib exists).
- **`@astrojs/markdown-remark` / `astro:content` `render()`:** the 6.x processor returns compiled module code, and Astro 5 removed the string-based `render`; both are unsuitable for embedding raw HTML. `marked` is the minimal, idiomatic fit.
- **External-link-only listing (no detail pages):** rejected by the user — full detail pages requested.

## Verification

1. `npm install` (adds `marked`).
2. `npm run cms:seed` then `npm run cms:export`; confirm `cms-content.json` contains 7 posts and stdout counts them.
3. `npm run lint:check` — no errors.
4. `npm run format:check` — no diffs (run `npm run format` first if needed).
5. `npm run build` (`astro check && astro build`) — type-checks + produces static output; confirm `/blog` and 7 `/blog/[slug]` HTML files are emitted.
6. Manual browser check: `/blog` lists 7 posts newest-first; a detail page renders formatted prose, code blocks, and back-link; nav `blog` link works; reduced-motion and print behave per the global stylesheet.
7. No lifecycle/destructive commands beyond the intended seed/export (DB and `public/cms`).
