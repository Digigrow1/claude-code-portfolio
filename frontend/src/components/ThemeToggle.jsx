import { useState } from 'react'
import Icon from './Icon'

const isDark = () => document.documentElement.classList.contains('dark')

export default function ThemeToggle() {
  const [dark, setDark] = useState(isDark)

  const toggle = () => {
    const next = !dark
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {
      // Storage unavailable: theme still switches for this visit.
    }
    setDark(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="grid h-10 w-10 place-items-center rounded-full border border-zinc-300 bg-white/70 text-zinc-700 transition hover:rotate-12 hover:border-fuchsia-400 dark:border-white/15 dark:bg-white/5 dark:text-amber-300"
    >
      <Icon name={dark ? 'sun' : 'moon'} />
    </button>
  )
}
