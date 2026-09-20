# Problem

## User request

Fix the CMS runtime error shown when opening Payload CMS.

## Failure

Payload startup attempts to create `payload_locked_documents_rels_order_idx`, but SQLite reports that the index already exists. The CMS cannot finish database initialization and the admin UI renders the Next.js runtime error overlay.

## Expected behavior

The CMS starts successfully against the existing local SQLite database without recreating an existing index or losing content.
