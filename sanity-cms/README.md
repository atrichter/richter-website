# sanity-cms

Sanity Studio — the content backend for [`svelte-app`](../svelte-app). This is where site copy, pages, and media is added and edited instead of hardcoding it into the frontend.

- **Project ID:** `650bubqo`
- **Default dataset:** `development` (override with the `SANITY_STUDIO_DATASET` env var)

## Content model

Defined in [`schemaTypes/`](schemaTypes):

- **Pages** (`schemaTypes/pages`) — the singleton `homepage`, plus a generic `page` type for other routes.
- **Sections** (`schemaTypes/sections`) — larger building blocks a page is assembled from: `section.content`, `section.fullWidthMedia`.
- **Components** (`schemaTypes/components`) — smaller reusable pieces referenced by sections: `component.text`, `component.media`, `component.card`.
- **Shared types** (`schemaTypes/types`) — `blockContent` (portable text/rich text) and `styledText`.

The Studio's editing UI groups these the same way — see the custom structure in `sanity.config.ts` (Homepage / Pages / Sections / Components).

There are also a couple of custom input components (`studioComponents/inputs/`) used for image and styled-text fields, and a `DatasetNavbar` studio component for switching datasets from within the Studio UI.

**Keep this in sync with `svelte-app`:** if you add, rename, or restructure a schema field or type here, update the matching GROQ query in `svelte-app/src/lib/cms/queries.ts` and the TypeScript types in `svelte-app/src/lib/cms/types.ts`. The frontend won't know about schema changes automatically.

## Commands

Uses **Yarn 4** (via Corepack) — not npm, not Yarn 1.

```sh
yarn install
yarn dev             # run Studio locally
yarn build           # build Studio
yarn deploy          # publish hosted Studio (sanity.studio)
yarn lint            # eslint
yarn fmt / fmt:check # prettier
yarn types:check     # tsc --noEmit
```

## Learn more

- [Sanity docs: getting started](https://www.sanity.io/docs/introduction/getting-started)
- [GROQ query language](https://www.sanity.io/docs/groq)
- [Extending the Studio](https://www.sanity.io/docs/content-studio/extending)
