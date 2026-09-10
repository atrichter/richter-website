<script lang="ts">
  import type { CardData } from '$lib/cms/types'
  import SanityImage from '$lib/components/sanity/SanityImage.svelte'
  import StyledText from '$lib/components/sanity/StyledText.svelte'

  interface Props {
    /** Card data (from component.card). */
    card: CardData
    class?: string
  }

  let { card, class: className = '' }: Props = $props()

  const image = $derived(card.media?.mediaType === 'image' ? card.media.image : null)
  const linkHref = $derived(card.url?.trim() || null)
  const linkText = $derived(card.title?.text?.trim() || 'Read more')
  const hasLink = $derived(!!linkHref)
</script>

<div class="flex flex-col overflow-hidden border-[0.5px] border-gray {className}">
  {#if image}
    <SanityImage {image} alt={image.alt ?? ''} />
  {/if}
  <div class="p-12">
    <StyledText class="mt-0" block={card.title} />
    {#if card.subtitle}
      <StyledText block={card.subtitle} />
    {/if}
    {#if card.description}
      <p>{card.description}</p>
    {/if}
    {#if hasLink}
      <a href={linkHref!}>{linkText}</a>
    {/if}
  </div>
</div>
