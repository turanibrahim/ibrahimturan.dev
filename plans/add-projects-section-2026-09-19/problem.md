# Add Projects Section

## User Prompt

Add a responsive projects section that presents selected work clearly and consistently with the website’s existing visual design.

The section must:

- Have a clear title on the appropriate page.
- Show each project’s name, description, technology stack, and available repository or live-demo links.
- Source project content from reusable data rather than duplicated markup.
- Use accessible card and link semantics, visible focus states, and descriptive labels.
- Adapt across mobile, tablet, and desktop.
- Match existing typography, spacing, colors, and interactions.
- Build without TypeScript or ESLint errors.

Implementation constraints: Vue 3 Composition API with `<script setup>`, Tailwind CSS 4, atomic components, shared types in `src/types/`, shared project data in `src/constants/`, kebab-case filenames, alias imports, arrow functions, object parameters for functions with multiple parameters, script/template/style SFC order, no unit tests, and no code comments.

## Issue

The portfolio currently lacks a dedicated, reusable presentation for featured work. Visitors need one scannable section that explains project purpose and stack and exposes only the links available for each project. The implementation must extend the incumbent visual language rather than introduce a separate card system.

## Q&A

No questions required. The repository defines the target page, visual conventions, content patterns, and verification commands.
