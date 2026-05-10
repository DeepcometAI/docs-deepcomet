# Deepcomet AI Documentation

[![Deploy](https://github.com/Nehal-aditya/docs-deepcomet/actions/workflows/deploy.yml/badge.svg)](https://github.com/Nehal-aditya/docs-deepcomet/actions/workflows/deploy.yml)

The official documentation site for [Deepcomet AI](https://ai.deepcomet.space), built with [Astro](https://astro.build), [Starwind UI](https://starwind.dev), and [Tailwind CSS](https://tailwindcss.com).

**Live Site:** [docs.deepcomet.space](https://docs.deepcomet.space)

## Tech Stack

- **Framework:** [Astro](https://astro.build) v6 — Static Site Generation (SSG)
- **UI Components:** [Starwind UI](https://starwind.dev) — shadcn/ui for Astro
- **Styling:** [Tailwind CSS](https://tailwindcss.com) v4
- **Markdown Processing:** [marked](https://marked.js.org) + [gray-matter](https://github.com/jonschlinkert/gray-matter)
- **Syntax Highlighting:** [highlight.js](https://highlightjs.org)
- **Fonts:** Inter + JetBrains Mono

## Project Structure

```text
/
├── public/                    # Static assets (CNAME, .nojekyll, favicon)
├── scripts/
│   └── build-search-index.ts  # Search index generator
├── src/
│   ├── components/
│   │   ├── starwind/          # Starwind UI components
│   │   ├── DocsHeader.astro   # Header with search
│   │   ├── DocsSidebar.astro  # Navigation sidebar
│   │   └── DocsTOC.astro      # Table of contents
│   ├── content/
│   │   ├── getting-started/   # Getting started docs
│   │   ├── essentials/        # Core tech docs
│   │   └── ai/                # AI & infrastructure docs
│   ├── layouts/
│   │   └── DocsLayout.astro   # Docs page layout
│   ├── lib/
│   │   └── content.ts         # Markdown parsing utilities
│   ├── pages/
│   │   ├── index.astro        # Homepage
│   │   └── [...slug].astro    # Dynamic doc pages
│   └── styles/
│       └── starwind.css       # Theme & Tailwind config
├── .github/workflows/
│   └── deploy.yml             # GitHub Pages deployment
├── astro.config.mjs
└── package.json
```

## Features

- **Full Static Site Generation** — No server runtime required
- **Client-side Search** — Full-text search across all docs with highlighted results
- **Responsive Sidebar** — Collapsible navigation sections with active state
- **Table of Contents** — Auto-generated from headings with scroll spy
- **Breadcrumbs** — Hierarchical page navigation
- **Syntax Highlighting** — Code blocks with dark theme
- **GitHub Pages** — Automated deployment on every push to `main`
- **Custom Domain** — `docs.deepcomet.space` with CNAME

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Adding Documentation

1. Create a new `.md` file in `src/content/<category>/`
2. Add frontmatter:
   ```yaml
   ---
   title: Page Title
   description: Brief description
   order: 1
   ---
   ```
3. Write content in Markdown
4. Rebuild to generate search index

## Deployment

The site automatically deploys to GitHub Pages on every push to `main`.

**Custom Domain:** `docs.deepcomet.space`

To deploy manually:
```bash
pnpm build
# dist/ folder is ready for deployment
```

## License

[MIT](LICENSE)
