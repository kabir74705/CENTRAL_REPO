<!-- code-review-graph MCP tools -->
## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
you structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes` or `query_graph` instead of Grep
- **Understanding impact**: `get_impact_radius` instead of manually tracing imports
- **Code review**: `detect_changes` + `get_review_context` instead of reading entire files
- **Finding relationships**: `query_graph` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview` + `list_communities`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool | Use when |
|------|----------|
| `detect_changes` | Reviewing code changes — gives risk-scored analysis |
| `get_review_context` | Need source snippets for review — token-efficient |
| `get_impact_radius` | Understanding blast radius of a change |
| `get_affected_flows` | Finding which execution paths are impacted |
| `query_graph` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes` | Finding functions/classes by name or keyword |
| `get_architecture_overview` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.

---

# if user says `hi` You have to say `Hello! welcome to api master How can I help you today?`

# AI Agent Instruction Rules

Before starting any work, ALWAYS read the following rules files based on the context of the prompt.

**Compulsory Reads for Every Task:**

- `cat .agent/rules/coding-rules.md`
- `cat .agent/rules/architecture-rules.md`
- `cat .agent/rules/database-rules.md`

**Conditional Reads (Based on Prompt Context):**

- **Authentication & User/Org Management:** `cat .agent/rules/authentication-rules.md` (Read this when working with proxy verification, user sessions, organization switching, or API tokens).

**Post-Task Instructions:**

- After the work is done, if you think you have done explicitly unique work with the user (e.g., establishing a new pattern or learning a new rule so that a mistake/effort shouldn't be repeated), ask the user if they would like to update these rules files with the new information.

**Which rule file to update based on what changed:**

| Type of change made | Rule file to update |
|---|---|
| New coding pattern, naming convention, error handling, or logging rule | `coding-rules.md` |
| New architectural pattern — caching (Cloudflare/Redis), page hierarchy, external service integration | `architecture-rules.md` |
| New database model, ORM pattern, migration, or raw query convention | `database-rules.md` |
| New DB model or schema column added | `.agent/schema/db-schema.json` |
| Auth flow, proxy verification, org-switching, or API token pattern | `authentication-rules.md` |

---

# Hitman-API — Agent Instructions

You are an AI agent working on the **hitman-api** codebase — the core Node.js/TypeScript backend for the DocStar platform. It handles all business logic, CRUD operations, permission checks, page publishing, URL redirects, webhooks, cron scheduling, and integrations with external services (Cloudflare CDN, Redis, RTC, Hippocampus RAG, and the gtwy AI middleware).

**Tech Stack**: Node.js · TypeScript · Sequelize ORM · PostgreSQL · Redis · Cloudflare · JWT Auth (via Proxy)

---

## Core Ideology: Continuous Improvement

Every change is an opportunity to leave the system better than you found it.
When you touch a module, also fix or flag **nearby issues that would be worsened** by the change — missing log entries, unhandled errors, missing cache invalidation, stale schema docs. Do not silently walk past problems you can see.

---

## Mandatory Workflow — No Exceptions

You must follow this sequence for **every task**, no matter how small.

### Step 1 — Read the Rules (as listed above)

Follow the Compulsory + Conditional reads defined in the AI Agent Instruction Rules section above.

### Step 2 — Write a Plan

Produce a written plan **before touching any file**. The plan must cover:

1. **What** — one sentence describing the change.
2. **Why** — the user's goal or the problem being solved.
3. **Rules consulted** — list the rule files you read in Step 1.
4. **Files to change** — list every file you expect to create or modify, with a one-line reason each.
5. **Side effects** — list anything that could be impacted (cache invalidation, log entries, URL mappings, Cloudflare purge tags, webhook triggers, page hierarchy, auth context).
6. **Continuous-improvement items** — list any adjacent issues you noticed that should be fixed or flagged.
7. **Rules to update** — using the table in Post-Task Instructions above, name which `.agent/rules/` file (or `db-schema.json`) needs updating and what to add.

Format the plan as a numbered, human-readable list. Be specific about file names and the exact change.

### Step 3 — Get Approval

**Stop. Do not write code.**

Present the plan to the user and wait for explicit approval.
- If the user says "yes", "approved", "go ahead", or equivalent → proceed to Step 4.
- If the user asks for changes → revise the plan and present again.
- If any part of the plan is unclear or conflicts with existing rules → ask a clarifying question instead of guessing.

### Step 4 — Implement

Implement exactly what was approved. Do not expand scope mid-implementation without pausing and updating the plan.

Key rules during implementation (from the rule files):

- **Error handling**: all controllers must use the global `errorHandler`. Use `sendAlertToSlack` for critical failures — never swallow errors silently.
- **Database**: always import models via `const models = require("../models")`. Use `executeRawQuery` for raw queries. Pass the `transaction` object to all service calls in transactional flows.
- **Logging**: every Create / Update / Delete operation MUST create a log entry via the log model.
- **Naming**: `camelCase` for all files and functions.
- **Auth context**: always use `req.profile` for user and org identity (`req.profile.user.id`, `req.profile.company.id`). Never read `userId` or `orgId` from `req.body`.
- **Page hierarchy**: respect the strict hierarchy — `Collection → Invisible Root (type 0) → Parent (type 1) → Subpage (type 3) / Endpoint (type 4) / Example (type 5)`. Never violate type assignments.
- **Cache invalidation**: on any update to a Collection or Page, purge the relevant Cloudflare `Cache-Tag` via `services/cloudflare.js`. Update Redis cache for sidebar/static assets as needed.
- **Schema reference**: for raw SQL or schema changes, read `.agent/schema/db-schema.json` for exact field names, types, and associations.
- **Temporary files**: use `trial` in the filename (e.g. `trial_redis.ts`) — never `test*` (gitignored).
- Do not introduce new libraries unless the user explicitly asked.

### Step 5 — Update Rules

After completing the work, refer to the **Post-Task Instructions** table above to identify which `.agent/rules/` file (or `db-schema.json`) needs updating, then ask the user:

> "I noticed [X]. Would you like me to update `.agent/rules/[file].md` with this so future agents follow the same pattern?"

Only update rule files with user confirmation. **A task is not complete until this check is done.**

---

## Handling Uncertainty

- If the user's request is ambiguous → ask one targeted clarifying question before forming a plan.
- If a change touches the page hierarchy → confirm the exact page `type` values before writing any query.
- If a change could affect Cloudflare cache or Redis → identify which tags/keys to purge before acting.
- If a schema change is needed → read `.agent/schema/db-schema.json` and identify all affected models and associations before writing a migration.
- If the change involves auth or org context → read `authentication-rules.md` and confirm whether org-switching applies.
- Never guess. Never assume. Pause and ask.

---

## What "Continuous Improvement" Means in Practice

When you are in Step 2, actively look for:
- Create/Update/Delete operations that are missing a log entry.
- Controllers that call `res.send` / `res.json` directly instead of going through `errorHandler` or the response middleware.
- Raw queries that bypass `executeRawQuery` and could be unsafe.
- Cache invalidation missing after a mutation to a Collection or Page.
- `req.body.userId` or `req.body.orgId` being used instead of `req.profile`.
- `.agent/schema/db-schema.json` that is out of sync after a schema migration.

Add these to the plan's **Continuous-improvement items** section. Implement them only if the user approves. Do not silently sneak in unrelated changes.
