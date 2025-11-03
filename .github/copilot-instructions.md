## Repo snapshot

- Minimal React + TypeScript web app repository (repo root contains `README.md` and `LICENSE`).
- No `package.json`, `tsconfig.json`, `src/` directory, or build/test scripts are currently present — treat this repo as a scaffold and confirm missing pieces with the maintainer before adding dependencies or CI.

## What I (AI agent) should know before editing

- This repo uses VS Code workspace settings in `.vscode/settings.json`. Important enforced conventions:
  - `editor.formatOnSave: true` — keep formatting consistent; run the project's formatter (if present) on save.
  - `files.trimTrailingWhitespace`, `files.insertFinalNewline` — avoid trailing whitespace and ensure newline at EOF.
  - `editor.codeActionsOnSave` enables `source.fixAll` and `source.organizeImports` — prefer fixes that align with these rules.
  - TypeScript diagnostics are enabled via `typescript.tsserver.experimental.enableProjectDiagnostics`.
  - Copilot agent/chat features are enabled in settings; follow agent-mode guidance when creating changes.

## How to be productive here (actionable guidance)

1. Check for missing project metadata before making changes.
   - If `package.json` or `tsconfig.json` are missing, ask: "Do you want me to scaffold package.json / tsconfig for a React+TS app (Vite/CRA) or should I only touch docs?" — do not add dependencies without confirmation.

2. Follow editor and TypeScript conventions from `.vscode/settings.json`.
   - Always run formatters and organize imports (or rely on format-on-save) for code edits.

3. Prefer small, focused commits and PRs.
   - The workspace setting `githubPullRequests.createOnPublishBranch: never` implies PR creation behavior is intentional; create feature branches and open PRs per normal flow.

4. When adding tests or CI, reference repository state first.
   - Because no build/test tooling is present, describe proposed tooling (example: Vite + Jest/React Testing Library) and await approval before adding files.

5. Document assumptions in PR descriptions.
   - If you scaffold a toolchain (package.json, tsconfig, scripts), list commands you added (build, dev, test) and any opinionated defaults.

## Files to consult for patterns and verification

- `.vscode/settings.json` — IDE-enforced formatting, organize-imports and TypeScript diagnostics.
- `README.md` — currently minimal; expand with explicit build/test/run instructions if/when the project is scaffolded.

## When to ask the maintainer (explicitly)

- Before adding dependencies or creating a project scaffold (package.json, tsconfig, install scripts).
- Before introducing CI workflows or significant structural changes (src/ layout, routing, state management choices).

## Example prompts you can use when you need clarification

- "Should I scaffold a React+TypeScript project (Vite) with default scripts and dependencies, or do you prefer a different starter?"
- "No tests or build scripts found — do you want me to add a minimal test setup (Jest + React Testing Library) or only update README?"

---
If anything in here is unclear or you want the AI to follow additional repo-specific rules (commit message style, branch names, code owners), tell me and I will update this file accordingly.

You are the project's Copilot Agent. Use Conventional Commits. Create small, focused commits. Always update README with run/build/test steps after changes. Ask for confirmation before pushing or touching secrets. Use the repo's `.vscode/settings.json` for formatting and diagnostics.
