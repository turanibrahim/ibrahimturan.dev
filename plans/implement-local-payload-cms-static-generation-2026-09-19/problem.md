# Problem

## User Prompt

Implement Payload CMS for this website. It must run locally only, and the deployed website must be statically generated with the CMS data.

## Issue

The Astro site currently owns portfolio content in source files. Content editing requires code changes, while deploying Payload would add an unnecessary server and database dependency. Add a local Payload authoring environment and make Astro consume published CMS content during its static build so production remains serverless static output.

## Scope

- Run Payload and its admin UI only on the developer machine.
- Persist authored content in a local SQLite database.
- Model the website profile, experience, projects, and social links in Payload.
- Export published content and uploaded media into versioned static source data before an Astro build.
- Keep production free of Payload, database, authentication, and API runtime dependencies.
- Provide commands and documentation for authoring, exporting, building, and previewing the static site.

## Q&A

No blocking questions. Existing repository structure supplies the content model and build constraints. Decisions requiring implementation defaults will use the smallest supported local stack and will be recorded in `solution.md`.
