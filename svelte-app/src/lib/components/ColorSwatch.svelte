<script>
  export let name = ''
  export let hex = '#000000'
</script>

<div class="flex flex-col bg-white shadow-sm">
  <div class="aspect-square w-full" style:background={hex}></div>
  <div class="p-2">
    <p class="m-0 font-lato font-bold capitalize">{name}</p>
    <small>{hex}</small>
  </div>
</div>
