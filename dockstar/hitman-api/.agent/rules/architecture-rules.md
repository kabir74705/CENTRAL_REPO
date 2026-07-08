# Architecture Rules

- **Caching:** 
  - Cloudflare: Responses use `Cache-Tag` headers (e.g., `collectionId`, `pageId`). On update, call Cloudflare API via `services/cloudflare.js` to purge tags.
  - Redis: Used for internal app cache (Sidebar structure, static assets).
- **Page Hierarchy (CRITICAL):**
  - Exact hierarchy: `Collection` -> `Invisible Root` -> `Parent` -> `Child`
  - Page Types (Enum):
    - `0`: **Invisible Root Parent** (`parentId: null`). Holds visible top-level pages.
    - `1`: **Parent Page** (Visible folder/category).
    - `3`: **Subpage** (Standard content).
    - `4`: **Endpoint** (API documentation).
    - `5`: **Example Endpoint** (Request/response example).
- **External Services:** RTC (fetches HTML on publish), Hippocampus (RAG search), gtwy (AI middleware).