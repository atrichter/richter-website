<script lang="ts">
  export let size: string = '1em'
  export let fill: string = 'currentColor'
  export let ariaLabel: string | null = null
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 144 144"
  width={size}
  height={size}
  {fill}
  role={ariaLabel ? 'img' : 'presentation'}
  {...$$restProps}
>
  <path d="M108,117c0,9.94-8.06,18-18,18v9h54V0l-36,36v81Z" />
  <path d="M54,90c-5.65,7.52-9,16.87-9,27s8.06,18,18,18v9H0l54-54h0Z" />
</svg>
