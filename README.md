# ibrahimturan.dev

Personal portfolio for **İbrahim Turan** — Full-Stack Engineer.
Astro, React components and islands, Tailwind 4, DaisyUI, Motion. Dark theme only. PWA-ready.
Live: [ibrahimturan.dev](https://ibrahimturan.dev)

## Develop

```bash
npm install
npm run dev          # Astro at http://localhost:8080
npm run build        # type-check + static production build from the committed snapshot
npm run preview      # serve the production build
npm run lint         # eslint --fix
npm run format       # prettier --write
```

## Local Payload CMS

Payload is an authoring tool only. The admin, SQLite database, and API stay on the developer
machine; production deploys only Astro's static `dist/` output.

```bash
npm run cms:install
npm run cms:dev      # http://localhost:3000 redirects to /admin
```

The local CMS has development defaults for SQLite and the Payload secret. To override either value,
copy `cms/.env.example` to `cms/.env` before starting it. Create the first admin user in the browser,
stop the CMS, then bootstrap the current portfolio:

```bash
npm run cms:seed
```

Edit and publish content through the admin. Drafts are never exported. Refresh the committed static
snapshot and build the deployable website with:

```bash
npm run cms:export   # writes src/data/cms-content.json and public/cms/
npm run generate     # exports published content, then builds dist/
```

`npm run build` does not connect to Payload. It builds the last exported snapshot, so deployment
requires only the root package and never needs `cms/`, SQLite, credentials, or a running API.

## Structure

```text
cms/                         # Local-only Payload and Next admin application
├── collections/             # Experiences, projects, technologies, media, users
├── globals/                 # Profile content
├── scripts/                 # Seed and static export
└── payload.config.ts
src/
├── components/
│   ├── atoms/               # Typed React atoms and interactive islands
│   ├── molecules/           # Project cards, experience cards, badges, social links
│   └── organisms/           # Portfolio sections and shared footer
├── data/                    # Generated CMS snapshot and typed content boundary
├── layouts/                 # Shared Astro document layout
├── pages/                   # Astro file-based routes: / and /colors
├── types/                   # TypeScript types
├── utils/                   # Date helpers
├── assets/styles/           # Tailwind CSS theme and global styles
└── env.d.ts                 # Astro and PWA client types
```

## Design system

- **PRODUCT.md** — strategy: audience, personality, anti-references, principles.
- **DESIGN.md** — visual spec: palette, typography, components, do's & don'ts.
- **`.impeccable/design.json`** — machine-readable sidecar (Stitch format).
- **`.impeccable/live/config.json`** — `/impeccable live` config for the Astro layout.

Theme: `ibrahimturan-dark` (DaisyUI). OKLCH. Two chromatic accents — Emerald Signal (primary) and Cyan Readout (secondary) — over a Twilight Stack of dark blue-violet surfaces. Tonal layering, no shadows.

## Accessibility

- WCAG 2.1 AA target.
- Reduced motion honored: WebGL prism and blur-text reveals both gate on `prefers-reduced-motion: reduce`.
- Skip link, focus-visible, single `<main>` landmark, semantic `<section aria-labelledby>` per region.
- Print stylesheet renders a clean résumé layout.

## License

Source code: MIT.
Content (résumé, copy, images): © İbrahim Turan, all rights reserved.
