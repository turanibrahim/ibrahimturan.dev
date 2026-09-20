# Investigation

## Rendering flow

1. `cms/collections/posts.ts:80-87` requires each post to reference a CMS media record as its cover.
2. `cms/scripts/export-content.ts:85-108` resolves that media record but exports only `imageUrl`; it drops the required alt text and available MIME type, width, and height.
3. `src/types/content.ts:6-18` consequently models a post image as only an optional URL.
4. `src/data/content.ts:4-6` exposes the static snapshot to Astro.
5. `src/pages/blog/[slug].astro:19-27` passes each post title, excerpt, image URL, publication date, and tags into the shared layout.
6. `src/layouts/default.layout.astro:26-27` converts canonical and image paths to absolute URLs using the configured `Astro.site` value.
7. `src/layouts/default.layout.astro:39-53` emits core Open Graph and Twitter card tags.

## Findings

- The current source already emits `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image`.
- A production build confirms the post head contains absolute `https://ibrahimturan.dev/...` canonical and image URLs. The referenced cover files are copied into the static output.
- The remaining metadata defect is a lossy image contract: `cms/scripts/export-content.ts:96-108` discards media alt text, MIME type, width, and height even though Payload exposes them. `src/layouts/default.layout.astro:39-53` therefore cannot emit `og:image:alt`, `og:image:type`, `og:image:width`, `og:image:height`, or `twitter:image:alt`.
- `src/pages/blog/[slug].astro:80-89` also renders the cover with an empty `alt`, despite CMS media alt text being required by `cms/collections/media.ts:19-24`.
- The cover files do not share one dimension, so hard-coded image dimensions would be incorrect. The CMS record is the authoritative source.

## Root cause

The CMS-to-frontend export flattens a structured media record into a URL string. That prevents the document head from describing the image completely and makes social preview parsing less robust. The same flattening loses useful accessibility text on the visible article cover.

The user-reported complete absence of images is not reproducible from the current static build because its core image tags are present. If previews remain empty after this metadata fix is deployed, the remaining causes are deployment freshness or a social platform cache rather than generated page markup.
