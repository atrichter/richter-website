<script lang="ts">
	import type { StyledText as StyledTextType } from '$lib/cms/types'

	interface Props {
		/** Styled text from CMS (text + style). */
		block: StyledTextType | null | undefined
		/** Optional class for the wrapper. */
		class?: string
	}

	let { block, class: className = '' }: Props = $props()

	const tag = $derived(
		block?.style === 'h1'
			? 'h1'
			: block?.style === 'h2'
				? 'h2'
				: block?.style === 'h3'
					? 'h3'
					: block?.style === 'h4'
						? 'h4'
						: block?.style === 'blockquote'
							? 'blockquote'
							: 'p'
	)
	const text = $derived(block?.text ?? '')
</script>

{#if text}
	<svelte:element this={tag} class={className}>{text}</svelte:element>
{/if}
