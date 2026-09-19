# Solution

## Architecture

Astro remains the document, page, layout, routing, static-generation, PWA, and deployment layer. React becomes the only component renderer under `src/components/`.

- Static React components render on the Astro server without `client:*`, producing HTML with no component runtime shipped to the browser.
- `v-blur-text.tsx` and `v-prism-background.tsx` use hooks and require hydration when called directly from Astro.
- `hero-section.tsx` contains both interactive atoms, so an Astro caller must hydrate `HeroSection` as one `client:visible` island. React cannot place Astro hydration directives inside React JSX.
- The current production routes do not render blur text, prism, or hero section. Their design remains available without changing the current portfolio layout or adding client JavaScript to the active route.

## File changes

### Components

Replace every source with a same-name kebab-case `.tsx` file and remove the old `.astro`/`.vue` file:

- Atoms: `v-avatar`, `v-badge`, `v-blur-text`, `v-button`, `v-card`, `v-company-logo`, `v-heading`, `v-icon`, `v-navbar`, `v-prism-background`, `v-section`.
- Molecules: `experience-card`, `social-links`, `v-tech-badge`.
- Organisms: `about-section`, `experience-section`, `footer-section`, `hero-section`, `technologies-section`.

Each module exports a named arrow-function component and the same component as default. Props continue to come from `@/types/...`. React-specific composition uses `children` and explicit named `ReactNode` props where Astro previously used slots. Existing scalar prop names and defaults remain stable. `class` becomes React-standard `className` at component boundaries and all callsites migrate together.

Convert Astro rendering constructs as follows:

- `class:list` → complete static class maps plus filtered `className` joining.
- default `<slot>` → `children`.
- navbar named slots → `start`, `center`, `end` ReactNode props.
- card named slots → `figure`, `badge`, `titleContent`, `actions` ReactNode props.
- `set:html` → `dangerouslySetInnerHTML` for the same trusted experience data.
- Astro `class` JSX attributes → React `className`; SVG `fill-rule`/`clip-rule` → `fillRule`/`clipRule`.
- Component-local CSS → equivalent Tailwind utilities where practical; shared icon keyframes and timeline selectors → `src/assets/styles/tailwind.css`.

### Blur text

Implement `src/components/atoms/v-blur-text.tsx` with `useMemo`, `useRef`, `useState`, and `useEffect`, plus `motion/react`.

- Preserve word splitting, letter splitting, nonbreaking-space output, top/bottom defaults, custom snapshots, stagger delay in milliseconds, step duration, generated keyframe times, and custom easing.
- Use an `IntersectionObserver` with the same threshold/root margin and one-shot activation.
- Track `prefers-reduced-motion` with `matchMedia`; render plain visible segments and disconnect the observer while reduction is enabled.
- Reset animation identity and callback deduplication when animation-defining props change.
- Fire `onAnimationComplete` once from the final segment only.
- Remove observer and media-query listeners on unmount and on relevant effect replacement.
- Server output remains readable text so the island has fallback content before hydration or without JavaScript.

### Prism background

Implement `src/components/atoms/v-prism-background.tsx` with `useRef` and one setup `useEffect` keyed by every rendering prop.

- Preserve the shader, OGL renderer, uniforms, clamping/default rules, DPR cap, resize behavior, pointer normalization, hover inertia, rotate modes, offscreen suspension, and RAF settling behavior.
- Read props into each effect instance; a prop update runs full cleanup before rebuilding OGL state, matching Vue's deep watcher.
- Skip renderer creation when reduced motion is active.
- Cleanup cancels RAF, disconnects resize/intersection observers, removes pointer/window listeners and the canvas, and calls OGL geometry/program removal to release GPU resources.

### Icons

Implement `src/components/atoms/v-icon.tsx` with `react-icons/fa` and `react-icons/si`.

- Keep all nineteen existing string keys and fail fast for unknown keys.
- Preserve em sizing, current-color fill, vertical alignment, flip transforms, spin/pulse classes, optional accessible `img` role and label, hidden decorative output, and non-focusability.
- Keep the social and technology data unchanged.

### Types

Rename component prop modules from `.d.ts` to `.ts` without changing import specifiers. Preserve existing scalar prop interfaces and add React composition fields only where required. Remove `src/types/vue-shim.d.ts`. Keep `src/env.d.ts` because it declares Astro/PWA environment types, not Vue. Update `src/types/index` to a normal `.ts` module.

### Astro consumers

Update `src/pages/index.astro` and `src/layouts/default.layout.astro` imports to `.tsx`; use `className` where passing a class prop. Keep both pages and the layout as Astro. Update all React component-to-component imports to `.tsx` alias paths. No client directive is added to static production consumers.

### Runtime and tooling

- `astro.config.ts`: replace `@astrojs/vue`/`vue()` with `@astrojs/react`/`react()`. Preserve site, static output, PWA options, metadata, port, and Tailwind plugin byte-for-byte except formatting required around the integration.
- Runtime dependencies: add `react`, `react-dom`, `motion`, and `react-icons`; keep `ogl`.
- Development dependencies: add `@astrojs/react`, `@types/react`, `@types/react-dom`, `eslint-plugin-react`, and `eslint-plugin-react-hooks`.
- Remove `vue`, `@astrojs/vue`, `motion-v`, `oh-vue-icons`, `eslint-plugin-vue`, and `vue-eslint-parser`; regenerate `package-lock.json` with npm.
- `tsconfig.json`: explicitly use strict React JSX via `jsx: react-jsx` and `jsxImportSource: react`, retaining Astro strict settings and the `@/*` alias.
- `eslint.config.js`: remove Vue imports/config/rules; add React recommended, JSX runtime, and hooks flat configs for TSX, with React version detection. Retain TypeScript, Astro, Prettier, project rules, and generated-directory ignores.
- `package.json`: remove `.vue` from lint extensions. Existing Prettier handles TSX; no additional formatting plugin is necessary.

## Alternatives rejected

- Keeping Astro components for static UI would minimize changes but directly violates the requirement that every component become React TSX and leaves two component conventions.
- Hydrating every React component would simplify composition but adds unnecessary client JavaScript and violates static-island constraints.
- Keeping Vue only for blur/prism creates a dual runtime, compatibility shims, and duplicate lint/tooling paths.
- Replacing OGL with CSS or another shader changes interaction and rendering behavior.
- Using a generic icon set such as Lucide loses the exact brand glyph mappings. `react-icons` exposes the corresponding Font Awesome and Simple Icons glyphs.
- Using handwritten Web Animations for blur text avoids a dependency but violates the requirement for a React-compatible animation package and increases lifecycle code.
- Introducing a global state library has no demonstrated use case.

## Verification

1. Run `npm run build` for integrated Astro check plus static production generation.
2. Run `npx astro check`, `npm run lint:check`, and `npm run format:check` independently.
3. Search source/configuration for `.vue`, Vue APIs/packages, Vue parser/rules, and obsolete component extensions; require zero migration references.
4. Run `npm run dev` on port 8080. Inspect `/` at desktop and mobile widths; verify navigation targets, content, icons, layout, footer, and responsive behavior.
5. Temporarily mount `HeroSection` on a verification-only Astro route with React hydration. Inspect blur grouping/timing, readable initial fallback, completion, prism canvas/resize/pointer response, and icon accessibility.
6. Emulate `prefers-reduced-motion: reduce`; require static blur text and no prism canvas/RAF surface.
7. Remove the temporary verification route, rerun the production build if it affected generated output, then create `retro.md`.
