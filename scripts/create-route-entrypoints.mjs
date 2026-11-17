import fs from 'node:fs'
import path from 'node:path'

const dist = path.resolve('dist')
const source = path.join(dist, 'index.html')
const routes = ['skills', 'projects', 'journey', 'contact']

if (!fs.existsSync(source)) {
  throw new Error('Build output is missing dist/index.html')
}

const html = fs.readFileSync(source, 'utf8')

for (const route of routes) {
  const directory = path.join(dist, route)
  fs.mkdirSync(directory, { recursive: true })
  fs.writeFileSync(path.join(directory, 'index.html'), html)
}
