import { STORAGE_PREFIX } from '@/config/product'
import { prefersReducedMotion } from './motion'

export type ThemePref = 'light' | 'dark' | 'system'
export type Theme = 'light' | 'dark'
export const ACCENTS = ['emerald', 'petrol', 'indigo', 'tomato'] as const
export type Accent = (typeof ACCENTS)[number]

const THEME_KEY = `${STORAGE_PREFIX}:theme`
const ACCENT_KEY = `${STORAGE_PREFIX}:accent`
const THEME_COLOR: Record<Theme, string> = { light: '#ece8df', dark: '#0f1412' }
const systemDark = window.matchMedia('(prefers-color-scheme: dark)')
const listeners = new Set<() => void>()

function read<T extends string>(key: string, fallback: T, allowed: readonly T[]): T {
  try {
    const v = JSON.parse(localStorage.getItem(key) ?? JSON.stringify(fallback))
    return allowed.includes(v) ? v : fallback
  } catch {
    return fallback
  }
}
function write(key: string, value: string) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // private mode: the change still applies for this visit
  }
}

export const getPref = () => read<ThemePref>(THEME_KEY, 'system', ['light', 'dark', 'system'])
export const resolve = (pref = getPref()): Theme => (pref === 'system' ? (systemDark.matches ? 'dark' : 'light') : pref)
export const currentTheme = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
export const currentAccent = (): Accent => (document.documentElement.dataset.accent as Accent) ?? 'emerald'

export function subscribe(fn: () => void) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

let fadeTimer = 0
/** Colours cross-fade for 0.4s while html.theming is set (skipped under reduced motion). */
function crossFade() {
  if (prefersReducedMotion()) return
  const html = document.documentElement
  html.classList.add('theming')
  clearTimeout(fadeTimer)
  fadeTimer = window.setTimeout(() => html.classList.remove('theming'), 450)
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

export function setTheme(pref: ThemePref) {
  write(THEME_KEY, pref)
  if (resolve(pref) !== currentTheme()) crossFade()
  apply()
}

/** Halden-style accent: only the primary colour pair changes. */
export function setAccent(accent: Accent) {
  write(ACCENT_KEY, accent)
  crossFade()
  if (accent === 'emerald') delete document.documentElement.dataset.accent
  else document.documentElement.dataset.accent = accent
  listeners.forEach((fn) => fn())
}
