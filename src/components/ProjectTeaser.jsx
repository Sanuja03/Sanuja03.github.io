import { ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal'

export default function ProjectTeaser({
  project,
  index,
  featured = false,
}) {
  return (
    <Reveal
      className={`case ${featured ? 'case-featured' : ''} case-${index + 1}`}
    >
      <div className="case-art">
        <span>0{index + 1}</span>

        <i>
          {index === 0
            ? 'INTERLINK / SYSTEM'
            : index === 1
              ? 'IOT / RACE / SIGNAL'
              : 'WEB / PLATFORM'}
        </i>

        <div className="case-shape" />
      </div>

      <div className="case-copy">
        <p className="eyebrow">{project.tag}</p>

        <h3>{project.title}</h3>

        <p>{project.description}</p>

        <div className="tags">
          {project.technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
        >
          View project
          <ArrowUpRight size={16} />
        </a>
      </div>
    </Reveal>
  )
}