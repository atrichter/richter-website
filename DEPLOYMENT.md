# Deployment Guide

This project has two deployable parts:

1. **Sanity Studio** (`sanity-cms/`) – your CMS admin UI  
2. **Svelte app** (`svelte-app/`) – the public site that reads from Sanity  

Below are **free** options and step-by-step setup for each.

---

## 1. Sanity Studio (free on Sanity’s hosting)

Sanity hosts your Studio for free at a `*.sanity.studio` URL.

### One-time setup

1. In the `sanity-cms/` directory, run:
   ```bash
   cd sanity-cms && yarn deploy
   # or: npx sanity deploy
   ```
2. When prompted, sign in to Sanity (or create an account) and choose a **hostname** (e.g. `richter-website`).  
   Your Studio will be at: **`https://<hostname>.sanity.studio`**
3. (Optional) To avoid being prompted on future deploys, set the hostname in `sanity-cms/sanity.cli.ts` under `deployment.host` (see comment in that file).

### Redeploying

From `sanity-cms/`:

```bash
yarn deploy
```

Deploy whenever you change schemas, plugins, or Studio config. Content lives in Sanity’s Content Lake and is already “live”; the deploy only updates the Studio UI.

### Automating with CI (e.g. GitHub Actions)

To deploy Studio on every push to `main`:

1. Create a **Sanity API token** with “Editor” (or higher) access:  
   [sanity.io/manage](https://www.sanity.io/manage) → your project → **API** → **Tokens**.
2. In your repo: **Settings** → **Secrets and variables** → **Actions** → add secret:
   - Name: `SANITY_AUTH_TOKEN`
   - Value: the token from step 1.
3. Use the workflow in **`.github/workflows/deploy-sanity.yml`**: it runs `yarn deploy` from `sanity-cms/` on every push to `main` that touches `sanity-cms/`. Ensure `deployment.host` is set in `sanity-cms/sanity.cli.ts` after your first manual deploy so the workflow doesn’t prompt for a hostname.

---

## 2. Svelte app (free on Vercel or Netlify)

The Svelte app is a SvelteKit site. **adapter-auto** is already used, so both Vercel and Netlify are supported without changing adapters.

### Environment variables (required for production)

Set these in your hosting dashboard (Vercel or Netlify) so the app can talk to Sanity:

| Variable                  | Example     | Description                    |
|---------------------------|-------------|--------------------------------|
| `VITE_SANITY_PROJECT_ID`  | `650bubqo`  | Your Sanity project ID         |
| `VITE_SANITY_DATASET`     | `production`| Dataset (e.g. `production`)    |

Use the same project ID as in `sanity-cms/sanity.config.ts`. For production, create a `production` dataset in the Sanity dashboard if you don’t have one yet.

---

### Option A: Vercel (recommended, zero config)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. **Add New** → **Project** → import your `richter-website` repo.
3. Configure the project:
   - **Root Directory:** `svelte-app`  
   - **Framework Preset:** SvelteKit (auto-detected)  
   - **Build Command:** `yarn build` (or leave default)  
   - **Output Directory:** leave default (SvelteKit sets it)
4. Under **Environment Variables**, add:
   - `VITE_SANITY_PROJECT_ID` = your project ID  
   - `VITE_SANITY_DATASET` = `production` (or your dataset)
5. Deploy. Every push to `main` (and optional previews on PRs) will trigger a new build.

No extra config files are required; optional `svelte-app/vercel.json` is only if you want to override something.

---

### Option B: Netlify

1. Go to [netlify.com](https://netlify.com) and sign in with GitHub.
2. **Add new site** → **Import an existing project** → choose your repo.
3. Configure:
   - **Base directory:** `svelte-app`  
   - **Build command:** `yarn build`  
   - **Publish directory:** `build` (Netlify’s default for SvelteKit)
4. Under **Site settings** → **Environment variables**, add:
   - `VITE_SANITY_PROJECT_ID`  
   - `VITE_SANITY_DATASET`
5. Deploy. The repo includes `svelte-app/netlify.toml` so the base directory and build command are set if you don’t override them.

---

## Summary

| Part          | Free option              | Deploy how                                      |
|---------------|--------------------------|-------------------------------------------------|
| Sanity Studio | `*.sanity.studio`        | `cd sanity-cms && yarn deploy` (or CI)         |
| Svelte app    | Vercel or Netlify        | Connect repo, set root to `svelte-app`, add env vars |

After both are deployed:

- **Studio:** `https://<your-hostname>.sanity.studio` – edit content.  
- **Site:** your Vercel/Netlify URL – public site reading from the same Sanity project/dataset.
