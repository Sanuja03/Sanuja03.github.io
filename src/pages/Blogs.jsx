import { ArrowRight } from 'lucide-react'
import { posts } from '../blog/content'
import Reveal from '../components/Reveal'
import AppLink from '../components/AppLink'
import { formatDate } from '../lib/format'

export default function Blogs({ navigate }) {
  return (
    <main className="page shell">
      <Reveal className="page-intro">
        <h1 className="page-title">Blog</h1>
        <p className="page-lead">
          Notes on problems I have run into while building things, and what I learned from them.
        </p>
      </Reveal>

      <ul className="post-list">
        {posts.map((post) => (
          <Reveal as="li" className="post-item" key={post.slug}>
            <p className="post-meta">
              <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime} min read
            </p>
            <h2>
              <AppLink to={`/blogs/${post.slug}/`} navigate={navigate}>{post.title}</AppLink>
            </h2>
            <p>{post.description}</p>
            <AppLink className="text-link" to={`/blogs/${post.slug}/`} navigate={navigate} aria-label={`Read ${post.title}`}>
              Read the post <ArrowRight size={16} />
            </AppLink>
          </Reveal>
        ))}
      </ul>
    </main>
  )
}
