<script lang="ts">
  import { page } from '$app/state'
  import Brand from './brand/Brand.svelte'

  let containerEl: HTMLDivElement | undefined = $state()

  let isHome = $derived(page.url.pathname === '/')
</script>

<nav
  class="container layout-grid sticky top-0 z-100 h-(--nav-height) bg-transparent text-white mix-blend-difference"
  class:home={isHome}
>
  <div class="flex items-center justify-between h-full col-span-4 lg:col-span-8" bind:this={containerEl}>
    <Brand {containerEl} />
  </div>
</nav>

<style>
  /* The nav scrolls from this normal-flow position, then native `sticky`
     holds it at the top. This avoids a transformed sticky element. */
  .home {
    margin-top: var(--nav-home-offset);
  }
</style>
