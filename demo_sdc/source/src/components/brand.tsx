import { PRODUCT_NAME, PRODUCT_SHORT } from '@/config/product'
import { cn } from '@/lib/utils'

/** Product mark: a path from "today" (white) to "future" (coral). */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'grid size-10 flex-none place-items-center rounded-xl bg-[linear-gradient(140deg,#14a3bd,#0b6e85)] shadow-[0_8px_18px_-10px_#0b6e85]',
        className,
      )}
    >
      <svg viewBox="0 0 32 32" className="size-[26px]">
        <path d="M7 23c3.5 0 4.5-6 9-6s5.5-6 9-6" fill="none" stroke="#c9f3f8" strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="7" cy="23" r="2.7" fill="#fff" />
        <circle cx="25" cy="11" r="2.7" fill="#ff8a68" />
      </svg>
    </span>
  )
}

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex min-w-0 items-center gap-3">
      <BrandMark />
      {!compact && (
        <span className="grid min-w-0 leading-tight">
          <b className="truncate text-xl font-extrabold tracking-[-0.02em]">{PRODUCT_NAME}</b>
          <small className="truncate text-sm font-semibold opacity-70">{PRODUCT_SHORT}</small>
        </span>
      )}
    </span>
  )
}
