import { useRef, type RefObject } from 'react'
import type Lenis from 'lenis'
import { Badge } from '@/components/ui/badge'
import { HERO, STORY } from '@/content/landing'
import { useMediaQuery } from '@/hooks/use-media-query'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { canHover, prefersReducedMotion } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { Constellation } from './constellation'
import { STAGES } from './constellation-layouts'
import { HeroCtas } from './hero-ctas'

const PINNED = '(min-width: 960px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)'
const RAIL = ['Skills', 'Trends', 'Roles', 'Path', 'SDGs']

type HeroStoryProps = {
  /** false while the intro covers the page; the hero enters when it flips to true */
  ready: boolean
  lenis: RefObject<Lenis | null>
}

/**
 * Hero + five-stage story. On wide screens the section pins and one constellation travels
 * from the hero along a curved path (the Lando technique) into the story, then re-forms
 * at each stage while the copy fades in, holds and fades out (the Apple pattern), scrubbed
 * by scroll. Phones and reduced-motion users get a light stacked version instead.
 */
export function HeroStory({ ready, lenis }: HeroStoryProps) {
  const pinned = useMediaQuery(PINNED)
  return pinned ? <PinnedStory ready={ready} lenis={lenis} /> : <StackedStory ready={ready} />
}

function HeroTitle({ className }: { className?: string }) {
  return (
    <h1 className={cn('font-extrabold tracking-[-0.045em]', className)}>
      <span className="sr-only">{HERO.lines.join(' ')}</span>
      <span aria-hidden>
        {HERO.lines.map((line, li) => (
          <span key={li} className={cn('block', li === 1 && 'text-primary')}>
            {line.split(' ').map((word, wi) => (
              <span key={wi}>
                {wi > 0 && ' '}
                <span className="split-word" data-hero-word>
                  {Array.from(word).map((ch, ci) => (
                    <span key={ci} className="split-ch" data-hero-ch>
                      {ch}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </span>
        ))}
      </span>
    </h1>
  )
}

function HeroCopy() {
  return (
    <>
      <div data-hero-exit>
        <div data-hero-rise className="mb-6">
          <Badge tone="primary" dot enter={false} className="max-w-full whitespace-normal">
            {HERO.eyebrow}
          </Badge>
        </div>
      </div>
      <HeroTitle className="text-[clamp(2.7rem,1.2rem+5.2vw,6.6rem)] leading-[0.98]" />
      <div data-hero-exit>
        <p data-hero-rise className="mt-6 max-w-[52ch] text-lg text-muted-foreground sm:text-xl">
          {HERO.body}
        </p>
      </div>
      <div data-hero-exit>
        <div data-hero-rise className="mt-8">
          <HeroCtas />
        </div>
      </div>
    </>
  )
}

/** Hides the hero before the intro lifts, then plays the entrance (Mango's char rise). */
function useHeroEntrance(scope: RefObject<HTMLElement | null>, ready: boolean) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const chars = gsap.utils.toArray<HTMLElement>('[data-hero-ch]')
      const rises = gsap.utils.toArray<HTMLElement>('[data-hero-rise]')
      const dots = gsap.utils.toArray<SVGElement>('[data-visual] [data-dot]')
      if (!ready) {
        gsap.set(chars, { yPercent: 110, rotation: 7, transformOrigin: '0% 100%' })
        gsap.set(rises, { y: 26, opacity: 0 })
        gsap.set('[data-visual-inner]', { scale: 0.6, opacity: 0 })
        gsap.set(dots, { scale: 0, svgOrigin: '0 0' })
        return
      }
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .to(chars, { yPercent: 0, rotation: 0, duration: 1.15, stagger: 0.028, clearProps: 'transform' })
        .to(rises, { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, clearProps: 'transform,opacity' }, 0.35)
        .to('[data-visual-inner]', { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.4)' }, 0.2)
        .to(dots, { scale: 1, duration: 0.8, ease: 'back.out(2)', stagger: { each: 0.03, from: 'center' } }, 0.3)
    },
    { scope, dependencies: [ready] },
  )
}

function PinnedStory({ ready, lenis }: HeroStoryProps) {
  const root = useRef<HTMLElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  useHeroEntrance(root, ready)

  useGSAP(
    () => {
      const el = root.current!
      const visual = el.querySelector<HTMLElement>('[data-visual]')!
      const nodes = gsap.utils.toArray<SVGGElement>('[data-node]', el)
      const dots = gsap.utils.toArray<SVGCircleElement>('[data-dot]', el)
      const layers = gsap.utils.toArray<SVGGElement>('[data-layer]', el)
      const extra = (i: number) => el.querySelector(`[data-extra="${i}"]`)
      const steps = gsap.utils.toArray<HTMLElement>('[data-step]', el)
      const parts = steps.map((s) => s.querySelectorAll('[data-step-part]'))
      const railBars = gsap.utils.toArray<HTMLElement>('[data-rail-bar]', el)
      const railLabels = gsap.utils.toArray<HTMLElement>('[data-rail-label]', el)

      const heroX = () => innerWidth * 0.22
      const storyX = () => -innerWidth * 0.205

      gsap.set(visual, { xPercent: -50, yPercent: -50 })
      gsap.set(steps, { autoAlpha: 0 })
      parts.forEach((p) => gsap.set(p, { y: 50, opacity: 0 }))

      // node colours follow the formation under the playhead; flipping a CSS token (rather than
      // tweening fills) keeps them theme-aware, and the CSS transition smooths the change
      let toneSwitches: number[] = []
      let toneStage = -1
      const applyTones = () => {
        const t = tlRef.current?.time() ?? 0
        const stage = toneSwitches.filter((at) => t >= at).length
        if (stage === toneStage) return
        toneStage = stage
        STAGES[stage].nodes.forEach((n, j) => dots[j].style.setProperty('--c', `var(--${n.tone})`))
      }

      const tl = gsap.timeline({
        onUpdate: applyTones,
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: el, start: 'top top', end: '+=560%', pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true },
      })
      tlRef.current = tl

      // formation a → b, nodes slightly staggered so the shape "flows"
      const morph = (b: number, at: string) => {
        const a = b - 1
        STAGES[b].nodes.forEach((n, j) => {
          tl.to(nodes[j], { x: n.x, y: n.y, duration: 0.8, ease: 'power2.inOut' }, `${at}+=${j * 0.012}`)
          tl.to(dots[j], { attr: { r: n.r }, opacity: n.o, duration: 0.6, ease: 'power2.inOut' }, `${at}+=${0.1 + j * 0.012}`)
        })
        tl.addLabel(`tone${b}`, `${at}+=0.3`)
        tl.to(layers[a], { opacity: 0, duration: 0.25 }, at)
        tl.to(layers[b], { opacity: 1, duration: 0.35 }, `${at}+=0.55`)
        const extraA = extra(a)
        const extraB = extra(b)
        if (extraA) tl.to(extraA, a === 4 ? { attr: { 'stroke-dashoffset': 1 }, opacity: 0, duration: 0.4 } : { opacity: 0, duration: 0.25 }, at)
        if (extraB) tl.to(extraB, b === 4 ? { attr: { 'stroke-dashoffset': 0 }, opacity: 1, duration: 0.9, ease: 'power1.inOut' } : { opacity: 1, duration: 0.4 }, `${at}+=0.4`)
      }

      const stepIn = (i: number, at: string) => {
        tl.set(steps[i], { autoAlpha: 1 }, at)
          .to(parts[i], { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power2.out' }, at)
          .to(railBars[i], { scaleX: 1, duration: 0.4 }, at)
          .to(railLabels[i], { opacity: 1, duration: 0.3 }, at)
      }
      const stepOut = (i: number, at: string) => {
        tl.to(parts[i], { y: -50, opacity: 0, duration: 0.35, stagger: 0.04, ease: 'power2.in' }, at)
          .set(steps[i], { autoAlpha: 0 }, `${at}+=0.5`)
          .to(railLabels[i], { opacity: 0.45, duration: 0.3 }, at)
      }

      // hero → stage 1: the title spreads apart (Mango), the visual travels along an arc (Lando)
      const words = gsap.utils.toArray<HTMLElement>('[data-hero-word]', el)
      tl.addLabel('s1', 0)
        .to(words, { xPercent: (i) => (i - words.length / 2) * 14, opacity: 0, duration: 0.5, stagger: 0.015, ease: 'power2.in' }, 's1')
        .to('[data-hero-exit]', { y: -40, opacity: 0, duration: 0.35, stagger: 0.03, ease: 'power2.in' }, 's1')
        .fromTo(
          visual,
          { scale: 1.06 },
          {
            scale: 0.94,
            duration: 1,
            ease: 'power1.inOut',
            immediateRender: true,
            motionPath: {
              // a function so invalidateOnRefresh re-measures the arc on resize; GSAP evaluates
              // functions inside plugin vars, its typings just don't say so
              path: (() => [
                { x: heroX(), y: 0 },
                { x: innerWidth * 0.02, y: innerHeight * 0.17 },
                { x: storyX(), y: 0 },
              ]) as unknown as gsap.Point2D[],
              curviness: 1.25,
              fromCurrent: false,
            },
          },
          's1',
        )
      morph(1, 's1+=0.25')
      stepIn(0, 's1+=0.6')
      tl.to({}, { duration: 0.7 })

      for (let s = 2; s <= 5; s++) {
        const label = `s${s}`
        tl.addLabel(label)
        stepOut(s - 2, label)
        morph(s, `${label}+=0.15`)
        stepIn(s - 1, `${label}+=0.55`)
        tl.to({}, { duration: 0.7 })
      }

      toneSwitches = [1, 2, 3, 4, 5].map((b) => tl.labels[`tone${b}`])
      applyTones()

      // pointer parallax on the hero (Mango): visual drifts with the pointer, title against it
      if (canHover()) {
        const vx = gsap.quickTo('[data-visual-inner]', 'x', { duration: 0.8, ease: 'power3.out' })
        const vy = gsap.quickTo('[data-visual-inner]', 'y', { duration: 0.8, ease: 'power3.out' })
        const move = (e: PointerEvent) => {
          if (tl.progress() > 0.02) return
          vx((e.clientX / innerWidth - 0.5) * 36)
          vy((e.clientY / innerHeight - 0.5) * 28)
        }
        el.addEventListener('pointermove', move)
        return () => el.removeEventListener('pointermove', move)
      }
    },
    { scope: root },
  )

  // idle float, separate wrapper so it never fights the scroll or the parallax
  useGSAP(() => gsap.to('[data-visual-float]', { y: -12, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 }), { scope: root })

  const jumpTo = (stage: number) => {
    const st = tlRef.current?.scrollTrigger
    if (!st) return
    // land just after the step has faded in
    const y = st.labelToScroll(`s${stage + 1}`) + (st.end - st.start) * 0.06
    if (lenis.current) lenis.current.scrollTo(y, { duration: 1.4 })
    else window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <section ref={root} id="story" aria-label="How it works" className="relative h-dvh overflow-hidden">
      <div className="absolute inset-y-0 left-[var(--gutter)] z-[2] flex w-[min(54%,780px)] flex-col justify-center pt-16">
        <HeroCopy />
      </div>

      <div data-visual className="absolute top-1/2 left-1/2 z-[1] w-[min(620px,44vw,78vh)]" style={{ transform: 'translate(calc(-50% + 22vw), -50%)' }}>
        <div data-visual-float>
          <div data-visual-inner>
            <Constellation stage={0} scrollable />
          </div>
        </div>
      </div>

      <div className="absolute inset-y-0 right-[var(--gutter)] z-[2] grid w-[min(40%,540px)] items-center pt-10">
        <div className="grid">
          {STORY.map((s, i) => (
            // visual copy; screen readers get the plain list below
            <article key={s.title} data-step className="invisible [grid-area:1/1]" aria-hidden>
              <p data-step-part className="font-mono text-sm font-semibold text-primary">
                0{i + 1} <span className="text-faint">/ 05</span>
              </p>
              <p data-step-part className="mt-3 mb-4">
                <Badge tone="slate" enter={false}>
                  {s.eyebrow}
                </Badge>
              </p>
              <h2 data-step-part className="text-[clamp(2.1rem,1rem+2.5vw,3.9rem)] leading-[1.02] font-extrabold tracking-[-0.035em]">
                {s.title}
              </h2>
              <p data-step-part className="mt-5 max-w-[44ch] text-lg text-muted-foreground">
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </div>

      <ol className="sr-only">
        {STORY.map((s) => (
          <li key={s.title}>
            <h2>{s.title}</h2>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>

      <nav aria-label="Story steps" className="absolute right-[var(--gutter)] bottom-8 z-[3] w-[min(40%,540px)]">
        <ol className="grid grid-cols-5 gap-2">
          {RAIL.map((label, i) => (
            <li key={label}>
              <button type="button" onClick={() => jumpTo(i)} className="group grid w-full gap-2 rounded-md text-left">
                <span className="block h-1 overflow-hidden rounded-full bg-well">
                  <span data-rail-bar className="block h-full origin-left scale-x-0 rounded-full bg-primary" />
                </span>
                <span data-rail-label className="font-mono text-2xs font-semibold opacity-45 transition-colors group-hover:text-primary">
                  0{i + 1} {label}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  )
}

function StackedStory({ ready }: { ready: boolean }) {
  const root = useRef<HTMLDivElement>(null)
  useHeroEntrance(root, ready)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.to('[data-visual-float]', { y: -8, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      ScrollTrigger.batch('[data-m-reveal]', {
        start: 'top 86%',
        once: true,
        onEnter: (els) => gsap.fromTo(els, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'expo.out' }),
      })
    },
    { scope: root },
  )

  return (
    <div ref={root}>
      <section className="px-[var(--gutter)] pt-28 pb-10">
        <HeroCopy />
        <div data-visual className="mx-auto mt-10 w-[min(360px,82vw)]">
          <div data-visual-float>
            <div data-visual-inner>
              <Constellation stage={0} />
            </div>
          </div>
        </div>
      </section>

      <section id="story" aria-label="How it works" className="grid gap-14 px-[var(--gutter)] py-12">
        {STORY.map((s, i) => (
          <article key={s.title} className="grid gap-6">
            <div data-m-reveal>
              <p className="font-mono text-sm font-semibold text-primary">
                0{i + 1} <span className="text-faint">/ 05</span>
              </p>
              <p className="mt-2 mb-3">
                <Badge tone="slate" enter={false}>
                  {s.eyebrow}
                </Badge>
              </p>
              <h2 className="text-[clamp(1.9rem,1.2rem+3vw,2.8rem)] leading-[1.05] font-extrabold tracking-[-0.03em]">{s.title}</h2>
              <p className="mt-3 text-lg text-muted-foreground">{s.body}</p>
            </div>
            <div data-m-reveal className="rounded-card border border-line bg-surface p-5 shadow-card">
              <Constellation stage={i + 1} className="mx-auto max-w-[340px]" />
              <ul className="mt-4 flex flex-wrap justify-center gap-2" aria-label={`${s.eyebrow} examples`}>
                {STAGES[i + 1].chips.map((c) => (
                  <li key={c}>
                    <Badge tone={i === 4 ? 'teal' : 'primary'} enter={false}>
                      {c}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
