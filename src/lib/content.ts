import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import hljs from 'highlight.js'

export interface DocPage {
  slug: string
  title: string
  description: string
  category: string
  content: string
  headings: Array<{ id: string; text: string; depth: number }>
  order?: number
}

export interface DocCategory {
  name: string
  slug: string
  pages: DocPage[]
}

const contentDir = path.join(process.cwd(), 'src', 'content')

// Configure marked with syntax highlighting and heading IDs
const renderer = new marked.Renderer()

renderer.code = ({ text, lang, escaped }: { text: string; lang?: string; escaped?: boolean }) => {
  // Decode HTML entities if the text was escaped by marked
  let code = text
  if (escaped) {
    code = text
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
  }

  const language = lang || 'plaintext'
  let highlighted: string

  try {
    if (hljs.getLanguage(language)) {
      highlighted = hljs.highlight(code, { language }).value
    } else {
      highlighted = hljs.highlightAuto(code).value
    }
  } catch {
    highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
  }

  return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`
}

renderer.heading = ({ text, depth }: { text: string; depth: number }) => {
  const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const fontSize = depth === 1 ? '2.25rem' : depth === 2 ? '1.5rem' : '1.25rem'
  const fontWeight = depth === 1 ? '800' : depth === 2 ? '700' : '600'
  const marginTop = depth === 1 ? '0' : depth === 2 ? '3rem' : '2.5rem'
  const marginBottom = depth === 1 ? '1.5rem' : depth === 2 ? '1.25rem' : '1rem'
  const borderBottom = depth === 2 ? 'border-bottom: 1px solid var(--border); padding-bottom: 0.75rem;' : ''
  return `<h${depth} id="${id}" style="font-size: ${fontSize}; font-weight: ${fontWeight}; letter-spacing: -0.02em; line-height: 1.35; margin-top: ${marginTop}; margin-bottom: ${marginBottom}; color: var(--foreground); ${borderBottom}">${text}</h${depth}>`
}

marked.use({ renderer, gfm: true, breaks: true })

export function getAllCategories(): DocCategory[] {
  const categories: DocCategory[] = []

  if (!fs.existsSync(contentDir)) return categories

  const items = fs.readdirSync(contentDir)

  for (const item of items) {
    const itemPath = path.join(contentDir, item)
    const stat = fs.statSync(itemPath)

    if (stat.isDirectory()) {
      const pages = getPagesInCategory(item)
      if (pages.length > 0) {
        categories.push({
          name: item.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          slug: item,
          pages
        })
      }
    }
  }

  return categories
}

export function getPagesInCategory(category: string): DocPage[] {
  const categoryDir = path.join(contentDir, category)
  const pages: DocPage[] = []

  if (!fs.existsSync(categoryDir)) return pages

  const files = fs.readdirSync(categoryDir)
    .filter(f => f.endsWith('.md'))
    .sort()

  for (const file of files) {
    const filePath = path.join(categoryDir, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    const slug = file.replace('.md', '')
    // Use sync parsing - marked.parse returns string when async is false
    const html = marked.parse(content, { async: false }) as string

    // Extract headings from the generated HTML
    const headings: Array<{ id: string; text: string; depth: number }> = []
    const regex = /<h([2-3])\s+id="([^"]+)"[^>]*>(.*?)<\/h\1>/g
    let match

    while ((match = regex.exec(html)) !== null) {
      const depth = parseInt(match[1], 10)
      const id = match[2]
      const text = match[3].replace(/<[^>]*>/g, '')
      headings.push({ id, text, depth })
    }

    pages.push({
      slug,
      title: data.title || slug,
      description: data.description || '',
      category,
      content: html,
      headings,
      order: data.order || 0
    })
  }

  return pages.sort((a, b) => (a.order || 0) - (b.order || 0))
}

export function getPage(category: string, slug: string): DocPage | null {
  const categories = getAllCategories()
  const cat = categories.find(c => c.slug === category)
  if (!cat) return null

  return cat.pages.find(p => p.slug === slug) || null
}

export function getAllPages(): DocPage[] {
  const categories = getAllCategories()
  return categories.flatMap(c => c.pages)
}

export function searchPages(query: string): DocPage[] {
  const pages = getAllPages()
  const lowerQuery = query.toLowerCase()

  return pages.filter(page =>
    page.title.toLowerCase().includes(lowerQuery) ||
    page.description.toLowerCase().includes(lowerQuery) ||
    page.content.toLowerCase().includes(lowerQuery)
  )
}
