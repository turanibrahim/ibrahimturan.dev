# Retrospective

## Result

Blog posts now preserve CMS-authored image URL, alt text, MIME type, width, and height through export. The shared layout emits complete Open Graph and Twitter image metadata with absolute URLs. Listing and article images consume the same authoritative fields.

## Execution critique

The change touched the full content boundary because the old URL-only field was the source defect. That breadth was justified; deriving or duplicating metadata in the layout would have been less reliable. Astro requires meta `content` dimensions as strings, caught by the production build and corrected centrally.

## Future improvement

Model the profile image with the same `ContentImage` contract so every social default comes from exported CMS metadata instead of a layout-local fallback.
