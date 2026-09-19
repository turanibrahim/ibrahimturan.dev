# Investigation

## Component inventory

Nineteen component files require conversion.

- Atoms: `src/components/atoms/v-avatar.astro`, `v-badge.astro`, `v-blur-text.vue`, `v-button.astro`, `v-card.astro`, `v-company-logo.astro`, `v-heading.astro`, `v-icon.astro`, `v-navbar.astro`, `v-prism-background.vue`, `v-section.astro`.
- Molecules: `src/components/molecules/experience-card.astro`, `social-links.astro`, `v-tech-badge.astro`.
- Organisms: `src/components/organisms/about-section.astro`, `experience-section.astro`, `footer-section.astro`, `hero-section.astro`, `technologies-section.astro`.

The active route `src/pages/index.astro:2-5` directly consumes the avatar, social links, experience section, and technologies section. `src/layouts/default.layout.astro:2,75` consumes the footer. The hero, about, navbar, button, card, experience-card, tech-badge, blur-text, and prism components are not mounted by the current pages, but remain part of the required component API.

## Dependency and rendering graph

- `src/pages/index.astro:2-5,60,85,97,99` → static React-renderable avatar, social links, experience section, technologies section.
- `src/layouts/default.layout.astro:2,75` → static React-renderable footer → social links → icon.
- `src/components/organisms/experience-section.astro:2-5,103-123` → badge, company logo, heading, section.
- `src/components/organisms/technologies-section.astro:2-4,35-94` → heading, icon, section.
- `src/components/organisms/hero-section.astro:2-7,14-78` → avatar, card, heading, blur text, prism background, social links. Blur text and prism are the only hook-driven browser components.
- `src/components/molecules/experience-card.astro:2-7` → badge, card, company logo, heading, date utilities.
- `src/components/molecules/v-tech-badge.astro:2-4` → badge, icon.

Astro can server-render React components without a client directive. A React component containing hooks must be hydrated at its Astro callsite; React JSX cannot declare nested Astro `client:*` directives. Therefore `hero-section.tsx`, if consumed as a unit, is itself an interactive island. The current route does not consume it, so the production route remains static apart from existing PWA registration and analytics.

## Root causes and migration boundaries

1. `astro.config.ts:2,10` installs and activates `@astrojs/vue`; React cannot render until this integration is replaced.
2. `package.json:20-23,27,36,43` carries Vue runtime, Vue motion/icons, Astro Vue, Vue ESLint, and Vue parser dependencies. `package.json:10-11` still scans `.vue`.
3. `eslint.config.js:4,11,62-93` imports Vue lint configuration and applies Vue-only parsing and rules. No React or hooks lint configuration exists.
4. `src/types/vue-shim.d.ts:1-5` imports Vue and declares `.vue` modules. Component props are stored as module declarations under `src/types/*.d.ts`; these are framework-neutral in shape but should become normal `.ts` modules for React components.
5. `src/components/atoms/v-blur-text.vue:2-3,42-175` depends on Vue refs, computed state, lifecycle, watchers, and `motion-v`. Its contract includes word/letter grouping, top/bottom keyframes, stagger delay, multi-step timing, viewport triggering, callback deduplication, media-query changes, and observer/listener cleanup. `src/components/atoms/v-blur-text.vue:179-209` has a reduced-motion static branch and nonbreaking-space preservation.
6. `src/components/atoms/v-prism-background.vue:2-4,24-465` depends on Vue lifecycle/watch APIs around OGL. Props are captured into uniforms at setup, so prop changes require teardown/recreation. Cleanup currently stops RAF, observers, listeners, and removes the canvas (`426-447`) but does not explicitly remove OGL geometry/program resources.
7. `src/components/atoms/v-icon.astro:2-19,26-46` hard-codes nineteen `oh-vue-icons` mappings. Its SVG contract is encoded at `65-75`: current color, em sizing, optional flip/animation, labelled `img` role, otherwise `aria-hidden`, and no focus.
8. Astro-only constructs require explicit React equivalents: `class:list`, `<slot>`, named slots, `set:html`, and component-local `<style>` appear throughout `src/components/`. React needs `className`, `children`/named ReactNode props, `dangerouslySetInnerHTML`, and Tailwind/global CSS.
9. Component-local styles at `v-button.astro:94-98`, `v-icon.astro:78-100`, `experience-card.astro:86-98`, `experience-section.astro:134-159`, and `technologies-section.astro:96-100` must move to static Tailwind classes or `src/assets/styles/tailwind.css`; React does not scope embedded Astro styles.
10. `src/assets/styles/tailwind.css:171-193` already globally minimizes animation and disables backdrop blur under reduced motion. The React islands must additionally avoid starting Motion and WebGL work.

## Constraints confirmed

- `astro.config.ts:7-8,45-50` defines the static site URL, static output, port 8080, and Tailwind Vite plugin; these remain unchanged.
- `astro.config.ts:11-43` defines PWA behavior and metadata; it remains unchanged.
- `src/layouts/default.layout.astro:20-82` remains Astro to preserve document metadata, slots, analytics, PWA registration, and static output.
- `src/pages/index.astro` and `src/pages/colors.astro` remain Astro.
- `src/data/technologies.json:3-129` uses all Simple Icons mappings currently declared except social Font Awesome icons, so all existing icon keys must remain accepted.
- No shared client state exists; no store is required.
- No unit tests are requested. Verification must use build/check/lint/format plus browser inspection, with a temporary runtime surface for currently unmounted interactive components if necessary.
