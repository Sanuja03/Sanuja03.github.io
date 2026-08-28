import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'

import { profile } from './data/portfolio'
import Home from './pages/Home'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Journey from './pages/Journey'
import Contact from './pages/Contact'
import Footer from './components/Footer'

import './site.css'

const routes = {
  '/': Home,
  '/skills': Skills,
  '/projects': Projects,
  '/journey': Journey,
  '/contact': Contact,
}

const links = [
  { path: '/', label: 'Home' },
  { path: '/skills', label: 'Skills' },
  { path: '/projects', label: 'Projects' },
  { path: '/journey', label: 'Journey' },
  { path: '/contact', label: 'Contact' },
]

export default function App() {
  const [path, setPath] = useState(() => {
    const fallback = new URLSearchParams(window.location.search).get('path')

    return routes[fallback]
      ? fallback
      : routes[window.location.pathname]
        ? window.location.pathname
        : '/'
  })

  const [theme, setTheme] = useState(
    () =>
      localStorage.getItem('theme') ||
      (matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light')
  )

  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const fallback = new URLSearchParams(window.location.search).get('path')

    if (routes[fallback]) {
      history.replaceState({}, '', fallback)
    }

    const pop = () => {
      setPath(
        routes[window.location.pathname]
          ? window.location.pathname
          : '/'
      )
    }

    const scroll = () => {
      setScrolled(scrollY > 16)
    }

    addEventListener('popstate', pop)
    addEventListener('scroll', scroll, { passive: true })

    scroll()

    return () => {
      removeEventListener('popstate', pop)
      removeEventListener('scroll', scroll)
    }
  }, [])

  const navigate = (next) => {
    history.pushState({}, '', next)
    setPath(next)
    setMenu(false)

    scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const Page = routes[path] || Home

  return (
    <div className="app-shell">
      <header
        className={`site-nav ${scrolled ? 'nav-scrolled' : ''}`}
      >
        <nav className="shell">
          <button
            className="identity"
            onClick={() => navigate('/')}
          >
            <span>SA</span>
            <b>Sanuja Alphonsus</b>
          </button>

          <div className={`main-nav ${menu ? 'nav-open' : ''}`}>
            {links.map((link) => (
              <button
                className={path === link.path ? 'active' : ''}
                onClick={() => navigate(link.path)}
                key={link.path}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="nav-controls">
            <button
              className="theme"
              onClick={() =>
                setTheme(theme === 'dark' ? 'light' : 'dark')
              }
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>

            <button
              className="menu"
              onClick={() => setMenu(!menu)}
              aria-label="Toggle menu"
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      </header>

      <Page navigate={navigate} profile={profile} />

      <Footer navigate={navigate} />
    </div>
  )
}