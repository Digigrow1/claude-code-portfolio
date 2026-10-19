import ProjectCard from './ProjectCard'
import Section from './Section'

export default function Projects({ projects }) {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I've built"
      intro="A selection of projects across frontend, backend and real-time apps."
      className="bg-linear-to-b from-transparent via-fuchsia-500/[0.04] to-transparent"
    >
      <ul className="grid gap-8 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </ul>
    </Section>
  )
}
