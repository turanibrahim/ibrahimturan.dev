# Solution

## Decision

Preserve complete CMS image metadata through the static content pipeline and make the shared layout consume that structured image. Keep metadata centralized in `DefaultLayout`; blog pages only provide post-specific values.

## Data contract

In `src/types/content.ts`, add a reusable `ContentImage` interface:

- `url`: local public URL
- `alt`: CMS-authored accessible description
- `mimeType`: browser MIME type
- `width`: intrinsic pixel width
- `height`: intrinsic pixel height

Replace `Post.imageUrl?: string` with required `Post.image: ContentImage`. A post cover is already required by the Payload schema and build validator, so an optional frontend field misrepresents the invariant.

## Export pipeline

In `cms/scripts/export-content.ts`:

1. Require the related cover media record to include filename, alt, MIME type, width, and height.
2. Keep the existing safe-filename validation.
3. Export the structured `image` object instead of `imageUrl`.
4. Update referenced-media collection to read `post.image.url`.

Regenerate `src/data/cms-content.json` through `npm run cms:export`; do not hand-edit generated post records.
Update `cms/scripts/seed.ts` to read the cover URL and alt text from the structured image when rebuilding an empty local CMS database.

In `scripts/validate-content.mjs`, validate every structured image field, require positive integer dimensions, and continue verifying that the referenced public file exists.

## Rendering

In `src/layouts/default.layout.astro`:

- Accept `ContentImage` as the `image` prop.
- Use a complete structured default for non-blog pages.
- Continue converting the local URL to an absolute HTTPS URL with `Astro.site`.
- Emit `og:image`, `og:image:secure_url`, `og:image:type`, `og:image:width`, `og:image:height`, and `og:image:alt`.
- Emit `twitter:image` and `twitter:image:alt`.

In `src/pages/blog/[slug].astro`, pass `post.image` to the layout and use its URL, alt text, width, and height for the visible cover.

Update `src/pages/blog/index.astro` and `src/components/molecules/post-card.tsx` to consume the structured image without changing page behavior.

## Alternatives rejected

- Hard-code `1200x630`: existing covers have different intrinsic dimensions, so this would publish false metadata.
- Infer MIME type from the filename: the CMS already provides the authoritative value; extension inference duplicates weaker logic.
- Add metadata directly in the blog page: this duplicates the shared head implementation and risks divergent tags.
- Add JSON-LD: it supports search semantics, not the missing social image preview contract.

## Verification

1. Run `npm run cms:export` and confirm eight posts and media export successfully.
2. Run `npm run lint:check` and `npm run format:check`.
3. Run `npm run build` to exercise content validation, Astro type checking, and static generation.
4. Inspect a generated article document and assert the canonical URL, complete Open Graph image fields, Twitter image fields, and post-specific values.
5. Serve the production output and request one article cover to confirm the metadata URL resolves successfully.
