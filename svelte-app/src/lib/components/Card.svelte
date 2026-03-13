<script lang="ts">
	import type { CardData } from '$lib/cms/types'
	import SanityImage from '$lib/components/SanityImage.svelte'

	interface Props {
		/** Card data (from component.card). */
		card: CardData
		class?: string
	}

	let { card, class: className = '' }: Props = $props()

	const linkHref = $derived(card.link?.href ?? null)
	const linkText = $derived(
		card.link?.text?.trim() || card.title?.trim() || 'Read more'
	)
	const hasLink = $derived(!!linkHref)
</script>

<article class="card {className}">
	{#if card.image}
		<div class="card-image">
			<SanityImage
				image={card.image}
				alt={card.imageAlt ?? ''}
				width={600}
			/>
		</div>
	{/if}
	<div class="card-body">
		{#if card.title}
			<h2 class="card-title">{card.title}</h2>
		{/if}
		{#if card.subtitle}
			<p class="card-subtitle">{card.subtitle}</p>
		{/if}
		{#if card.description}
			<p class="card-description">{card.description}</p>
		{/if}
		{#if hasLink}
			<a href={linkHref!} class="card-link">{linkText}</a>
		{/if}
	</div>
</article>

<style>
	.card {
		border: 1px solid var(--color-border, #e0e0e0);
		border-radius: 0.5rem;
		overflow: hidden;
		background: var(--color-card-bg, #fff);
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.card-image {
		aspect-ratio: 16 / 10;
		overflow: hidden;
	}
	.card-image :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.card-body {
		padding: 1.25rem 1.5rem;
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.card-title {
		margin: 0 0 0.25rem;
		font-size: 1.25rem;
		font-weight: 600;
	}
	.card-subtitle {
		margin: 0 0 0.5rem;
		font-size: 0.9375rem;
		color: var(--color-text-soft, #555);
	}
	.card-description {
		margin: 0 0 1rem;
		font-size: 0.9375rem;
		line-height: 1.5;
		flex: 1;
	}
	.card-link {
		display: inline-block;
		font-size: 0.9375rem;
		font-weight: 500;
		color: var(--color-link, #0066cc);
		text-decoration: none;
	}
	.card-link:hover {
		text-decoration: underline;
	}
</style>
