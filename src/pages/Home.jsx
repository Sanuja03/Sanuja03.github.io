import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { projects } from '../data/portfolio'
import Reveal from '../components/Reveal'
import ProjectTeaser from '../components/ProjectTeaser'

export default function Home({ navigate, profile }) {
  return (
    <main>
      <section className="home-hero shell">
        <div className="hero-text">
          <Reveal>
            <p className="eyebrow cobalt">
              IT & Management / Software Development
            </p>

            <h1>
              Sanuja <em>Nimsith<br />Alphonsus</em>
            </h1>

            <p className="lead">
              I’m an IT & Management undergraduate at the University of
              Moratuwa, building software with a focus on practical systems,
              thoughtful engineering, and the business problems technology is
              meant to solve.
            </p>

            <div className="hero-actions">
              <button onClick={() => navigate('/projects')}>
                Explore projects
                <ArrowDownRight size={18} />
              </button>

              <button onClick={() => navigate('/contact')}>
                Get in touch
                <ArrowUpRight size={17} />
              </button>
            </div>

            <div className="hero-social">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal className="portrait-wrap">
          <span className="photo-note">
            PROFILE / 001
            <br />
            MORATUWA · LK
          </span>

          <div className="portrait">
            <img
              src="/images/Profile.jpeg"
              alt="Sanuja Nimsith Alphonsus"
            />
          </div>

          <span className="portrait-axis">
            SNA / 2026
          </span>
        </Reveal>
      </section>

      <section className="about-home">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">
              01 / About
            </p>

            <div className="about-home-grid">
              <h2>
                Building software with a
                <em> wider perspective.</em>
              </h2>

              <div>
                <p>
                  I’m studying IT & Management because building useful
                  technology requires more than technical knowledge. I’m
                  interested in how software fits into real organisations,
                  processes, and the people who depend on it.
                </p>

                <p>
                  Through university projects, I’ve been developing experience
                  across software development, web applications, databases,
                  and system design. I enjoy taking a problem, understanding
                  the requirements behind it, and turning it into something
                  practical and maintainable.
                </p>

                <span className="focus">
                  Currently: building stronger foundations in software engineering
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="home-work shell">
        <Reveal>
          <div className="section-head">
            <div>
              <p className="eyebrow">
                02 / Featured work
              </p>

              <h2>
                Things I’ve built & helped build.
              </h2>
            </div>

            <button onClick={() => navigate('/projects')}>
              View all projects
              <ArrowUpRight size={17} />
            </button>
          </div>
        </Reveal>

        <div className="home-cases">
          <ProjectTeaser
            project={projects[0]}
            index={0}
            featured
          />

          <ProjectTeaser
            project={projects[1]}
            index={1}
            featured
          />
        </div>
      </section>
    </main>
  );
}