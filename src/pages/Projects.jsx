import { projects } from '../data/portfolio'
import Reveal from '../components/Reveal'
import ProjectTeaser from '../components/ProjectTeaser'

export default function Projects() {
  return (
    <main className="projects-page">
      <div className="shell projects-intro">
        <Reveal>
          <p className="eyebrow cobalt">Selected projects / 02</p>

          <h1 className="page-title">
            Work made to <em>learn in public.</em>
          </h1>

          <p className="page-lead">
            A selection of systems and interfaces built while developing
            practical technical depth.
          </p>
        </Reveal>
      </div>

      <div className="shell all-cases">
        {projects.slice(0, 4).map((project, index) => (
          <ProjectTeaser
            project={project}
            index={index}
            featured={index < 2}
            key={project.title}
          />
        ))}
      </div>
    </main>
  )
}