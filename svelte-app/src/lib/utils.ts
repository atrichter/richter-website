import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export type WithElementRef<T, E extends HTMLElement = HTMLElement> = T & {
  ref?: E | null
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getIntroScrollRatio(): number {
  const ratio = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--intro-nav-scroll-ratio')
  )
  return Number.isFinite(ratio) ? ratio : 2 / 3
}

/**
 * Given a container and a probe element containing the text to fit,
 * returns the letter-spacing (in px) that makes the probe's natural
 * width exactly match the container's width.
 *
 * Works by measuring width at two letter-spacing values and solving
 * the linear relationship, rather than assuming (chars - 1) gaps —
 * this stays correct regardless of how a given browser treats
 * trailing letter-spacing.
 */
export function measureMaxLetterSpacing(container: Element, probe: HTMLElement): number {
  const containerWidth = container.clientWidth

  probe.style.letterSpacing = '0px'
  const widthAtZero = probe.getBoundingClientRect().width

  probe.style.letterSpacing = '100px'
  const widthAtHundred = probe.getBoundingClientRect().width

  probe.style.letterSpacing = '0px'

  const pxPerGap = (widthAtHundred - widthAtZero) / 100
  if (pxPerGap <= 0 || containerWidth <= widthAtZero) return 0

  return (containerWidth - widthAtZero) / pxPerGap
}
