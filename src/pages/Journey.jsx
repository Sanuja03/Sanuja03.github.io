import { ArrowRight } from 'lucide-react'
import { journey } from '../data/portfolio'
import Reveal from '../components/Reveal'
import AppLink from '../components/AppLink'

export default function Journey({ navigate }) {
  return (
    <main className="page shell">
      <Reveal className="page-intro">
        <h1 className="page-title">My journey so far</h1>
        <p className="page-lead">{journey.intro}</p>
      </Reveal>

      {journey.groups.map((group) => (
        <section className="journey-group" key={group.title}>
          <Reveal as="h2" className="journey-group-title">{group.title}</Reveal>

          <ol className="journey-list">
            {group.entries.map((entry) => (
              <Reveal as="li" className="journey-entry" key={entry.title}>
                <p className="journey-period">{entry.period}</p>
                <div>
                  <h3>{entry.title}</h3>
                  <p className="journey-place">{entry.place}</p>
                  <p className="journey-detail">{entry.detail}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </section>
      ))}

      <Reveal className="journey-end">
        <p>The projects I worked on along the way are where most of the learning happened.</p>
        <AppLink className="text-link" to="/projects/" navigate={navigate}>
          See the projects <ArrowRight size={16} />
        </AppLink>
      </Reveal>
    </main>
  )
}
