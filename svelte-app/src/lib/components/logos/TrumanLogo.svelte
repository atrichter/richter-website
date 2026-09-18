<script lang="ts">
  export let size: string = '1em'
  export let fill: string = 'currentColor'
  export let ariaLabel: string | null = null
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 109 124"
  width={size}
  height={size}
  {fill}
  fill-rule="evenodd"
  role={ariaLabel ? 'img' : 'presentation'}
  {...$$restProps}
>
  <polygon points="0 0 0 32 70 0 0 0" />
  <polygon points="11 34 109 34 109 6 11 34" />
  <polygon points="39 124 69 124 69 60.83 39 42 39 124" />
</svg>
