## Context

svg-to-react is a Remix + Vite SPA that converts SVG markup into React/TSX components. Core conversion lives in `app/script.ts`; UI has two modes (`code` paste, `file` zip upload) toggled via `Sidebar`. No backend API—conversion runs client-side. README covers Remix boilerplate only, not agent-relevant architecture.

## Goals / Non-Goals

**Goals:**

- Single root `AGENTS.md` readable by AI agents in one pass
- Accurate map of: purpose, stack, directory layout, dev commands, conversion pipeline, UI modes, extension points
- Actionable conventions (pnpm, `~/` alias, shadcn patterns, client-only components)
- Clear boundaries for safe changes vs. conversion-output correctness

**Non-Goals:**

- Replacing README deploy/setup instructions
- Documenting OpenSpec workflow files (`.cursor/`, `.agent/`, etc.)
- API docs for every SVG attribute (see `app/allSVGAttributes.json` / `script.ts`)
- CI/CD or hosting runbooks

## Decisions

### 1. File name: `AGENTS.md` (uppercase)

**Choice:** Root `AGENTS.md` per emerging convention (Cursor, many OSS repos).

**Alternatives:** `agents.md` (user said lowercase)—rejected; uppercase is widely indexed by agent tooling.

### 2. Structure: layered sections, ~150–250 lines

**Choice:** Overview → Commands → Architecture → Key files → Conventions → Safe changes → Common tasks.

**Rationale:** Agents scan headings; avoid prose walls. Link to `app/script.ts` for conversion details.

### 3. Overlap with README: intentional split

**Choice:** AGENTS.md defers deploy to README; README stays human-oriented.

### 4. No generated/synced docs

**Choice:** Hand-maintained markdown. Conversion logic changes rarely relative to UI.

## Risks / Trade-offs

- **[Risk] Doc drift** when `script.ts` templates change → Mitigation: tasks include verify step against `TemplateOptions` and `convertSvgToReact`
- **[Risk] Too long** → agents skip → Mitigation: cap length, tables for paths/commands
- **[Risk] Wrong tailwind path** in components.json vs actual CSS → Mitigation: document actual entry (`app/global.css` imported from `root.tsx`)

## Migration Plan

N/A—additive file only. Merge to main; no deploy step.

## Resolved (grill session)

- Conversion depth: pointer to `script.ts` only; full `TemplateOptions` table; inline ~15-line TSX example
- pnpm required; Node >=20; Prettier-in-conversion documented; common tasks (3–5 recipes)
- UI modes: full `CodeConvertor` / `FilesConvertor` detail; ClientOnly explicit
- Non-goals in doc: OpenSpec paths, deploy (README link), SVG attr catalog; no source TODO list
- Tests: encourage when changing `app/script.ts`; no backend-forbid language
- Max ~250 lines; README deploy link once

### Code quality (second grill)

- Gates: `pnpm typecheck` + `pnpm build` required; `pnpm lint` optional
- Conventions section: strict TS, `DeepPartial`, no empty props interfaces
- Format: 2-space + semicolons for new/edited code; `~/` imports required
- UI: shadcn-first; practical a11y; fix hook deps (no exhaustive-deps disable)
- Discipline: minimal diff, no new deps without approval, sparse comments
- Do not: `any`, relative app imports, empty Props interfaces

## Open Questions

None blocking.
