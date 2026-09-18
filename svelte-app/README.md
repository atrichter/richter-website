# svelte-app

The live site: [andrewtrichter.com](https://www.andrewtrichter.com/). SvelteKit + Svelte 5 frontend styled with Tailwind CSS v4. Content is fetched from the Sanity Studio in [`../sanity-cms`](../sanity-cms) rather than hardcoded.

## Structure

- **`src/routes/`** — pages. `+page.svelte`/`+page.server.ts` fetch content server-side; `[slug]/` handles generic CMS pages, `theme/` is a live swatch/style reference for the brand fonts and colors.
- **`src/lib/cms/`** — `queries.ts` (GROQ queries) and `types.ts` (matching TypeScript types). Keep these in sync with the schema in `sanity-cms/schemaTypes/`.
- **`src/lib/components/sanity/`** — components that render Sanity content: `StyledText` (single text + style), `BlockContent` (rich text — headings, paragraphs, links, images), `SanityImage` (responsive images), `Card`, `PageBuilder`, and section renderers under `sections/`.
- **`src/lib/components/ui/`** — plain reusable UI primitives (e.g. `Button`).
- **`src/lib/theme.ts`** — brand fonts (STIX Two Text, Lato) and the named color palette. Prefer these tokens over raw hex values.
- **`src/lib/sanity.ts`** — the Sanity client + image URL builder.

## Environment variables

Copy `.env.example` to `.env`:

```env
VITE_SANITY_PROJECT_ID=650bubqo
VITE_SANITY_DATASET=development
```

Must be prefixed `VITE_` to be exposed to the browser. Defaults already point at the live project/dataset.

## Commands

Uses **Yarn 4** (via Corepack) — not npm, not Yarn 1 (which has a tar bug on Node 22).

```sh
yarn install
yarn dev             # dev server (add -- --open to open a browser tab)
yarn build            # production build
yarn preview          # preview the build
yarn check            # svelte-kit sync + svelte-check (type checking)
yarn fmt / fmt:check  # prettier
```

**One-time setup**, so plain `yarn` resolves to Yarn 4:

1. Remove any global Yarn: `npm uninstall -g yarn` (and `brew uninstall yarn` if installed via Homebrew).
2. `corepack enable` — this installs a `yarn` shim that uses the version pinned in this repo.
3. Open a new terminal (or run `hash -r`) so your shell picks up the right `yarn`.
4. Confirm with `which yarn` — it should resolve under your Node path, not `/usr/local/bin` or Homebrew's.

## Deploying

Currently on `@sveltejs/adapter-auto`, which auto-detects common platforms. If deploying somewhere it doesn't support, swap in the platform-specific [adapter](https://svelte.dev/docs/kit/adapters).

## Adding a new page or section

1. Add/extend a schema in `sanity-cms/schemaTypes/`.
2. Add a matching GROQ query + type in `src/lib/cms/`.
3. Render it with a route and/or component here, reusing `src/lib/components/sanity/` where possible.
