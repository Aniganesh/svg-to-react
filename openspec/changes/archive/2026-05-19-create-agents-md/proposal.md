## Why

AI coding agents (Cursor, Copilot, etc.) lack a single source of truth for this repo's purpose, architecture, and conventions. Without `AGENTS.md`, agents rely on scattered files and guesswork, leading to inconsistent edits and missed project constraints.

## What Changes

- Add root-level `AGENTS.md` documenting project overview, tech stack, key directories, dev commands, and agent-specific guidance
- Cover SVG→React conversion domain (core logic in `app/script.ts`, UI modes, template options)
- Document conventions: pnpm, Remix routes, `~/` imports, Tailwind + shadcn/ui patterns
- Include safe-change boundaries (what not to break: conversion output, client-only editors)

## Capabilities

### New Capabilities

- `agent-documentation`: Root `AGENTS.md` that orients AI agents to the svg-to-react app—purpose, architecture, commands, and coding conventions

### Modified Capabilities

<!-- none -->

## Impact

- **New file**: `AGENTS.md` at repository root
- **No runtime/API changes**—documentation only
- Complements existing `README.md` (human deploy/setup) with agent-focused depth
