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

<section class="container-full-width section-full-width-media {className}">
  {#if media?.mediaType === 'image' && media.image}
    <SanityImage image={media.image} alt={media.image.alt ?? ''} class="section-full-width-media-img" width={1600} />
  {:else if media?.mediaType === 'video' && media.videoUrl}
    <div class="section-full-width-media-video">
      <iframe
        src={media.videoUrl}
        title="Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  {/if}
</section>

<style>
  .section-full-width-media {
    margin-bottom: 2rem;
  }
  .section-full-width-media-img {
    width: 100%;
    display: block;
  }
  .section-full-width-media-video {
    width: 100%;
  }
  .section-full-width-media-video iframe {
    width: 100%;
    aspect-ratio: 16 / 9;
    border: 0;
    display: block;
  }
</style>
