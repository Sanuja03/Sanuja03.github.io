import { useEffect, useState } from 'react';

import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Menu,
  Moon,
  Send,
  Sun,
  X,
} from 'lucide-react';

import {
  journey,
  profile,
  projects,
  skills,
} from './data/portfolio';

import './App.css';
import './premium.css';
import './new-theme.css';

const Github = ({ size = 15 }) => (
  <span style={{ fontSize: size }}>↗</span>
);

const Linkedin = ({ size = 15 }) => (
  <span style={{ fontSize: size }}>in</span>
);

function Reveal({ children, className = '' }) {
  return (
    <div className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function SectionIntro({ index, label, title, text }) {
  return (
    <div className="section-intro">
      <span className="index">{index}</span>

      <div>
        <p className="micro">{label}</p>

        <h2>{title}</h2>

        {text && (
          <p className="intro-text">{text}</p>
        )}
      </div>
    </div>
  );
}

function Socials() {
  return (
    <div className="social-links">
      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
      >
        <Github size={15} />
        GitHub
      </a>

      <a
        href={profile.linkedin}
        target="_blank"
        rel="noreferrer"
      >
        <Linkedin size={15} />
        LinkedIn
      </a>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(
    () =>
      localStorage.getItem('theme') ||
      (matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light')
  );

  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('idle');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(
            'is-visible',
            entry.isIntersecting
          );
        });
      },
      {
        threshold: 0.14,
      }
    );

    document
      .querySelectorAll('.reveal')
      .forEach((element) => reveal.observe(element));

    const sections = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-35% 0px -55% 0px',
      }
    );

    document
      .querySelectorAll('main section[id]')
      .forEach((element) => sections.observe(element));

    const scroll = () => {
      setScrolled(window.scrollY > 28);
    };

    window.addEventListener('scroll', scroll, {
      passive: true,
    });

    scroll();

    return () => {
      reveal.disconnect();
      sections.disconnect();

      window.removeEventListener('scroll', scroll);
    };
  }, []);

  const go = (id) => {
    setMenu(false);

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: 'smooth',
      });
  };

  const submit = (event) => {
    event.preventDefault();

    if (
      !form.name ||
      !/^\S+@\S+\.\S+$/.test(form.email) ||
      !form.message
    ) {
      setStatus('error');
    } else {
      setStatus('success');
    }
  };

  return (
    <div className="new-site">
      <header
        className={`topbar ${scrolled ? 'compact' : ''}`}
      >
        <nav>
          <button
            className="wordmark"
            onClick={() => go('home')}
          >
            <span>SN</span>
            Sanuja Alphonsus
          </button>

          <div
            className={`nav-menu ${
              menu ? 'show' : ''
            }`}
          >
            {[
              'about',
              'skills',
              'projects',
              'journey',
              'contact',
            ].map((item, index) => (
              <button
                className={
                  active === item ? 'current' : ''
                }
                key={item}
                onClick={() => go(item)}
              >
                <small>
                  0{index + 1}
                </small>

                {item}
              </button>
            ))}
          </div>

          <div className="nav-tools">
            <button
              className="theme-toggle"
              onClick={() =>
                setTheme(
                  theme === 'dark'
                    ? 'light'
                    : 'dark'
                )
              }
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun size={16} />
              ) : (
                <Moon size={16} />
              )}
            </button>

            <button
              className="menu-toggle"
              onClick={() => setMenu(!menu)}
              aria-label="Toggle menu"
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section
          id="home"
          className="new-hero"
        >
          <div className="hero-grid">
            <div className="hero-copy reveal">
              <p className="micro accent">
                IT & Management / Software
              </p>

              <h1>
                Sanuja
                <br />
                <i>
                  Nimsith
                  <br />
                  Alphonsus.
                </i>
              </h1>

              <p className="hero-description">
                An undergraduate at the University of
                Moratuwa exploring how software,
                systems, and a business perspective can
                come together to solve real problems.
              </p>

              <div className="hero-cta">
                <button
                  className="text-button"
                  onClick={() => go('projects')}
                >
                  Explore projects
                  <ArrowDownRight size={17} />
                </button>

                <button
                  className="text-button muted"
                  onClick={() => go('contact')}
                >
                  Start a conversation
                  <ArrowUpRight size={16} />
                </button>
              </div>

              <Socials />
            </div>

            <div className="portrait-stage reveal">
              <div className="portrait-label">
                PROFILE / 001
                <br />
                <span>COLOMBO · LK</span>
              </div>

              <div className="portrait-frame">
                <img
                  src="/images/Profile.jpeg"
                  alt="Sanuja Nimsith Alphonsus"
                />

                <div className="portrait-wash" />
              </div>

              <span className="portrait-mark">
                © 2026
              </span>
            </div>
          </div>

          <div className="hero-foot">
            <span>Scroll to explore</span>

            <span className="line" />

            <span>01 — 05</span>
          </div>
        </section>

        <section
          id="about"
          className="editorial-section about-section"
        >
          <div className="page-width">
            <Reveal>
              <SectionIntro
                index="01"
                label="A little context"
                title="A technical mind with a wider view."
                text="I’m interested in the space between building a system and understanding why it matters."
              />
            </Reveal>

            <div className="about-layout">
              <Reveal className="about-statement">
                <p>
                  My studies in IT & Management give me
                  two ways of looking at a problem: through
                  the logic of the technology, and through
                  the people and organisation around it.
                </p>

                <p>
                  I’m developing that perspective through
                  web systems, IoT experiments, and the
                  steady practice of making ideas clearer,
                  more useful, and more considered.
                </p>
              </Reveal>

              <Reveal className="about-aside">
                <span className="micro">
                  Currently focused on
                </span>

                <strong>
                  Building a foundation
                  <br />
                  worth building on.
                </strong>

                <span className="aside-rule" />

                <span className="micro">
                  Education
                </span>

                <p>
                  BSc (Hons) IT & Management
                  <br />
                  University of Moratuwa
                  <br />
                  <small>Expected 2028</small>
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section
          id="skills"
          className="skills-section"
        >
          <div className="page-width">
            <Reveal>
              <SectionIntro
                index="02"
                label="The working set"
                title="Tools for thinking, making, and shipping."
              />
            </Reveal>

            <div className="skill-stream">
              {skills.map((group, index) => (
                <Reveal
                  className="skill-row"
                  key={group.category}
                >
                  <span className="skill-no">
                    0{index + 1}
                  </span>

                  <h3>{group.category}</h3>

                  <div className="skill-items">
                    {group.items.map((item) => (
                      <span key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          id="projects"
          className="projects-section"
        >
          <div className="page-width">
            <Reveal>
              <SectionIntro
                index="03"
                label="Selected work"
                title="Projects with a point of view."
                text="A small record of what I’m learning by building."
              />
            </Reveal>

            <div className="project-showcase">
              {projects.map((project, index) => (
                <Reveal
                  className={`project-feature project-${
                    index + 1
                  }`}
                  key={project.title}
                >
                  <div className="project-visual">
                    <span className="visual-index">
                      0{index + 1}
                    </span>

                    <span className="visual-type">
                      {project.tag}
                    </span>

                    <div className="visual-lines" />

                    <span className="visual-caption">
                      {index === 0
                        ? 'INTERFACE / SYSTEM'
                        : index === 1
                        ? 'PHYSICAL / DIGITAL'
                        : 'WEB / WORKFLOW'}
                    </span>
                  </div>

                  <div className="project-detail">
                    <p className="micro accent">
                      Project 0{index + 1}
                    </p>

                    <h3>{project.title}</h3>

                    <p>
                      {project.description}
                    </p>

                    <div className="project-tech">
                      {project.technologies.map(
                        (technology) => (
                          <span key={technology}>
                            {technology}
                          </span>
                        )
                      )}
                    </div>

                    <a
                      className="project-link"
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View on GitHub
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          id="journey"
          className="journey-section"
        >
          <div className="page-width">
            <Reveal>
              <SectionIntro
                index="04"
                label="The path so far"
                title="Learning through movement."
              />
            </Reveal>

            <div className="journey-list">
              {journey.map((item, index) => (
                <Reveal
                  className="journey-item"
                  key={item.title}
                >
                  <span className="journey-date">
                    {item.date}
                  </span>

                  <span className="journey-index">
                    0{index + 1}
                  </span>

                  <div>
                    <h3>{item.title}</h3>

                    <p className="journey-place">
                      {item.place}
                    </p>

                    <p>{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="contact-section"
        >
          <div className="page-width">
            <Reveal>
              <SectionIntro
                index="05"
                label="Make an introduction"
                title="Have a good problem?"
                text="I’m open to conversations about software, IT, and internship opportunities."
              />
            </Reveal>

            <div className="contact-layout">
              <Reveal className="contact-details">
                <a
                  className="contact-email"
                  href={`mailto:${profile.email}`}
                >
                  {profile.email}
                  <ArrowUpRight size={17} />
                </a>

                <Socials />

                <p className="micro">
                  {profile.location}
                </p>
              </Reveal>

              <Reveal>
                <form
                  className="new-form"
                  onSubmit={submit}
                  noValidate
                >
                  <label>
                    Name

                    <input
                      value={form.name}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          name: event.target.value,
                        })
                      }
                      placeholder="Your name"
                    />
                  </label>

                  <label>
                    Email

                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          email: event.target.value,
                        })
                      }
                      placeholder="you@example.com"
                    />
                  </label>

                  <label>
                    Message

                    <textarea
                      rows="4"
                      value={form.message}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          message: event.target.value,
                        })
                      }
                      placeholder="What are you working on?"
                    />
                  </label>

                  {status === 'error' && (
                    <p className="form-state error">
                      Please enter your name, a valid
                      email, and a message.
                    </p>
                  )}

                  {status === 'success' && (
                    <p className="form-state success">
                      <Check size={14} />
                      Message noted. Please use the
                      email link while the API is being
                      configured.
                    </p>
                  )}

                  <button
                    className="send-button"
                    disabled={status === 'success'}
                  >
                    {status === 'success'
                      ? 'Sent'
                      : 'Send message'}

                    <Send size={15} />
                  </button>
                </form>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="new-footer">
        <div className="page-width">
          <span>
            © {new Date().getFullYear()} Sanuja Nimsith
            Alphonsus
          </span>

          <span>Built with intent.</span>

          <button onClick={() => go('home')}>
            Back to top ↑
          </button>
        </div>
      </footer>
    </div>
  );
}