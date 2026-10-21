import { useRef } from 'react'
import { FileSearch, Scale, ShieldCheck } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { PRINCIPLES } from '@/content/landing'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { prefersReducedMotion, riseCards } from '@/lib/motion'

const ICONS = [Scale, FileSearch, ShieldCheck]

export function Principles() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const cards = gsap.utils.toArray<HTMLElement>('[data-principle]')
      gsap.set(cards, { opacity: 0 })
      ScrollTrigger.create({ trigger: root.current, start: 'top 72%', once: true, onEnter: () => riseCards(cards, { stagger: 0.1 }) })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="principles" className="mx-auto max-w-[1480px] px-[var(--gutter)] py-20">
      <h2 className="max-w-[20ch] text-[clamp(2.1rem,1.3rem+2.6vw,4rem)] leading-[1.02] font-extrabold tracking-[-0.04em]">
        AI supports your decision. <span className="text-primary">It doesn't make it.</span>
      </h2>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {PRINCIPLES.map((p, i) => {
          const Icon = ICONS[i]
          return (
            <Card key={p.title} data-principle enter={false} lift className="p-6 sm:p-7">
              <span className="mb-5 grid size-11 place-items-center rounded-tile bg-well text-primary" aria-hidden>
                <Icon className="size-5" />
              </span>
              <h3 className="text-2xl font-extrabold tracking-[-0.02em]">{p.title}</h3>
              <p className="mt-2 text-muted-foreground">{p.body}</p>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
