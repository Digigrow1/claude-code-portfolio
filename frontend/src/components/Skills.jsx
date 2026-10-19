import Reveal from './Reveal'
import Section from './Section'

const GROUP_ACCENTS = [
  { bar: 'from-violet-500 to-fuchsia-500', chip: 'hover:border-violet-400 hover:text-violet-700 dark:hover:text-violet-300' },
  { bar: 'from-fuchsia-500 to-orange-400', chip: 'hover:border-pink-400 hover:text-pink-700 dark:hover:text-pink-300' },
  { bar: 'from-cyan-500 to-emerald-400', chip: 'hover:border-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300' },
]

export default function Skills({ skills }) {
  return (
    <Section id="skills" eyebrow="Skills" title="My toolbox" intro="Languages, frameworks and tools I work with.">
      <div className="grid gap-6 md:grid-cols-3">
        {skills.map((group, i) => {
          const accent = GROUP_ACCENTS[i % GROUP_ACCENTS.length]
          return (
            <Reveal key={group.group} delay={i * 100}>
              <article className="card relative h-full overflow-hidden p-6">
                <div className={`absolute inset-x-0 top-0 h-1.5 bg-linear-to-r ${accent.bar}`} aria-hidden="true" />
                <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
                  <span aria-hidden="true">{group.icon}</span> {group.group}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className={`rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm font-medium transition dark:border-white/10 dark:bg-white/5 ${accent.chip}`}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
