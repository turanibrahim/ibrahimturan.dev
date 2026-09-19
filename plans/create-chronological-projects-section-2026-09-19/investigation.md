# Investigation

## Root causes

1. `src/constants/projects.ts:3-58` contains three personal projects, not the supplied nineteen professional and freelance projects. The collection therefore cannot satisfy the required chronology, content, labels, metrics, or URLs.
2. `src/types/project.ts:1-14` only models `name`, `description`, `stack`, and links limited to `repository | live`. It cannot represent project type, role or ownership, principal contributions, or store-specific link labels.
3. `src/components/molecules/project-card.tsx:8-44` renders every field permanently expanded. Repeating that structure for nineteen richer entries would create the long, overwhelming page the acceptance criteria prohibit.
4. `src/components/organisms/projects-section.tsx:7-31` describes “Selected projects,” uses an unordered list, and presents generic browser-product copy. It does not communicate chronological sequence or the breadth of mobile, ERP, commerce, CMS, AI, and enterprise work.
5. The prompt’s Vue constraint conflicts with the active application. `astro.config.ts:2,9-11` registers React, `tsconfig.json:5-6` configures React JSX, and project components are `.tsx`. Adding Vue for a static section would create a second renderer and contradict the completed migration. The implementation must use the active Astro/React architecture while preserving every behavioral and design constraint.

## Existing logic links

- `src/pages/index.astro:25-28` already includes a `#projects` navigation link.
- `src/pages/index.astro:92-102` places the projects organism between experience and technologies. No page-level integration change is required.
- `src/components/organisms/projects-section.tsx:8-29` is the section-level integration point and already uses the shared `VSection` and `VHeading` atoms.
- `src/components/molecules/project-card.tsx:29-41` already applies safe new-tab behavior with `target="_blank"`, `rel="noreferrer noopener"`, and project-specific accessible labels.
- `src/assets/styles/tailwind.css:22-52` defines the existing Twilight, Emerald, Cyan, Inter, and JetBrains Mono system.
- `src/assets/styles/tailwind.css:140-154` caps prose width and provides a global visible `:focus-visible` outline.
- `src/assets/styles/tailwind.css:195-216` globally minimizes motion when `prefers-reduced-motion` is active.
- `src/components/atoms/v-section.tsx:22-44` supplies semantic section markup, `aria-labelledby`, responsive container behavior, background tokens, and spacing.
- `src/components/atoms/v-heading.tsx:33-51` supplies typed semantic headings.
- Language-server references confirm `Project` is consumed only by `src/constants/projects.ts` and `src/components/molecules/project-card.tsx`; `projects` is consumed only by `src/components/organisms/projects-section.tsx`. The model can be changed as a clean cutover without hidden call sites.

## Interaction and visual findings

- No disclosure, modal, accordion, `aria-expanded`, or native `<details>` pattern exists under `src/`.
- The incumbent project surface uses flat editorial rows with hairline separators, responsive stacking, concise mono technology tags, and no shadows. This matches `DESIGN.md` and should be extended rather than replaced.
- A native `<details>/<summary>` row is the smallest accessible progressive-disclosure mechanism: keyboard-operable without hydration, exposed correctly to assistive technology, printable, and consistent with the static Astro output.
- The supplied sequence is authoritative because no dates exist. An ordered list and compact sequence index can communicate chronology without inventing dates. `DESIGN.md` permits numbering when the content is genuinely sequential.

## Content normalization boundary

- Preserve all nineteen projects and their supplied order.
- Normalize product names to the requested forms, including Reybex, Okumak Güzeldir, Icerik.com, JAMS ADR, JAMS Pathways, AffinityFCU, NMQ, and MobileAction SearchAds.
- Use `Freelance` only for the five entries explicitly marked freelance: Okumak Güzeldir, FasterApply.ai, Icerik.com Website, Icerik.com App, and Zeo.org Website.
- Keep the three supplied measurable outcomes exact in meaning: more than 100,000 contest users, more than 20 CMS components, and MobileAction’s reduction from days to minutes plus complete vulnerability resolution/security compliance.
- Add only the seven supplied links: two Reybex Ready store links plus Hub21, JAMS ADR, JAMS Pathways, Affinity Federal Credit Union, and NMQ.
- Technologies and responsibilities must come only from the supplied text. Missing stacks remain concise rather than being guessed.

## Follow-up investigation

- `src/constants/projects.ts` already centralizes every requested content update. Okumak Güzeldir, Icerik.com App, JAMS ADR Website, and MobileAction SearchAds need in-place edits; the translation tool needs one new entry.
- The translation tool has enough facts for a generic `Crownpeak AI Translation Tool` title, `Company` engagement, maintenance/deployment ownership, and the supplied stack. Its chronological insertion point is not supplied and cannot be inferred from the repository.
- `src/data/technologies.json` originally contained fifteen technologies. React, TypeScript, PostgreSQL, Redis, and Vite already covered part of the new stack; Astro, Alpine.js, Drizzle ORM, and Hono.js were absent. Material UI Admin is project-specific and remains outside the main technology inventory.
- `src/types/technology.d.ts:3-9` requires both years and proficiency level for every technology. The follow-up supplies project usage but no duration. New entries therefore need optional years and a factual project-experience label rather than invented durations.
- `src/components/organisms/technologies-section.tsx:70-90` renders the JSON inventory as responsive category grids. Entries may omit icons because the component already conditionally renders them.
