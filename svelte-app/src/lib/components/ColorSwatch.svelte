<script>
  export let name = ''
  export let hex = '#000000'
</script>

<div class="swatch">
  <div class="box" style="background:{hex}"></div>
  <div class="meta">
    <p class="name">{name}</p>
    <small>{hex}</small>
  </div>
</div>

<style>
  .swatch {
    display: flex;
    flex-direction: column;
    background: var(--color-white);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.125);
  }

  .box {
    width: 6rem;
    height: 6rem;
  }

  .meta {
    padding: 0.5rem;
  }

  .name {
    font-weight: var(--font-weight-lato-bold);
    text-transform: capitalize;
    margin: 0;
  }
</style>
