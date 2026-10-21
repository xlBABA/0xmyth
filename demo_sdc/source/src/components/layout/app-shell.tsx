import { Suspense, useLayoutEffect, useRef } from 'react'
import { Route, Routes } from 'react-router'
import { APP_ROUTES, NotFoundPage } from '@/app-routes'
import { markAppReady, shellGate } from '@/lib/app-ready'
import { gsap } from '@/lib/gsap'
import { dur, EASE, rise } from '@/lib/motion'
import { BottomNav } from './bottom-nav'
import { PageSkeleton } from './page-skeleton'
import { RouteTransition } from './route-transition'
import { Sidebar } from './sidebar'
import { TopBar } from './top-bar'

const visible = (els: HTMLElement[]) => els.filter((el) => el.offsetParent !== null)

/**
 * Everything after the landing page. On mount it waits for fonts (max 1.5 s) and for the
 * landing curtain if one is covering the screen, then reveals the
 * shell and plays the load sequence: sidebar slides in (bottom bar rises on mobile),
 * its items stagger, the top bar drops in, then the first page enters.
 */
export function AppShell() {
  const shell = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    let cancelled = false
    const ctx = gsap.context(() => {}, shell)
    const fonts = Promise.race([document.fonts?.ready ?? Promise.resolve(), new Promise((r) => setTimeout(r, 1500))])
    Promise.all([fonts, shellGate()]).then(() => {
      if (cancelled || !shell.current) return
      markAppReady()
      ctx.add(() => {
        const root = shell.current!
        const desktop = window.matchMedia('(min-width: 1024px)').matches
        const q = <T extends HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T>(sel))
        gsap
          .timeline()
          .fromTo(
            desktop ? '[data-shell="side"]' : '[data-shell="bottom"]',
            desktop ? { x: -60, opacity: 0 } : { y: 90, opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: dur(0.9), ease: EASE.out, clearProps: 'transform,opacity' },
            0,
          )
          .add(rise(visible(q('[data-shell-item]')), { x: -12, y: 0, stagger: 0.035 }), 0.15)
          .add(rise(visible(q('[data-shell-top]')), { y: -12, stagger: 0.05 }), 0.05)
      })
    })
    return () => {
      cancelled = true
      ctx.revert()
    }
  }, [])

  return (
    <div ref={shell} data-app className="min-h-dvh">
      <a
        href="#main"
        className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-ctl bg-ink px-4 py-2.5 font-bold text-background focus:translate-y-0"
      >
        Skip to content
      </a>
      <Sidebar />
      <div className="pb-[calc(84px+env(safe-area-inset-bottom))] lg:pb-0 lg:pl-[calc(var(--side-w)+var(--side-inset)*2)]">
        <div className="mx-auto max-w-[1360px] px-[var(--gutter)]">
          <TopBar />
          <main id="main" tabIndex={-1} className="outline-none">
            <RouteTransition>
              {(location) => (
                // the skeleton only shows on a cold load; later navigations preload first
                <Suspense fallback={<PageSkeleton />}>
                  <Routes location={location}>
                    {APP_ROUTES.map(({ path, Page }) => (
                      <Route key={path} path={path} element={<Page />} />
                    ))}
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              )}
            </RouteTransition>
          </main>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
