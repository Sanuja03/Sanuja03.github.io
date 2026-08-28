import {
  skills,
  professionalSkills,
  additionalSkills,
  skillPage,
} from '../data/portfolio'

import Reveal from '../components/Reveal'

const groups = [
  ...skills,
  professionalSkills,
  additionalSkills,
]

export default function Skills() {
  return (
    <main className="inner-page shell">
      <Reveal>
        <p className="eyebrow cobalt">
          {skillPage.eyebrow}
        </p>

        <h1 className="page-title">
          {skillPage.title}
        </h1>

        <p className="page-lead">
          {skillPage.lead}
        </p>
      </Reveal>

      <section className="skill-groups">
        {groups.map((group, index) => (
          <Reveal
            className="skill-group"
            key={group.category}
          >
            <span>
              {String(index + 1).padStart(2, '0')}
            </span>

            <div>
              <h2>{group.category}</h2>

              <p>{group.description}</p>
            </div>

            <div className="skill-cards">
              {group.items.map((item) => (
                <span key={item}>
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </section>
    </main>
  )
}
