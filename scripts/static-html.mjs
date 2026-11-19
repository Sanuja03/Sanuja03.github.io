import fs from 'node:fs'
import path from 'node:path'
import { canonicalPath, site } from '../src/data/routes.js'

export function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function jsonForHtml(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

function metadataMarkup(metadata) {
  const robots = metadata.robots || 'index, follow'
  const publishedTime = metadata.publishedTime
    ? `<meta property="article:published_time" content="${escapeHtml(metadata.publishedTime)}">`
    : ''
  const structuredData = metadata.structuredData
    ? `<script id="page-structured-data" type="application/ld+json">${jsonForHtml(metadata.structuredData)}</script>`
    : ''

  return `
    <title>${escapeHtml(metadata.title)}</title>
    <meta name="description" content="${escapeHtml(metadata.description)}">
    <meta name="author" content="${escapeHtml(site.name)}">
    <meta name="robots" content="${robots}">
    <link rel="canonical" href="${escapeHtml(metadata.canonical)}">
    <meta property="og:title" content="${escapeHtml(metadata.title)}">
    <meta property="og:description" content="${escapeHtml(metadata.description)}">
    <meta property="og:type" content="${escapeHtml(metadata.type)}">
    <meta property="og:url" content="${escapeHtml(metadata.canonical)}">
    <meta property="og:site_name" content="${escapeHtml(site.name)}">
    <meta property="og:image" content="${escapeHtml(metadata.image)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(metadata.title)}">
    <meta name="twitter:description" content="${escapeHtml(metadata.description)}">
    <meta name="twitter:image" content="${escapeHtml(metadata.image)}">
    ${publishedTime}
    ${structuredData}`
}

function withoutExistingMetadata(template) {
  return template
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta[^>]+(?:name|property)="(?:description|author|robots|twitter:[^"]+|og:[^"]+|article:published_time)"[^>]*>\s*/gi, '')
    .replace(/<link[^>]+rel="canonical"[^>]*>\s*/gi, '')
    .replace(/<script[^>]+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>\s*/gi, '')
}

export function renderStaticDocument(template, metadata, body = '') {
  const document = withoutExistingMetadata(template).replace(
    '<head>',
    `<head>${metadataMarkup(metadata)}`,
  )

  if (!body) return document

  return document.replace(
    '<div id="root"></div>',
    `<div id="root">${body}</div>`,
  )
}

export function writeStaticPage(dist, route, template, metadata, body = '') {
  const canonicalRoute = canonicalPath(route)
  const target = canonicalRoute === '/'
    ? path.join(dist, 'index.html')
    : path.join(dist, canonicalRoute.slice(1), 'index.html')

  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, renderStaticDocument(template, metadata, body))
}

export function writeNotFoundPage(dist, template) {
  const metadata = {
    title: `Page not found | ${site.name}`,
    description: 'The requested page could not be found.',
    canonical: `${site.url}/`,
    type: 'website',
    image: `${site.url}${site.defaultImage}`,
    robots: 'noindex, follow',
  }

  fs.writeFileSync(
    path.join(dist, '404.html'),
    renderStaticDocument(template, metadata),
  )
}

export function writeSitemap(dist, routes) {
  const urls = [...new Set(routes.map((route) => `${site.url}${canonicalPath(route)}`))]
  const body = urls.map((url) => `<url><loc>${url}</loc></url>`).join('')
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`

  fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)
  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap)
}
