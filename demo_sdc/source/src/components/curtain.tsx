import { createContext, useCallback, useContext, useRef } from 'react'
import { useNavigate } from 'react-router'
import type { BootSegment } from '@/content/landing'
import { holdShell } from '@/lib/app-ready'
import { typeLines } from '@/lib/boot-type'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

type Go = (to: string, options?: { origin?: Element | null; lines?: BootSegment[][] }) => void
const CurtainContext = createContext<Go>(() => {})

/**
 * Landing → app hand-off. A dark panel grows out of the clicked button (circle clip),
 * types a couple of boot lines, navigates underneath, then lifts away (expo.inOut) while
 * the app shell plays its load sequence. Lives above the router outlet so it survives
 * the route change.
 */
export function CurtainProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const panel = useRef<HTMLDivElement>(null)
  const linesRef = useRef<HTMLDivElement>(null)
  const busy = useRef(false)

  const go = useCallback<Go>(
    (to, { origin, lines = [] } = {}) => {
      const el = panel.current
      if (!el || busy.current || prefersReducedMotion()) {
        navigate(to)
        return
      }
      busy.current = true
      const r = origin?.getBoundingClientRect()
      const x = r ? r.left + r.width / 2 : innerWidth / 2
      const y = r ? r.top + r.height / 2 : innerHeight / 2
      const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

      gsap.set(el, { visibility: 'visible', yPercent: 0, clipPath: `circle(0px at ${x}px ${y}px)` })
      gsap.set(linesRef.current, { autoAlpha: 1, y: 0 })
      gsap.to(el, {
        clipPath: `circle(${radius}px at ${x}px ${y}px)`,
        duration: 0.7,
        ease: 'power3.inOut',
        onComplete: async () => {
          const typing = typeLines(linesRef.current!, lines, { step: 12, gap: 140 })
          await typing.finished
          await new Promise((res) => setTimeout(res, 160))
          const release = holdShell()
          navigate(to)
          // give the new route a frame to mount (and its chunk a moment to land)
          await new Promise((res) => setTimeout(res, 220))
          gsap
            .timeline({
              onComplete: () => {
                gsap.set(el, { visibility: 'hidden', clearProps: 'clipPath,transform' })
                busy.current = false
              },
            })
            .to(linesRef.current, { autoAlpha: 0, y: -20, duration: 0.35, ease: 'power2.in' })
            .call(release, undefined, 0.15)
            .to(el, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, 0.15)
        },
      })
    },
    [navigate],
  )

  return (
    <CurtainContext.Provider value={go}>
      {children}
      <div ref={panel} aria-hidden className="invisible fixed inset-0 z-[180] grid place-items-center bg-side px-[var(--gutter)] text-side-foreground">
        <div ref={linesRef} className="boot-lines w-full max-w-xl font-mono text-sm leading-[1.9] sm:text-md" />
      </div>
    </CurtainContext.Provider>
  )
}

/** onClick for links that should travel through the curtain; modified clicks open normally. */
// oxlint-disable-next-line react/only-export-components
export function useCurtainLink(to: string, lines?: BootSegment[][]) {
  const go = useContext(CurtainContext)
  return (e: React.MouseEvent<HTMLElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    go(to, { origin: e.currentTarget, lines })
  }
}
