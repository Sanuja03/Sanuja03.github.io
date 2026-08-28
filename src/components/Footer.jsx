import { profile } from '../data/portfolio'

export default function Footer({ navigate }) {
  return (
    <footer>
      <div className="shell footer-grid">
        <div>
          <span className="footer-name">Sanuja Nimsith Alphonsus</span>
          <p>
            IT & Management Undergraduate.
            <br />
            Building with care and curiosity.
          </p>
        </div>

        <div className="footer-links">
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/projects')}>Projects</button>
          <button onClick={() => navigate('/contact')}>Contact</button>
        </div>

        <div className="footer-social">
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a href={profile.Instagram} target="_blank" rel="noreferrer">
            Instagram ↗
          </a>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
      </div>

      <div className="shell copyright">
        © {new Date().getFullYear()} Sanuja Nimsith Alphonsus — designed for
        the long run.
      </div>
    </footer>
  )
}