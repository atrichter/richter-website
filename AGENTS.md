# AGENTS.md

Instructions for AI coding tools (Claude Code, Cursor, GitHub Copilot, etc.) working in this repo.

## What this repo is

Andrew Richter's personal portfolio site: `https://www.andrewtrichter.com/`. It's a monorepo with three top-level pieces:

| Folder | What it is | Status |
| --- | --- | --- |
| `svelte-app/` | **The live site.** SvelteKit 2 + Svelte 5 frontend. This is where almost all work happens. | Active |
| `sanity-cms/` | Sanity Studio (headless CMS) that the frontend pulls content from. | Active |
| `root/` | The previous static HTML/CSS/JS version of the site. | **Legacy — being deleted soon. Do not edit or build on this. Ignore unless explicitly asked.** |
| `original_files/` | Design source files (mockups, logos, raw images) kept for safekeeping/reference. | Archival only — not code, don't touch, and don't index/read into context (it's large). |

If a task doesn't specify which app, assume `svelte-app/`. Each folder above also has its own README with more detail — check the relevant one before working in it.

## Tech stack

### **svelte-app/**

- SvelteKit 2 + Svelte 5 (runes), TypeScript, Vite 7
- Styling: Tailwind CSS v4 (via `@tailwindcss/vite`), plus `tailwind-merge` / `tailwind-variants` for variant-driven components
- Content: fetched from Sanity via `@sanity/client` + `@sanity/image-url`
- Adapter: `@sveltejs/adapter-auto` (not yet pinned to a specific deploy target)

### **sanity-cms/**

- Sanity Studio v5, React 19, TypeScript
- Custom structure tool (Homepage / Pages / Sections / Components) defined in `sanity.config.ts`
- Project ID: `650bubqo`, default dataset: `development`

**Package manager: Yarn 4 (via Corepack) in both `svelte-app/` and `sanity-cms/`. Never use npm or Yarn 1** — Yarn 1 has a tar bug on Node 22, which is why this repo standardized on Yarn 4. Don't add a `package-lock.json` or `node_modules` from npm.

## Common commands

Run these from inside the relevant subfolder (`svelte-app/` or `sanity-cms/`), not the repo root.

### **svelte-app/ commands**

```sh
yarn install       # first-time setup
yarn dev           # dev server
yarn build          # production build
yarn preview        # preview the build
yarn check           # svelte-kit sync + svelte-check (type checking)
yarn fmt             # prettier --write
yarn fmt:check       # prettier --check
```

### **sanity-cms/ commands**

```sh
yarn install
yarn dev             # sanity dev (Studio locally)
yarn build           # sanity build
yarn deploy          # sanity deploy (publishes hosted Studio)
yarn lint            # eslint
yarn fmt / fmt:check
yarn types:check      # tsc --noEmit
```

## Environment variables (svelte-app/)

Copy `.env.example` to `.env`. Both vars must be prefixed `VITE_` to be exposed to the browser:

```env
VITE_SANITY_PROJECT_ID=650bubqo
VITE_SANITY_DATASET=development
```

Never commit `.env` (already gitignored). Don't hardcode alternate project IDs/datasets in code — always go through these env vars (see `src/lib/sanity.ts`).

## How content flows (svelte-app <-> sanity-cms)

1. Content is modeled in `sanity-cms/schemaTypes/` — organized into `pages/` (homepage, generic page), `sections/` (content, fullWidthMedia), `components/` (text, media, card), and shared `types/` (e.g. `blockContent`, `styledText`).
2. The frontend queries Sanity with GROQ, defined in `svelte-app/src/lib/cms/queries.ts`. **Keep these queries in sync with the schema** — if you add/rename a field or schema type in `sanity-cms/`, update the matching GROQ projection here, and vice versa. Matching TypeScript types live in `svelte-app/src/lib/cms/types.ts`.
3. Routes fetch data in `+page.server.ts` files and render it with reusable components in `svelte-app/src/lib/components/sanity/` (`BlockContent.svelte`, `SanityImage.svelte`, `StyledText.svelte`, `Card.svelte`, `PageBuilder.svelte`, and section renderers under `sanity/sections/`).
4. When adding a new page type or section, the usual pattern is: add/extend a schema in `sanity-cms/schemaTypes/`, add a GROQ query + type, then wire it into a route/component in `svelte-app/`.

## Design tokens

Brand fonts and the full color palette are defined in `svelte-app/src/lib/theme.ts` (`themeFonts`: STIX Two Text + Lato; `themeColors`: a named palette — navy, tan, blue, yellow, ocean, orange, etc.). There's also a `/theme` route (`svelte-app/src/routes/theme/`) that renders a live swatch/style reference — check it when picking colors or fonts instead of inventing new ones. Prefer these named tokens over raw hex values in new components.

## Conventions

- **Svelte 5 runes**, not the legacy `export let` / `$:` reactive syntax — match existing components' style.
- **TypeScript everywhere** — don't introduce untyped `.js` files in `src/`.
- Reusable UI primitives go in `src/lib/components/ui/` (e.g. `Button.svelte`); Sanity-specific rendering components go in `src/lib/components/sanity/`.
- Run `yarn fmt` (Prettier, with `prettier-plugin-svelte`) before finishing a change in either app; run `yarn check` (svelte-app) or `yarn types:check`/`yarn lint` (sanity-cms) to catch type/lint errors.
- Don't add new dependencies casually — this is a small personal site; prefer using what's already installed (Tailwind v4, tailwind-variants, existing Sanity libs) over pulling in new packages.

## Keeping docs in sync

This repo's READMEs (`README.md` at root, plus one in each of `svelte-app/`, `sanity-cms/`, `root/`, `original_files/`) and this `AGENTS.md` describe the current structure, stack, and commands. If a change you're making is large enough to make any of that inaccurate, update the relevant doc(s) in the same change — don't leave them to drift. This includes:

- Adding, removing, or renaming a top-level folder, or changing one's purpose/status (e.g. `root/` finally being deleted)
- Adding/removing a dependency that changes the tech stack section, or changing the package manager
- Adding/renaming/removing a script in `package.json` (`yarn dev`, `yarn build`, etc.)
- Changing how `svelte-app` and `sanity-cms` talk to each other (env vars, query/schema sync pattern) described in "How content flows"
- Adding a new schema/section/component *pattern* worth documenting (not every single schema field — just new conventions)
- Renaming/moving the directories or files this file references (e.g. `src/lib/cms/`, `src/lib/theme.ts`)

Small, routine changes (a new page using existing patterns, a new color in the palette, a bug fix) don't need doc updates. When in doubt, favor updating over leaving it stale.

## Things to avoid

- Don't edit, "modernize," or build features into `root/` — it's being deleted.
- Don't read, embed, or optimize files in `original_files/` — it's large, archival, and irrelevant to the running app.
- Don't switch package managers or run `npm install` in either app.
- Don't change the Sanity `projectId` or default `dataset` in `sanity.config.ts` / `sanity.ts` without explicit instruction — this is a live, single-author site with real content.
