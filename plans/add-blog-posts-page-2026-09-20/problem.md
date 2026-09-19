# Add Blog Posts Page and Migrate dev.to Articles

## User prompt

> Create blog posts page on ibrahimturan.com and move blog posts there.

Supplemental context supplied during scoping:

- The site is **Astro + React + Payload CMS**, not Vue. Repo `AGENTS.md` describes a stale Vue/Pinia architecture from a prior migration; it does not apply.
- The blog posts to move are the author's dev.to articles at https://dev.to/_ibrahimturan (7 articles, confirmed via the dev.to API).
- Architecture decision (confirmed by user): add a **Payload `Posts` collection**, seed it with the dev.to articles, export through the existing CMS pipeline, and render a `/blog` index page plus `/blog/[slug]` article detail pages.

## Issue explanation

The site currently has no blog surface at all. Payload collections are limited to `Users`, `Media`, `Experiences`, `Projects`, and `Technologies`; there is no `Posts` collection, no `/blog` route, and no navigation entry. All written content lives externally on dev.to. The task is to bring that content into the established CMS-driven pipeline (Payload → export → typed content → Astro pages) and expose it with a listing and per-article detail pages, while respecting the site's design language and accessibility bar defined in `PRODUCT.md`.

Dev.to articles to migrate (source: https://dev.to/_ibrahimturan):

1. Modular Frontend Architecture — 2026-06-29 · 9 min · #architecture #modular #frontend
2. Clean Architecture in Modern Frontend Development: A Comprehensive Guide — 2025-01-21 · 4 min
3. How to parse FormData values with Netlify Functions V2 — 2024-01-16 · 1 min · #netlify #functions #form
4. Effortless Animations With `AutoAnimate` in Vue 3 — 2023-03-04 · 7 min · #python #mcp #claude #llm
5. Adding PWA to Vite Applications — 2022-10-21 · 5 min · #vite #pwa #javascript
6. Vite Uygulamasına PWA Özelliği Nasıl Eklenir — 2022-10-20 · 5 min · #javascript #vite #pwa
7. How to prevent Chrome form auto fill on Vue? — 2020-12-05 · 3 min · #vue #javascript #chrome #autofill

Note: tag metadata on dev.to is inconsistent (e.g. the AutoAnimate post carries #python #mcp tags that do not match its content). Tags should be re-derived from article content during seeding rather than copied verbatim.

## Questions and answers

Resolved during scoping via the `ask` tool:

- **Blog source**: Payload `Posts` collection (matching the existing CMS pipeline), seeded with the dev.to articles — not a static Astro content collection.
- **Page scope**: listing page (`/blog`) + individual article detail pages (`/blog/[slug]`) rendering full content.
