import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'

import { getProject, profile } from './data/portfolio'
import Home from './pages/Home'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Journey from './pages/Journey'
import Contact from './pages/Contact'
import Blogs from './pages/Blogs'
import BlogPost from './pages/BlogPost'
import ProjectDetail from './pages/ProjectDetail'
import NotFound from './pages/NotFound'
import Footer from './components/Footer'
import AppLink from './components/AppLink'
import { getPost } from './blog/content'
import {
  canonicalPath,
  getBlogSlug,
  getPageMetadata,
  navigationRoutes,
} from './data/routes'
import { updateDocumentMetadata } from './lib/seo'
import { scrollToTop } from './lib/smoothScroll'

import './site.css'

const pageComponents = {
  '/': Home,
  '/skills/': Skills,
  '/projects/': Projects,
  '/journey/': Journey,
  '/contact/': Contact,
  '/blogs/': Blogs,
}

function normalizePath(value) {
  if (typeof value !== 'string' || value.trim() === '') return '/'

  let decoded

  try {
    decoded = decodeURIComponent(value.trim())
  } catch {
    return '/'
  }
  return canonicalPath(decoded.startsWith('/') ? decoded : `/${decoded}`)
}

export default function App() {
  const [path, setPath] = useState(() => {
    const fallback = new URLSearchParams(window.location.search).get('path')

    return normalizePath(fallback || window.location.pathname)
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

    if (fallback) {
      history.replaceState({}, '', normalizePath(fallback))
    }

    const pop = () => {
      setPath(normalizePath(window.location.pathname))
    }

    const scroll = () => {
      setScrolled(scrollY > 16)
    }

    const keydown = (event) => {
      if (event.key === 'Escape') setMenu(false)
    }

    addEventListener('popstate', pop)
    addEventListener('scroll', scroll, { passive: true })
    addEventListener('keydown', keydown)

    scroll()

    return () => {
      removeEventListener('popstate', pop)
      removeEventListener('scroll', scroll)
      removeEventListener('keydown', keydown)
    }
  }, [])

  const navigate = (next) => {
    const nextPath = normalizePath(next)
    history.pushState({}, '', nextPath)
    setPath(nextPath)
    setMenu(false)

    // A new page should open at the top straight away, not scroll there.
    scrollToTop({ immediate: true })
  }

  const slug = getBlogSlug(path)
  const post = slug ? getPost(slug) : null
  const projectSlug = path.match(/^\/projects\/([^/]+)\/$/)?.[1] || null
  const project = projectSlug ? getProject(projectSlug) : null
  const Page = pageComponents[path] || (post ? BlogPost : project ? ProjectDetail : NotFound)
  const pageProps = post
    ? { navigate, post }
    : project
      ? { navigate, project }
      : { navigate, profile }

  useEffect(() => {
    updateDocumentMetadata(getPageMetadata(path, post))
  }, [path, post])

  return (
    <div className="app-shell">
      <header
        className={`site-nav ${scrolled ? 'nav-scrolled' : ''}`}
      >
        <nav className="shell" aria-label="Primary navigation">
          <AppLink
            className="identity"
            to="/"
            navigate={navigate}
          >
            <span>SA</span>
            <b>Sanuja Alphonsus</b>
          </AppLink>

          <div
            className={`main-nav ${menu ? 'nav-open' : ''}`}
            id="main-navigation"
          >
            {navigationRoutes.map((link) => (
              <AppLink
                className={
                  path === link.path || (link.path !== '/' && path.startsWith(link.path))
                    ? 'active'
                    : ''
                }
                aria-current={path === link.path ? 'page' : undefined}
                key={link.path}
                to={link.path}
                navigate={navigate}
              >
                {link.label}
              </AppLink>
            ))}
          </div>

          <div className="nav-controls">
            <button
              type="button"
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
              type="button"
              className="menu"
              onClick={() => setMenu(!menu)}
              aria-label="Toggle menu"
              aria-expanded={menu}
              aria-controls="main-navigation"
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      </header>

      <Page {...pageProps} />

      <Footer navigate={navigate} />
    </div>
  )
}
