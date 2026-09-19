# Investigation

## Root causes

1. The home page has no project content or project section. `src/pages/index.astro:68-99` moves from the about strip to experience and then technologies, while the repository-wide project search returns no project model or reusable project collection.
2. The primary navigation exposes only `#work`, `#about`, and `#contact` at `src/pages/index.astro:20-27`. Its `#work` target is the experience wrapper at `src/pages/index.astro:90-98`, so featured work is not directly discoverable.
3. Existing shared content is build-time JSON under `src/data/`, but this issue explicitly requires reusable project content in `src/constants/`. Shared types are exported from `src/types/index.ts:1-15`.
4. The current application is Astro with React components, not Vue. `astro.config.ts:2,9-11` registers only React, `tsconfig.json:5-6` configures React JSX, `README.md:3-5,20-32` documents Astro/React, and the completed migration plan records React as the only renderer under `src/components/`. Reintroducing Vue would restore the dual runtime rejected in `plans/migrate-all-components-and-configuration-from-vue-to-react-2026-09-19/solution.md:81-86`.

## Existing logic links

- `src/pages/index.astro:2-8` imports organisms, data, the layout, and shared types through the `@/` alias.
- `src/pages/index.astro:90-99` owns the current work-to-stack section order and is the integration point for a projects organism.
- `src/components/atoms/v-section.tsx:22-44` supplies semantic `<section>`, `aria-labelledby`, responsive container wrapping, background selection, and vertical spacing.
- `src/components/atoms/v-heading.tsx:33-51` supplies typed semantic heading levels.
- `src/components/organisms/experience-section.tsx:15-49` establishes the `280px + content` responsive section composition and functional mono label.
- `src/components/organisms/technologies-section.tsx:32-59` establishes the alternate `base-200` surface and the same desktop section split.
- `src/assets/styles/tailwind.css:22-52` defines the Twilight, Emerald, Cyan, Inter, and JetBrains Mono tokens. `src/assets/styles/tailwind.css:146-154` already gives links a global visible `:focus-visible` outline. `src/assets/styles/tailwind.css:195-216` disables transitions and effects for reduced motion.
- `DESIGN.md` forbids a generic identical-card grid, drop shadows, glassmorphism, gradient text, and decorative color. Projects therefore need varied editorial rows or plates rather than a standard card wall.

## Project content sources

Public repository metadata and READMEs provide factual content for three selected projects:

- **Underline AI** — browser-only extraction of underlined text from images using Gemini; repository and live-demo URLs are published. Stack: Vue 3, TypeScript, Tailwind CSS, Pinia, Dexie, Gemini API.
- **Wheel of Names** — add names and spin an animated wheel to select a random winner; repository and Cloudflare Pages demo are published. Stack: Vue 3, TypeScript, Tailwind CSS, Vite.
- **ibrahimturan.dev** — this static portfolio and design-system surface; repository and production URL are published. Stack: Astro, React, TypeScript, Tailwind CSS, DaisyUI.

## Decision boundary

The implementation will preserve the current Astro/React runtime. The requested Vue constraint predates the completed React migration and cannot be followed without adding a second renderer, dependencies, lint path, and client/runtime risk for a static section. All remaining constraints—atomic placement, typed shared data, alias imports, kebab-case, Tailwind 4, arrow components, accessibility, and no tests—remain applicable.
