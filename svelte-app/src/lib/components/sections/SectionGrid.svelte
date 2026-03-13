<script lang="ts">
	import type { SectionGrid as SectionGridType, GridItem } from '$lib/cms/types'
	import { COMPONENT_CARD } from '$lib/cms/types'
	import Card from '$lib/components/Card.svelte'

	interface Props {
		section: SectionGridType
		class?: string
	}

	let { section, class: className = '' }: Props = $props()

	const items = $derived(section.items ?? [])

	function renderItem(item: GridItem) {
		if (item._type === COMPONENT_CARD) {
			return { component: 'card', data: item } as const
		}
		return null
	}
</script>

<section class="section-grid {className}">
	{#if section.heading}
		<h2 class="section-grid-heading">{section.heading}</h2>
	{/if}
	{#if items.length}
		<div class="section-grid-list">
			{#each items as item (item._id)}
				{#if renderItem(item)?.component === 'card'}
					<Card card={item} class="section-grid-item" />
				{/if}
			{/each}
		</div>
	{/if}
</section>

<style>
	.section-grid {
		margin-bottom: 2rem;
	}
	.section-grid-heading {
		margin: 0 0 1.25rem;
		font-size: 1.5rem;
		font-weight: 600;
	}
	.section-grid-list {
		display: grid;
		gap: 1.5rem;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
	}
</style>
