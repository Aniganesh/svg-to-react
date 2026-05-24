## 1. Research and outline

- [x] 1.1 Read `package.json`, `app/routes/_index.tsx`, `app/script.ts`, `TemplateCustomiser.tsx`, and `README.md` for accurate facts
- [x] 1.2 Draft outline: overview → commands/gates → architecture → TemplateOptions → example → Conventions (quality + ClientOnly + a11y) → common tasks → non-goals

## 2. Write AGENTS.md

- [x] 2.1 Create root `AGENTS.md` with project overview and stack; MUST use pnpm only (forbid npm/yarn)
- [x] 2.2 Add dev commands table (`pnpm dev`, `build`, `lint`, `typecheck`, `start`) and Node `>=20`
- [x] 2.3 Document directory map and pointer to `convertSvgToReact` (no full pipeline prose)
- [x] 2.4 Document both UI modes: `CodeConvertor` (paste) vs `FilesConvertor` (zip/svg, @zip.js), shared `TemplateCustomiser`
- [x] 2.5 Add full `TemplateOptions` reference table (all flags)
- [x] 2.6 Add inline minimal TSX output example (~15 lines)
- [x] 2.7 Conventions: strict TS, DeepPartial, 2-space/semicolons, `~/` imports, shadcn-first, a11y, hook deps, minimal diff, no new deps, sparse comments, Do-not list
- [x] 2.8 Verification gates: `pnpm typecheck` + `pnpm build` required; `pnpm lint` optional; Prettier-in-conversion pointer only
- [x] 2.9 Add "Common agent tasks" (3–5 recipes with file pointers)
- [x] 2.10 Add non-goals: no OpenSpec/.cursor docs, no SVG attr catalog, deploy → README link once; encourage tests when changing `app/script.ts`

## 3. Verify

- [x] 3.1 Cross-check commands, paths, and TemplateOptions against repo
- [x] 3.2 Confirm file is ≤ ~250 lines with clear headings
