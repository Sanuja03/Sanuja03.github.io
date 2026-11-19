import { ArrowLeft, ArrowRight } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import Reveal from '../components/Reveal'
import AppLink from '../components/AppLink'
import { formatDate } from '../lib/format'

export default function BlogPost({ post, navigate }) {
  return (
    <main className="page shell article">
      <Reveal className="article-head">
        <AppLink className="back-link" to="/blogs/" navigate={navigate}>
          <ArrowLeft size={16} /> All posts
        </AppLink>
        <h1 className="article-title">{post.title}</h1>
        <p className="article-deck">{post.description}</p>
        <p className="post-meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime} min read
        </p>
      </Reveal>

      <div className="article-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {post.content}
        </ReactMarkdown>
      </div>

      <div className="article-end">
        <AppLink className="text-link" to="/blogs/" navigate={navigate}>
          <ArrowLeft size={16} /> All posts
        </AppLink>
        <AppLink
          className="text-link"
          to={post.project ? `/projects/${post.project}/` : '/projects/'}
          navigate={navigate}
        >
          {post.project ? 'The project behind this post' : 'See my projects'} <ArrowRight size={16} />
        </AppLink>
      </div>
    </main>
  )
}
