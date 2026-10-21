import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, type Location } from 'react-router'
import { preloadRoute } from '@/app-routes'
import { gsap } from '@/lib/gsap'
import { EASE, prefersReducedMotion } from '@/lib/motion'

/**
 * Keeps rendering the previous location while it fades out (.18s, y -8) and the next
 * page's chunk loads, then swaps in the new one, which runs its own entrance through
 * <Page>. A navigation that lands mid-fade retargets the same fade.
 */
export function RouteTransition({ children }: { children: (location: Location) => React.ReactNode }) {
  const location = useLocation()
  const [shown, setShown] = useState(location)
  const frame = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (location.key === shown.key) return
    let alive = true
    const swap = () => {
      if (alive) setShown(location)
    }
    const loaded = preloadRoute(location.pathname)
    const el = frame.current
    if (location.pathname === shown.pathname || !el || prefersReducedMotion()) {
      loaded.then(swap)
      return () => {
        alive = false
      }
    }
    let fade: gsap.core.Tween | undefined
    const faded = new Promise<void>((resolve) => {
      fade = gsap.to(el, { opacity: 0, y: -8, duration: 0.18, ease: EASE.in, onComplete: resolve })
    })
    Promise.all([faded, loaded]).then(swap)
    return () => {
      alive = false
      fade?.kill()
    }
  }, [location, shown])

  useLayoutEffect(() => {
    if (frame.current) gsap.set(frame.current, { clearProps: 'opacity,transform' })
    window.scrollTo({ top: 0 })
  }, [shown.pathname])

  return <div ref={frame}>{children(shown)}</div>
}
