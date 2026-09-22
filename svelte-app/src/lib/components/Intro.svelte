<script lang="ts">
  import { onMount } from 'svelte'
  import { scroll } from 'motion'
  import { brandExpansion } from '$lib/state/brand-expansion.svelte'

  let introElement: HTMLElement

  onMount(() => {
    brandExpansion.sentinel = introElement
    let navHomeOffset: number | undefined

    const updateMetrics = () => {
      // Resolve the CSS `svh` value only when layout changes, never during
      // scroll. The brand and native-sticky nav now share one distance.
      const nav = document.querySelector<HTMLElement>('nav.home')
      const offset = nav ? Number.parseFloat(getComputedStyle(nav).marginTop) : Number.NaN
      if (Number.isFinite(offset) && offset > 0) navHomeOffset = offset
    }

    const updatePosition = (scrollY = window.scrollY) => {
      if (navHomeOffset === undefined) return
      const stickyProgress = Math.min(1, Math.max(0, scrollY / navHomeOffset))
      brandExpansion.t = 1 - stickyProgress
    }

    updateMetrics()
    updatePosition()
    const resizeObserver = new ResizeObserver(() => {
      updateMetrics()
      updatePosition()
    })
    resizeObserver.observe(introElement)
    const stopScroll = scroll((_progress, info) => updatePosition(info.y.current))

    return () => {
      resizeObserver.disconnect()
      stopScroll()
      if (brandExpansion.sentinel === introElement) brandExpansion.sentinel = null
    }
  })
</script>

<header class="intro -mt-(--nav-height) grain-lg bg-linear-to-br from-evergreen to-teal" bind:this={introElement}>
  <div class="container layout-grid grid-rows-(--intro-grid-rows) h-(--intro-height)">
    <div class="col-span-2 col-start-3 row-start-1 content-end lg:col-span-4 lg:col-start-9">
      <div class="pb-8 lg:p-0 mix-blend-difference tracking-wider">
        <h1 class="sr-only">Andrew Richter</h1>
        <p class="text-white leading-10 mt-0">
          I'm a software engineer who bridges design and development to ship polished, scalable web applications across
          modern frontend and backend systems.
        </p>
        <p class="text-white italic mb-0">I'm currently looking for work!</p>
      </div>
    </div>
  </div>
</header>
