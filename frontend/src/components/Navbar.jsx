import { useEffect, useState } from 'react'
import Icon from './Icon'
import ThemeToggle from './ThemeToggle'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ profile }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-zinc-200/70 bg-white/80 shadow-sm backdrop-blur-lg dark:border-white/10 dark:bg-[#0b0614]/80'
          : 'bg-transparent'
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#home" onClick={close} className="flex items-center gap-2.5 font-display text-lg font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient text-sm text-white shadow-md shadow-fuchsia-500/30">
            GS
          </span>
          <span>{profile.shortName}</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-zinc-700 transition hover:bg-fuchsia-500/10 hover:text-fuchsia-700 dark:text-zinc-300 dark:hover:text-fuchsia-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 place-items-center rounded-full border border-zinc-300 dark:border-white/15 md:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-zinc-200/70 px-4 pb-4 dark:border-white/10 md:hidden">
          <ul className="flex flex-col pt-2">
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={close}
                  className="block rounded-xl px-3 py-3 font-medium hover:bg-fuchsia-500/10"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
