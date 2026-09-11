<script lang="ts">
  import type { SectionContent } from '$lib/cms/types'
  import { COMPONENT_CARD, COMPONENT_MEDIA, COMPONENT_TEXT } from '$lib/cms/types'
  import Card from '$lib/components/sanity/Card.svelte'
  import BlockContent from '$lib/components/sanity/BlockContent.svelte'
  import SanityImage from '$lib/components/sanity/SanityImage.svelte'

  interface Props {
    section: SectionContent
    class?: string
  }

  let { section, class: className = '' }: Props = $props()

  const items = $derived(section.items ?? [])
</script>

<section class="section-content layout-grid {className}">
  {#each items as item (item._id)}
    <div class="col-span-4 lg:col-span-4 lg:col-start-5">
      {#if item._type === COMPONENT_TEXT}
        <BlockContent blocks={item.body} />
      {:else if item._type === COMPONENT_MEDIA && item.mediaType === 'image' && item.image}
        <SanityImage image={item.image} alt={item.image.alt ?? ''} />
      {:else if item._type === COMPONENT_MEDIA && item.mediaType === 'video' && item.videoUrl}
        <iframe
          src={item.videoUrl}
          title="Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      {:else if item._type === COMPONENT_CARD}
        <Card card={item} />
      {/if}
    </div>
  {/each}
</section>
