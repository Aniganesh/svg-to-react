# AGENTS.md

Client-side web app that converts SVG markup into React components (TSX/JSX). No backend API—all conversion runs in the browser.

**Stack:** Remix 2 + Vite, React 18, TypeScript (strict), Tailwind CSS, shadcn/ui (Radix), CodeMirror, `@zip.js/zip.js`.

## Setup and commands

- **Node:** `>=20` (`package.json` `engines`)
- **Package manager:** **pnpm only** — do not use `npm install` or `yarn`

```bash
pnpm install
pnpm dev          # local dev server
pnpm typecheck    # tsc
pnpm build        # production build
pnpm start        # serve build (after build)
pnpm lint         # ESLint (optional unless user asks)
```

### Verification gates

Before considering work done, run successfully:

1. `pnpm typecheck`
2. `pnpm build`

`pnpm lint` is available but not a required gate unless the user requests it.

Deploy/hosting: see [README.md](./README.md).

## Architecture

Single route: `app/routes/_index.tsx` — `Header`, `Sidebar` (mode toggle), and main content.

| Mode | Component | Behavior |
|------|-----------|----------|
| **code** | `app/components/CodeConvertor.tsx` | Paste SVG in `CodeEditor` (xml), live TSX output |
| **file** | `app/components/FilesConvertor.tsx` | Drop `.svg` or `.zip`; batch convert via `@zip.js/zip.js`; names from `toStartCase(filename)` |

Both modes share `app/components/TemplateCustomiser.tsx` for conversion options. Any new toggle must update **`TemplateOptions`** in `app/script.ts` and the template strings there.

**Core conversion:** `app/script.ts` — `convertSvgToReact(svgContent, name, templateOptions)`. Read source for pipeline details (attribute camelCase, template assembly, etc.). Output is formatted inside this function via `prettier/standalone`—do not add a second format pass; change Prettier options in `convertSvgToReact` if needed.

**Browser-only UI:** `app/components/CodeEditor.tsx` wraps CodeMirror in `app/components/ClientOnly.tsx`. Any new editor, clipboard, zip, or DOM API usage must use `ClientOnly` and must not run during SSR.

### Directory map

| Path | Role |
|------|------|
| `app/script.ts` | SVG → React codegen, `TemplateOptions`, templates |
| `app/util-types.ts` | `DeepPartial<T>` for partial options in UI state |
| `app/components/` | App UI (`CodeConvertor`, `FilesConvertor`, `TemplateCustomiser`, …) |
| `app/components/ui/` | shadcn primitives (`Button`, `Switch`, `Label`, …) |
| `app/lib/utils.ts` | `cn()` helper |
| `app/global.css` | Tailwind entry (imported from `app/root.tsx`) |
| `app/allSVGAttributes.json` | Reference data (do not duplicate in this doc) |

## TemplateOptions

Defined in `app/script.ts`. UI state uses `DeepPartial<TemplateOptions>`.

| Option | Type | Effect |
|--------|------|--------|
| `language` | `"ts"` \| `"js"` | TSX + interfaces vs JSX |
| `addDefaultExport` | `boolean?` | Append `export default` |
| `reactNative` | `boolean?` | `react-native-svg` imports instead of DOM SVG |
| `ref` | `boolean?` | `forwardRef` component wrapper |
| `spreadProps` | `"start"` \| `"end"`? | Where to spread remaining props on root SVG |
| `replaceValues` | array? | Find/replace in SVG; optional interface + destructure from props |
| `interfaceExtend` | `{ from?, name }`? | Extend generated props interface |
| `title` | `string?` | Title-related codegen (see `script.ts`) |
| `description` | `string?` | Description-related codegen (see `script.ts`) |

`TemplateCustomiser` also exposes value replacers UI (expandable section) wired to `replaceValues`.

## Example generated output (minimal)

Shape agents should expect from TS + default export (actual output varies with options):

```tsx
import React, { FC } from "react";

interface MyIconProps {}

export const MyIcon: FC<MyIconProps> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path d="..." />
    </svg>
  );
};

export default MyIcon;
```

## Conventions

### TypeScript

- `strict: true` in `tsconfig.json`
- No `any`, no `@ts-ignore`
- Explicit types on public APIs (`convertSvgToReact`, exported components)
- No empty `interface FooProps {}` — omit props type when a component has no props
- Use `DeepPartial<TemplateOptions>` for partial option state in components

### Formatting and imports

- **New/edited code:** 2-space indent, semicolons (do not reformat whole files unless asked)
- **Imports:** always `~/…` for app modules (e.g. `~/script`), never `../script`

### React and UI

- Existing files may export both `export const` and `export default` — preserve when editing
- Use `app/components/ui` + `cn()` for app chrome; do not add raw `<button>` when a ui primitive exists
- Tailwind via `app/global.css`
- **a11y:** controls need labels (`Label` + `htmlFor`, or `aria-label` on icon-only buttons) — see `TemplateCustomiser`
- **Hooks:** fix `react-hooks/exhaustive-deps` by correcting dependency arrays; do not add `eslint-disable` for it

### Change discipline

- Minimal diff — no drive-by refactors
- No new dependencies without user approval
- Sparse comments — only non-obvious logic
- Conversion output correctness is critical; treat `TemplateOptions` and template strings as the control surface
- When changing `app/script.ts`, add or update automated tests (none exist yet; vitest or similar is fine)

### Do not

- Use `any` or `@ts-ignore`
- Use relative imports for `app/` modules (use `~/`)
- Add empty `Props` interfaces
- Document OpenSpec / `.cursor` / `.agent` workflow files in this repo doc
- Catalog every SVG attribute here (see `app/allSVGAttributes.json` and `script.ts`)
- Duplicate Remix deploy boilerplate (link README instead)

## Common agent tasks

1. **Add a conversion option** — `TemplateOptions` + template strings in `app/script.ts` → control in `TemplateCustomiser.tsx` → wire state in `CodeConvertor` / `FilesConvertor`.
2. **Fix SVG attribute → React prop mapping** — `app/script.ts` (`attributesWithHyphen`, replacement loop in `convertSvgToReact`).
3. **Change generated component shape** — template constants in `app/script.ts` (`namedExportReactTS`, etc.) and Prettier call at end of `convertSvgToReact`.
4. **UI-only tweak (paste mode)** — `CodeConvertor.tsx`, `CodeEditor.tsx`; keep `ClientOnly` for CodeMirror.
5. **Batch / zip behavior** — `FilesConvertor.tsx` + `@zip.js/zip.js`; use `~/script` imports.
