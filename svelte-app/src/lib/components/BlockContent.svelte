<script lang="ts">
	import type { BlockContentItem, PortableTextBlock, PortableTextSpan, BlockContentImage } from '$lib/cms/types'
	import SanityImageComponent from './SanityImage.svelte'

	interface Props {
		/** Portable text / block content array from CMS. */
		blocks: BlockContentItem[] | null | undefined
		class?: string
	}

	let { blocks, class: className = '' }: Props = $props()

	function blockTag(style: string | undefined): string {
		if (!style || style === 'normal') return 'p'
		if (style === 'blockquote') return 'blockquote'
		if (['h1', 'h2', 'h3', 'h4'].includes(style)) return style
		return 'p'
	}

	function renderSpan(span: PortableTextSpan, markDefs: { _key: string; _type: string; href?: string }[] = []): string {
		let out = escapeHtml(span.text ?? '')
		const marks = span.marks ?? []
		for (const key of marks) {
			const def = markDefs.find((d) => d._key === key)
			if (def?._type === 'link' && def.href) {
				out = `<a href="${escapeHtml(def.href)}">${out}</a>`
			} else if (key === 'strong') {
				out = `<strong>${out}</strong>`
			} else if (key === 'em') {
				out = `<em>${out}</em>`
			}
		}
		return out
	}

	function escapeHtml(s: string): string {
		return s
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
	}
</script>

{#if blocks?.length}
	<div class={className}>
		{#each blocks as item, index ((item as { _key?: string })._key ?? `block-${index}`)}
			{#if item._type === 'block'}
				{@const block = item as PortableTextBlock}
				{@const tag = blockTag(block.style)}
				{@const html = (block.children ?? [])
					.map((s) => renderSpan(s, block.markDefs ?? []))
					.join('')}
				{#if html}
					<svelte:element this={tag} data-block>{@html html}</svelte:element>
				{/if}
			{:else if item._type === 'image'}
				<SanityImageComponent image={item as BlockContentImage} class="block-content-image" />
			{/if}
		{/each}
	</div>
{/if}
