<script lang="ts">
  import PageBuilder from '$lib/components/sanity/PageBuilder.svelte'

  let { data } = $props()
  const page = $derived(data?.page ?? null)
  const pageTitle = $derived(page?.title ? `${page.title} | Andrew Richter` : 'Andrew Richter')
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<main class="page-builder-page">
  {#if page}
    {#if page.title}
      <h1 class="page-title sr-only">{page.title}</h1>
    {/if}
    <PageBuilder sections={page.sections} />
  {:else}
    <p>Loading…</p>
  {/if}
</main>
