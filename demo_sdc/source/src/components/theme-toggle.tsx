import { Moon, Sun } from 'lucide-react'
import { IconButton } from '@/components/ui/icon-button'
import { useTheme } from '@/hooks/use-theme'

/** Flips light/dark with a circular wipe that grows out of the button. */
export function ThemeToggle({ variant = 'glass' }: { variant?: 'glass' | 'plain' }) {
  const { theme, setTheme } = useTheme()
  const dark = theme === 'dark'
  return (
    <IconButton
      variant={variant}
      label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={(e) => setTheme(dark ? 'light' : 'dark', e.currentTarget)}
    >
      {dark ? <Sun /> : <Moon />}
    </IconButton>
  )
}
