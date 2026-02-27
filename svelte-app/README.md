# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv create --template minimal --types ts --no-install svelte-app
```

## Developing

This project uses **Yarn 4 only** (no npm). Yarn 1 has a tar bug on Node 22, so we use Yarn 4 via Corepack.

**One-time setup** — so that plain `yarn` uses Yarn 4:

1. Remove any global Yarn (Corepack will provide `yarn`):
   ```sh
   npm uninstall -g yarn
   brew uninstall yarn   # if you use Homebrew
   ```
2. Enable Corepack (installs the `yarn` shim that uses your project’s version):
   ```sh
   corepack enable
   ```
3. Open a **new terminal** (or run `hash -r`) so your shell picks up the right `yarn`.
4. Check that `yarn` is from Corepack: `which yarn` should be under your Node path (e.g. `~/.nvm/versions/node/.../bin/yarn`), not `/usr/local/bin` or Homebrew.

Then install and run:

```sh
yarn install
yarn dev
```

After that, **`yarn`**, **`yarn dev`**, **`yarn add`**, **`yarn build`** all use Yarn 4. No npm needed.

Start a development server:

```sh
yarn dev

# or start the server and open the app in a new browser tab
yarn dev -- --open
```

## Building

To create a production version of your app:

```sh
yarn build
```

You can preview the production build with `yarn preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
