import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from '@/lib/gsap'
import { EASE, prefersReducedMotion } from '@/lib/motion'

/**
 * Slides a highlight pill to the element marked aria-current inside `track`.
 * First placement and resizes snap; route changes spring (back.out(1.25), .55s).
 */
export function useNavPill(track: RefObject<HTMLElement | null>, pill: RefObject<HTMLElement | null>, key: unknown, axis: 'x' | 'y') {
  useLayoutEffect(() => {
    const t = track.current
    const p = pill.current
    if (!t || !p) return

    const place = (animate: boolean) => {
      const item = t.querySelector<HTMLElement>('[aria-current="page"]')
      if (!item) {
        gsap.to(p, { opacity: 0, duration: 0.2, overwrite: true })
        return
      }
      const box = axis === 'y' ? { y: item.offsetTop, height: item.offsetHeight } : { x: item.offsetLeft, width: item.offsetWidth }
      const shown = Number(gsap.getProperty(p, 'opacity')) > 0
      if (!animate || !shown || prefersReducedMotion()) gsap.set(p, { ...box, opacity: 1 })
      else gsap.to(p, { ...box, opacity: 1, duration: 0.55, ease: EASE.pill, overwrite: true })
    }

    place(true)
    const ro = new ResizeObserver(() => place(false))
    ro.observe(t)
    return () => ro.disconnect()
  }, [track, pill, key, axis])
}
