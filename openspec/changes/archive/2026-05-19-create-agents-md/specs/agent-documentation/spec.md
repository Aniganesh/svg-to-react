## ADDED Requirements

### Requirement: Repository provides agent orientation document

The repository SHALL include a root-level `AGENTS.md` file that AI coding agents can use as the primary orientation document for this project. The document MUST stay at or under approximately 250 lines.

#### Scenario: Agent discovers project purpose

- **WHEN** an agent reads `AGENTS.md` at the repository root
- **THEN** it finds a concise description of svg-to-react as a client-side SVG-to-React/TSX conversion tool

### Requirement: Agent document describes development workflow

`AGENTS.md` SHALL document how to install dependencies, run the dev server, build, lint, and typecheck the project using **pnpm only**.

#### Scenario: Agent runs local development

- **WHEN** an agent needs to run or verify the app locally
- **THEN** `AGENTS.md` lists pnpm commands matching `package.json` scripts (`dev`, `build`, `lint`, `typecheck`, `start`) and states that npm/yarn MUST NOT be used for installs

### Requirement: Agent document defines verification gates

`AGENTS.md` SHALL state required checks before a change is complete: **`pnpm typecheck`** and **`pnpm build`**. Lint is available via `pnpm lint` but is NOT a required gate unless the user asks.

#### Scenario: Agent finishes a code change

- **WHEN** an agent considers work complete
- **THEN** `AGENTS.md` directs it to run `pnpm typecheck` and `pnpm build` successfully

#### Scenario: Agent checks runtime prerequisites

- **WHEN** an agent sets up the environment
- **THEN** `AGENTS.md` states Node.js `>=20` per `package.json` `engines`

### Requirement: Agent document maps architecture and UI modes

`AGENTS.md` SHALL describe Remix single-route layout (`app/routes/_index.tsx`), the two UI modes, and their owning components.

#### Scenario: Agent locates conversion logic

- **WHEN** an agent needs to change SVG-to-React output behavior
- **THEN** `AGENTS.md` identifies `app/script.ts` and `convertSvgToReact` as the primary implementation surface without duplicating full pipeline internals (agents read source for stages)

#### Scenario: Agent works on code paste mode

- **WHEN** an agent modifies the paste-and-convert flow
- **THEN** `AGENTS.md` points to `app/components/CodeConvertor.tsx` and its use of `CodeEditor` + `TemplateCustomiser`

#### Scenario: Agent works on file/batch mode

- **WHEN** an agent modifies zip or multi-file conversion
- **THEN** `AGENTS.md` points to `app/components/FilesConvertor.tsx`, `@zip.js/zip.js` usage, and `toStartCase` naming from filenames

#### Scenario: Agent locates shared conversion settings UI

- **WHEN** an agent adds or changes a conversion toggle
- **THEN** `AGENTS.md` identifies `app/components/TemplateCustomiser.tsx` as shared by both modes and requiring sync with `TemplateOptions` in `app/script.ts`

### Requirement: Agent document catalogs TemplateOptions

`AGENTS.md` SHALL include a complete reference of `TemplateOptions` flags exposed to users, with brief semantics for each.

#### Scenario: Agent changes a template flag

- **WHEN** an agent reads `AGENTS.md` for conversion configuration
- **THEN** it finds every option: `language`, `addDefaultExport`, `reactNative`, `ref`, `spreadProps`, `replaceValues`, `interfaceExtend`, `title`, `description`, and their effect at a high level

### Requirement: Agent document includes minimal output example

`AGENTS.md` SHALL include an inline minimal example (~15 lines) of generated TSX output so agents can recognize expected shape (imports, FC/props, SVG JSX) without a separate fixture file.

#### Scenario: Agent validates codegen shape

- **WHEN** an agent changes templates in `app/script.ts`
- **THEN** it can compare against the inline example in `AGENTS.md` for structural expectations

### Requirement: Agent document states conventions and code quality

`AGENTS.md` SHALL include a **Conventions** section covering architecture patterns, code quality parameters, and principles below. It MUST NOT duplicate the embedded Prettier option table from `app/script.ts` (pointer only).

#### Scenario: Agent adds a UI component

- **WHEN** an agent adds or modifies UI in this repo
- **THEN** `AGENTS.md` directs it to `app/components/ui/` (shadcn/Radix) with `cn()` — app chrome MUST NOT use raw `<button>` elements when a ui primitive exists

#### Scenario: Agent adds a browser-only editor or DOM API

- **WHEN** an agent introduces CodeMirror, clipboard, zip, or similar browser APIs
- **THEN** `AGENTS.md` states that such UI MUST be wrapped in `app/components/ClientOnly.tsx` (see `CodeEditor.tsx`) and MUST NOT run during SSR

### Requirement: TypeScript strictness and typing patterns

`AGENTS.md` SHALL document that `tsconfig.json` has **`strict: true`**, agents MUST NOT use `any` or `@ts-ignore`, and public APIs (e.g. `convertSvgToReact`, component props) SHOULD have explicit types. It SHALL document `DeepPartial<T>` in `app/util-types.ts` for partial `TemplateOptions` in UI state.

#### Scenario: Agent adds a conversion option

- **WHEN** an agent extends `TemplateOptions` or component option state
- **THEN** `AGENTS.md` directs use of `DeepPartial<TemplateOptions>` for partial UI state, matching `CodeConvertor` / `TemplateCustomiser`

#### Scenario: Agent types a new component

- **WHEN** an agent creates a component with no props
- **THEN** `AGENTS.md` states empty `interface FooProps {}` MUST NOT be added — omit a props type instead

### Requirement: Formatting and import conventions

`AGENTS.md` SHALL state that **new and edited app code** uses 2-space indentation and semicolons (standardize over time; do not reformat entire files unless asked). App imports from `app/` MUST use the `~/` alias, not relative paths like `../script`.

#### Scenario: Agent adds an import

- **WHEN** an agent imports from `app/script.ts` or other app modules
- **THEN** `AGENTS.md` requires `~/…` form (e.g. `~/script`), and relative app imports MUST be fixed when the file is touched

### Requirement: React component and export conventions

`AGENTS.md` SHALL state that existing files may export both named and default components; agents SHOULD preserve that pattern when editing. New UI MUST compose `app/components/ui` primitives and Tailwind via `app/global.css` / `root.tsx`.

#### Scenario: Agent exports a component

- **WHEN** an agent edits `CodeConvertor.tsx` or similar
- **THEN** `AGENTS.md` allows keeping both `export const` and `export default` where already present

### Requirement: Accessibility expectations

`AGENTS.md` SHALL document practical a11y expectations aligned with `eslint-plugin-jsx-a11y`: form controls need associated labels (see `TemplateCustomiser` Switch + Label), and icon-only controls need accessible names.

#### Scenario: Agent adds a toggle or icon button

- **WHEN** an agent adds interactive UI without visible text
- **THEN** `AGENTS.md` requires labels/`aria-label` per existing patterns — not only “fix lint if it fails”

### Requirement: React hooks discipline

`AGENTS.md` SHALL state that `react-hooks/exhaustive-deps` violations MUST be fixed by correcting dependency arrays; `eslint-disable-next-line react-hooks/exhaustive-deps` MUST NOT be added.

#### Scenario: Agent edits a useEffect

- **WHEN** an agent changes effect dependencies
- **THEN** `AGENTS.md` requires a correct dependency array without disable comments

### Requirement: Change discipline and comments

`AGENTS.md` SHALL document: **minimal diff** (no drive-by refactors), **no new dependencies** without user approval, and **sparse comments** (only non-obvious logic; no narrating code).

#### Scenario: Agent scopes a PR-sized change

- **WHEN** an agent fixes a bug in one component
- **THEN** `AGENTS.md` warns against unrelated refactors, dependency adds, or whole-file reformatting

### Requirement: Explicit quality anti-patterns

`AGENTS.md` SHALL include a short **Do not** list under Conventions.

#### Scenario: Agent reviews conventions before coding

- **WHEN** an agent reads the Conventions section
- **THEN** it sees explicit prohibitions: no `any` / `@ts-ignore`; no relative `app/` imports (use `~/`); no empty `Props` interfaces

### Requirement: Agent document notes Prettier in conversion path

`AGENTS.md` SHALL state that `convertSvgToReact` formats output via Prettier (`prettier/standalone` in `app/script.ts`) and agents MUST NOT add redundant formatting passes on generated code.

#### Scenario: Agent post-processes generated code

- **WHEN** an agent considers formatting conversion output separately
- **THEN** `AGENTS.md` directs it to adjust Prettier usage inside `convertSvgToReact` instead

### Requirement: Agent document provides common task recipes

`AGENTS.md` SHALL include a "Common agent tasks" section with 3–5 bullet recipes, each naming target files (e.g. add `TemplateOptions` field + `TemplateCustomiser` control + template string; fix SVG attribute camelCase mapping in `app/script.ts`).

#### Scenario: Agent performs a typical change

- **WHEN** an agent needs to add a conversion option or fix attribute mapping
- **THEN** `AGENTS.md` provides a short checklist of files to touch in order

### Requirement: Agent document defines documentation non-goals

`AGENTS.md` SHALL explicitly list topics agents MUST NOT expand into the doc or change without user request.

#### Scenario: Agent avoids doc scope creep

- **WHEN** an agent drafts or extends `AGENTS.md`
- **THEN** it sees non-goals: do not document OpenSpec / `.cursor` / `.agent` workflow files; do not duplicate deploy/hosting (link README once for deploy); do not catalog every SVG attribute (`app/allSVGAttributes.json` / inline list in `script.ts`)

#### Scenario: Agent finds deploy instructions

- **WHEN** an agent needs deployment guidance
- **THEN** `AGENTS.md` links to `README.md` once and does not copy Remix deploy boilerplate

### Requirement: Agent document guides testing for conversion changes

`AGENTS.md` SHALL encourage adding automated tests when modifying `app/script.ts` conversion behavior (no test suite exists today; vitest or similar is acceptable when introduced).

#### Scenario: Agent changes convertSvgToReact

- **WHEN** an agent edits conversion or template logic
- **THEN** `AGENTS.md` recommends adding or updating tests for that change rather than relying on manual UI checks alone

### Requirement: Agent document defines safe-change boundaries for conversion

`AGENTS.md` SHALL call out that conversion output correctness is critical and point to `TemplateOptions` and template strings in `app/script.ts`. It MUST NOT include a stale TODO list from source comments.

#### Scenario: Agent avoids breaking conversion output

- **WHEN** an agent modifies SVG parsing or React codegen
- **THEN** `AGENTS.md` warns that output correctness is critical and identifies `TemplateOptions` / template strings as the control surface
