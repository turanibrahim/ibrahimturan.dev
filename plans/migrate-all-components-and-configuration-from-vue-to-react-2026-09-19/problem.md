# Problem

## User prompt

Migrate every component under `src/components/` from Astro/Vue component files to typed React components while retaining Astro for pages and layouts. Remove all Vue-specific runtime, tooling, configuration, type declarations, and dependencies.

Preserve the existing atomic hierarchy, public props, rendered semantics, Tailwind styling, responsive behavior, accessibility, animations, static deployment model, PWA configuration, site metadata, assets, and port configuration. Convert atom, molecule, and organism components to kebab-case `.tsx` files. Keep shared props in `src/types/` and use alias imports.

Reimplement blur text with React hooks and a React animation package, preserving timing, direction, grouping, fallback content, and reduced-motion behavior. Reimplement the OGL prism background with React hooks and refs, including prop updates, resize, pointer interaction, lifecycle, and cleanup. Hydrate only interactive islands.

Replace `oh-vue-icons` with a React icon package while preserving mappings and accessible output. Replace `@astrojs/vue` with `@astrojs/react`. Add required React tooling and remove Vue-only dependencies, ESLint rules, parser configuration, declarations, and obsolete files. Do not add state management or unit tests.

Verify production build, Astro type checking, lint, formatting, and the running portfolio visually across navigation, responsive layouts, animation, prism interaction, icons, and reduced motion.

## Issue explanation

The component layer is split across Astro and Vue, while the target architecture requires React as the sole component implementation and island framework. The migration must be a clean cutover: all component consumers, shared types, hydration directives, runtime dependencies, and developer tooling must agree on React TSX without increasing client-side JavaScript for static UI. Interactive behavior is load-bearing because blur text and the OGL prism have animation, accessibility, update, and cleanup contracts that must remain unchanged.

## Questions and answers

No questions. The requested behavior, migration boundary, constraints, and validation requirements are complete; repository conventions and existing implementation provide the remaining details.
