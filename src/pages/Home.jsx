import { ArrowRight } from 'lucide-react'
import { background, projects } from '../data/portfolio'
import Reveal from '../components/Reveal'
import ProjectTeaser from '../components/ProjectTeaser'
import AppLink from '../components/AppLink'

export default function Home({ navigate, profile }) {
  return (
    <main>
      <section className="home-hero shell">
        <Reveal className="home-hero-copy">
          <p className="home-hello">Hi, I’m Sanuja.</p>
          <h1>I build software and try to understand the business around it.</h1>
          <p className="lead">
            I’m studying Information Technology & Management at the University of Moratuwa.
            I enjoy building web applications and backend systems, and I’m most interested in
            work where the technology has to fit how a real organisation runs.
          </p>
          <div className="hero-actions">
            <AppLink className="button" to="/projects/" navigate={navigate}>
              See my projects <ArrowRight size={17} />
            </AppLink>
            <AppLink className="button button-quiet" to="/contact/" navigate={navigate}>
              Get in touch
            </AppLink>
          </div>
          <p className="hero-social">
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </p>
        </Reveal>

        <Reveal className="home-portrait">
          <img src="/images/Profile.jpeg" alt="Sanuja Nimsith Alphonsus" width="600" height="640" />
        </Reveal>
      </section>

      <section className="home-section home-background">
        <div className="shell home-split">
          <Reveal>
            <h2>Where I am now</h2>
            <p className="section-lead">
              A degree that mixes software with management, professional accounting studies
              alongside it, and some time inside a bank.
            </p>
            <AppLink className="text-link" to="/journey/" navigate={navigate}>
              More about my journey <ArrowRight size={16} />
            </AppLink>
          </Reveal>

          <ul className="background-list">
            {background.map((item) => (
              <Reveal as="li" className="background-item" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.place}</p>
                <span>{item.period}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-section shell">
        <Reveal className="section-head">
          <div>
            <h2>Selected projects</h2>
            <p className="section-lead">A few things I have built, and what I was responsible for.</p>
          </div>
          <AppLink className="text-link" to="/projects/" navigate={navigate}>
            All projects <ArrowRight size={16} />
          </AppLink>
        </Reveal>

        <div className="project-list project-list-home">
          {projects.slice(0, 3).map((project, index) => (
            <ProjectTeaser project={project} navigate={navigate} large={index === 0} key={project.slug} />
          ))}
        </div>
      </section>
    </main>
  )
}
