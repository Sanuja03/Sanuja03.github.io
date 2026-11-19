import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import Reveal from '../components/Reveal'
import AppLink from '../components/AppLink'
import { projects } from '../data/portfolio'

function Section({ title, label, band = false, split = false, children }) {
  const heading = (
    <Reveal className="cs-heading">
      {label && <p className="cs-label">{label}</p>}
      <h2>{title}</h2>
    </Reveal>
  )

  return (
    <section className={`cs-section${band ? ' cs-band' : ''}`}>
      <div className={`shell${split ? ' cs-split' : ''}`}>
        {heading}
        <div className="cs-body">{children}</div>
      </div>
    </section>
  )
}

// Pick a column count that avoids a single card on its own row.
function columnsFor(count) {
  if (count % 4 === 0) return 4
  if (count % 3 === 0 || count === 5) return 3
  return 2
}

function resolve(base, src) {
  if (!src) return ''
  return src.startsWith('/') ? src : `${base || ''}${src}`
}

export default function ProjectDetail({ navigate, project }) {
  const study = project.caseStudy
  const media = study.media
  const base = media?.base
  const index = projects.findIndex((item) => item.slug === project.slug)
  const next = projects[(index + 1) % projects.length]
  const hasHeroMedia = Boolean(study.video || study.hero)

  return (
    <main className="cs-page">
      <section className={`cs-hero shell${hasHeroMedia ? '' : ' cs-hero-text'}`}>
        <Reveal className="cs-hero-copy">
          <AppLink className="cs-back" to="/projects/" navigate={navigate}>
            <ArrowLeft size={16} /> All projects
          </AppLink>
          <p className="cs-label">{study.kind}</p>
          <h1 className="cs-title">{project.title}</h1>
          <p className="cs-lead">{study.lead}</p>
          {project.links?.length > 0 && (
            <div className="cs-links">
              {project.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                  {link.label} <ArrowUpRight size={15} />
                </a>
              ))}
            </div>
          )}
        </Reveal>

        <Reveal className="cs-hero-side">
          {study.video ? (
            <figure className="cs-video">
              <video
                controls
                preload="metadata"
                playsInline
                src={`${study.video.src}#t=1`}
                aria-label={`${project.title} demo video`}
              />
              <figcaption>{study.video.caption}</figcaption>
            </figure>
          ) : study.hero ? (
            <figure className="cs-frame" style={{ aspectRatio: media?.ratio }}>
              <img src={resolve(base, study.hero.src)} alt={study.hero.alt} />
            </figure>
          ) : null}

          <dl className="cs-facts">
            {study.facts.map(([term, value]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <Section title="What it is" split>
        <Reveal className="cs-prose">
          {study.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </Reveal>
      </Section>

      {study.highlights && (
        <Section title={study.highlightsTitle} band>
          <div className={`cs-cards cs-cards-${columnsFor(study.highlights.length)}`}>
            {study.highlights.map(([title, description]) => (
              <Reveal className="cs-card" key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section title="Built with" split>
        <dl className="cs-stack">
          {Object.entries(study.stack).map(([category, items]) => (
            <div key={category}>
              <dt>{category}</dt>
              <dd>{items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {study.architecture && (
        <Section title={study.architecture.title} band>
          <div className="cs-architecture">
            <Reveal className="cs-prose">
              {study.architecture.text.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </Reveal>
            <Reveal>
              <figure className="cs-diagram">
                <a
                  className={study.architecture.dark ? 'is-dark' : ''}
                  href={resolve(base, study.architecture.image)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={resolve(base, study.architecture.image)}
                    alt={study.architecture.imageAlt}
                    width={study.architecture.width}
                    height={study.architecture.height}
                    loading="lazy"
                  />
                </a>
                <figcaption>Select the diagram to open it at full size.</figcaption>
              </figure>
            </Reveal>
          </div>
        </Section>
      )}

      <Section title={study.kind.startsWith('Individual') ? 'What I built' : 'My part'}>
        <p className="cs-intro">{study.contributionIntro}</p>
        <ol className="cs-contributions">
          {study.contributions.map(([title, description]) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Problems I worked through" band>
        <div className="cs-cards cs-cards-2">
          {study.challenges.map(([title, detail]) => (
            <Reveal className="cs-card" key={title}>
              <h3>{title}</h3>
              <p>{detail}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title="What I learned" split>
        <ul className="cs-learnings">
          {study.learnings.map((learning) => <li key={learning}>{learning}</li>)}
        </ul>
        {study.related && (
          <AppLink className="cs-related" to={study.related.href} navigate={navigate}>
            {study.related.label} <ArrowRight size={16} />
          </AppLink>
        )}
      </Section>

      {media?.items?.length > 0 && (
        <Section title={media.title} band>
          <div className="cs-gallery">
            {media.items.map(([file, alt, caption, fit, position], itemIndex) => (
              <figure
                className={`cs-shot${itemIndex === 0 && media.items.length % 2 === 1 ? ' cs-shot-wide' : ''}`}
                key={file}
              >
                <div className="cs-frame" style={{ aspectRatio: media.ratio }}>
                  <img
                    src={resolve(base, file)}
                    alt={alt}
                    loading="lazy"
                    style={{ objectFit: fit || media.fit, objectPosition: position || 'center' }}
                  />
                </div>
                <figcaption>{caption}</figcaption>
              </figure>
            ))}
          </div>
        </Section>
      )}

      <section className="cs-next shell">
        <p>Next project</p>
        <AppLink to={`/projects/${next.slug}/`} navigate={navigate}>
          {next.title} <ArrowRight size={20} />
        </AppLink>
      </section>
    </main>
  )
}
