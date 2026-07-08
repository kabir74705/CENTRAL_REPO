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

# GTWY-UI Frontend — Agent Instructions

You are an AI agent working on the **GTWY-UI frontend** codebase (Next.js 15 + React 19 + Redux Toolkit + Tailwind CSS + DaisyUI).

---

## Core Ideology: Continuous Improvement

Every change is an opportunity to leave the system better than you found it.
When you touch a module, also fix or flag **nearby issues that would be worsened** by the change — broken types, stale docs, misplaced logic, leaked side effects. Do not silently walk past problems you can see.

---

## Mandatory Workflow — No Exceptions

You must follow this sequence for **every task**, no matter how small.

### Step 1 — Read the Docs First

Before writing a single line of code or forming a plan, read the relevant documentation:

| Area of change | File to read |
|---|---|
| General architecture & coding rules | `docs/AI_INSTRUCTIONS.md` + `docs/ARCHITECTURE.md` |
| Any feature-specific context | `docs/feature/<FEATURE_NAME>.md` if it exists |

If the area does not map to a doc file, read the closest match and note the gap.

### Step 2 — Write a Plan

Produce a written plan **before touching any file**. The plan must cover:

1. **What** — one sentence describing the change.
2. **Why** — the user's goal or the problem being solved.
3. **Docs consulted** — list the files you read in Step 1.
4. **Files to change** — list every file you expect to create or modify, with a one-line reason each.
5. **Side effects** — list anything in the system that could be impacted (Redux state, downstream components, API contracts, docs).
6. **Continuous-improvement items** — list any adjacent issues you noticed that should be fixed or flagged as part of this change.
7. **Docs to update** — which `docs/` files need updating after the code change.

Format the plan as a numbered, human-readable list. Do not use vague language — be specific about file names and the exact change.

### Step 3 — Get Approval

**Stop. Do not write code.**

Present the plan to the user and wait for explicit approval.
- If the user says "yes", "approved", "go ahead", or equivalent → proceed to Step 4.
- If the user asks for changes → revise the plan and present again.
- If any part of the plan is unclear or conflicts with existing code → ask a clarifying question instead of guessing.

### Step 4 — Implement

Implement exactly what was approved. Do not expand scope mid-implementation without pausing and updating the plan.

Rules that apply during implementation (from `docs/AI_INSTRUCTIONS.md`):
- **Design constitution**: maximum clarity with minimum UI. Single intent per screen. Remove friction until intent is obvious.
- **Visual hierarchy**: apply `~62% / 38%` dominance ratio when dividing space or attention.
- **Layout**: flow top → bottom, broad → narrow. Content is always left-aligned.
- **Geometry**: use sharp corners by default; rounded corners only for interactive or floating elements.
- **Typography**: one font family. Consistent weight scale. Never use more than 3 weights per screen.
- **Color**: functional color only — accent = action, not decoration.
- **Spacing**: use a fixed spacing scale (4 / 8 / 16 / 24 / 32 / 48 / 64 px). Never use arbitrary values.
- All API/fetch calls go in `config/` — never inside components.
- Use Redux Toolkit for shared state — never local state for data that crosses component boundaries.
- No inline styles — use Tailwind utility classes or DaisyUI component classes.
- No `any` in TypeScript unless unavoidable (add a comment explaining why).
- Wrap major components in `React.memo` where re-render cost is non-trivial.
- Lazy-load heavy components via `next/dynamic`.
- URL state via query params using Next.js router — no unnecessary prop drilling.
- Do not introduce new libraries unless the user explicitly asked.

### Step 5 — Update Docs

After every code change, update all `docs/` files listed in the plan's "Docs to update" section.
If the change revealed that a doc is missing, create `docs/feature/<FEATURE_NAME>.md` following the structure of existing feature docs.
**A task is not complete until docs are updated.**

---

## Handling Uncertainty

- If the user's request is ambiguous → ask one targeted clarifying question before forming a plan.
- If the request conflicts with the design constitution or architecture rules → surface the conflict in the plan and ask the user how to resolve it.
- If you are unsure whether an existing component or utility already covers the need → search `components/`, `customHooks/`, and `utils/` before creating anything new.
- Never guess. Never assume. Pause and ask.

---

## What "Continuous Improvement" Means in Practice

When you are in Step 2, actively look for:
- Inline styles that violate the no-inline-styles rule.
- Components missing `React.memo` where re-renders are expensive.
- API calls made directly inside components instead of `config/`.
- Local state used for data that should live in Redux.
- Arbitrary spacing or color values not following the design scale.
- Stale or missing entries in `docs/` files.
- Duplicate utility functions that should be consolidated in `utils/`.

Add these to the plan's **Continuous-improvement items** section. Implement them only if the user approves them as part of the plan. Do not silently sneak in unrelated changes.
