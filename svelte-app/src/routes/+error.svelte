<script>
  import { page } from '$app/state'
</script>

<div class="container">
  {#if page.status === 404}
    <h1>404</h1>
    <p>Page not found.</p>
  {:else}
    <h1>{page.status}</h1>
    <p>Something went wrong.</p>
  {/if}
</div>
