import { flushSync } from 'react-dom'
import { STORAGE_PREFIX } from '@/config/product'
import { EASE, prefersReducedMotion } from './motion'

export type ThemePref = 'light' | 'dark' | 'system'
export type Theme = 'light' | 'dark'

const KEY = `${STORAGE_PREFIX}:theme`
const THEME_COLOR: Record<Theme, string> = { light: '#edf3f3', dark: '#0b1517' }
const systemDark = window.matchMedia('(prefers-color-scheme: dark)')
const listeners = new Set<() => void>()

export function getPref(): ThemePref {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '"system"')
    return v === 'light' || v === 'dark' ? v : 'system'
  } catch {
    return 'system'
  }
}

export const resolve = (pref = getPref()): Theme => (pref === 'system' ? (systemDark.matches ? 'dark' : 'light') : pref)

export const currentTheme = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')

export function subscribe(fn: () => void) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

function apply() {
  const theme = resolve()
  document.documentElement.dataset.theme = theme
  document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
  listeners.forEach((fn) => fn())
}

systemDark.addEventListener('change', () => {
  if (getPref() === 'system') apply()
})

/**
 * Saves the preference and switches theme. With an origin element, the new theme is
 * revealed by a circle growing out of it (View Transitions); otherwise it swaps instantly.
 */
export function setTheme(pref: ThemePref, origin?: Element | null) {
  try {
    localStorage.setItem(KEY, JSON.stringify(pref))
  } catch {
    // private mode: the switch still works for this visit
  }
  if (!origin || prefersReducedMotion() || !document.startViewTransition || resolve(pref) === currentTheme()) {
    apply()
    return
  }

  const r = origin.getBoundingClientRect()
  const x = r.left + r.width / 2
  const y = r.top + r.height / 2
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

  // flushSync so React state that depends on the theme (icons, labels) is in the new snapshot
  const transition = document.startViewTransition(() => flushSync(apply))
  transition.ready
    .then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 520, easing: EASE.wipe, pseudoElement: '::view-transition-new(root)' },
      )
    })
    .catch(() => {})
}
