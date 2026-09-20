<script lang="ts">
  import { onMount } from 'svelte'
  import { brandExpansion } from '$lib/state/brand-expansion.svelte'

  // Intro text line-height bounds in rem
  const LINE_HEIGHT_START = 2.25
  const LINE_HEIGHT_END = 0.75

  let introElement: HTMLElement
  let lineHeight = $state(LINE_HEIGHT_START)

  onMount(() => {
    brandExpansion.sentinel = introElement
    let animationFrame: number | undefined
    let introTop = 0
    let introHeight = 1
    let navHomeOffset: number | undefined

    const updateMetrics = () => {
      const bounds = introElement.getBoundingClientRect()
      introTop = window.scrollY + bounds.top
      introHeight = bounds.height

      // Resolve the CSS `svh` value only when layout changes, never during
      // scroll. The brand and native-sticky nav now share one distance.
      const nav = document.querySelector<HTMLElement>('nav.home')
      const offset = nav ? Number.parseFloat(getComputedStyle(nav).marginTop) : Number.NaN
      if (Number.isFinite(offset) && offset > 0) navHomeOffset = offset
    }

    const updatePosition = () => {
      if (navHomeOffset === undefined) return
      // Keep scroll work write-only. Reading a bounding rect during every
      // scroll event can force layout on iOS, especially while the brand's
      // tracking and variable font weight are changing.
      const scrollProgress = Math.min(1, Math.max(0, (window.scrollY - introTop) / introHeight))
      const stickyProgress = Math.min(1, Math.max(0, window.scrollY / navHomeOffset))
      brandExpansion.t = 1 - stickyProgress
      lineHeight = LINE_HEIGHT_START - scrollProgress * (LINE_HEIGHT_START - LINE_HEIGHT_END)
    }

    const scheduleUpdate = () => {
      if (animationFrame !== undefined) return
      animationFrame = requestAnimationFrame(() => {
        animationFrame = undefined
        updatePosition()
      })
    }

    updateMetrics()
    updatePosition()
    const resizeObserver = new ResizeObserver(() => {
      updateMetrics()
      scheduleUpdate()
    })
    resizeObserver.observe(introElement)
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      if (animationFrame !== undefined) cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (brandExpansion.sentinel === introElement) brandExpansion.sentinel = null
    }
  })
</script>

<header class="intro -mt-(--nav-height) grain-lg bg-linear-to-br from-evergreen to-teal" bind:this={introElement}>
  <div class="container layout-grid grid-rows-(--intro-grid-rows) h-(--intro-height)">
    <div class="col-span-2 col-start-3 row-start-1 content-end lg:col-span-4 lg:col-start-9">
      <div class="pb-8 lg:p-0 mix-blend-difference tracking-wider">
        <h1 class="sr-only">Andrew Richter</h1>
        <p class="text-white mt-0" style="line-height: {lineHeight};">
          I'm a software engineer who bridges design and development to ship polished, scalable web applications across
          modern frontend and backend systems.
        </p>
        <p class="text-white italic mb-0">I'm currently looking for work!</p>
      </div>
    </div>
  </div>
</header>
