import { ArrowRight } from 'lucide-react'
import AppLink from '../components/AppLink'

export default function NotFound({ navigate }) {
  return (
    <main className="page shell not-found">
      <h1 className="page-title">This page doesn’t exist</h1>
      <p className="page-lead">The link may be out of date, or the page may have moved.</p>
      <AppLink className="text-link" to="/" navigate={navigate}>
        Go to the home page <ArrowRight size={16} />
      </AppLink>
    </main>
  )
}
