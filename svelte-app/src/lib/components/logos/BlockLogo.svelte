<script lang="ts">
  export let size: string = '1em'
  export let fill: string = 'currentColor'
  export let ariaLabel: string | null = null
</script>

<svg
  viewBox="0 0 440 440"
  width={size}
  height={size}
  {fill}
  xmlns="http://www.w3.org/2000/svg"
  shape-rendering="crispEdges"
  role={ariaLabel ? 'img' : 'presentation'}
  {...$$restProps}
>
  <rect x="0" y="0" width="120" height="120" rx="20" />
  <rect x="160" y="0" width="120" height="120" rx="20" />
  <rect x="320" y="0" width="120" height="120" rx="20" />
  <rect x="0" y="160" width="120" height="120" rx="20" />
  <rect x="160" y="160" width="120" height="120" rx="20" />
  <rect x="320" y="160" width="120" height="120" rx="20" />
  <rect x="0" y="320" width="120" height="120" rx="20" />
  <rect x="160" y="320" width="120" height="120" rx="20" />
  <rect x="320" y="320" width="120" height="120" rx="20" />
</svg>
