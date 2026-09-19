# Solution

## Decision

Replace the existing three-project showcase with a nineteen-entry chronological project history. Keep the active Astro/React runtime and existing atomic structure. Use native `<details>/<summary>` editorial rows inside an ordered list so the static page stays concise, keyboard-operable, and hydration-free.

## Data model

Update `src/types/project.ts` as a clean cutover:

- `ProjectEngagement`: `Company | Internal | Freelance`.
- `ProjectLink`: `label` and `url`; remove the repository/live kind because supplied destinations include app stores and client sites.
- `Project`: `name`, `engagement`, `ownership`, `summary`, `contributions`, `stack`, and `links`.

No optional prose fields. Empty `stack` or `links` arrays remain valid where the supplied content has none. All data stays typed and centralized in `src/constants/projects.ts`.

## Content architecture

Replace `src/constants/projects.ts` with all nineteen entries in this exact order:

1. Reybex Ready
2. Reybex
3. Reybex E-commerce
4. Vivense UK Website
5. Vivense Dragon ERP
6. Hub21 Website
7. Hub21 Parent and Student Projects
8. Okumak Güzeldir
9. FasterApply.ai
10. Icerik.com Website
11. Icerik.com App
12. Zeo.org Website
13. JAMS ADR Website
14. JAMS Pathways Website
15. AffinityFCU Website
16. Philips AI Projects
17. Broadridge Website
18. NMQ Website
19. MobileAction SearchAds

Editorial rules:

- `summary`: one factual sentence describing the product or business purpose.
- `ownership`: compact responsibility statement, not an invented job title.
- `contributions`: two or three concise action/outcome statements derived only from supplied facts.
- `stack`: deduplicated product names with consistent capitalization; no inferred technologies.
- `engagement`: retain `Company | Internal | Freelance` in the content model, but display a badge only for `Freelance`. Apply it only to Okumak Güzeldir, FasterApply.ai, Icerik.com Website, Icerik.com App, and Zeo.org Website. Use `Internal` for Vivense Dragon ERP and Philips AI Projects because the source explicitly states internal use. Use `Company` for the remaining supplied employment/client work.
- Preserve “more than 100,000 users,” “more than 20 CMS components,” “from days to minutes,” and complete audit/Dependabot vulnerability resolution without strengthening or weakening those claims.
- Add exactly the seven supplied external links with destination-specific labels.

## Component changes

### `src/components/molecules/project-card.tsx`

Keep the existing filename and component boundary, but render one progressive-disclosure row:

- Accept `project` and one-based `index` props.
- Use `<article>` containing native `<details className="group">` and `<summary>`.
- Show the two-digit sequence index, project title, ownership, and concise summary while collapsed. Show a badge only when the engagement is `Freelance`.
- Show a clear “View details”/“Hide details” state label and a rotating chevron from the existing `react-icons` dependency using `group-open` variants; no JavaScript state.
- Expanded content contains a “Principal contributions” heading and list, a labelled technology list, and external links when present.
- Keep safe links with `target="_blank"`, `rel="noreferrer noopener"`, destination-specific visible text, and an accessible “opens in a new tab” label.
- Use flat hairline-separated rows, existing Twilight surfaces, Emerald interactive accents, Cyan mono metadata, visible focus inherited from global CSS, and full static Tailwind class names.
- Responsive layout: stacked summary/content at mobile widths; sequence, copy, and metadata columns at tablet/desktop widths.

### `src/components/organisms/projects-section.tsx`

- Retain `VSection`, `VHeading`, current section ID, and current position on the page.
- Change the heading to “Project history.”
- Replace generic copy with a concise explanation of the chronological company, internal, and freelance record and the disclosure behavior.
- Render projects as `<ol>` and pass `index + 1` to each row.
- Keep the existing `280px + content` desktop section composition and responsive stacked layout.

### `src/assets/styles/tailwind.css`

- Extend the existing print block so closed disclosure bodies print visibly. This preserves the documented print-friendly portfolio behavior without affecting screen interaction.

## Framework deviation

Do not add Vue. The repository is now Astro with React components; Vue would add an unused second renderer and violate the current architecture. The resulting implementation still follows Composition-style small components, typed shared data, alias imports, Tailwind 4, kebab-case filenames, and arrow functions.

## Accessibility and behavior

- Native summary controls provide keyboard activation and announced expanded/collapsed state.
- `h2` labels the section; each project title remains `h3`; expanded detail groups use `h4`.
- The ordered list exposes sequence semantically.
- Focus remains visible through `src/assets/styles/tailwind.css:150-154`.
- Links remain safe, descriptive, and keyboard-accessible.
- No content depends on animation, hover, JavaScript hydration, or viewport width.

## Follow-up update

- Update Okumak Güzeldir to describe two consecutive contest years and smaller maintenance updates in the following year while preserving the more-than-100,000-user outcome.
- Add the Vue 2 to Vue 3 panel migration to Icerik.com App.
- Expand JAMS ADR to include Alpine.js, Astro, React, and its custom Vite pipeline.
- Remove ESLint 9 only from the MobileAction SearchAds stack list; retain the factual architecture-migration contribution.
- Add a `Crownpeak AI Translation Tool` company project after AffinityFCU Website without claiming original development. Describe maintenance and deployment ownership after the main developer’s departure, and use only React, Material UI Admin, Drizzle ORM, Redis, PostgreSQL, Hono.js, and TypeScript.
- Expand `src/data/technologies.json` with the user-confirmed core set: Astro, Alpine.js, Lit, Redux, Pinia, FastAPI, Feathers.js, MongoDB, Drizzle ORM, and Hono.js. Omit Material UI Admin, minor UI libraries, CMS integrations, and payment integrations.
- Make `Technology.years` optional so newly supplied project experience does not receive invented durations. Render technology names without level or duration captions; retain the existing green treatment for `primary` entries.
- Give every main technology entry a logo through the existing `VIcon` registry. Use matching Simple Icons where available and the Font Awesome feather glyph for Feathers.js.

## Verification

1. Run Prettier on the changed source and plan files through the existing project command.
2. Run `npm run lint:check`.
3. Run `npm run build` for Astro type checking and static production output.
4. Run the Impeccable mechanical detector once against the changed UI targets.
5. Use the running application at 1440px desktop and 390px mobile widths.
6. Confirm all twenty titles appear in order, collapsed rows remain scannable, technology badges have no descriptions, external links expose safe attributes and accessible labels, and no horizontal overflow occurs.
7. Capture and inspect `.impeccable/review/desktop.png` and `.impeccable/review/mobile.png`, then run the required finish review.

## Alternatives rejected

- **Always-expanded rows:** simplest markup, but nineteen entries with contributions and stacks would overwhelm the page.
- **Modal:** traps detail away from chronology, needs client state and focus management, and adds complexity to a static surface.
- **Custom accordion state:** duplicates native disclosure behavior and requires hydration without providing a user benefit.
- **Card grid:** conflicts with the established editorial timeline language and `DESIGN.md`’s explicit ban on identical project grids.
- **Invented dates:** would make chronology visually conventional but violate the factual-content constraint.
