# Investigation

## Root Cause

The active Payload database was initialized and contains one admin user, but its public content tables are empty. `cms/payload.db:profile`, `experiences`, `projects`, and `technologies` each contain zero rows. The static snapshot is populated, so the Astro site renders content that has never been inserted into this actual CMS database.

## Data Flow

1. `cms/scripts/seed.ts:9-16` resolves and reads `src/data/cms-content.json` as the bootstrap source.
2. `cms/scripts/seed.ts:18-29` allows seeding when the managed public collections and profile are empty; admin users do not block it.
3. `cms/scripts/seed.ts:41-107` uploads profile media and creates the published profile, experiences, projects, and technologies in Payload.
4. `cms/scripts/export-content.ts:18-50` reads the published Payload records through the Local API.
5. `cms/scripts/export-content.ts:69-118` maps Payload documents into the `PortfolioContent` boundary.
6. `cms/scripts/export-content.ts:120-160` atomically writes `src/data/cms-content.json` and the referenced file under `public/cms/`.
7. `src/data/content.ts:1-6` types the exported snapshot and exposes profile, experience, project, and technology arrays.
8. `src/pages/index.astro:7-11` consumes the exported profile.
9. `src/components/molecules/social-links.tsx:3-15` consumes the exported social profile fields.
10. `src/components/organisms/experience-section.tsx:6-10,47-48`, `projects-section.tsx:5-6,25-27`, and `technologies-section.tsx:5-23,60-69` consume the exported collections.

## Existing Architecture

Astro is already connected to CMS output through the committed static snapshot. It intentionally does not query Payload at runtime. `package.json:8-14` keeps ordinary static builds independent of the local CMS and provides `cms:seed`, `cms:export`, and `generate` for the authoring pipeline.

## Required Fix

Populate the active empty Payload database with the existing snapshot, then export from that database before building. No component rewrite or runtime API dependency is required; direct CMS fetching would break the established static deployment boundary.
