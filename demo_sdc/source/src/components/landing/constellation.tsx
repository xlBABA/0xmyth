import { cn } from '@/lib/utils'
import { HUB_RADIUS, HUBS, PATH_D, STAGES, TREND_AXIS, VIEW } from './constellation-layouts'

type ConstellationProps = {
  /** formation to render */
  stage: number
  /**
   * Desktop scroll mode: render every stage's labels and extras (hidden except `stage`)
   * so the story timeline can cross-fade them. Static mode renders only `stage`.
   */
  scrollable?: boolean
  className?: string
}

/**
 * The persistent landing visual. Node colour comes from a CSS variable (--c) with a CSS
 * transition, so the scroll timeline only flips tokens and the colours follow the theme.
 */
export function Constellation({ stage, scrollable = false, className }: ConstellationProps) {
  const s = STAGES[stage]
  const shows = (i: number) => (scrollable || stage === i ? (stage === i ? 1 : 0) : null)
  const trendNodes = STAGES[2].nodes

  return (
    <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className={cn('cn block h-auto w-full overflow-visible', className)} aria-hidden>
      {/* extras that belong to a formation: axis + stems, role rings, the learning path */}
      {shows(2) !== null && (
        <g data-extra="2" opacity={shows(2)!}>
          <line x1="30" x2="570" y1={TREND_AXIS} y2={TREND_AXIS} className="stroke-line-2" strokeWidth="1.5" strokeDasharray="4 6" />
          {trendNodes.map((n, j) => (
            <line key={j} x1={n.x} x2={n.x} y1={TREND_AXIS} y2={n.y} stroke={`var(--${n.tone})`} strokeOpacity=".35" strokeWidth="2" />
          ))}
        </g>
      )}
      {shows(3) !== null && (
        <g data-extra="3" opacity={shows(3)!}>
          {HUBS.map((h) => (
            <circle key={h.name.join()} cx={h.x} cy={h.y} r={HUB_RADIUS} fill={`color-mix(in srgb, var(--${h.tone}) 8%, transparent)`} stroke={`var(--${h.tone})`} strokeOpacity=".35" strokeWidth="1.5" strokeDasharray="3 5" />
          ))}
        </g>
      )}
      {shows(4) !== null && (
        <path
          data-extra="4"
          d={PATH_D}
          pathLength={1}
          fill="none"
          stroke="var(--primary)"
          strokeOpacity=".5"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1"
          strokeDashoffset={stage === 4 ? 0 : 1}
          // a fully offset dash still paints its round cap as a dot, so hide it outright too
          opacity={stage === 4 ? 1 : 0}
        />
      )}

      {s.nodes.map((n, j) => (
        <g key={j} data-node transform={`translate(${n.x} ${n.y})`}>
          <circle data-dot r={n.r} opacity={n.o} style={{ '--c': `var(--${n.tone})` } as React.CSSProperties} />
        </g>
      ))}

      {scrollable &&
        STAGES.map((st, i) => (
          <g key={i} data-layer={i} opacity={i === stage ? 1 : 0}>
            {st.labels.map((l, k) => (
              <text
                key={k}
                x={l.x}
                y={l.y}
                fontSize={l.size ?? 15}
                fontWeight={l.weight ?? 700}
                textAnchor={l.anchor ?? 'start'}
                fill={l.fill ?? (l.muted ? 'var(--muted)' : 'var(--text)')}
              >
                {l.text}
              </text>
            ))}
          </g>
        ))}
    </svg>
  )
}
