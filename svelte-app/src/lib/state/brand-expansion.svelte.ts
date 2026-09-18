class BrandExpansion {
  /** The element to watch — when it scrolls out of view, the nav "docks". */
  sentinel = $state<HTMLElement | null>(null)
  /** 0 = collapsed, 1 = fully expanded. */
  t = $state(1)
}

export const brandExpansion = new BrandExpansion()
