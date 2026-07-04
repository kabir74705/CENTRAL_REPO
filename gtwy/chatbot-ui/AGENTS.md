# chatbot-ui — Agent Instructions

You are an AI agent working on the **chatbot-ui** codebase — the Chatbot UI frontend (React + TypeScript).

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
| General architecture & rules | `docs/AI_INSTRUCTIONS.md` |
| High-level architecture | `docs/ARCHITECTURE.md` |

If the area does not map to a doc file, read the closest match and note the gap.

### Step 2 — Write a Plan

Produce a written plan **before touching any file**. The plan must cover:

1. **What** — one sentence describing the change.
2. **Why** — the user's goal or the problem being solved.
3. **Docs consulted** — list the files you read in Step 1.
4. **Files to change** — list every file you expect to create or modify, with a one-line reason each.
5. **Side effects** — list anything in the system that could be impacted (state, downstream components, API contracts, docs).
6. **Continuous-improvement items** — list any adjacent issues you noticed that should be fixed or flagged as part of this change (broken types, stale docs, misplaced utilities, etc.).
7. **Docs to update** — which `docs/` files need updating after the code change.

Format the plan as a numbered, human-readable list. Do not use vague language ("update things", "fix stuff") — be specific about file names and the exact change.

### Step 3 — Get Approval

**Stop. Do not write code.**

Present the plan to the user and wait for explicit approval.
- If the user says "yes", "approved", "go ahead", or equivalent → proceed to Step 4.
- If the user asks for changes → revise the plan and present again.
- If any part of the plan is unclear or conflicts with existing code → ask a clarifying question instead of guessing.

### Step 4 — Implement

Implement exactly what was approved. Do not expand scope mid-implementation without pausing and updating the plan.

Rules that apply during implementation (defer to `docs/AI_INSTRUCTIONS.md` for project specifics):
- All network calls belong in the dedicated API layer — never inline in components.
- Keep components pure and memoized where it matters; avoid unnecessary re-renders.
- No inline styles — use the project's styling system (theme / utility classes).
- No `any` unless unavoidable (add a comment explaining why).
- Prefer existing utilities, hooks, and types over creating new ones.
- Do not introduce new libraries unless the user explicitly asked.

### Step 5 — Update Docs

After every code change, update all `docs/` files listed in the plan's "Docs to update" section.
If the change revealed that a doc is missing, create `docs/modules/<MODULE_NAME>_README_AI.md` following the structure of existing module docs.
**A task is not complete until docs are updated.**

---

## Handling Uncertainty

- If the user's request is ambiguous → ask one targeted clarifying question before forming a plan.
- If the request conflicts with architecture rules → surface the conflict in the plan and ask the user how to resolve it.
- If you are unsure whether an existing utility or component already covers the need → search the codebase before creating anything new.
- Never guess. Never assume. Pause and ask.

---

## What "Continuous Improvement" Means in Practice

When you are in Step 2, actively look for:
- TypeScript `any` that can be replaced with a proper type in the files you are reading.
- Stale or missing entries in the relevant `docs/` file.
- Utility functions that belong in a shared utils location but are currently co-located in a component.
- Inline styles that violate the no-inline-styles rule.
- Components missing memoization where re-renders are costly.

Add these to the plan's **Continuous-improvement items** section. Implement them only if the user approves them as part of the plan. Do not silently sneak in unrelated changes.

---

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
