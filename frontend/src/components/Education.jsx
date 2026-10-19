import Reveal from './Reveal'
import Section from './Section'

const RING = ['ring-violet-400/60', 'ring-pink-400/60', 'ring-orange-400/60']

export default function Education({ education }) {
  return (
    <Section id="education" eyebrow="Education" title="Academic journey">
      <ul className="grid gap-6 md:grid-cols-3">
        {education.map((item, i) => (
          <Reveal as="li" key={item.qualification} delay={i * 100}>
            <article className={`card h-full p-6 ring-1 ${RING[i % RING.length]}`}>
              <div className="flex items-center justify-between">
                <span aria-hidden="true" className="text-3xl">
                  🎓
                </span>
                <span className="font-display text-sm font-semibold text-zinc-500 dark:text-zinc-400">{item.year}</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{item.qualification}</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{item.institute}</p>
              <p className="mt-4 font-display text-2xl font-bold text-gradient">{item.score}</p>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
