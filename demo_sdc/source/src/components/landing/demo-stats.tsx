import { useRef } from 'react'
import { CountUp } from '@/components/page/count-up'
import { Badge } from '@/components/ui/badge'
import { DEMO_STATS } from '@/content/landing'
import { gsap, useGSAP } from '@/lib/gsap'
import { COUNT_FORMATS, countUp, prefersReducedMotion, type CountFormat } from '@/lib/motion'

/** Big launch-page numbers (Mango scale) that rise out of a mask and count up. All DEMO. */
export function DemoStats() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const nums = gsap.utils.toArray<HTMLElement>('[data-stat-num]')
      const counts = gsap.utils.toArray<HTMLElement>('[data-count]')
      gsap.set(nums, { yPercent: 110 })
      counts.forEach((el) => {
        el.textContent = COUNT_FORMATS[(el.dataset.format as CountFormat) ?? 'int'](0)
      })
      gsap
        .timeline({ scrollTrigger: { trigger: '[data-stats-grid]', start: 'top 78%', once: true } })
        .to(nums, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.1 })
        .call(() => countUp(counts), undefined, 0.15)
        .from('[data-stat-label]', { y: 16, opacity: 0, duration: 0.7, ease: 'expo.out', stagger: 0.1 }, 0.3)
    },
    { scope: root },
  )

  return (
    <section ref={root} id="stats" className="mx-auto max-w-[1480px] px-[var(--gutter)] py-24 lg:py-32">
      <div className="mb-12 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <Badge tone="amber" dot enter={false}>
            DEMO numbers, not real yet
          </Badge>
          <h2 className="mt-4 max-w-[16ch] text-[clamp(2.4rem,1.4rem+3.4vw,5rem)] leading-[1] font-extrabold tracking-[-0.04em]">The shift is already here.</h2>
        </div>
        <p className="max-w-[40ch] text-muted-foreground">
          Placeholder figures that show the layout. Each one will be replaced with a cited statistic before submission.
        </p>
      </div>
      <dl data-stats-grid className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {DEMO_STATS.map((s) => (
          <div key={s.label} className="border-b border-line py-8 sm:odd:pr-8 lg:border-b-0 lg:px-6 lg:first:pl-0 lg:[&:not(:first-child)]:border-l">
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <span className="block overflow-hidden pb-1">
                <span data-stat-num className="block text-[clamp(3.4rem,2rem+4.6vw,6.6rem)] leading-[0.95] font-extrabold tracking-[-0.05em]">
                  <CountUp value={s.value} format={s.format} />
                </span>
              </span>
              <span data-stat-label className="mt-3 flex items-start justify-between gap-3">
                <span className="text-lg font-semibold text-muted-foreground">{s.label}</span>
                <Badge tone="amber" enter={false} className="text-2xs">
                  DEMO
                </Badge>
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
