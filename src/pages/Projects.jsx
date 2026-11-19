import { projects } from '../data/portfolio'
import Reveal from '../components/Reveal'
import ProjectTeaser from '../components/ProjectTeaser'

export default function Projects({ navigate }) {
  return (
    <main className="page shell">
      <Reveal className="page-intro">
        <h1 className="page-title">Projects</h1>
        <p className="page-lead">
          University and personal projects across web software, backend systems and hardware.
          Each one has its own page explaining what it does and which parts I built.
        </p>
      </Reveal>

      <div className="project-list">
        {projects.map((project, index) => (
          <ProjectTeaser project={project} navigate={navigate} large={index === 0} key={project.slug} />
        ))}
      </div>
    </main>
  )
}
