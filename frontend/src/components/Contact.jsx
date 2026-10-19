import { useState } from 'react'
import { contactMode, submitContact } from '../services/contact'
import Icon from './Icon'
import Reveal from './Reveal'
import Section from './Section'
import SocialLinks from './SocialLinks'

const EMPTY = { name: '', email: '', message: '', website: '' }

const inputClass =
  'mt-1.5 w-full rounded-2xl border border-zinc-300 bg-white/80 px-4 py-3 text-zinc-900 placeholder-zinc-400 transition outline-none focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/15 dark:border-white/15 dark:bg-white/5 dark:text-zinc-100'

export default function Contact({ profile }) {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'sending', message: '' })
    try {
      const { via } = await submitContact(form, { to: profile.email })
      setStatus({
        state: 'success',
        message:
          via === 'api'
            ? "Thanks! Your message has been sent. I'll get back to you soon."
            : 'Your email app should open with the message ready to send.',
      })
      if (via === 'api') setForm(EMPTY)
    } catch (error) {
      setStatus({ state: 'error', message: error.message || 'Something went wrong. Please try again.' })
    }
  }

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's create something together"
      intro="Have an opportunity, a project idea, or just want to say hi? My inbox is open."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <div className="card relative h-full overflow-hidden p-8">
            <div aria-hidden="true" className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-brand-gradient opacity-20 blur-2xl" />
            <h3 className="font-display text-xl font-bold">Reach me directly</h3>
            <ul className="mt-6 space-y-4">
              <li>
                <a href={`mailto:${profile.email}`} className="group flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                    <Icon name="mail" />
                  </span>
                  <span className="break-all font-medium group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400">
                    {profile.email}
                  </span>
                </a>
              </li>
              {profile.showPhone && profile.phone && (
                <li>
                  <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="group flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
                      <Icon name="phone" />
                    </span>
                    <span className="font-medium group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400">
                      {profile.phone}
                    </span>
                  </a>
                </li>
              )}
            </ul>
            <p className="mt-8 mb-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">Find me online</p>
            <SocialLinks profile={profile} />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form onSubmit={onSubmit} className="card space-y-5 p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium">
                Name
                <input
                  name="name"
                  required
                  maxLength={100}
                  autoComplete="name"
                  value={form.name}
                  onChange={update}
                  className={inputClass}
                  placeholder="Your name"
                />
              </label>
              <label className="block text-sm font-medium">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  maxLength={200}
                  autoComplete="email"
                  value={form.email}
                  onChange={update}
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="block text-sm font-medium">
              Message
              <textarea
                name="message"
                required
                minLength={10}
                maxLength={2000}
                rows={5}
                value={form.message}
                onChange={update}
                className={`${inputClass} resize-y`}
                placeholder="Tell me a bit about what you have in mind…"
              />
            </label>

            {/* Honeypot: hidden from people, bots tend to fill it. Checked server-side in Phase 2. */}
            <div aria-hidden="true" className="hidden">
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update} />
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" disabled={status.state === 'sending'} className="btn-primary disabled:opacity-60">
                <Icon name="send" className="h-4 w-4" />
                {status.state === 'sending' ? 'Sending…' : contactMode === 'api' ? 'Send message' : 'Send via email'}
              </button>
              <p
                role="status"
                aria-live="polite"
                className={`text-sm ${status.state === 'error' ? 'text-red-600 dark:text-red-400' : 'text-emerald-700 dark:text-emerald-400'}`}
              >
                {status.message}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}
