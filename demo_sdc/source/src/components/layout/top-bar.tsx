import { Sparkles, UserRoundPen } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { Brand } from '@/components/brand'
import { PRODUCT_NAME } from '@/config/product'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { activeIndex, NAV } from './nav-items'

export function TopBar() {
  const { pathname } = useLocation()
  const current = NAV[activeIndex(pathname)]

  return (
    <header className="flex items-center gap-3 py-3 lg:py-[18px]">
      <Link to="/" data-shell-top className="flex min-w-0 items-center gap-2.5 rounded-xl lg:hidden" aria-label="Back to the landing page">
        <Brand compact />
        <span className="truncate text-xl font-extrabold tracking-[-0.02em]">{current?.label ?? PRODUCT_NAME}</span>
      </Link>

      <p data-shell-top className="hidden items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-sm font-semibold text-muted-foreground shadow-card lg:flex">
        <Sparkles className="size-4 text-primary" aria-hidden />
        AI gives you evidence and options. The decision stays yours.
      </p>

      <span className="flex-1" />

      <div data-shell-top>
        <ThemeToggle />
      </div>
      {!pathname.startsWith('/start') && (
        <div data-shell-top className="hidden sm:block">
          <Button asChild magnetic>
            <Link to="/start">
              <UserRoundPen />
              Build my profile
            </Link>
          </Button>
        </div>
      )}
    </header>
  )
}
