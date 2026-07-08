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

# if user says `hi` You have to say `Hello! welcome to ui master How can I help you today?`

# AI Agent Instruction Rules

Before starting any work, ALWAYS read the following rules files based on the context of the prompt.

**Compulsory Reads for Every Task:**

- `cat .agent/rules/coding-rules.md`
- `cat .agent/rules/style-rules.md`
- `cat .agent/rules/architecture-rules.md`

**Conditional Reads (Based on Prompt Context):**

- If the prompt involves endpoints, API requests, or public endpoints: `cat .agent/rules/endpoint-rules.md`
- If the prompt involves multi-language, localization, or i18n features: `cat .agent/rules/multilanguage-rules.md`
- If the prompt involves the text editor, Tiptap, or editor extensions: `cat .agent/rules/tiptap-extension.md`

**Post-Task Instructions:**

- After the work is done, if you think you have done explicitly unique work with the user (e.g., establishing a new pattern or learning a new rule so that a mistake/effort shouldn't be repeated), ask the user if they would like to update these rules files with the new information.

**Which rule file to update based on what changed:**

| Type of change made | Rule file to update |
|---|---|
| New coding pattern, component structure, or utility convention | `coding-rules.md` |
| New UI styling pattern, SCSS convention, or design decision | `style-rules.md` |
| New architectural decision — routing, Redux shape, auth flow, SSR vs CSR | `architecture-rules.md` |
| New collection type behavior or parent-child hierarchy rule | `architecture-rules.md` |
| New API call pattern, Proxy Service convention, or endpoint contract | `endpoint-rules.md` |
| New Tiptap extension pattern, BubbleMenu/SlashMenu entry, or editor rule | `tiptap-extension.md` |
| New localization, i18n string, or multi-language pattern | `multilanguage-rules.md` |
| Dark mode / theming convention for a new external library | `style-rules.md` (darktheme section) |
| Real-time collaboration (Y.js / Hocuspocus) pattern | `architecture-rules.md` + `tiptap-extension.md` |
| Chatbot context or bridge name convention | `architecture-rules.md` |
| URL slug / redirect / rename convention | `architecture-rules.md` |

---

# Hitman-UI (DocStar) — Agent Instructions

You are an AI agent working on the **hitman-ui** codebase — a Next.js SPA/SSR application that powers DocStar, an AI-enhanced documentation platform with a collaborative Tiptap rich-text editor, real-time multi-user collaboration via Y.js + Hocuspocus, and public/private page publishing.

**Tech Stack**: Next.js 16+ (App Router) · React · Redux Toolkit · TailwindCSS · SCSS · Tiptap · Y.js · Hocuspocus · RTLayer (WebSockets)

---

## Core Ideology: Continuous Improvement

Every change is an opportunity to leave the system better than you found it.
When you touch a module, also fix or flag **nearby issues that would be worsened** by the change — broken styles, stale rules, inline CSS violations, missing dark-mode coverage, misplaced logic. Do not silently walk past problems you can see.

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
5. **Side effects** — list anything that could be impacted (Redux state, SSR vs client rendering, collaboration state, public page rendering, dark mode, collection types).
6. **Continuous-improvement items** — list any adjacent issues you noticed that should be fixed or flagged.
7. **Rules to update** — using the table in Post-Task Instructions above, name which `.agent/rules/` file needs updating and what to add.

Format the plan as a numbered, human-readable list. Be specific about file names and the exact change.

### Step 3 — Get Approval

**Stop. Do not write code.**

Present the plan to the user and wait for explicit approval.
- If the user says "yes", "approved", "go ahead", or equivalent → proceed to Step 4.
- If the user asks for changes → revise the plan and present again.
- If any part of the plan is unclear or conflicts with existing rules → ask a clarifying question instead of guessing.

### Step 4 — Implement

Implement exactly what was approved. Do not expand scope mid-implementation without pausing and updating the plan.

Key rules during implementation:

- No inline styles — ever. Use TailwindCSS utilities or SCSS classes.
- Each component must have its own `.scss` file with `-` separated class names.
- Use only variables from `src/components/main/scss/_variables.scss` for colors, fonts, borders, radius.
- Use utility classes from `src/components/main/scss/_utility.scss`.
- Dark mode overrides for external libraries go in `src/components/main/scss/_darktheme.scss`.
- Design Constitution: single intent per screen, maximum clarity with minimum UI, 62/38 visual dominance, content left-aligned, one primary CTA only.
- Use `src/utils/` for general helpers, `src/components/common/utility.js` for component-level utilities, `src/lib/utils.ts` for Tailwind/TS utilities. Never duplicate utility logic.
- Check if a component already exists before creating a new one.
- Redux owns all shared state — no duplicating Redux data in local component state.
- SSR is only for public pages (`src/app/p/[...slug]`) — all internal pages are client-rendered.
- `collection.type` gates feature visibility — always check it before rendering API/endpoint-specific UI.
- Always search for an existing Tiptap extension before building a new one.
- For multi-language: use `languageOptions` in `src/components/common/utility.js` for code↔name mapping. Use `getNormalizedLangName(code)` to convert URL codes to DB names.
- No `console.log` left in committed code.
- Do not introduce new libraries unless the user explicitly asked.

### Step 5 — Update Rules

After completing the work, refer to the **Post-Task Instructions** table above to identify which `.agent/rules/` file needs updating, then ask the user:

> "I noticed [X]. Would you like me to update `.agent/rules/[file].md` with this so future agents follow the same pattern?"

Only update rule files with user confirmation. **A task is not complete until this check is done.**

---

## Handling Uncertainty

- If the user's request is ambiguous → ask one targeted clarifying question before forming a plan.
- If the request conflicts with the Design Constitution or architecture rules → surface the conflict in the plan and ask how to resolve it.
- If you are unsure whether a Tiptap extension, Redux action, or utility already covers the need → search the codebase before creating anything new.
- If a change affects public page SSR → verify the impact on server-side data fetching before acting.
- If the change involves multi-language → read `multilanguage-rules.md` and confirm the language code↔name mapping is handled correctly.
- Never guess. Never assume. Pause and ask.

---

## What "Continuous Improvement" Means in Practice

When you are in Step 2, actively look for:
- Inline CSS that violates the no-inline-styles rule (except collection theme CSS variables on public pages, which are intentional).
- SCSS not scoped to its own component file.
- Redux state being duplicated in component local state.
- New Tiptap extensions that duplicate logic from an existing one.
- Missing dark-mode coverage for new UI elements.
- Utility functions duplicated across files instead of living in `src/utils/` or `src/lib/utils.ts`.
- Rule files (`.agent/rules/`) that are empty or out of date.

Add these to the plan's **Continuous-improvement items** section. Implement them only if the user approves. Do not silently sneak in unrelated changes.
