import Reveal from './Reveal'
import Section from './Section'

const INTEREST_COLORS = [
  'bg-violet-100 text-violet-800 dark:bg-violet-500/15 dark:text-violet-200',
  'bg-pink-100 text-pink-800 dark:bg-pink-500/15 dark:text-pink-200',
  'bg-orange-100 text-orange-800 dark:bg-orange-500/15 dark:text-orange-200',
  'bg-cyan-100 text-cyan-800 dark:bg-cyan-500/15 dark:text-cyan-200',
]

export default function About({ profile, highlights, interests }) {
  return (
    <Section id="about" eyebrow="About me" title="Code, creativity & a lot of curiosity">
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <Reveal className="space-y-5 text-lg text-zinc-700 dark:text-zinc-300">
          <p>
            I&apos;m <strong className="font-semibold text-zinc-900 dark:text-white">{profile.name}</strong>, a{' '}
            {profile.degree} graduate. {profile.summary}
          </p>
          <p>
            Outside of code, I&apos;ve spent years creating video content, repairing mobile phones and working with
            customers.
          </p>

          <div>
            <h3 className="mb-3 font-display text-base font-semibold text-zinc-900 dark:text-white">Beyond code</h3>
            <ul className="flex flex-wrap gap-2">
              {interests.map((interest, i) => (
                <li key={interest} className={`chip ${INTEREST_COLORS[i % INTEREST_COLORS.length]}`}>
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <ul className="grid grid-cols-2 gap-4">
          {highlights.map((item, i) => (
            <Reveal as="li" key={item.label} delay={i * 90}>
              <div className="card h-full p-5 transition hover:-translate-y-1 hover:shadow-lg">
                <p className="font-display text-3xl font-bold text-gradient">{item.value}</p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{item.label}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  )
}
