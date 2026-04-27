<script lang="ts">
	import BlockContent from '$lib/components/BlockContent.svelte'
	import SectionFullWidthMedia from '$lib/components/sections/SectionFullWidthMedia.svelte'

	let { data } = $props()
	const homepage = $derived(data?.homepage ?? null)
</script>

<main class="homepage">
	{#if homepage}
		{#if homepage.hero}
			<SectionFullWidthMedia section={homepage.hero} />
		{/if}

		{#if homepage.content?.length}
			<section class="page-content">
				<BlockContent blocks={homepage.content} class="block-content" />
			</section>
		{/if}

		{#if !homepage.content?.length}
			<p>No content yet. Add content in the Sanity Studio.</p>
		{/if}
	{:else}
		<p>Loading… or no homepage document in Sanity. Create a “Homepage” document in the Studio.</p>
	{/if}
</main>

<style>
	.homepage {
		max-width: 65ch;
		margin: 0 auto;
		padding: 2rem 1rem;
	}
	.page-content {
		margin-top: 2rem;
	}
	.page-content :global([data-block]) {
		margin-bottom: 0.75rem;
	}
	.page-content :global(.block-content-image) {
		margin: 1rem 0;
		max-width: 100%;
		height: auto;
	}
</style>
