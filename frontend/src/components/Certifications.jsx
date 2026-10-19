import Reveal from './Reveal'
import Section from './Section'

export default function Certifications({ certifications }) {
  return (
    <Section id="certifications" eyebrow="Certifications" title="Always learning" className="pt-0 sm:pt-0">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((cert, i) => (
          <Reveal as="li" key={cert.name} delay={i * 80}>
            <article className="card flex h-full items-start gap-4 p-5 transition hover:-translate-y-1 hover:shadow-lg">
              <span
                aria-hidden="true"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-lg text-white"
              >
                🏅
              </span>
              <div>
                <h3 className="font-display font-semibold">{cert.name}</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {cert.issuer}
                  {cert.year && ` · ${cert.year}`}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
