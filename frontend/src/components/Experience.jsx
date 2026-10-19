import Reveal from './Reveal'
import Section from './Section'

export default function Experience({ experience, otherWork }) {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked">
      <ol className="relative space-y-8 border-l-2 border-dashed border-fuchsia-300 pl-8 dark:border-fuchsia-500/40">
        {experience.map((job, i) => (
          <Reveal as="li" key={`${job.company}-${job.period}`} delay={i * 100} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-6 -left-[2.6rem] h-5 w-5 rounded-full border-4 border-zinc-50 bg-brand-gradient dark:border-[#0b0614]"
            />
            <article className="card p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl font-bold">
                    {job.role} · <span className="text-gradient">{job.company}</span>
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{job.type}</p>
                </div>
                <span className="chip bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-500/15 dark:text-fuchsia-200">
                  {job.period}
                </span>
              </div>
              <ul className="mt-5 space-y-3">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-3 text-zinc-700 dark:text-zinc-300">
                    <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange-400" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </ol>

      {otherWork?.length > 0 && (
        <>
          <Reveal>
            <h3 className="mt-16 mb-6 font-display text-xl font-semibold">Other work experience</h3>
          </Reveal>
          <ul className="grid gap-5 md:grid-cols-3">
            {otherWork.map((work, i) => (
              <Reveal as="li" key={work.title} delay={i * 90}>
                <article className="card h-full p-6 transition hover:-translate-y-1 hover:shadow-lg">
                  <span aria-hidden="true" className="text-3xl">
                    {work.icon}
                  </span>
                  <h4 className="mt-3 font-display font-semibold">
                    {work.title}
                    {work.org && <span className="text-zinc-500 dark:text-zinc-400"> · {work.org}</span>}
                  </h4>
                  <p className="mt-1 text-sm font-medium text-fuchsia-700 dark:text-fuchsia-300">{work.period}</p>
                  <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{work.description}</p>
                </article>
              </Reveal>
            ))}
          </ul>
        </>
      )}
    </Section>
  )
}
