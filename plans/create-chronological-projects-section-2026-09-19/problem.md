# Create Chronological Projects Section

## User prompt

Create a responsive portfolio projects section that preserves the supplied nineteen-project sequence as the authoritative chronology. Rewrite every project description into concise professional copy covering ownership, principal contributions, business impact, and technologies without inventing facts.

Include Reybex Ready, Reybex, Reybex E-commerce, Vivense UK Website, Vivense Dragon ERP, Hub21 Website, Hub21 Parent and Student Projects, Okumak Güzeldir, FasterApply.ai, Icerik.com Website, Icerik.com App, Zeo.org Website, JAMS ADR Website, JAMS Pathways Website, AffinityFCU Website, Philips AI Projects, Broadridge Website, NMQ Website, and MobileAction SearchAds in that order.

Follow the existing design system and content architecture. Distinguish freelance work consistently. Preserve supplied outcomes: more than 100,000 Okumak Güzeldir contest users, more than 20 Broadridge CMS components, and MobileAction's reduced feature delivery time and maintained security compliance. Use only supplied URLs, safe new-tab behavior, accessible labels, accessible headings, keyboard operation, visible focus states, sufficient contrast, concise stack metadata, and an existing disclosure/modal/detail pattern if available. Support mobile, tablet, and desktop. Use Vue 3 Composition API, `<script setup>`, Tailwind CSS 4, atomic component placement, shared constants/types where needed, alias imports, kebab-case filenames, arrow functions, and full dynamic Tailwind class names. Do not add unit tests or comments. Resolve introduced TypeScript, Vue, and ESLint errors. Verify the running application on representative mobile and desktop viewports.

Supplied URLs:

- Reybex Ready on Google Play: https://play.google.com/store/apps/details?id=com.reybex.ready&hl=tr
- Reybex Ready on the App Store: https://apps.apple.com/tr/app/reybex-ready/id6759290136?l=tr
- Hub21: https://thehub21.com/
- JAMS ADR: https://www.jamsadr.com/
- JAMS Pathways: https://www.jamspathways.com/
- Affinity Federal Credit Union: https://www.affinityfcu.com/
- NMQ: https://nmqdigital.com/

## Issue explanation

The current portfolio does not expose the supplied professional history as a complete, scannable project narrative. The implementation must integrate all nineteen entries without turning the page into a wall of text. Content needs normalized naming and concise factual copy, while metadata and progressive disclosure must preserve scanability and accessibility across viewport sizes.

The repository currently appears Astro-based despite the prompt's Vue-specific constraints. Investigation must establish the active framework and incumbent project patterns before solution planning; implementation will follow the actual application architecture while preserving the requested behavior and repository conventions.

## Questions and answers

No blocking questions. The supplied sequence defines chronology because dates are unavailable. Project facts, metrics, labels, and external links are constrained to the supplied source content.

## Follow-up request

- Record that Okumak Güzeldir ran for two consecutive years and received smaller updates in the following year.
- Add Alpine.js, Astro, React, and the custom Vite pipeline to JAMS ADR.
- Remove ESLint 9 from the MobileAction SearchAds stack metadata.
- Add the Vue 2 to Vue 3 migration across the Icerik.com panel application.
- Add the Crownpeak AI translation tool: React, Material UI Admin, Drizzle ORM, Redis, PostgreSQL, Hono.js, and TypeScript. Ownership began with maintenance and deployment after the main developer left; do not claim original development.
- Expand the technology section with relevant project technologies.
- Remove level and duration descriptions under technology badges; retain the green visual treatment for primary technologies.
- Keep Material UI Admin in the translation project stack only; do not add it to the main technology section.
- Show a logo for every technology in the main stack section.

## Follow-up answers

- Insert `Crownpeak AI Translation Tool` after AffinityFCU Website.
- Expand the technology section with core frameworks and data tools represented across the project history; omit minor UI libraries, CMS integrations, and payment integrations.
