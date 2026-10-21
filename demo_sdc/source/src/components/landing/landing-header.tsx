import { useEffect, useRef, useState, type RefObject } from 'react'
import type Lenis from 'lenis'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { Brand } from '@/components/brand'
import { useCurtainLink } from '@/components/curtain'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { CURTAIN_LINES } from '@/content/landing'
import { gsap, useGSAP } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { DEMO_ENTRY } from './hero-ctas'

const LINKS = [
  { href: '#story', label: 'How it works' },
  { href: '#stats', label: 'The shift' },
  { href: '#principles', label: 'Principles' },
]

/** Fixed header: transparent over the hero, frosted once you scroll; drops in after the intro. */
export function LandingHeader({ ready, lenis }: { ready: boolean; lenis: RefObject<Lenis | null> }) {
  const root = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const toApp = useCurtainLink(DEMO_ENTRY, CURTAIN_LINES.demo)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      if (!ready) gsap.set(root.current, { yPercent: -100 })
      else gsap.to(root.current, { yPercent: 0, duration: 0.9, ease: 'expo.out', delay: 0.25, clearProps: 'transform' })
    },
    { dependencies: [ready] },
  )

  const jump = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const target = document.querySelector<HTMLElement>(href)
    if (!target) return
    e.preventDefault()
    if (lenis.current) lenis.current.scrollTo(target, { duration: 1.4 })
    else target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  return (
    <header
      ref={root}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled ? 'border-b border-line bg-[color-mix(in_srgb,var(--bg)_78%,transparent)] backdrop-blur-xl' : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1480px] items-center gap-4 px-[var(--gutter)]">
        <Link to="/" aria-label="Home" className="rounded-xl">
          <Brand />
        </Link>
        <nav aria-label="Sections" className="ml-6 hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => jump(e, l.href)} className="rounded-full px-3.5 py-2 text-md font-semibold text-muted-foreground transition-colors hover:bg-well hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>
        <span className="flex-1" />
        <ThemeToggle />
        <Button asChild size="sm" className="hidden h-11 sm:inline-flex" variant="ink">
          <Link to={DEMO_ENTRY} onClick={toApp}>
            Open the app
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </header>
  )
}
