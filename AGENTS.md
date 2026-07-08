# Walkover Workspace — Agent Instructions

You are working inside the Walkover multi-repo workspace (`Central-repo/gtwy/`).
This folder contains multiple projects. Each project has its own `AGENTS.md`
with repo-specific rules, coding conventions, and doc-update requirements.

---

## Core Ideology: Continuous Improvement

Every change is an opportunity to leave the system better than you found it.
When you touch a module, also fix or flag **nearby issues that would be worsened** by the change — broken types, stale docs, misplaced logic, leaked side effects. Do not silently walk past problems you can see.

---

## Mandatory Workflow — No Exceptions

You must follow this sequence for **every task**, no matter how small.

### Step 1 — Identify the Repo and Read Its AGENTS.md

Before writing a single line of code or forming a plan:

1. **Identify which repo** the task is about.
   - Look at the folder name (e.g. `gtwy-node`, `gtwy-ui`, `chatbot-ui`, `gtwy-ai`).
   - If unclear, ask the developer which repo to work in.

2. **Read that repo's AGENTS.md** before writing a single line of code.
   - Path: `gtwy/<repo-name>/AGENTS.md`
   - Example: if working on `gtwy-node` → read `gtwy/gtwy-node/AGENTS.md`

3. **Follow the instructions in that AGENTS.md exactly.**
   - Each repo has its own workflow, doc requirements, and coding rules.
   - Do not skip steps or assume rules are the same across repos.

### Step 2 — Write a Plan

Produce a written plan **before touching any file**. The plan must cover:

1. **What** — one sentence describing the change.
2. **Why** — the user's goal or the problem being solved.
3. **Which repo** — name the target repo(s) and confirm you have read their AGENTS.md.
4. **Docs consulted** — list the files you read in Step 1.
5. **Files to change** — list every file you expect to create or modify, with a one-line reason each.
6. **Side effects** — list anything in the system that could be impacted across repos.
7. **Continuous-improvement items** — list any adjacent issues you noticed.
8. **Docs to update** — which `docs/` files need updating after the code change.

Format the plan as a numbered, human-readable list. Be specific about file names and the exact change.

### Step 3 — Get Approval

**Stop. Do not write code.**

Present the plan to the user and wait for explicit approval.
- If the user says "yes", "approved", "go ahead", or equivalent → proceed to Step 4.
- If the user asks for changes → revise the plan and present again.
- If any part of the plan is unclear or conflicts with existing code → ask a clarifying question.

### Step 4 — Implement

Implement exactly what was approved. Do not expand scope mid-implementation.

Rules that apply during implementation:
- Each repo has its own implementation rules — follow its `AGENTS.md` exactly.
- Do not apply rules from one repo to another.
- If the task spans multiple repos, implement one repo at a time and verify before moving on.

### Step 5 — Update Docs

After every code change, update all `docs/` files listed in the plan.
**A task is not complete until docs are updated.**
Committing code without updating docs is not acceptable.

---

## If the Task Spans Multiple Repos

Read **each repo's AGENTS.md** before touching that repo.
Do not apply rules from one repo to another.
Implement and document one repo at a time.

---

## Handling Uncertainty

- If the user's request is ambiguous → ask one targeted clarifying question before forming a plan.
- If the request touches multiple repos → list all affected repos in your plan.
- If you are unsure which repo owns a piece of logic → trace the call chain before guessing.
- Never guess. Never assume. Pause and ask.

---

## What "Continuous Improvement" Means in Practice

When you are in Step 2, actively look for:
- Stale or missing entries in `docs/` files across repos.
- Cross-repo API contract mismatches (e.g. backend sends a field the frontend doesn't handle).
- Duplicated utilities that belong in a shared module.
- Missing or outdated `AGENTS.md` content in any repo.

Add these to the plan's **Continuous-improvement items** section. Implement them only if the user approves. Do not silently sneak in unrelated changes.
