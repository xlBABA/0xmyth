import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger, REDUCED_MOTION } from './gsap'

/**
 * Smooth wheel scrolling for the landing page only (lerp .1, as on the Lando reference).
 * Touch devices keep native scrolling, and reduced-motion users get no smoothing.
 * Returns the instance so callers can stop/start it or scroll to anchors.
 */
export function useSmoothScroll() {
  const lenis = useRef<Lenis | null>(null)

  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION).matches) return

    const instance = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenis.current = instance
    instance.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      gsap.ticker.lagSmoothing(500, 33)
      instance.destroy()
      lenis.current = null
    }
  }, [])

  return lenis
}
