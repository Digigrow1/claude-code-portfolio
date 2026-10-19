// Content stores an accent *name* (works for JSON and future DB rows);
// full class strings live here so Tailwind can see them at build time.
export const ACCENTS = {
  violet: {
    gradient: 'from-violet-600 via-purple-500 to-fuchsia-500',
    chip: 'bg-violet-100 text-violet-800 dark:bg-violet-500/15 dark:text-violet-200',
    text: 'text-violet-700 dark:text-violet-300',
  },
  orange: {
    gradient: 'from-orange-500 via-amber-500 to-yellow-400',
    chip: 'bg-orange-100 text-orange-800 dark:bg-orange-500/15 dark:text-orange-200',
    text: 'text-orange-700 dark:text-orange-300',
  },
  cyan: {
    gradient: 'from-sky-500 via-cyan-500 to-emerald-400',
    chip: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-500/15 dark:text-cyan-200',
    text: 'text-cyan-700 dark:text-cyan-300',
  },
  pink: {
    gradient: 'from-pink-600 via-rose-500 to-orange-400',
    chip: 'bg-pink-100 text-pink-800 dark:bg-pink-500/15 dark:text-pink-200',
    text: 'text-pink-700 dark:text-pink-300',
  },
}

export const accentFor = (name) => ACCENTS[name] ?? ACCENTS.violet
