<script lang="ts">
  import type { PageSection } from '$lib/cms/types'
  import { SECTION_FULL_WIDTH_MEDIA, SECTION_CONTENT } from '$lib/cms/types'
  import SectionFullWidthMedia from '$lib/components/sanity/sections/SectionFullWidthMedia.svelte'
  import SectionGrid from '$lib/components/sanity/sections/SectionGrid.svelte'

  interface Props {
    /** Resolved sections from the page document (sections[]->). */
    sections: PageSection[] | null | undefined
    class?: string
  }

  let { sections, class: className = '' }: Props = $props()
</script>

<div class="page-builder container-full-width {className}">
  {#each sections ?? [] as section (section._id)}
    {#if section._type === SECTION_FULL_WIDTH_MEDIA}
      <SectionFullWidthMedia {section} />
    {:else if section._type === SECTION_CONTENT}
      <div class="container layout-grid">
        <SectionGrid {section} class="col-span-4 lg:col-span-12" />
      </div>
    {:else}
      <!-- Unknown section type: {section._type} -->
    {/if}
  {/each}
</div>
