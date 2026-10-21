import { useRef } from 'react'
import { Link, useLocation } from 'react-router'
import { preloadRoute } from '@/app-routes'
import { useNavPill } from '@/hooks/use-nav-pill'
import { cn } from '@/lib/utils'
import { activeIndex, NAV } from './nav-items'

/** Mobile/tablet navigation: a floating bar at the bottom with the same sliding pill. */
export function BottomNav() {
  const { pathname } = useLocation()
  const active = activeIndex(pathname)
  const track = useRef<HTMLDivElement>(null)
  const pill = useRef<HTMLSpanElement>(null)
  useNavPill(track, pill, active, 'x')

  return (
    <nav
      data-shell="bottom"
      aria-label="Main"
      className="fixed inset-x-2.5 bottom-[max(10px,env(safe-area-inset-bottom))] z-30 rounded-[22px] bg-side p-1.5 text-side-foreground shadow-pop lg:hidden dark:border dark:border-line"
    >
      <div ref={track} className="relative grid grid-cols-4">
        <span ref={pill} aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-0 rounded-[16px] bg-side-pill opacity-0" />
        {NAV.map((item, i) => (
          <Link
            key={item.to}
            to={item.to}
            aria-current={i === active ? 'page' : undefined}
            onPointerDown={() => preloadRoute(item.to)}
            className={cn(
              'relative z-[1] flex min-h-[54px] flex-col items-center justify-center gap-0.5 rounded-[16px] text-2xs font-bold transition-colors duration-200',
              i === active ? 'text-side-pill-foreground' : 'text-side-dim [@media(hover:none)]:active:opacity-70',
            )}
          >
            <item.icon className="size-5" aria-hidden />
            {item.short}
          </Link>
        ))}
      </div>
    </nav>
  )
}
