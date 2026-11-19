import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import { getPageMetadata, publicRoutes } from '../src/data/routes.js'
import { escapeHtml, writeSitemap, writeStaticPage } from './static-html.mjs'

const root = process.cwd()
const postsDirectory = path.join(root, 'src', 'blog', 'posts')
const dist = path.join(root, 'dist')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

function removeLeadingHeading(content) {
  return content.replace(/^#\s+[^\n]+\r?\n+/, '')
}

const posts = fs.readdirSync(postsDirectory)
  .filter((file) => file.endsWith('.md'))
  .map((file) => {
    const parsed = matter(fs.readFileSync(path.join(postsDirectory, file), 'utf8'))

    return {
      ...parsed.data,
      slug: parsed.data.slug || file.replace('.md', ''),
      content: removeLeadingHeading(parsed.content.trim()),
    }
  })
  .filter((post) => !post.draft)

function renderMarkdown(content) {
  return renderToStaticMarkup(
    createElement(
      ReactMarkdown,
      { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeHighlight] },
      content,
    ),
  )
}

const listing = posts.map((post) => `
  <article>
    <p>${escapeHtml(post.category)}</p>
    <h2><a href="/blogs/${escapeHtml(post.slug)}/">${escapeHtml(post.title)}</a></h2>
    <p>${escapeHtml(post.description)}</p>
  </article>`).join('')

writeStaticPage(
  dist,
  '/blogs/',
  template,
  getPageMetadata('/blogs/'),
  `<main class="prerendered-blog">${listing}</main>`,
)

for (const post of posts) {
  const article = `
    <main class="prerendered-blog">
      <article>
        <p>${escapeHtml(post.category)} · ${escapeHtml(post.date)}</p>
        <h1>${escapeHtml(post.title)}</h1>
        <p>${escapeHtml(post.description)}</p>
        <div>${renderMarkdown(post.content)}</div>
      </article>
    </main>`

  writeStaticPage(
    dist,
    `/blogs/${post.slug}/`,
    template,
    getPageMetadata(`/blogs/${post.slug}/`, post),
    article,
  )
}

writeSitemap(dist, [
  ...publicRoutes.map((route) => route.path),
  ...posts.map((post) => `/blogs/${post.slug}/`),
])
