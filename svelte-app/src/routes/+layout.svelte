<script lang="ts">
  import { onMount } from 'svelte'
  import { setThemeVariables } from '$lib/theme'

  let { children } = $props()

  onMount(() => {
    setThemeVariables()
  })
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap" rel="stylesheet" />
  <link
    href="https://fonts.googleapis.com/css2?family=STIX+Two+Text:wght@400;500;600;700;800&display=swap"
    rel="stylesheet"
  />
  <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="shortcut icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
</svelte:head>

{@render children()}

<style>
  :global(:root) {
    color-scheme: light;
  }

  :global(body) {
    margin: 0;
    overflow-x: clip;
    background-color: var(--color-paper);
    color: var(--color-ink);
    font-family: var(--font-lato);
    font-weight: var(--font-weight-lato-light);
    letter-spacing: 0.025em;
  }

  :global(.container-full-width, .container-wide, .container-narrow) {
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
  }

  :global(.container-wide) {
    max-width: 128rem;
    padding: 0 0.75rem;
  }

  @media (min-width: 512px) {
    :global(.container-wide) {
      padding: 0 1.5rem;
    }
  }

  @media (min-width: 1024px) {
    :global(.container-wide) {
      padding: 0 2.5rem;
    }
  }

  :global(.container-narrow) {
    max-width: 64rem;
    padding: 0 0.75rem;
  }

  @media (min-width: 512px) {
    :global(.container-narrow) {
      padding: 0 1.5rem;
    }
  }

  @media (min-width: 1024px) {
    :global(.container-narrow) {
      padding: 0 2.5rem;
    }
  }

  :global(h1) {
    font-family: var(--font-stix);
    font-weight: var(--font-weight-stix-bold);
    font-size: 3rem;
    margin: 4rem 0 2rem;
  }

  :global(h2) {
    font-family: var(--font-stix);
    font-weight: var(--font-weight-stix-semibold);
    font-size: 2rem;
    margin: 3rem 0 1.5rem;
  }

  :global(h2::after) {
    content: '';
    display: block;
    background: var(--color-ink);
    width: 2.5rem;
    height: 1px;
    margin-top: 0.75rem;
  }

  :global(h3) {
    font-family: var(--font-lato);
    font-weight: var(--font-weight-lato-bold);
    font-size: 1.5rem;
    margin: 2rem 0 1rem;
  }

  :global(h4) {
    color: var(--color-gray);
    font-family: var(--font-lato);
    font-weight: var(--font-weight-lato-regular);
    font-style: italic;
    font-size: 1.25rem;
    margin: 1.5rem 0 0.75rem;
  }

  :global(h5) {
    font-family: var(--font-lato);
    font-weight: var(--font-weight-lato-bold);
    font-size: 1rem;
    margin: 1.25rem 0 0.5rem;
  }

  :global(p) {
    color: var(--color-slate);
    font-family: var(--font-lato);
    font-weight: var(--font-weight-lato-light);
    font-size: 1rem;
    line-height: 1.5;
    margin: 0.75rem 0 0.5rem;
  }

  :global(small) {
    color: var(--color-gray);
    font-family: var(--font-lato);
    font-weight: var(--font-weight-lato-regular);
    font-size: 0.75rem;
    margin: 0.5rem 0;
  }

  :global(ul, ol) {
    padding-left: 1.25rem;
  }

  :global(ul) {
    list-style: square;
  }

  :global(ul li::marker) {
    font-size: 0.75em;
  }
</style>
