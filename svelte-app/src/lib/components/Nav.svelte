<script lang="ts">
  import { page } from '$app/stores'
  import { getIntroScrollRatio } from '$lib/utils'
  import Brand from './brand/Brand.svelte'

  let containerEl: HTMLDivElement | undefined = $state()

  let isHome = $derived($page.url.pathname === '/')
  let dropOffset = $state(0) // px translated down; 0 once docked or off-home

  $effect(() => {
    if (!isHome) {
      dropOffset = 0
      return
    }

    const update = () => {
      const dropDistance = window.innerHeight * getIntroScrollRatio()
      dropOffset = Math.max(0, dropDistance - window.scrollY)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  })
</script>

<nav
  class="container layout-grid sticky top-0 z-100 h-(--nav-height) bg-transparent text-white mix-blend-difference"
  style="transform: translateY({dropOffset}px);"
>
  <div class="flex items-center justify-between h-full col-span-4 lg:col-span-8" bind:this={containerEl}>
    <Brand {containerEl} />
  </div>
</nav>
