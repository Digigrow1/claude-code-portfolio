import SocialLinks from './SocialLinks'

export default function Footer({ profile }) {
  return (
    <footer className="relative mt-10 border-t border-zinc-200 dark:border-white/10">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-brand-gradient opacity-60" />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6">
        <div className="text-center sm:text-left">
          <p className="font-display text-lg font-bold">
            <span className="text-gradient">{profile.shortName}</span>
          </p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} {profile.name}. Built with React, Tailwind CSS & nginx.
          </p>
        </div>
        <SocialLinks profile={profile} />
      </div>
    </footer>
  )
}
