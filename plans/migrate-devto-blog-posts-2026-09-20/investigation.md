# Investigation

## Architecture

- `astro.config.ts`: Astro emits a static deployment (`output: 'static'`) for `https://ibrahimturan.dev`.
- `cms/collections/posts.ts`: Payload already models posts with Markdown bodies, metadata, publication status, language, source URL, and ordering.
- `cms/scripts/export-content.ts`: published Payload documents are exported into `src/data/cms-content.json` before the Astro build.
- `src/data/content.ts`: the generated snapshot is the only content dependency used by the frontend, so deployed blog pages do not call Payload or DEV at runtime.
- `src/pages/blog/index.astro`: blog listing route already exists.
- `src/pages/blog/[slug].astro`: Astro creates one static route per exported post and renders author-owned Markdown at build time.
- `src/pages/index.astro`: main navigation already links to `/blog`.

## Source inventory

The DEV API reports seven published articles under `_ibrahimturan`, newest first:

1. `modular-frontend-architecture-2oae` — 2026-06-29
2. `clean-architecture-in-modern-frontend-development-a-comprehensive-guide-hpp` — 2025-01-21
3. `how-to-parse-formdata-values-with-netlify-functions-v2-52i2` — 2024-01-16
4. `effortless-animations-with-autoanimate-in-vue-3-18kl` — 2023-03-04
5. `adding-pwa-to-vite-applications-1bce` — 2022-10-21
6. `vite-uygulamasina-pwa-ozelligi-nasil-eklenir-4593` — 2022-10-20
7. `how-to-prevent-chrome-form-auto-fill-on-vue-311c` — 2020-12-05

Each detail endpoint supplies the full `body_markdown`, language, dates, reading time, source URL, and optional cover image.

## Current gap

The blog architecture is present, but deployment readiness depends on the exported snapshot containing the complete authoritative article bodies and on metadata supporting per-article language, cover/social imagery, and local canonical URLs. The renderer also needs to handle DEV-specific Liquid embeds safely and predictably instead of shipping raw template tags.

## Conventions

The established visual world is the dark Instrument Panel system in `DESIGN.md`: Inter prose, JetBrains Mono metadata, emerald/cyan accents, tonal surfaces, hairline borders, and no generic card grid. Blog additions must extend this system rather than introduce a second visual language.
