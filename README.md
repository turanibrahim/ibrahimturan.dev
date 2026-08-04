# ibrahimturan.dev

Personal portfolio for **İbrahim Turan** — Frontend Engineer.
Vue 3 + Vite, Tailwind 4, DaisyUI, motion-v. Dark theme only. PWA-ready.

Live: [ibrahimturan.dev](https://ibrahimturan.dev)

## Develop

```bash
npm install
npm run dev          # http://localhost:8080
npm run build        # type-check + production build
npm run preview      # serve the production build
npm run lint         # eslint --fix
npm run format       # prettier --write
```

## Structure

```
src/
├── components/
│   ├── atoms/         # v-avatar, v-button, v-card, v-heading, v-section, ...
│   ├── molecules/     # experience-card, v-tech-badge, social-links
│   └── organisms/     # hero-section, about-section, experience-section, ...
├── data/              # userInfo.json, experiences.json, technologies.json
├── layouts/           # default.layout.vue
├── pages/             # home.page.vue, colors.page.vue (dev only)
├── plugins/           # pinia, oh-vue-icons
├── router/            # vue-router setup + routes
├── stores/            # pinia stores
├── types/             # typescript types
├── utils/             # date helpers
├── assets/styles/     # tailwind.css (theme + globals)
├── app.vue            # layout dispatcher
└── main.ts            # app entry
```

## Design system

- **PRODUCT.md** — strategy: audience, personality, anti-references, principles.
- **DESIGN.md** — visual spec: palette, typography, components, do's & don'ts.
- **`.impeccable/design.json`** — machine-readable sidecar (Stitch format).
- **`.impeccable/live/config.json`** — `/impeccable live` config (Vite SPA, HTML entry).

Theme: `ibrahimturan-dark` (DaisyUI). OKLCH. Two chromatic accents — Emerald Signal (primary) and Cyan Readout (secondary) — over a Twilight Stack of dark blue-violet surfaces. Tonal layering, no shadows.

## Accessibility

- WCAG 2.1 AA target.
- Reduced motion honored: WebGL prism and blur-text reveals both gate on `prefers-reduced-motion: reduce`.
- Skip link, focus-visible, single `<main>` landmark, semantic `<section aria-labelledby>` per region.
- Print stylesheet renders a clean résumé layout.

## License

Source code: MIT.
Content (résumé, copy, images): © İbrahim Turan, all rights reserved.
