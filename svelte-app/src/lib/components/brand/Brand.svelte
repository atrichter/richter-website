<script lang="ts">
  import { page } from '$app/state'
  import AMark from './AMark.svelte'
  import RMark from './RMark.svelte'
  import { brandExpansion } from '$lib/state/brand-expansion.svelte'
  import { measureMaxLetterSpacing } from '$lib/utils'

  let { containerEl = null }: { containerEl?: HTMLElement | null } = $props()

  let isHome = $derived(page.url.pathname === '/')
  let hovering = $state(false)
  let stuck = $state(false)
  let sentinelReady = $state(false)
  let trailVisible = $state(false)

  let maxLetterSpacing = $state(0) // px, computed to fill containerEl
  let weightRegular = $state(400)
  let weightBold = $state(700)

  let measureEl: HTMLSpanElement | undefined = $state()

  // While on home and the intro hasn't scrolled past yet, scroll owns `t`.
  // Otherwise (docked, or any other page) hover owns it, animated.
  let scrollLinked = $derived(isHome && sentinelReady && !stuck)
  let t = $derived(scrollLinked ? brandExpansion.t : hovering ? 1 : 0)

  let letterSpacing = $derived(t * maxLetterSpacing)
  let fontWeight = $derived(Math.round(weightRegular + t * (weightBold - weightRegular)))

  function handleTrailTransitionEnd(event: TransitionEvent) {
    if (event.propertyName === 'opacity' && t <= 0) trailVisible = false
  }

  $effect(() => {
    if (t > 0) trailVisible = true
  })

  // Watch the intro sentinel (set by Intro.svelte) and toggle `stuck`
  // when it scrolls out of view. Reactive so it works regardless of
  // whether Nav or the page mounts first.
  $effect(() => {
    if (!isHome || !brandExpansion.sentinel) {
      stuck = false
      sentinelReady = false
      return
    }
    const target = brandExpansion.sentinel
    stuck = target.getBoundingClientRect().bottom <= 0
    sentinelReady = true
    const observer = new IntersectionObserver(([entry]) => {
      stuck = !entry.isIntersecting
    })
    observer.observe(target)
    return () => observer.disconnect()
  })

  // Recompute the max letter-spacing whenever the container resizes.
  $effect(() => {
    if (!containerEl || !measureEl) return
    const el = measureEl
    const recompute = () => {
      maxLetterSpacing = measureMaxLetterSpacing(containerEl!, el)
    }
    recompute()
    const ro = new ResizeObserver(recompute)
    ro.observe(containerEl)
    return () => ro.disconnect()
  })

  $effect(() => {
    const styles = getComputedStyle(document.documentElement)
    const r = parseFloat(styles.getPropertyValue('--font-weight-stix-regular'))
    const b = parseFloat(styles.getPropertyValue('--font-weight-stix-bold'))
    if (!Number.isNaN(r)) weightRegular = r
    if (!Number.isNaN(b)) weightBold = b
    document.fonts?.ready?.then(() => {
      if (containerEl && measureEl) maxLetterSpacing = measureMaxLetterSpacing(containerEl, measureEl)
    })
  })
</script>

<a
  class="brand inline-flex items-baseline text-white font-stix text-4xl no-underline leading-none whitespace-nowrap"
  class:scroll-linked={scrollLinked}
  style="letter-spacing: {letterSpacing}px; font-weight: {fontWeight};"
  href="/"
  aria-label="Andrew Richter, home"
  onmouseenter={() => (hovering = true)}
  onmouseleave={() => (hovering = false)}
>
  <span
    class="mark relative inline-block align-baseline min-w-[1cap] [-webkit-text-fill-color:transparent] me-[0.05em]"
    aria-hidden="true">A<span class="mark-svg"><AMark /></span></span
  >
  {#if trailVisible}
    <span class="trail" style="opacity: {t};" ontransitionend={handleTrailTransitionEnd}>
      <span class="trail-inner">
        ndrew
        <span
          class="mark relative inline-block align-baseline min-w-[1cap] [-webkit-text-fill-color:transparent]"
          aria-hidden="true">R<span class="mark-svg"><RMark /></span></span
        >ichter
      </span>
    </span>
  {/if}
</a>

<!-- Hidden probe used purely for width measurement, kept in sync with .brand's font -->
<span
  bind:this={measureEl}
  class="font-stix text-4xl leading-none whitespace-nowrap"
  style="position: absolute; visibility: hidden; top: 0; left: 0; pointer-events: none; font-weight: {weightBold};"
  aria-hidden="true">Andrew Richter</span
>

<style>
  .brand {
    transition:
      letter-spacing 300ms ease,
      font-weight 300ms ease;
  }

  .brand.scroll-linked {
    transition: none;
  }

  .trail {
    transition: opacity 150ms ease;
  }

  .mark-svg {
    position: absolute;
    display: flex;
    align-items: baseline;
    color: inherit;
    inset-inline: 0;
    top: 0;
    pointer-events: none;
  }

  .mark-svg::before {
    content: 'A';
    width: 0;
    overflow: hidden;
  }

  .mark-svg :global(svg) {
    width: 1cap;
    height: 1cap;
  }
</style>
