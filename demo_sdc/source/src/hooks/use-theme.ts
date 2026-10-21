import { useSyncExternalStore } from 'react'
import { currentTheme, setTheme, subscribe } from '@/lib/theme'

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, currentTheme)
  return { theme, setTheme }
}
