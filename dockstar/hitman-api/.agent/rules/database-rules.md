# Database Rules

## Core Models Context
- **Collection:** Root project container. Determines theme, custom domain, and public access.
- **Page:** Fundamental content unit.
  - Draft State: Loaded in editor. Live State: Served via `PublishedVersion` or `publishedPage`.
- **Endpoint:** Data extension for API pages (`type: 4`). Used to render parameters/headers/code.
- **PublishedVersion:** Immutable snapshot of Page history created on "Publish".
- **URLMapping:** 301 Redirects created when a page is Renamed/Moved (`pageController`).
- **Webhook:** User-defined callbacks. Triggers HTTP POST on system events (e.g., `PUBLISH_PAGE`).
- **CronScheduler:** User-defined scheduled tasks.
- **Environment:** Variable store (secrets/config) injected into API console.
- **APIToken:** Programmatic access keys.

**CRITICAL: Schema Reference**
Only refer to `.agent/schema/db-schema.json` to understand the exact fields, data types, and associations when you are writing **raw SQL queries** or **creating/modifying database schemas** (migrations/models). For standard ORM queries, there is no need to read it.