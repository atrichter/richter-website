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
  :global(body) {
    margin: 0;
    overflow-x: clip;
  }
</style>
