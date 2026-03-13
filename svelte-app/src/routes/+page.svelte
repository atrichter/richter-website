<script lang="ts">
	import StyledText from '$lib/components/StyledText.svelte'
	import BlockContent from '$lib/components/BlockContent.svelte'
	import SanityImage from '$lib/components/SanityImage.svelte'

	let { data } = $props()
	const homepage = $derived(data?.homepage ?? null)
</script>

<main class="homepage">
	{#if homepage}
		{#if homepage.hero}
			<header class="hero">
				<StyledText block={homepage.hero.title} class="hero-title" />
				<StyledText block={homepage.hero.subtitle} class="hero-subtitle" />
				<StyledText block={homepage.hero.description} class="hero-description" />
				{#if homepage.hero.heroImage}
					<SanityImage image={homepage.hero.heroImage} alt="" class="hero-image" width={1200} />
				{/if}
			</header>
		{/if}

		{#if homepage.content?.length}
			<section class="page-content">
				<BlockContent blocks={homepage.content} class="block-content" />
			</section>
		{/if}

		{#if !homepage.hero && !homepage.content?.length}
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
	.hero {
		margin-bottom: 2rem;
	}
	.hero :global(.hero-title) {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
	}
	.hero :global(.hero-subtitle) {
		font-size: 1.5rem;
		color: var(--color-text-soft, #555);
		margin-bottom: 1rem;
	}
	.hero :global(.hero-description) {
		margin-bottom: 1.5rem;
	}
	.hero :global(.hero-image) {
		width: 100%;
		height: auto;
		border-radius: 0.5rem;
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
