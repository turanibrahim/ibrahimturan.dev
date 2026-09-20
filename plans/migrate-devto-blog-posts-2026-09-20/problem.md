# Problem

## User request

Move all published posts from `https://dev.to/_ibrahimturan` into the website and make the result ready for deployment.

## Issue

The website already exposes blog routes backed by statically exported Payload CMS data, but the published DEV articles and their full bodies must be migrated into that deployment-safe content path. The migration must preserve article metadata and Markdown rendering, include every currently published article, keep the existing visual system, and generate working static routes without requiring the DEV API at runtime.

## Acceptance criteria

- Every published DEV article is available from the website blog index.
- Every article has a statically generated detail route with its full body.
- Titles, descriptions, dates, reading times, language, tags, canonical source links, and cover imagery are preserved where available.
- Main navigation exposes the blog.
- Metadata and canonical URLs are correct for locally hosted posts.
- Production build, lint, and formatting checks pass.
- Desktop and mobile blog surfaces are smoke-tested in the built site.
