import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { getPageMetadata, publicRoutes } from '../src/data/routes.js'
import { projects } from '../src/data/portfolio.js'
import { escapeHtml, writeNotFoundPage, writeSitemap, writeStaticPage } from './static-html.mjs'

const dist = path.resolve('dist')
const source = path.join(dist, 'index.html')

if (!fs.existsSync(source)) {
  throw new Error('Build output is missing dist/index.html')
}

const template = fs.readFileSync(source, 'utf8')

const publishedBlogPaths = fs.readdirSync(path.resolve('src/blog/posts'))
  .filter((file) => file.endsWith('.md'))
  .map((file) => {
    const parsed = matter(fs.readFileSync(path.resolve('src/blog/posts', file), 'utf8'))
    return parsed.data.draft ? null : `/blogs/${parsed.data.slug || file.replace('.md', '')}/`
  })
  .filter(Boolean)

// Readable HTML for each case study, present before JavaScript runs.
function projectMarkup(project) {
  const study = project.caseStudy
  const list = (items) => `<ul>${items.map(([title, text]) => `<li><strong>${escapeHtml(title)}</strong>: ${escapeHtml(text)}</li>`).join('')}</ul>`
  const paragraphs = (items) => items.map((text) => `<p>${escapeHtml(text)}</p>`).join('')

  return [
    '<main class="prerendered-project">',
    `<p>${escapeHtml(study.kind)}</p>`,
    `<h1>${escapeHtml(project.title)}</h1>`,
    `<p>${escapeHtml(study.lead)}</p>`,
    list(study.facts),
    '<h2>What it is</h2>',
    paragraphs(study.overview),
    study.highlights ? `<h2>${escapeHtml(study.highlightsTitle)}</h2>${list(study.highlights)}` : '',
    '<h2>Built with</h2>',
    `<ul>${Object.entries(study.stack).map(([category, items]) => `<li><strong>${escapeHtml(category)}</strong>: ${escapeHtml(items.join(', '))}</li>`).join('')}</ul>`,
    study.architecture ? `<h2>${escapeHtml(study.architecture.title)}</h2>${paragraphs(study.architecture.text)}` : '',
    `<h2>${study.kind.startsWith('Individual') ? 'What I built' : 'My part'}</h2>`,
    `<p>${escapeHtml(study.contributionIntro)}</p>`,
    list(study.contributions),
    '<h2>Problems I worked through</h2>',
    list(study.challenges),
    '<h2>What I learned</h2>',
    `<ul>${study.learnings.map((learning) => `<li>${escapeHtml(learning)}</li>`).join('')}</ul>`,
    '</main>',
  ].join('')
}

for (const route of publicRoutes.filter((item) => item.path !== '/blogs/')) {
  writeStaticPage(dist, route.path, template, getPageMetadata(route.path))
}

for (const project of projects.filter((item) => item.caseStudy && item.published !== false)) {
  writeStaticPage(
    dist,
    `/projects/${project.slug}/`,
    template,
    getPageMetadata(`/projects/${project.slug}/`),
    projectMarkup(project),
  )
}

writeNotFoundPage(dist, template)
writeSitemap(dist, [
  ...publicRoutes.map((route) => route.path),
  ...publishedBlogPaths,
  ...projects.filter((project) => project.caseStudy && project.published !== false).map((project) => `/projects/${project.slug}/`),
])
