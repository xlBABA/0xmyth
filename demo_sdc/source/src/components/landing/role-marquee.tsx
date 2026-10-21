import { useRef } from 'react'
import { MARQUEE_ROLES } from '@/content/landing'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

/** Endless strip of future roles that speeds up and skews with scroll velocity (Mango). */
export function RoleMarquee() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const track = root.current!.querySelector('[data-track]')!
      const loop = gsap.to(track, { xPercent: -50, duration: 26, ease: 'none', repeat: -1 })
      const skew = gsap.quickTo(track, 'skewX', { duration: 0.4, ease: 'power2.out' })
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const v = self.getVelocity() / 60
          gsap.to(loop, { timeScale: gsap.utils.clamp(0.4, 4, 1 + Math.abs(v) * 0.12), duration: 0.3, overwrite: true })
          skew(gsap.utils.clamp(-8, 8, v * 0.6))
        },
        onLeave: () => skew(0),
        onLeaveBack: () => skew(0),
      })
    },
    { scope: root },
  )

  const chunk = (
    <span className="flex items-center">
      {MARQUEE_ROLES.map((r) => (
        <span key={r} className="flex items-center">
          <span className="px-6">{r}</span>
          <span className="text-coral" aria-hidden>
            ✦
          </span>
        </span>
      ))}
    </span>
  )

  return (
    <div ref={root} className="overflow-hidden py-14">
      <p className="sr-only">Example future roles: {MARQUEE_ROLES.join(', ')}.</p>
      <div aria-hidden className="-rotate-[1.6deg] scale-[1.04] bg-primary py-5 text-primary-foreground shadow-pop">
        <div data-track className="flex w-max text-[clamp(1.5rem,1rem+2vw,2.6rem)] font-extrabold tracking-[-0.02em] whitespace-nowrap">
          {chunk}
          {chunk}
        </div>
      </div>
    </div>
  )
}
