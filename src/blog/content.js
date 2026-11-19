const files = import.meta.glob('./posts/*.md', { eager: true, query: '?raw', import: 'default' })

function parseFrontmatter(source) {
  const match = source.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/)
  if (!match) return { data: {}, content: source }
  const data = {}
  let currentKey = ''
  const parseValue = value => {
    const cleaned = value.replace(/^['"]|['"]$/g, '')
    if (cleaned === 'true') return true
    if (cleaned === 'false') return false
    if (cleaned !== '' && !Number.isNaN(Number(cleaned))) return Number(cleaned)
    return cleaned
  }
  match[1].split(/\r?\n/).forEach(line => {
    const item = line.match(/^([\w]+):\s*(.*)$/)
    const listItem = line.match(/^\s+-\s+(.*)$/)
    if (item) { currentKey = item[1]; data[currentKey] = parseValue(item[2]) }
    else if (listItem && currentKey) data[currentKey] = [...(Array.isArray(data[currentKey]) ? data[currentKey] : []), parseValue(listItem[1])]
  })
  return { data, content: match[2] }
}

function removeLeadingHeading(content) {
  return content.replace(/^#\s+[^\n]+\r?\n+/, '')
}

const allPosts = Object.entries(files).map(([path, source]) => {
  const parsed = parseFrontmatter(source)
  const content = removeLeadingHeading(parsed.content.trim())

  return {
    ...parsed.data,
    slug: parsed.data.slug || path.split('/').pop().replace('.md', ''),
    content,
    tags: parsed.data.tags || [],
    readingTime:
      parsed.data.readingTime || Math.max(1, Math.ceil(content.split(/\s+/).length / 200)),
  }
}).sort((a, b) => new Date(b.date) - new Date(a.date))

export const posts = allPosts.filter((post) => !post.draft)

export function getPost(slug) { return posts.find(post => post.slug === slug) }
