# Walkover Workspace — Agent Instructions

You are working inside the Walkover multi-repo workspace (`walkover-repos/`).
This folder contains multiple projects. Each project has its own `AGENTS.md`
with repo-specific rules, coding conventions, and doc-update requirements.

---

## Before doing ANYTHING in any repo

1. **Identify which repo** the task is about.
   - Look at the folder name (e.g. `gtwy-node`, `gtwy-ui`, `chatbot-ui`).
   - If unclear, ask the developer which repo to work in.

2. **Read that repo's AGENTS.md** before writing a single line of code.
   - Path: `walkover-repos/<repo-name>/AGENTS.md`
   - Example: if working on `gtwy-node` → read `gtwy-node/AGENTS.md`

3. **Follow the instructions in that AGENTS.md exactly.**
   - Each repo has its own workflow, doc requirements, and coding rules.
   - Do not skip steps or assume rules are the same across repos.

---

## If the task spans multiple repos

Read **each repo's AGENTS.md** before touching that repo.
Do not apply rules from one repo to another.

---

## Rule that applies to ALL repos

After every code change:
- Update the `docs/` files in that repo to reflect what changed.
- A task is not complete until docs are updated.
- Committing code without updating docs is not acceptable.