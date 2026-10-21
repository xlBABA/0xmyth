import { useRef } from 'react'
import type { LucideIcon } from 'lucide-react'
import { useLift } from '@/hooks/use-hover-fx'
import { cn, mergeRefs } from '@/lib/utils'

type CardProps = React.ComponentProps<'section'> & {
  /** rise 4px under the pointer */
  lift?: boolean
  /** take part in the page entrance (default) */
  enter?: boolean
}

export function Card({ lift = false, enter = true, className, ref, ...props }: CardProps) {
  const own = useRef<HTMLElement>(null)
  useLift(own, lift)
  return (
    <section
      ref={mergeRefs(own, ref)}
      data-slot="card"
      data-enter={enter ? 'card' : undefined}
      className={cn('relative min-w-0 rounded-card border border-line bg-surface p-4 shadow-card sm:p-5', className)}
      {...props}
    />
  )
}

type CardHeaderProps = {
  title: React.ReactNode
  icon?: LucideIcon
  /** id for aria-labelledby on the parent card */
  id?: string
  action?: React.ReactNode
  className?: string
}

export function CardHeader({ title, icon: Icon, id, action, className }: CardHeaderProps) {
  return (
    <header className={cn('mb-3.5 flex min-h-9 flex-wrap items-center justify-between gap-x-3 gap-y-2', className)}>
      <div className="flex min-w-0 items-center gap-2.5">
        {Icon && (
          <span className="grid size-8 flex-none place-items-center rounded-[10px] bg-well text-muted-foreground" aria-hidden>
            <Icon className="size-[17px]" />
          </span>
        )}
        <h2 id={id} className="truncate text-xl font-bold tracking-[-0.01em]">
          {title}
        </h2>
      </div>
      {action}
    </header>
  )
}
