# Solution

## Decision

Add Payload as an isolated local Next application in `cms/`. Use SQLite for authoring, Payload Local API scripts for seed/export, a committed generated JSON snapshot for Astro, and copied media under `public/cms/`. Production continues to run the existing Astro static build and never imports or starts Payload.

## Architecture

```text
cms/.env + cms/payload.db + cms/media/
                  │
                  │ Payload Admin and Local API
                  ▼
       cms/scripts/export-content.ts
                  │
          ┌───────┴────────┐
          ▼                ▼
src/data/cms-content.json  public/cms/
          │                │
          └───────┬────────┘
                  ▼
          Astro static build
                  ▼
                dist/
```

## Planned Changes

### Local CMS

- Create `cms/package.json` as a separate package using Payload 3.90.1, `@payloadcms/db-sqlite` 3.90.1, `@payloadcms/next` 3.90.1, `@payloadcms/ui` 3.90.1, Next 16.3.3, React 19.2.6, React DOM 19.2.6, and GraphQL.
- Create `cms/tsconfig.json`, `cms/next-env.d.ts`, and `cms/next.config.ts` from Payload’s supported Next App Router structure.
- Create the required admin layout, catch-all admin page, not-found page, import map, and REST route under `cms/app/(payload)/`.
- Create `cms/payload.config.ts` with:
  - authenticated `users` collection;
  - local `media` upload collection stored in `cms/media/`;
  - `profile` global;
  - `experiences`, `projects`, and `technologies` collections;
  - drafts enabled for all public content;
  - SQLite at `DATABASE_URL`;
  - generated Payload types at `cms/payload-types.ts`;
  - local server URL and telemetry disabled.
- Keep fields aligned with current consumer types. Add numeric `order` fields to collections so export order is explicit and stable.
- Store repeatable scalar lists as Payload arrays and transform their row objects back into string arrays during export.

### Static Content Boundary

- Create `src/types/content.ts` with the full `PortfolioContent` contract.
- Create `src/data/content.ts` as the only runtime import boundary for generated CMS content.
- Create `src/data/cms-content.json` from all existing profile, experience, project, and technology values.
- Migrate every direct content consumer to `@/data/content`.
- Delete obsolete `src/data/userInfo.json`, `src/data/experiences.json`, `src/data/technologies.json`, and `src/constants/projects.ts` after every caller is migrated.

### Seed and Export

- Create `cms/scripts/seed.ts` to bootstrap an empty local CMS from `src/data/cms-content.json`.
- Refuse to seed when any managed collection already contains documents, preventing accidental overwrite of edited content.
- Upload the profile image from its public path and publish every seeded record.
- Create `cms/scripts/export-content.ts` to:
  - initialize Payload through the Local API;
  - query only `_status = published` documents;
  - require the profile global to be published;
  - sort collections by `order`;
  - strip Payload IDs, timestamps, status, order metadata, and array row IDs;
  - resolve the profile media relationship;
  - replace `public/cms/` atomically with referenced local media;
  - write stable, formatted JSON to `src/data/cms-content.json` atomically.
- Fail export on missing profile media, missing published profile, unresolved relationships, or unreadable media instead of emitting partial output.

### Commands and Local State

- Add root commands:
  - `cms:install` installs the isolated CMS package;
  - `cms:dev` starts the local admin at port 3000;
  - `cms:seed` initializes local content;
  - `cms:export` refreshes the static snapshot and media;
  - `generate` exports published content and runs the Astro static build.
- Keep `build` independent from Payload so a clean deployment can build the committed snapshot using root dependencies only.
- Add `cms/.env.example` for `PAYLOAD_SECRET` and `DATABASE_URL`.
- Ignore `cms/.env*` except the example, `cms/payload.db*`, `cms/media/`, `cms/.next/`, and transient export files.
- Commit `public/cms/` and `src/data/cms-content.json` because they are production inputs, not local CMS state.

### Documentation

- Update `README.md` with install, environment setup, first-user creation, seed, edit, publish, export, generate, and static deployment steps.
- State that only `dist/` is deployed and that Payload, SQLite, and the admin server remain local.

## Alternatives Rejected

- Deploying Payload beside Astro: violates the local-only requirement and adds a production database/runtime.
- Calling Payload REST during Astro deployment: makes deployment depend on a developer machine and local credentials.
- Reading SQLite directly from Astro: couples the public build to Payload internals and still requires local state in deployment.
- Keeping separate handwritten JSON fallbacks: creates two editable sources and allows content drift.
- Converting the public site to Next.js: unnecessary rewrite; Astro already provides the required static output.
- Adding Payload dependencies to the root package: increases deployment install weight and weakens the local-only boundary.

## Verification

1. Install the isolated CMS package and generate Payload types/import map.
2. Use a temporary SQLite database to seed and export content.
3. Start the actual Payload admin and verify the admin route renders.
4. Stop Payload.
5. Run the root Astro static build from the exported snapshot.
6. Serve `dist/`, load the home page, and verify profile, experience, projects, technologies, and copied media without the CMS process.
7. Run focused type, lint, and formatting checks for changed files.
