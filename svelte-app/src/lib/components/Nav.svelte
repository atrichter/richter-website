<script lang="ts">
  import { page } from '$app/state'
  import { getIntroScrollRatio } from '$lib/utils'
  import Brand from './brand/Brand.svelte'

  let containerEl: HTMLDivElement | undefined = $state()

  let isHome = $derived(page.url.pathname === '/')
  let dropOffset = $state(0) // px translated down; 0 once docked or off-home
  let positionReady = $state(page.url.pathname !== '/')

  $effect(() => {
    if (!isHome) {
      dropOffset = 0
      positionReady = true
      return
    }

    let animationFrame: number | undefined

    const update = () => {
      const dropDistance = window.innerHeight * getIntroScrollRatio()
      dropOffset = Math.max(0, dropDistance - window.scrollY)
      positionReady = true
    }

    // iOS can dispatch several scroll events between paints. Updating the
    // sticky transform once per frame keeps this in step with async scrolling.
    const scheduleUpdate = () => {
      if (animationFrame !== undefined) return
      animationFrame = requestAnimationFrame(() => {
        animationFrame = undefined
        update()
      })
    }

    update()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      if (animationFrame !== undefined) cancelAnimationFrame(animationFrame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  })
</script>

<nav
  class="container layout-grid sticky top-0 z-100 h-(--nav-height) bg-transparent text-white mix-blend-difference"
  style="transform: translate3d(0, {dropOffset}px, 0); visibility: {positionReady ? 'visible' : 'hidden'};"
>
  <div class="flex items-center justify-between h-full col-span-4 lg:col-span-8" bind:this={containerEl}>
    <Brand {containerEl} />
  </div>
</nav>
