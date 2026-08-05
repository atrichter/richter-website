<script lang="ts">
  import type { BlockContentItem, PortableTextBlock, PortableTextSpan, BlockContentImage } from '$lib/cms/types'
  import SanityImageComponent from './SanityImage.svelte'

  interface Props {
    /** Portable text / block content array from CMS. */
    blocks: BlockContentItem[] | null | undefined
    class?: string
  }

  type ContentSegment =
    | { kind: 'block'; block: PortableTextBlock }
    | { kind: 'list'; listItem: NonNullable<PortableTextBlock['listItem']>; items: PortableTextBlock[] }
    | { kind: 'image'; image: BlockContentImage }

  type ListItemNode = {
    block: PortableTextBlock
    children: ListItemNode[]
  }

  let { blocks, class: className = '' }: Props = $props()

  const segments = $derived(groupBlocks(blocks))

  function groupBlocks(items: BlockContentItem[] | null | undefined): ContentSegment[] {
    if (!items?.length) return []

    const grouped: ContentSegment[] = []
    let index = 0

    while (index < items.length) {
      const item = items[index]

      if (item._type === 'image') {
        grouped.push({ kind: 'image', image: item })
        index++
        continue
      }

      if (item._type !== 'block') {
        index++
        continue
      }

      const block = item as PortableTextBlock
      if (block.listItem) {
        const listItem = block.listItem
        const listBlocks: PortableTextBlock[] = []

        while (index < items.length) {
          const candidate = items[index]
          if (candidate._type !== 'block') break

          const listBlock = candidate as PortableTextBlock
          if (!listBlock.listItem || listBlock.listItem !== listItem) break

          listBlocks.push(listBlock)
          index++
        }

        grouped.push({ kind: 'list', listItem, items: listBlocks })
        continue
      }

      grouped.push({ kind: 'block', block })
      index++
    }

    return grouped
  }

  function buildListTree(blocks: PortableTextBlock[]): ListItemNode[] {
    const root: ListItemNode[] = []
    const stack: { level: number; children: ListItemNode[] }[] = [{ level: 0, children: root }]

    for (const block of blocks) {
      const level = block.level ?? 1
      const node: ListItemNode = { block, children: [] }

      while (stack.length > 1 && stack[stack.length - 1].level >= level) {
        stack.pop()
      }

      stack[stack.length - 1].children.push(node)
      stack.push({ level, children: node.children })
    }

    return root
  }

  function listItemKey(item: ListItemNode, index: number): string {
    return item.block._key ?? `list-item-${index}-${item.block.children?.[0]?.text ?? ''}`
  }

  function blockTag(style: string | undefined): string {
    if (!style || style === 'normal') return 'p'
    if (style === 'blockquote') return 'blockquote'
    if (['h1', 'h2', 'h3', 'h4'].includes(style)) return style
    return 'p'
  }

  function listTag(listItem: NonNullable<PortableTextBlock['listItem']>): 'ul' | 'ol' {
    return listItem === 'number' ? 'ol' : 'ul'
  }

  function blockHtml(block: PortableTextBlock): string {
    return (block.children ?? []).map((span) => renderSpan(span, block.markDefs ?? [])).join('')
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
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  }
</script>

{#snippet renderList(items: ListItemNode[], listItem: NonNullable<PortableTextBlock['listItem']>)}
  <svelte:element this={listTag(listItem)} data-block>
    {#each items as item, itemIndex (listItemKey(item, itemIndex))}
      {@const html = blockHtml(item.block)}
      <li>
        {#if html}{@html html}{/if}
        {#if item.children.length}
          {@render renderList(item.children, listItem)}
        {/if}
      </li>
    {/each}
  </svelte:element>
{/snippet}

{#if segments.length}
  <div class={className}>
    {#each segments as segment, index (`${segment.kind}-${index}`)}
      {#if segment.kind === 'block'}
        {@const tag = blockTag(segment.block.style)}
        {@const html = blockHtml(segment.block)}
        {#if html}
          <svelte:element this={tag} data-block>{@html html}</svelte:element>
        {/if}
      {:else if segment.kind === 'list'}
        {@render renderList(buildListTree(segment.items), segment.listItem)}
      {:else}
        <SanityImageComponent
          image={segment.image}
          alt={segment.image.alt ?? ''}
          class="block-content-image"
        />
      {/if}
    {/each}
  </div>
{/if}
