<script lang="ts">
	import type { SectionFullWidthMedia as SectionFullWidthMediaType } from '$lib/cms/types'
	import SanityImage from '$lib/components/SanityImage.svelte'

	interface Props {
		section: SectionFullWidthMediaType
		class?: string
	}

	let { section, class: className = '' }: Props = $props()
</script>

<section class="section-full-width-media {className}">
	{#if section.image}
		<SanityImage
			image={section.image}
			alt={section.altText ?? ''}
			class="section-full-width-media-img"
			width={1600}
		/>
	{/if}
</section>

<style>
	.section-full-width-media {
		margin-bottom: 2rem;
	}
	.section-full-width-media-img {
		width: 100%;
		height: auto;
		display: block;
	}
</style>
