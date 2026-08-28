import { journey } from '../data/portfolio'
import Reveal from '../components/Reveal'

const sections = [
  journey.university,
  journey.cima,
  journey.experience,
  journey.school,
]

export default function Journey() {
  return (
    <main className="inner-page journey-page shell">
      <Reveal>
        <p className="eyebrow cobalt">
          Journey / 03
        </p>

        <h1 className="page-title">
          A foundation, <em>still taking shape.</em>
        </h1>

        <p className="page-lead">
          Education, professional experience, and the
          experiences that have shaped how I learn,
          work, and approach new problems.
        </p>
      </Reveal>

      <div className="journey-sections">
        {sections.map((section) => (
          <section
            className="journey-block"
            key={section.title}
          >
            <Reveal>
              <div className="journey-section-header">
                <p className="eyebrow cobalt">
                  {section.eyebrow}
                </p>

                <h2>{section.title}</h2>

                <p className="section-intro">
                  {section.intro}
                </p>
              </div>
            </Reveal>

            <div className="timeline">
              {section.entries.map((entry, index) => (
                <Reveal
                  className="timeline-entry"
                  key={`${section.title}-${entry.title}`}
                >
                  <div className="timeline-meta">
                    <span className="timeline-date">
                      {entry.period}
                    </span>

                    <span className="timeline-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="timeline-marker" />

                  <div className="timeline-content">
                    <h3>{entry.title}</h3>

                    <strong>{entry.place}</strong>

                    <p>{entry.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>

    
  )

  
}
