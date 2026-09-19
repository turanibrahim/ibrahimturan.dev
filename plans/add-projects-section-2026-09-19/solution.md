# Solution

## Architecture

Extend the current Astro page with static React components. Do not restore Vue: the site completed a React-only migration, and a static projects section needs no hydration or second renderer.

Use three layers:

1. `src/types/project.ts` defines `Project`, `ProjectLink`, and the supported link kinds.
2. `src/constants/projects.ts` exports a typed, readonly project collection containing all names, descriptions, stacks, and links.
3. `src/components/molecules/project-card.tsx` renders one semantic project article; `src/components/organisms/projects-section.tsx` supplies the titled section and maps the shared data.

This separates content, item presentation, and page composition without introducing state or runtime JavaScript.

## Exact changes

### Types and content

- Add `ProjectLinkKind` as `'repository' | 'live'`.
- Add `ProjectLink` with `kind`, `label`, and `url`.
- Add `Project` with `name`, `description`, readonly `stack`, and readonly `links`.
- Re-export project types from `src/types/index.ts`.
- Add a readonly `projects` constant with Underline AI, Wheel of Names, and ibrahimturan.dev. Use only repository metadata and README-backed claims.
- Give every project at least one repository link and every project with a published deployment a live-demo link.

### Project card molecule

- Render each item as `<article>` with a semantic heading, description, technology `<ul>`, and link navigation labelled for that project.
- Render stack entries as quiet mono tags using existing base-200/base-300/secondary tokens.
- Use descriptive visible link text and an `aria-label` that includes the project name and new-tab behavior.
- Open external project destinations with `target="_blank"` and `rel="noreferrer"`.
- Use literal Tailwind classes only. The global focus-visible rule supplies a two-pixel Emerald outline; hover shifts border and text without shadows.
- Keep the item flat and row-based. A top hairline and tonal hover state distinguish items without creating the banned identical-card grid.

### Projects organism

- Use `VSection` with `id="projects"`, `aria-labelledby="projects-heading"`, `base-100`, and `xl` spacing.
- Follow the established `280px + flexible content` desktop split used by experience and technologies.
- Place a clear `Selected projects` heading and a short purpose statement in the aside; do not add an eyebrow label.
- Render project cards in one editorial list. Cards stack internally on mobile and use a two-column content/action split from tablet widths upward.

### Page integration

- Import and render `ProjectsSection` in `src/pages/index.astro` between experience and technologies. This sequence moves from professional history to selected proof to the complete stack.
- Add a `projects` navigation link targeting `#projects`; keep existing work, about, and contact targets unchanged.
- Do not add client directives, custom CSS, dependencies, images, tests, or state.

## Alternatives rejected

- **Vue organism:** rejected because Astro is configured only for React and the completed migration deliberately removed Vue. Adding Vue would create a dual runtime and tooling path for static markup.
- **Inline Astro markup:** rejected because it duplicates every project item and fails the reusable-data/component boundary.
- **Generic responsive card grid:** rejected because `DESIGN.md` explicitly bans identical project grids and the existing site uses hierarchy, rails, and tonal rows instead.
- **Fetching GitHub at runtime:** rejected because project selection and copy are curated, static, deterministic, and must not depend on API availability or rate limits.
- **Images or generated thumbnails:** rejected because no verified project imagery is needed to satisfy the section; typography and structured project facts fit the existing Instrument Panel system.

## Verification

1. Format changed source and planning files.
2. Run `npm run lint:check`.
3. Run `npm run build` for Astro TypeScript checking and production generation.
4. Run the Impeccable detector once on the changed UI targets.
5. Start the site, inspect `/` at desktop and 390px mobile widths, and verify section hierarchy, all project content, stack tags, focus visibility, link labels, target URLs, and absence of horizontal overflow.
6. Capture desktop and mobile screenshots in `.impeccable/review/`, inspect both files, and complete the finish review.
