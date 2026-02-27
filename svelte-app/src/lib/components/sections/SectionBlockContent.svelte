<script lang="ts">
	import type { SectionBlockContent as SectionBlockContentType } from '$lib/cms/types'
	import BlockContent from '$lib/components/BlockContent.svelte'

	interface Props {
		section: SectionBlockContentType
		class?: string
	}

	let { section, class: className = '' }: Props = $props()
</script>

<section class="section-block-content {className}">
	<BlockContent blocks={section.content} class="section-block-content-inner" />
</section>

<style>
	.section-block-content {
		margin-bottom: 2rem;
	}
	.section-block-content :global(.section-block-content-inner [data-block]) {
		margin-bottom: 0.75rem;
	}
	.section-block-content :global(.block-content-image) {
		margin: 1rem 0;
		max-width: 100%;
		height: auto;
	}
</style>
