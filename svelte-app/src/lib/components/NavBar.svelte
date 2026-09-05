<script lang="ts">
  import AMark from './AMark.svelte'
</script>

<nav class="container-wide nav" aria-label="Main">
  <div class="nav-inner">
    <a class="mark" href="/" aria-label="Home">
      <AMark />
    </a>
  </div>
</nav>

<style>
  .nav {
    position: sticky;
    top: 0;
    z-index: 10;
    color: var(--color-white);
    background: transparent;
    mix-blend-mode: difference;
  }

  .nav-inner {
    display: flex;
    /* align-items: flex-end; */
    justify-content: space-between;
    padding: 2rem 0;
  }

  .mark {
    display: block;
    color: var(--color-white);
    font-size: 2.5rem;
  }
</style>
