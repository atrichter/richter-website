<script lang="ts">
  import '../app.css'
  import Footer from '$lib/components/Footer.svelte'
  import NavBar from '$lib/components/NavBar.svelte'

  let { children } = $props()
</script>

<svelte:head>
  <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="shortcut icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
</svelte:head>

<div class="flex min-h-dvh flex-col">
  <NavBar />

  <div class="flex-1">
    {@render children()}
  </div>

  <Footer />
</div>
