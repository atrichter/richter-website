# Deployment

This project has two deployable parts:

1. **Sanity Studio** (`sanity-cms/`) – your CMS admin UI, hosted at `https://richter-website.sanity.studio`
2. **Svelte app** (`svelte-app/`) – the public site, hosted on Vercel

---

## 1. Sanity Studio

Deploy whenever you change schemas, plugins, or Studio config. Content itself lives in Sanity's Content Lake and is already "live" — deploying only updates the Studio UI.

### Manual deploy

From `sanity-cms/`:

```bash
yarn deploy
```

This runs non-interactively using the hostname set in `sanity.cli.ts` (`studioHost: 'richter-website'`).

### Automatic deploy (CI)

`.github/workflows/deploy-sanity.yml` runs `yarn deploy` automatically on every push to `main` that touches `sanity-cms/`, using the `SANITY_AUTH_TOKEN` repo secret. No manual step needed for most changes — just push to `main`.

---

## 2. Svelte app

Deploys automatically via Vercel on every push to `main` (root directory: `svelte-app`). Pull requests also get preview deployments.

### Environment variables

Set in the Vercel project dashboard (Settings → Environment Variables):

| Variable | Example | Description |
| --- | --- | --- |
| `VITE_SANITY_PROJECT_ID` | `650bubqo` | Your Sanity project ID |
| `VITE_SANITY_DATASET` | `production` | Dataset the site reads from |

Update these there if the project ID or dataset ever changes — no code change needed.

### Manual redeploy

Normally not needed (pushes to `main` trigger it), but you can also trigger a redeploy from the Vercel dashboard (Deployments → ⋯ → Redeploy) without a new commit, e.g. after changing an env variable.

---

## Summary

| Part | Trigger | Where |
| --- | --- | --- |
| Sanity Studio | Push to `main` (touching `sanity-cms/`) or `yarn deploy` | `https://richter-website.sanity.studio` |
| Svelte app | Push to `main` | Vercel (custom domain: `andrewrichter.com`) |
