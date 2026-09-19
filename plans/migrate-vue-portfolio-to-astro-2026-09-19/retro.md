# Retrospective

## Execution

Replaced the Vue SPA boundary with Astro static pages and one document layout. Converted presentational components to Astro, retained blur text and prism effects as explicit Vue islands, removed Vue Router and Pinia, moved icons to static SVG output, and restored PWA generation and automatic service-worker updates through Astro.

## Complexity

The main complexity was separating static Vue components from browser-dependent effects while preserving styles and reusable props. PWA registration and Astro-aware linting required explicit integration work. Existing Vue Test Utils suites were removed because they asserted implementation details and stale mocks rather than the migrated consumer behavior.

## Future Improvements

- Replace legacy `oh-vue-icons` definition imports with a framework-neutral local SVG asset set.
- Mount `hero-section.astro` only if the WebGL and blur effects return to the shipped homepage; otherwise remove those dormant components and Vue entirely.
- Add end-to-end accessibility checks only when they defend stable page behavior.
