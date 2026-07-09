<script lang="ts">
	import type { SectionContent } from '$lib/cms/types'
	import { COMPONENT_CARD, COMPONENT_MEDIA, COMPONENT_TEXT } from '$lib/cms/types'
	import Card from '$lib/components/Card.svelte'
	import BlockContent from '$lib/components/BlockContent.svelte'
	import SanityImage from '$lib/components/SanityImage.svelte'

	interface Props {
		section: SectionContent
		class?: string
	}

	let { section, class: className = '' }: Props = $props()

	const items = $derived(section.items ?? [])
</script>

<section class="section-grid {className}">
	{#if items.length}
		<div class="section-grid-list">
			{#each items as item (item._id)}
				{#if item._type === COMPONENT_TEXT}
					<BlockContent blocks={item.body} class="section-grid-item section-grid-text" />
				{:else if item._type === COMPONENT_MEDIA && item.mediaType === 'image' && item.image}
					<SanityImage
						image={item.image}
						alt={item.image.alt ?? ''}
						class="section-grid-item section-grid-media"
						width={640}
					/>
				{:else if item._type === COMPONENT_MEDIA && item.mediaType === 'video' && item.videoUrl}
					<div class="section-grid-item section-grid-media">
						<iframe
							src={item.videoUrl}
							title="Video"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
						></iframe>
					</div>
				{:else if item._type === COMPONENT_CARD}
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
	.section-grid-list {
		display: grid;
		gap: 1.5rem;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
	}
	.section-grid-text {
		grid-column: 1 / -1;
	}
	.section-grid-media {
		max-width: min(100%, 640px);
		width: 100%;
		height: auto;
		display: block;
	}
	.section-grid-media iframe {
		width: 100%;
		aspect-ratio: 16 / 9;
		border: 0;
	}
</style>
