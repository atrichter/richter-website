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
  <path d="M90,136.47c10.64-5.06,18-15.9,18-28.47V36L144,0v144h-54v-7.53Z" />
  <path d="M63,136.47v7.53H0l46.96-46.96c-1.27,3.41-1.96,7.1-1.96,10.96C45,120.57,52.36,131.42,63,136.47Z" />
</svg>
