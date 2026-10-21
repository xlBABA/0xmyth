import { useRef } from 'react'
import { ArrowLeft, ChevronRight, GraduationCap } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { Brand } from '@/components/brand'
import { preloadRoute } from '@/app-routes'
import { useNavPill } from '@/hooks/use-nav-pill'
import { cn } from '@/lib/utils'
import { activeIndex, NAV } from './nav-items'

const GROUPS = ['Workspace', 'Understand'] as const

export function Sidebar() {
  const { pathname } = useLocation()
  const active = activeIndex(pathname)
  const track = useRef<HTMLDivElement>(null)
  const pill = useRef<HTMLSpanElement>(null)
  useNavPill(track, pill, active, 'y')

  return (
    <aside
      data-shell="side"
      aria-label="Sidebar"
      className="fixed top-[var(--side-inset)] bottom-[var(--side-inset)] left-[var(--side-inset)] z-30 hidden w-[var(--side-w)] flex-col gap-4 overflow-y-auto rounded-side bg-side p-3 text-side-foreground [scrollbar-width:none] lg:flex dark:border dark:border-line"
    >
      <Link to="/" className="rounded-xl px-1.5 pt-1.5 pb-1" data-shell-item aria-label="Back to the landing page">
        <Brand />
      </Link>

      <div data-shell-item className="flex items-center gap-3 rounded-tile border border-white/10 bg-white/[.04] p-3">
        <span className="grid size-9 flex-none place-items-center rounded-[10px] bg-[linear-gradient(140deg,#ffb38f,#e8603b)] text-[#3b1306]" aria-hidden>
          <GraduationCap className="size-5" />
        </span>
        <span className="grid min-w-0 leading-tight">
          <b className="truncate text-base">Prototype workspace</b>
          <small className="truncate text-sm text-side-dim">SDC Hackathon 2026</small>
        </span>
      </div>

      <nav aria-label="Main">
        <div ref={track} className="relative grid gap-1">
          <span ref={pill} aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-11 rounded-[13px] bg-side-pill opacity-0 shadow-[0_10px_24px_-14px_#9fe3ece6]" />
          {GROUPS.map((group, g) => (
            <div key={group} className="contents">
              <p data-shell-item className={cn('mb-1 px-3 text-2xs font-bold tracking-[.14em] text-side-dim uppercase', g > 0 && 'mt-3')}>
                {group}
              </p>
              {NAV.filter((n) => n.group === group).map((item) => {
                const isActive = NAV.indexOf(item) === active
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    data-shell-item
                    aria-current={isActive ? 'page' : undefined}
                    onPointerEnter={() => preloadRoute(item.to)}
                    className={cn(
                      'group relative z-[1] flex h-11 items-center gap-3 rounded-[13px] px-3 text-lg font-bold transition-colors duration-200',
                      isActive ? 'text-side-pill-foreground' : 'text-side-foreground hover:bg-side-hover',
                    )}
                  >
                    <item.icon className="size-[19px] flex-none" aria-hidden />
                    <span className="truncate">{item.label}</span>
                    <ChevronRight
                      aria-hidden
                      className={cn('ml-auto size-4 opacity-0 transition-opacity', !isActive && 'group-hover:opacity-60')}
                    />
                  </Link>
                )
              })}
            </div>
          ))}
        </div>
      </nav>

      <div className="mt-auto grid gap-2">
        <div data-shell-item className="rounded-tile border border-white/10 bg-white/[.04] p-3">
          <p className="flex items-center gap-2 text-base font-bold" style={{ '--c': 'var(--amber)' } as React.CSSProperties}>
            <i className="live-dot" aria-hidden />
            Demo data
          </p>
          <p className="mt-1 text-sm leading-snug text-side-dim">
            Example students and fake sources. Numbers here are not real yet.
          </p>
        </div>
        <Link
          to="/"
          data-shell-item
          className="flex h-10 items-center gap-2 rounded-[12px] px-3 text-md font-semibold text-side-dim transition-colors hover:bg-side-hover hover:text-side-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to home
        </Link>
      </div>
    </aside>
  )
}
