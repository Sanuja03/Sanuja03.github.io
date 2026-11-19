import { skills, professionalSkills, additionalSkills, skillPage } from '../data/portfolio'
import Reveal from '../components/Reveal'

const groups = [...skills, professionalSkills, additionalSkills]

export default function Skills() {
  return (
    <main className="page shell">
      <Reveal className="page-intro">
        <h1 className="page-title">{skillPage.title}</h1>
        <p className="page-lead">{skillPage.lead}</p>
      </Reveal>

      <div className="skill-groups">
        {groups.map((group) => (
          <Reveal as="section" className="skill-group" key={group.category}>
            <div>
              <h2>{group.category}</h2>
              <p>{group.description}</p>
            </div>
            <ul className="skill-list">
              {group.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </Reveal>
        ))}
      </div>
    </main>
  )
}
