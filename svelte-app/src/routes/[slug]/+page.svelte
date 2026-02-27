<script lang="ts">
	import PageBuilder from '$lib/components/PageBuilder.svelte'

	let { data } = $props()
	const page = $derived(data?.page ?? null)
</script>

<main class="page-builder-page">
	{#if page}
		{#if page.title}
			<h1 class="page-title visually-hidden">{page.title}</h1>
		{/if}
		<PageBuilder sections={page.sections} />
	{:else}
		<p>Loading…</p>
	{/if}
</main>

<style>
	.page-builder-page {
		max-width: 65ch;
		margin: 0 auto;
		padding: 2rem 1rem;
	}
	.page-title {
		margin: 0 0 1rem;
		font-size: 1.5rem;
	}
	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
