# Investigation

## Current Architecture

- `package.json:7-13` runs Astro development, type checking, static builds, preview, linting, and formatting. No CMS command or dependency exists.
- `astro.config.ts:6-9` already fixes the public site to `output: 'static'`; production can remain serverless.
- `src/pages/index.astro:7-12` imports profile JSON directly and constructs page data at build time.
- `src/pages/index.astro:32-102` renders profile content and mounts experience, project, and technology sections.
- `src/components/molecules/social-links.tsx:3-15` imports profile JSON directly.
- `src/components/organisms/experience-section.tsx:6-13` imports and derives values from experience JSON directly.
- `src/components/organisms/projects-section.tsx:5-27` imports the TypeScript project constant directly.
- `src/components/organisms/technologies-section.tsx:5-24` imports and groups technology JSON directly.
- `src/components/organisms/hero-section.tsx:8-11` and `src/components/organisms/about-section.tsx:4-6` also import profile JSON, although the current page does not mount them.
- `src/layouts/default.layout.astro:2` mounts `FooterSection`; `src/components/organisms/footer-section.tsx:2-13` mounts `SocialLinks`, so profile migration must include the footer path.
- `src/data/userInfo.json:1-25`, `src/data/experiences.json:1-66`, `src/data/technologies.json:1-200`, and `src/constants/projects.ts:1-302` are the current authoring sources.
- `src/types/user.d.ts:1-24`, `src/types/experience.d.ts:1-12`, `src/types/technology.d.ts:1-16`, and `src/types/project.ts:1-16` define the consumer contracts.
- `.gitignore:1-29` does not exclude a Payload database, Payload uploads, or Next build output.
- `.env.example:1-3` does not describe Payload configuration.
- `README.md:7-33` documents only the Astro workflow and current source-owned data layout.

## Logic Links

1. Source JSON and `projects.ts` feed imports in the page and React components.
2. Astro evaluates those imports while building because `astro.config.ts` uses static output.
3. The resulting `dist/` contains rendered HTML and client assets without a runtime data API.
4. Payload must therefore replace only the authoring source, not the public runtime.
5. A checked-in generated content snapshot can preserve ordinary Astro builds while a separate export command refreshes that snapshot from local Payload.
6. A separate `cms/` Next application can host Payload’s required Admin Panel locally without changing Astro routing or production output.

## Architectural Gaps

- No editable content schema or admin interface exists.
- Content ownership is fragmented across three JSON files and one TypeScript constant.
- Components couple directly to those storage files instead of one typed content boundary.
- No published/draft boundary prevents unfinished content from entering a build.
- No exporter strips Payload metadata, resolves media, or creates deterministic static data.
- No local database, seed path, media storage path, or ignore policy exists.
- No workflow verifies that static output works after Payload is stopped.

## Payload Constraints

- Payload 3.90.1 requires Node `^18.20.2 || >=20.9.0` and its Admin Panel uses the Next.js App Router.
- `@payloadcms/next` 3.90.1 supports Next `>=16.3.3 <17.0.0`; use the supported 16.3.3 baseline.
- Payload’s SQLite adapter supports a local `file:` database and automatic schema push in development.
- Payload Local API can run in standalone scripts through `payload run`, so export and seed do not need the HTTP API.
- Draft reads do not automatically exclude draft documents; the exporter must query `_status = published` explicitly.
- Upload collections store files locally; the exporter must copy referenced files into `public/cms/` and emit public paths.

## Root Cause

The site has static rendering but no authoring boundary. Data files are simultaneously the editable source and the build artifact. Introducing a deployed CMS would violate the local-only requirement; querying a local API during deployment would make builds depend on an unavailable service. The correct boundary is local Payload database → explicit export → versioned static snapshot → Astro static build.
