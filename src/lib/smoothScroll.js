import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

// Eased scrolling: when the mouse wheel stops, the page glides to a stop
// instead of halting abruptly. Touch devices keep their native scrolling,
// and anyone who prefers reduced motion gets normal scrolling.
let lenis = null

export function startSmoothScroll() {
  if (typeof window === 'undefined' || lenis) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 1,
    smoothWheel: true,
    syncTouch: false,
  })

  const frame = (time) => {
    lenis.raf(time)
    requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

export function scrollToTop({ immediate = false } = {}) {
  if (lenis) {
    lenis.scrollTo(0, { immediate })
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
  }
}
