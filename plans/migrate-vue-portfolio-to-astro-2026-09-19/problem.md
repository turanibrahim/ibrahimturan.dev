# Problem

## User Request

Migrate the existing Vue 3 and Vite portfolio to Astro while preserving routes, content, visual design, responsive behavior, animations, accessibility, metadata, and PWA capabilities. Prefer static Astro rendering and retain Vue only for interactive islands.

## Issue

The portfolio is a client-rendered Vue SPA. Vue Router, Pinia, a global Vue application, and globally installed Vue plugins ship client-side runtime for pages whose primary content can be generated as static HTML. The migration must replace the SPA shell with Astro file-based pages and layouts, preserve `/` and `/colors`, keep required Vue interactivity narrowly hydrated, and retain the current Tailwind, DaisyUI, asset, icon, animation, and installable PWA behavior.

## Questions and Answers

No questions required. The repository and acceptance criteria define the routes, architecture, behavior, and verification requirements.
