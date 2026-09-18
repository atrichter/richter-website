<script lang="ts">
  import { onMount } from 'svelte'
  import { brandExpansion } from '$lib/state/brand-expansion.svelte'
  import { getIntroScrollRatio } from '$lib/utils'

  // Intro text line-height bounds in rem
  const LINE_HEIGHT_START = 2.25
  const LINE_HEIGHT_END = 0.75

  let introElement: HTMLElement
  let lineHeight = $state(LINE_HEIGHT_START)

  onMount(() => {
    brandExpansion.sentinel = introElement

    const updatePosition = () => {
      const bounds = introElement.getBoundingClientRect()
      const scrollProgress = Math.min(1, Math.max(0, 1 - bounds.bottom / bounds.height))
      const stickyProgress = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * getIntroScrollRatio())))
      brandExpansion.t = 1 - stickyProgress
      lineHeight = LINE_HEIGHT_START - scrollProgress * (LINE_HEIGHT_START - LINE_HEIGHT_END)
    }

    updatePosition()
    window.addEventListener('scroll', updatePosition, { passive: true })

    return () => {
      window.removeEventListener('scroll', updatePosition)
      if (brandExpansion.sentinel === introElement) brandExpansion.sentinel = null
    }
  })
</script>

<header
  class="intro -mt-(--nav-height) bg-fixed grain-lg bg-linear-to-br from-evergreen to-teal"
  bind:this={introElement}
>
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
