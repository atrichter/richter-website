export const INITIAL_REVEAL_DELAY_MS = 100
const REVEAL_STAGGER_MS = 100
const REVEAL_BOTTOM_INSET_PX = 32
const REVEAL_INTERSECTION_THRESHOLD = 0

type RevealQueueEntry = { element: HTMLElement; readyAt: number }

const queuedElements = new Set<HTMLElement>()
let queue: RevealQueueEntry[] = []
let observer: IntersectionObserver | undefined
let queueTimer: ReturnType<typeof setTimeout> | undefined
let nextRevealAt = 0

function sortQueue(): void {
  queue.sort((a, b) => {
    const aRect = a.element.getBoundingClientRect()
    const bRect = b.element.getBoundingClientRect()
    return aRect.top - bRect.top || aRect.left - bRect.left
  })
}

function scheduleNext(): void {
  if (queueTimer) {
    clearTimeout(queueTimer)
    queueTimer = undefined
  }
  if (queue.length === 0) return

  const entry = queue[0]
  const delay = Math.max(0, entry.readyAt - Date.now(), nextRevealAt - Date.now())

  queueTimer = setTimeout(() => {
    queueTimer = undefined
    const next = queue.shift()
    if (!next) return

    queuedElements.delete(next.element)
    delete next.element.dataset.revealReadyAt
    next.element.classList.add('is-revealed')
    nextRevealAt = Date.now() + REVEAL_STAGGER_MS
    scheduleNext()
  }, delay)
}

function getObserver(): IntersectionObserver | undefined {
  if (observer || typeof IntersectionObserver === 'undefined') return observer

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const element = entry.target as HTMLElement
        observer?.unobserve(element)
        if (!queuedElements.has(element)) {
          queuedElements.add(element)
          queue.push({ element, readyAt: Number(element.dataset.revealReadyAt ?? Date.now()) })
        }
      }

      if (queuedElements.size) sortQueue()
      scheduleNext()
    },
    {
      threshold: REVEAL_INTERSECTION_THRESHOLD,
      rootMargin: `0px 0px -${REVEAL_BOTTOM_INSET_PX}px 0px`,
    }
  )

  return observer
}

/** Reveal an element once it enters the viewport, with a shared reading-order queue. */
export function reveal(node: HTMLElement, delayMs = 0): { destroy(): void } {
  node.classList.add('reveal')
  node.dataset.revealReadyAt = String(Date.now() + Math.max(0, delayMs))

  if (typeof IntersectionObserver === 'undefined') {
    node.classList.add('is-revealed')
    delete node.dataset.revealReadyAt
    return { destroy() {} }
  }

  const sharedObserver = getObserver()
  if (!sharedObserver) {
    node.classList.add('is-revealed')
    delete node.dataset.revealReadyAt
    return { destroy() {} }
  }

  sharedObserver.observe(node)

  return {
    destroy() {
      sharedObserver.unobserve(node)
      queuedElements.delete(node)
      queue = queue.filter((entry) => entry.element !== node)
      delete node.dataset.revealReadyAt
      scheduleNext()
    },
  }
}
