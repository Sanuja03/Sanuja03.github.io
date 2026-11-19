import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'
import AppLink from './AppLink'

export default function ProjectTeaser({ project, navigate, large = false }) {
  const to = `/projects/${project.slug}/`

  return (
    <Reveal className={`project-card${large ? ' project-card-large' : ''}`}>
      <AppLink className="project-card-media" to={to} navigate={navigate} tabIndex={-1} aria-hidden="true">
        {project.image ? (
          <img
            src={project.image}
            alt=""
            loading="lazy"
            className={project.imageFit === 'contain' ? 'is-contain' : ''}
            style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
          />
        ) : (
          <span className="project-card-initial">
            {project.technologies.map((tech) => <span key={tech}>{tech}</span>)}
          </span>
        )}
      </AppLink>

      <div className="project-card-body">
        <p className="project-card-meta">{project.meta}</p>
        <h3>
          <AppLink to={to} navigate={navigate}>{project.title}</AppLink>
        </h3>
        <p>{project.summary}</p>
        <p className="project-card-tech">{project.technologies.join(' · ')}</p>
        <AppLink className="project-card-link" to={to} navigate={navigate}>
          Read the case study <ArrowRight size={16} />
        </AppLink>
      </div>
    </Reveal>
  )
}
