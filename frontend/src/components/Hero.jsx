import { useRotatingText } from '../hooks/useRotatingText'
import Icon from './Icon'
import SocialLinks from './SocialLinks'

export default function Hero({ profile, highlights }) {
  const role = useRotatingText(profile.roles)
  const growth = highlights?.[0]

  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 lg:pb-28">
      {/* Decorative gradient blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-96 w-96 animate-blob rounded-full bg-violet-500/30 blur-3xl" />
        <div className="absolute top-20 right-0 h-80 w-80 animate-blob rounded-full bg-fuchsia-500/25 blur-3xl [animation-delay:-6s]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 animate-blob rounded-full bg-orange-400/25 blur-3xl [animation-delay:-12s]" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.25fr_1fr]">
        <div className="text-center lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" aria-hidden="true" />
            Open to opportunities
          </p>

          <h1 className="mt-6 font-display text-4xl leading-tight font-bold tracking-tight sm:text-6xl">
            Hi, I&apos;m <span className="text-gradient">{profile.shortName}</span>
            <span className="inline-block origin-[70%_70%] animate-wave" aria-hidden="true">
              {' '}
              👋
            </span>
          </h1>

          <p className="mt-4 font-display text-xl font-semibold text-zinc-700 sm:text-2xl dark:text-zinc-300">
            <span className="sr-only">{profile.roles.join(', ')}</span>
            <span aria-hidden="true">
              <span key={role} className="inline-block animate-fade-up">
                {role}
              </span>
            </span>
          </p>

          <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-600 lg:mx-0 dark:text-zinc-400">{profile.summary}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a href="#projects" className="btn-primary">
              View my projects <Icon name="arrowRight" className="h-4 w-4" />
            </a>
            <a href="#contact" className="btn-ghost">
              Get in touch
            </a>
          </div>

          <SocialLinks profile={profile} className="mt-8 justify-center lg:justify-start" />
        </div>

        <div className="relative mx-auto w-64 sm:w-80">
          <div aria-hidden="true" className="absolute -inset-4 rounded-[2.5rem] bg-brand-gradient opacity-60 blur-2xl" />
          <div className="relative rotate-3 rounded-[2.25rem] bg-brand-gradient p-1.5 shadow-2xl transition duration-500 hover:rotate-0">
            <img
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              width="320"
              height="400"
              fetchPriority="high"
              className="aspect-[4/5] w-full rounded-[2rem] bg-zinc-200 object-cover"
            />
          </div>

          {growth && (
            <div className="card absolute -bottom-6 -left-6 animate-float px-4 py-3 sm:-left-10">
              <p className="font-display text-2xl font-bold text-gradient">{growth.value}</p>
              <p className="max-w-[9rem] text-xs text-zinc-600 dark:text-zinc-400">{growth.label}</p>
            </div>
          )}
          <div className="card absolute -top-5 -right-4 animate-float px-4 py-2.5 text-sm font-semibold [animation-delay:-3s] sm:-right-8">
            🎓 {profile.degree.replace('Information Technology', 'IT')}
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce text-zinc-500 sm:block"
      >
        <Icon name="arrowDown" className="h-6 w-6" />
      </a>
    </section>
  )
}
