<script lang="ts">
  import { reveal } from '$lib/actions/reveal'
  import type { SanityImage as SanityImageType } from '$lib/cms/types'
  import { urlFor } from '$lib/sanity'

  interface Props {
    image: SanityImageType | null | undefined
    alt?: string
    class?: string
    /** Max width in px for srcset. */
    width?: number
  }

  let { image, alt = '', class: className = '', width }: Props = $props()

  // Prefer resolved URL from GROQ (asset->.url); fallback to building from ref
  const src = $derived(image?.assetUrl ? image.assetUrl : image ? urlFor(image) : null)
  const srcWithWidth = $derived(src && width ? `${src}${src.includes('?') ? '&' : '?'}w=${width}` : src)
</script>

{#if srcWithWidth}
  <img use:reveal src={srcWithWidth} {alt} class="reveal h-auto w-full {className}" loading="lazy" decoding="async" />
{/if}
