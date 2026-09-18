<script lang="ts">
  import type { SectionFullWidthMedia as SectionFullWidthMediaType } from '$lib/cms/types'
  import SanityImage from '$lib/components/sanity/SanityImage.svelte'

  interface Props {
    section: SectionFullWidthMediaType
    class?: string
  }

  let { section, class: className = '' }: Props = $props()

  const media = $derived(section.media)
</script>

<section class="section-full-width-media container-full-width {className}">
  {#if media?.mediaType === 'image' && media.image}
    <SanityImage image={media.image} alt={media.image.alt ?? ''} />
  {:else if media?.mediaType === 'video' && media.videoUrl}
    <iframe
      src={media.videoUrl}
      title="Video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  {/if}
</section>
