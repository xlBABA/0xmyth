import { ArrowRight, UserRoundPen } from 'lucide-react'
import { Link } from 'react-router'
import { useCurtainLink } from '@/components/curtain'
import { Button } from '@/components/ui/button'
import { CURTAIN_LINES } from '@/content/landing'
import { cn } from '@/lib/utils'

export const DEMO_ENTRY = '/dashboard?demo=1'

/** The two landing calls to action; both travel into the app through the curtain. */
export function HeroCtas({ className, size = 'lg' }: { className?: string; size?: 'lg' | 'default' }) {
  const toDemo = useCurtainLink(DEMO_ENTRY, CURTAIN_LINES.demo)
  const toProfile = useCurtainLink('/start', CURTAIN_LINES.profile)
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      <Button asChild size={size} magnetic>
        <Link to={DEMO_ENTRY} onClick={toDemo}>
          Try with a demo student
          <ArrowRight />
        </Link>
      </Button>
      <Button asChild size={size} variant="secondary">
        <Link to="/start" onClick={toProfile}>
          <UserRoundPen />
          Build my profile
        </Link>
      </Button>
    </div>
  )
}
