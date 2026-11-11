<script lang="ts">
  import { page } from '$app/state'
  import AMark from './AMark.svelte'
  import RMark from './RMark.svelte'
  import { brandExpansion } from '$lib/state/brand-expansion.svelte'
  import { INITIAL_REVEAL_DELAY_MS } from '$lib/actions/reveal'
  import { measureMaxLetterSpacing } from '$lib/utils'

  let { containerEl = null }: { containerEl?: HTMLElement | null } = $props()

  let isHome = $derived(page.url.pathname === '/')
  let hovering = $state(false)
  let focused = $state(false)
  let stuck = $state(false)
  let sentinelReady = $state(false)

  let maxLetterSpacing = $state(0)
  let weightRegular = $state(400)
  let weightBold = $state(700)

  let measureEl: HTMLSpanElement | undefined = $state()

  // While on home and the intro hasn't scrolled past yet, scroll owns the
  // target. Otherwise (docked, or any other page) hover/focus owns it.
  let scrollLinked = $derived(isHome && sentinelReady && !stuck)
  let targetT = $derived(scrollLinked ? brandExpansion.t : hovering || focused ? 1 : 0)

  // `t` is the smoothed value rendered in the template. Everything the
  // animation loop touches lives in plain (non-reactive) variables.
  let t = $state(0)
  let currentT = 0
  let targetValue = 0
  let rafId = 0
  let lastTime = 0
  let initialized = false
  let initialExpandDelayPending = true
  let initialExpandTimer: ReturnType<typeof setTimeout> | undefined

  // Exponential smoothing, frame-rate independent, higher is snappier.
  const SMOOTHING = 12

  function tick(now: number) {
    const dt = Math.min((now - lastTime) / 1000, 0.1)
    lastTime = now

    const diff = targetValue - currentT

    if (Math.abs(diff) < 0.001) {
      currentT = targetValue
      t = currentT
      rafId = 0
      return
    }

    currentT += diff * (1 - Math.exp(-SMOOTHING * dt))
    t = currentT
    rafId = requestAnimationFrame(tick)
  }

  // Only pushes the new target and makes sure the loop is running.
  // It never cancels a running loop, so rapid target changes don't interrupt it.
  $effect(() => {
    const target = targetT
    targetValue = target

    // Snap on first run (no ease-in from 0 on load).
    if (!initialized) {
      initialized = true
      currentT = target
      t = target
      return
    }

    if (target > currentT && initialExpandDelayPending) {
      initialExpandDelayPending = false
      if (scrollLinked && !hovering && !focused) {
        initialExpandTimer = setTimeout(() => {
          initialExpandTimer = undefined
          if (!rafId) {
            lastTime = performance.now()
            rafId = requestAnimationFrame(tick)
          }
        }, INITIAL_REVEAL_DELAY_MS)
        return
      }
    }

    if (!rafId && !initialExpandTimer) {
      lastTime = performance.now()
      rafId = requestAnimationFrame(tick)
    }
  })

  // Stop pending work and the animation loop on unmount.
  $effect(() => {
    return () => {
      if (initialExpandTimer) clearTimeout(initialExpandTimer)
      initialExpandTimer = undefined
      if (rafId) cancelAnimationFrame(rafId)
      rafId = 0
    }
  })

  let letterSpacing = $derived(t * maxLetterSpacing)
  let fontWeight = $derived(weightRegular + t * (weightBold - weightRegular))
  let trailVisible = $derived(t > 0)

  function handlePointerEnter(event: PointerEvent) {
    // Only a physical mouse/trackpad controls expansion.
    if (event.pointerType === 'mouse') hovering = true
  }

  function handlePointerLeave(event: PointerEvent) {
    if (event.pointerType === 'mouse') hovering = false
  }

  function handleFocus() {
    focused = true
  }

  function handleBlur() {
    focused = false
  }

  // Watch the intro sentinel and toggle `stuck` when it scrolls out of view.
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
    const container = containerEl
    const el = measureEl

    if (!container || !el) return

    const recompute = () => {
      maxLetterSpacing = measureMaxLetterSpacing(container, el)
    }

    recompute()

    const ro = new ResizeObserver(recompute)
    ro.observe(container)

    return () => ro.disconnect()
  })

  // Read font weights and recompute measurement after fonts load.
  $effect(() => {
    let active = true

    const styles = getComputedStyle(document.documentElement)

    const r = parseFloat(styles.getPropertyValue('--font-weight-stix-regular'))
    const b = parseFloat(styles.getPropertyValue('--font-weight-stix-bold'))

    if (!Number.isNaN(r)) weightRegular = r
    if (!Number.isNaN(b)) weightBold = b

    const container = containerEl
    const el = measureEl

    document.fonts?.ready?.then(() => {
      if (active && container && el) {
        maxLetterSpacing = measureMaxLetterSpacing(container, el)
      }
    })

    return () => {
      active = false
    }
  })
</script>

<a
  class="brand inline-flex items-baseline text-white font-stix text-4xl no-underline leading-none whitespace-nowrap"
  style="letter-spacing: {letterSpacing}px; font-weight: {fontWeight};"
  href="/"
  aria-label="Andrew Richter, home"
  onpointerenter={handlePointerEnter}
  onpointerleave={handlePointerLeave}
  onfocus={handleFocus}
  onblur={handleBlur}
>
  <span
    class="mark relative inline-block align-baseline min-w-[1cap] [-webkit-text-fill-color:transparent] me-[0.05em]"
    aria-hidden="true">A<span class="mark-svg"><AMark /></span></span
  >
  {#if trailVisible}
    <span class="trail" style="opacity: {t};">
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

<!-- Hidden probe used purely for width measurement, kept in sync with .brand's font. -->
<span
  bind:this={measureEl}
  class="font-stix text-4xl leading-none whitespace-nowrap"
  style="position: absolute; visibility: hidden; top: 0; left: 0; pointer-events: none; font-weight: {weightBold};"
  aria-hidden="true">Andrew Richter</span
>

<style>
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
