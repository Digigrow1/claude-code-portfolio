import { accentFor } from '../lib/accents'
import Icon from './Icon'
import Reveal from './Reveal'

// Shown until a real screenshot is added via `image` in the content.
function ProjectArt({ project }) {
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-25 [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:18px_18px]"
      />
      <div aria-hidden="true" className="absolute -right-8 -bottom-10 font-display text-[9rem] leading-none font-bold text-white/15">
        {project.title.charAt(0)}
      </div>
      <span className="relative grid h-20 w-20 place-items-center rounded-3xl bg-white/20 text-4xl shadow-lg ring-1 ring-white/40 backdrop-blur transition duration-500 group-hover:scale-110 group-hover:rotate-6">
        <span aria-hidden="true">{project.emoji}</span>
      </span>
    </div>
  )
}

export default function ProjectCard({ project, index }) {
  const accent = accentFor(project.accent)

  return (
    <Reveal as="li" delay={(index % 2) * 120}>
      <article className="group card flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-fuchsia-500/10">
        <div className={`relative h-48 bg-linear-to-br ${accent.gradient}`}>
          {project.image ? (
            <img src={project.image} alt={`Screenshot of ${project.title}`} loading="lazy" className="h-full w-full object-cover" />
          ) : (
            <ProjectArt project={project} />
          )}
          <span className="chip absolute top-4 left-4 bg-black/30 text-white backdrop-blur">{project.category}</span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-2xl font-bold">{project.title}</h3>
          <p className={`mt-1 text-sm font-semibold ${accent.text}`}>{project.subtitle}</p>
          <p className="mt-4 text-zinc-700 dark:text-zinc-300">{project.description}</p>

          {project.points?.length > 0 && (
            <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              {project.points.map((point) => (
                <li key={point} className="flex gap-2">
                  <span aria-hidden="true">✦</span>
                  {point}
                </li>
              ))}
            </ul>
          )}

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
            {project.tags.map((tag) => (
              <li key={tag} className={`chip ${accent.chip}`}>
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost px-4 py-2"
                aria-label={`${project.title} code on GitHub`}
              >
                <Icon name="github" className="h-4 w-4" /> Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-4 py-2"
                aria-label={`${project.title} live demo`}
              >
                <Icon name="external" className="h-4 w-4" /> Live demo
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  )
}
