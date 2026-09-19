# Investigation

## Current Architecture

- `package.json:6-16` runs Vite and `vue-tsc`; Astro and Astro integrations are absent. `package.json:18-31` includes Vue Router, Pinia, Vue icon, motion, and WebGL dependencies.
- `src/main.ts:1-9` creates one global Vue application and installs Router, Pinia, and the icon plugin before mounting `src/app.vue`.
- `src/app.vue:1-18` reads Vue Router metadata and dynamically selects `src/layouts/default.layout.vue`.
- `src/router/routes.ts:1-17` defines `/` and `/colors`; both routes are client-side lazy imports.
- `src/layouts/default.layout.vue:6-15` owns the skip link, outer `main`, router outlet, and footer. `src/pages/home.page.vue:30-105` also renders a `main`, producing nested landmarks.
- `index.html:3-45` owns global metadata, PWA links, analytics, and stylesheet loading. `index.html:47-49` contains the SPA mount point and Vue entry script.

## Data and Rendering

- `src/stores/user.store.ts:1-18` wraps static JSON in Pinia refs and computed state. There are no mutations, persistence, or asynchronous actions.
- `src/pages/home.page.vue:1-11` reads that store only to render `src/data/userInfo.json`; its markup at `src/pages/home.page.vue:14-106` is otherwise static.
- `src/components/molecules/social-links.vue:1-33` also reads static profile URLs through Pinia.
- `src/components/organisms/experience-section.vue:1-23` and `src/components/organisms/technologies-section.vue:1-42` compute build-time views of local JSON. Their templates require no browser state.
- `src/pages/colors.page.vue:1-54` is a static design-token reference page.

## Client-Only Behavior

- `src/components/atoms/v-blur-text.vue:76-176` uses reactive viewport and reduced-motion state; `src/components/atoms/v-blur-text.vue:179-209` renders `motion-v` animation nodes.
- `src/components/atoms/v-prism-background.vue:28-77` creates a WebGL canvas and accesses `window`; `src/components/atoms/v-prism-background.vue:451-466` manages browser lifecycle and prop-driven rebuilds.
- Other Vue components use computed values only to derive static classes or local JSON output. They can be Astro components without client hydration.

## Styling, Icons, and Assets

- `src/assets/styles/tailwind.css:1-53` loads Tailwind CSS 4, fonts, typography, DaisyUI, and the custom dark theme. `src/assets/styles/tailwind.css:111-236` contains global accessibility, reduced-motion, and print rules.
- `vite.config.ts:3-46` installs Vue, Tailwind, and PWA Vite plugins and defines `@`.
- `src/plugins/oh-vue-icons.ts:1-48` relies on global Vue plugin installation and a runtime icon registry.
- `src/components/atoms/v-icon.vue:1-10` renders names through that registry. Technology icon names originate in `src/data/technologies.json`; social icon names originate in `src/components/molecules/social-links.vue:8-33`.
- `public/` already contains favicon, Apple touch, 192px, and 512px PWA images. `vite.config.ts:13-39` defines the existing manifest and marks the 512px image as maskable.

## Tooling and Tests

- `eslint.config.js:7-119` configures JavaScript, TypeScript, Vue, and Prettier but does not parse Astro files.
- `tsconfig.app.json:1-20` extends Vue TypeScript settings and excludes Astro files.
- `.prettierrc.json:1-11` has no Astro formatting plugin.
- `src/__tests__/` contains Vue Test Utils suites for components that will become Astro files. The two genuinely interactive Vue components have dedicated suites and can remain under Vitest; suites tied to removed Vue implementations become obsolete.

## Root Cause and Logic Links

1. Static JSON flows through Pinia into Vue templates, forcing a global client runtime without mutable state.
2. Vue Router and the layout dispatcher defer route and shell rendering to the browser even though both known routes are static.
3. Global icon registration couples otherwise static icons to the Vue application.
4. Vite owns metadata, Tailwind, and PWA behavior; removing Vite configuration without explicit Astro replacements would regress styling, installability, and discoverability.
5. Only blur text and the OGL prism require hydration. Keeping the rest as Vue would preserve unnecessary JavaScript and miss the migration objective.
