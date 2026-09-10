<script lang="ts">
  import BlockContent from '$lib/components/sanity/BlockContent.svelte'
  import SectionFullWidthMedia from '$lib/components/sanity/sections/SectionFullWidthMedia.svelte'

  let { data } = $props()
  const homepage = $derived(data?.homepage ?? null)
</script>

<svelte:head>
  <title>Andrew Richter</title>
</svelte:head>

<main class="homepage">
  {#if homepage}
    {#if homepage.hero}
      <SectionFullWidthMedia section={homepage.hero} />
    {/if}

    {#if homepage.content?.length}
      <section class="container layout-grid">
        <BlockContent blocks={homepage.content} class="block-content col-span-4 lg:col-span-8 lg:col-start-3" />
      </section>
    {/if}

    {#if !homepage.content?.length}
      <p>No content yet. Add content in the Sanity Studio.</p>
    {/if}
  {:else}
    <p>Loading… or no homepage document in Sanity. Create a “Homepage” document in the Studio.</p>
  {/if}
</main>
