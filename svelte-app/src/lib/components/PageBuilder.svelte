<script lang="ts">
	import type { PageSection } from '$lib/cms/types'
	import {
		SECTION_HERO,
		SECTION_BLOCK_CONTENT,
		SECTION_FULL_WIDTH_MEDIA,
		SECTION_GRID,
	} from '$lib/cms/types'
	import SectionHero from '$lib/components/sections/SectionHero.svelte'
	import SectionBlockContent from '$lib/components/sections/SectionBlockContent.svelte'
	import SectionFullWidthMedia from '$lib/components/sections/SectionFullWidthMedia.svelte'
	import SectionGrid from '$lib/components/sections/SectionGrid.svelte'

	interface Props {
		/** Resolved sections from the page document (sections[]->). */
		sections: PageSection[] | null | undefined
		class?: string
	}

	let { sections, class: className = '' }: Props = $props()
</script>

<div class="page-builder {className}">
	{#each sections ?? [] as section (section._id)}
		{#if section._type === SECTION_HERO}
			<SectionHero section={section} />
		{:else if section._type === SECTION_BLOCK_CONTENT}
			<SectionBlockContent section={section} />
		{:else if section._type === SECTION_FULL_WIDTH_MEDIA}
			<SectionFullWidthMedia section={section} />
		{:else if section._type === SECTION_GRID}
			<SectionGrid section={section} />
		{:else}
			<!-- Unknown section type: {section._type} -->
		{/if}
	{/each}
</div>

<style>
	.page-builder {
		width: 100%;
	}
</style>
