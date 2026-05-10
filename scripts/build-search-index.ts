import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'src', 'content')
const outputFile = path.join(process.cwd(), 'public', 'search-index.json')

interface SearchDoc {
  title: string
  description: string
  path: string
  category: string
  content: string
}

function stripMarkdown(text: string): string {
  return text
    .replace(/#+ /g, '')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/`/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function buildIndex(): SearchDoc[] {
  const docs: SearchDoc[] = []

  if (!fs.existsSync(contentDir)) return docs

  const categories = fs.readdirSync(contentDir)

  for (const category of categories) {
    const categoryDir = path.join(contentDir, category)
    if (!fs.statSync(categoryDir).isDirectory()) continue

    const files = fs.readdirSync(categoryDir).filter(f => f.endsWith('.md'))

    for (const file of files) {
      const filePath = path.join(categoryDir, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(fileContent)

      const slug = file.replace('.md', '')
      const pagePath = `/${category}/${slug}`

      docs.push({
        title: data.title || slug,
        description: data.description || '',
        path: pagePath,
        category: category.replace(/-/g, ' '),
        content: stripMarkdown(content).slice(0, 2000) // Limit content length
      })
    }
  }

  return docs
}

const index = buildIndex()
fs.mkdirSync(path.dirname(outputFile), { recursive: true })
fs.writeFileSync(outputFile, JSON.stringify(index, null, 2))

console.log(`Search index generated with ${index.length} pages`)
