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
  <path
    d="M72,72l72,72h-36s-18,0-36-36-36-36-36-36c19.88,0,36-16.12,36-36S55.88,0,36,0h36,0c19.88,0,36,16.12,36,36s-16.12,36-36,36Z"
  />
  <path d="M36,117c0,9.94,8.06,18,18,18v9H0V36S36,0,36,0v117Z" />
</svg>
