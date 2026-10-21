import { useRef } from 'react'
import { Link } from 'react-router'
import { CharText } from '@/components/page/char-text'
import { PRODUCT_NAME } from '@/config/product'
import { gsap, useGSAP } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'
import { HeroCtas } from './hero-ctas'

const LINE = 'Your path starts today.'

/** Closing call to action: huge masked title that rises in (Mango footer), then the footer. */
export function FinalCta() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const chars = gsap.utils.toArray<HTMLElement>('.split-ch')
      gsap.set(chars, { yPercent: 110 })
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: 'top 70%', once: true } })
        .to(chars, { yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.03 })
        .from('[data-final-rise]', { y: 24, opacity: 0, duration: 0.8, ease: 'expo.out', stagger: 0.1 }, 0.4)
    },
    { scope: root },
  )

  return (
    <>
      <section ref={root} className="mx-auto max-w-[1480px] px-[var(--gutter)] pt-16 pb-24 text-center">
        <h2 className="mx-auto max-w-[12ch] text-[clamp(3rem,1rem+7.4vw,9rem)] leading-[0.95] font-extrabold tracking-[-0.05em]">
          <CharText text={LINE} />
        </h2>
        <p data-final-rise className="mx-auto mt-6 max-w-[46ch] text-lg text-muted-foreground">
          Try the full flow with a demo student in under a minute, or start your own profile.
        </p>
        <div data-final-rise className="mt-8 flex justify-center">
          <HeroCtas />
        </div>
      </section>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[1480px] flex-wrap items-center justify-between gap-3 px-[var(--gutter)] py-6 text-sm text-muted-foreground">
          <p>
            <b className="text-foreground">{PRODUCT_NAME}</b> · SDC Hackathon 2026 · Domain 1 · Sponsor: Aiversecity
          </p>
          <p className="flex items-center gap-4">
            <span>Prototype with demo data</span>
            <Link to="/methodology" className="font-semibold text-foreground hover:underline">
              Methodology
            </Link>
          </p>
        </div>
      </footer>
    </>
  )
}
