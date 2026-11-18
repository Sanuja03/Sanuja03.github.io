function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.append(element)
  }

  element.setAttribute('content', content)
}

function setCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]')

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.append(element)
  }

  element.setAttribute('href', href)
}

function setStructuredData(data) {
  const existing = document.getElementById('page-structured-data')

  if (!data) {
    existing?.remove()
    return
  }

  const script = existing || document.createElement('script')
  script.id = 'page-structured-data'
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(data)

  if (!existing) document.head.append(script)
}

export function updateDocumentMetadata(metadata) {
  document.title = metadata.title
  setMeta('name', 'description', metadata.description)
  setMeta('name', 'robots', metadata.robots || 'index, follow')
  setCanonical(metadata.canonical)
  setMeta('property', 'og:title', metadata.title)
  setMeta('property', 'og:description', metadata.description)
  setMeta('property', 'og:type', metadata.type)
  setMeta('property', 'og:url', metadata.canonical)
  setMeta('property', 'og:image', metadata.image)
  setMeta('name', 'twitter:card', 'summary_large_image')
  setMeta('name', 'twitter:title', metadata.title)
  setMeta('name', 'twitter:description', metadata.description)
  setMeta('name', 'twitter:image', metadata.image)

  if (metadata.publishedTime) {
    setMeta('property', 'article:published_time', metadata.publishedTime)
  } else {
    document.head.querySelector('meta[property="article:published_time"]')?.remove()
  }

  setStructuredData(metadata.structuredData)
}
