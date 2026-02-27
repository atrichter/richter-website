<script lang="ts">
	import type { SectionHero as SectionHeroType } from '$lib/cms/types'
	import StyledText from '$lib/components/StyledText.svelte'
	import SanityImage from '$lib/components/SanityImage.svelte'

	interface Props {
		section: SectionHeroType
		class?: string
	}

	let { section, class: className = '' }: Props = $props()
</script>

<section class="section-hero {className}">
	{#if section.background}
		<div class="section-hero-bg">
			<SanityImage
				image={section.background}
				alt={section.altText ?? ''}
				class="section-hero-bg-img"
				width={1600}
			/>
		</div>
	{/if}
	<div class="section-hero-content">
		<StyledText block={section.title} class="section-hero-title" />
		<StyledText block={section.subtitle} class="section-hero-subtitle" />
	</div>
</section>

<style>
	.section-hero {
		position: relative;
		margin-bottom: 2rem;
	}
	.section-hero-bg {
		position: absolute;
		inset: 0;
		z-index: 0;
	}
	.section-hero-bg-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.section-hero-content {
		position: relative;
		z-index: 1;
		padding: 3rem 1.5rem;
		max-width: 65ch;
		margin: 0 auto;
	}
	.section-hero-content :global(.section-hero-title) {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
	}
	.section-hero-content :global(.section-hero-subtitle) {
		font-size: 1.25rem;
		color: var(--color-text-soft, #555);
	}
</style>
