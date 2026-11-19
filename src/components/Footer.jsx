import { profile } from '../data/portfolio'
import { navigationRoutes } from '../data/routes'
import AppLink from './AppLink'

export default function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-about">
          <p className="footer-name">Sanuja Nimsith Alphonsus</p>
          <p>IT & Management undergraduate at the University of Moratuwa.</p>
          <a className="footer-email" href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>

        <nav className="footer-links" aria-label="Footer">
          {navigationRoutes.map((route) => (
            <AppLink key={route.path} to={route.path} navigate={navigate}>{route.label}</AppLink>
          ))}
        </nav>

        <div className="footer-links">
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.Instagram} target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </div>

      <p className="shell copyright">© {new Date().getFullYear()} Sanuja Nimsith Alphonsus</p>
    </footer>
  )
}
