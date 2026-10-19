import Icon from './Icon'

export default function SocialLinks({ profile, className = '' }) {
  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
      {profile.socials.map((social) => (
        <li key={social.label}>
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-11 w-11 place-items-center rounded-full border border-zinc-300 bg-white/70 text-zinc-700 transition hover:-translate-y-0.5 hover:border-transparent hover:bg-brand-gradient hover:text-white dark:border-white/15 dark:bg-white/5 dark:text-zinc-200"
          >
            <Icon name={social.icon} title={social.label} />
          </a>
        </li>
      ))}
      <li>
        <a
          href={`mailto:${profile.email}`}
          className="grid h-11 w-11 place-items-center rounded-full border border-zinc-300 bg-white/70 text-zinc-700 transition hover:-translate-y-0.5 hover:border-transparent hover:bg-brand-gradient hover:text-white dark:border-white/15 dark:bg-white/5 dark:text-zinc-200"
        >
          <Icon name="mail" title={`Email ${profile.email}`} />
        </a>
      </li>
    </ul>
  )
}
