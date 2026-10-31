# ibrahimturan.dev

Personal portfolio for **İbrahim Turan** — Full-Stack Engineer.
English at the root, Turkish under `/tr`. Astro, React components and islands, Tailwind 4, DaisyUI, Motion. Dark theme only. PWA-ready.
Live: [ibrahimturan.dev](https://ibrahimturan.dev)

## Develop

```bash
npm install
npm run dev          # Astro at http://localhost:8080
npm run build        # content preflight + type-check + static build from the committed snapshot
npm run preview      # serve the production build
npm run lint         # eslint --fix
npm run format       # prettier --write
```

## Local EmDash CMS

EmDash is the authoring tool. Its admin, SQLite database and media stay on the developer machine;
production deploys only Astro's static `dist/` output. The CMS is a separate Astro app in `cms/`
because EmDash needs Astro 6+, server rendering and an adapter, while the website stays a static
Astro 5 build.

```bash
npm run cms:install
npm run cms:seed          # applies seed/seed.json to cms/data.db and copies media into cms/uploads
npm run cms:dev           # http://localhost:3000/_emdash/admin
```

The first run opens EmDash's setup wizard: enter a site name, create the admin account and register a
passkey. For a throwaway local session, open
`http://localhost:3000/_emdash/api/setup/dev-bypass?redirect=/_emdash/admin` instead — it signs you in
as a dev admin without a passkey.

`cms/data.db`, `cms/uploads/` and `cms/.emdash/*.local.json` are gitignored. `cms/seed/seed.json` is
the bootstrap: the content model plus every entry (English published, Turkish drafted) with media
expressed as `$media` references, so a fresh machine can rebuild the database with `cms:seed` alone.

Publish content in the admin, then refresh the content the site builds from:

```bash
npm run cms:export        # emdash export-seed → src/data/cms-content.json + public/cms/
npm run generate          # export, then build dist/
npm run cms:refresh-seed  # rewrite seed/seed.json from the current database
```

`npm run build` never talks to EmDash. It builds the last exported snapshot, so deployment needs only
the root package — no `cms/`, no database, no credentials, no running server.

Schema changes are made in the admin under **Content Types**. After changing a collection or field,
run `npm run cms:refresh-seed` so the bootstrap seed keeps matching the database.

`npm run cms:seed` only fills an empty database; `npm run cms:seed:update` overwrites existing entries
from `cms/seed/seed.json` instead of skipping them.

Media lives in EmDash's media library. Post covers and inline images are uploaded there; the exporter
copies only referenced files into `public/cms/` and rewrites their paths, so the static site never
links to the CMS. Two uploads with the same filename fail the export rather than overwriting each
other.

### Locales

English is the default locale at the root; Turkish lives under `/tr` with the same slugs. Turkish copy
is drafted from the files in `cms/content/tr/` and seeded as **drafts**:

```bash
npm run cms:translations   # build Turkish drafts from cms/content/tr/ and seed them
```

That command treats `cms/content/tr/` as the source of truth: re-running it rewrites the Turkish drafts
in the database, so edit the Markdown/JSON files (or stop using it and edit in the admin).

Nothing Turkish reaches the site until you review it in the admin and publish it — the exporter only
reads published entries. The résumé copy (profile, experiences, projects) is published, so `/tr/` is
Turkish end to end; the seven articles are still drafts, which is why `/tr/blog` is empty. After
publishing, run `npm run cms:export` (or `cms:refresh-seed` too, to keep the bootstrap in sync).

## Deploy

The site is a static Astro build hosted on **Cloudflare Pages**. Pages builds and publishes it from
`master`; nothing is uploaded from a laptop.

```text
Build command       npm run build
Output directory    dist
Node version        22 (from .nvmrc)
Environment vars    none — the build never talks to the CMS
```

Cloudflare serves `dist/` as-is, including `public/_headers`, which sets long-lived immutable caching
for `/_astro/*` and no-cache for the service worker.

Published CMS changes must be exported and committed before they can deploy:

```bash
npm run generate          # export the snapshot, then build locally to check it
git push
```

The build runs a content preflight before Astro. It rejects invalid or missing media, duplicate post
slugs per locale, unsupported Portable Text blocks, malformed `YYYY-MM` dates, posts whose language
disagrees with their locale, and incomplete blog metadata.

To publish without going through Pages (preview or manual push), log in once with
`npx wrangler login` and run `npm run deploy:cf`.

The custom domain is attached in the Cloudflare Pages project settings; the domain's nameservers must
point at Cloudflare for it to resolve.

## Structure

```text
cms/                          # Local-only EmDash authoring app (never deployed)
├── astro.config.mjs          # server output, node adapter, SQLite, local uploads, en/tr i18n
├── content/tr/               # Turkish source copy: profile, experiences, projects, posts
├── scripts/
│   ├── content-model.mjs     # collection and field definitions shared by the scripts
│   ├── seed.mjs              # seed → database, creates media rows and copies uploads
│   ├── apply-translations.mjs# cms/content/tr/ → draft entries in the database
│   ├── refresh-seed.mjs      # database → seed/seed.json (media as $media)
│   ├── translations.mjs      # translation grouping shared by seed and export
│   └── export.mjs            # database → src/data/cms-content.json + public/cms/
├── seed/seed.json            # committed bootstrap: model + all entries
└── src/live.config.ts        # live collections loader for the admin
src/
├── components/
│   ├── atoms/                # Typed React atoms and interactive islands
│   ├── molecules/            # Cards, badges, social links, language switcher
│   ├── organisms/            # Portfolio sections and shared footer
│   └── templates/            # Page bodies used by the en and tr routes
├── data/                     # Generated CMS snapshot and typed content boundary
├── i18n/                     # Locale config, paths and the en/tr dictionary
├── layouts/                  # Shared Astro document layout (hreflang, meta, PWA)
├── pages/                    # Routes: home, blog index, posts — each also under /tr
├── types/                    # TypeScript types
├── utils/                    # Date helpers, Portable Text renderer
├── assets/styles/            # Tailwind CSS theme and global styles
└── env.d.ts                  # Astro and PWA client types
```

## Design system

- **PRODUCT.md** — strategy: audience, personality, anti-references, principles.
- **DESIGN.md** — visual spec: palette, typography, components, do's & don'ts.
- **`.impeccable/design.json`** — machine-readable sidecar (Stitch format).
- **`.impeccable/live/config.json`** — `/impeccable live` config for the Astro layout.

Theme: `ibrahimturan-dark` (DaisyUI). OKLCH. Two chromatic accents — Emerald Signal (primary) and Cyan
Readout (secondary) — over a Twilight Stack of dark blue-violet surfaces. Tonal layering, no shadows.

## Accessibility

- WCAG 2.1 AA target.
- Reduced motion honored: WebGL prism and blur-text reveals both gate on `prefers-reduced-motion: reduce`.
- Skip link, focus-visible, single `<main>` landmark, semantic `<section aria-labelledby>` per region.
- Every page declares `html lang`, `hreflang` alternates (`en`, `tr`, `x-default`) and a language switcher.
- Print stylesheet renders a clean résumé layout.

## License

Source code: MIT.
Content (résumé, copy, images): © İbrahim Turan, all rights reserved.
