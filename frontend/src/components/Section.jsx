import Reveal from './Reveal'

export default function Section({ id, eyebrow, title, intro, className = '', children }) {
  const titleId = `${id}-title`
  return (
    <section id={id} aria-labelledby={titleId} className={`relative scroll-mt-20 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mb-12 max-w-2xl">
          <p className="font-display text-sm font-semibold tracking-[0.2em] text-fuchsia-600 uppercase dark:text-fuchsia-400">
            {eyebrow}
          </p>
          <h2 id={titleId} className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <div className="mt-4 h-1.5 w-20 rounded-full bg-brand-gradient" aria-hidden="true" />
          {intro && <p className="mt-5 text-zinc-600 dark:text-zinc-400">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  )
}
