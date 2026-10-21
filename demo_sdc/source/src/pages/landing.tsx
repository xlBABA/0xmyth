import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { DemoStats } from '@/components/landing/demo-stats'
import { FinalCta } from '@/components/landing/final-cta'
import { HeroStory } from '@/components/landing/hero-story'
import { LandingHeader } from '@/components/landing/landing-header'
import { LandingIntro } from '@/components/landing/landing-intro'
import { Principles } from '@/components/landing/principles'
import { RoleMarquee } from '@/components/landing/role-marquee'
import { PRODUCT_NAME, PRODUCT_TAGLINE, STORAGE_PREFIX } from '@/config/product'
import { ScrollTrigger } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'
import { useSmoothScroll } from '@/lib/smooth-scroll'

const INTRO_KEY = `${STORAGE_PREFIX}:intro-seen`

function introAlreadySeen() {
  try {
    return sessionStorage.getItem(INTRO_KEY) === '1'
  } catch {
    return false
  }
}

type IntroState = 'playing' | 'lifting' | 'done'

export default function Landing() {
  const lenis = useSmoothScroll()
  // the boot intro plays once per browser session and never under reduced motion
  const [intro, setIntro] = useState<IntroState>(() => (prefersReducedMotion() || introAlreadySeen() ? 'done' : 'playing'))
  const ready = intro !== 'playing'

  useLayoutEffect(() => {
    document.title = `${PRODUCT_NAME} — ${PRODUCT_TAGLINE}`
    window.scrollTo(0, 0)
  }, [])

  // keep the page still while the intro covers it
  useEffect(() => {
    if (intro === 'done') return
    const html = document.documentElement
    const smooth = lenis.current
    html.style.overflow = 'hidden'
    smooth?.stop()
    return () => {
      html.style.overflow = ''
      smooth?.start()
      ScrollTrigger.refresh()
    }
  }, [intro, lenis])

  const onLift = useCallback(() => setIntro('lifting'), [])
  const onDone = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, '1')
    } catch {
      // storage blocked: the intro will just play again next time
    }
    setIntro('done')
  }, [])

  return (
    <>
      {intro !== 'done' && <LandingIntro onLift={onLift} onDone={onDone} />}
      <LandingHeader ready={ready} lenis={lenis} />
      <main id="main">
        <HeroStory ready={ready} lenis={lenis} />
        <RoleMarquee />
        <DemoStats />
        <Principles />
        <FinalCta />
      </main>
    </>
  )
}
