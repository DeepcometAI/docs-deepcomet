export default defineAppConfig({
  ui: {
    colors: {
      primary: 'sky',
      neutral: 'slate'
    },
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted'
      }
    }
  },
  seo: {
    siteName: 'Deepcomet AI Docs'
  },
  header: {
    title: 'Deepcomet AI',
    to: '/',
    logo: {
      alt: 'Deepcomet AI Logo',
      light: '',
      dark: ''
    },
    search: true,
    colorMode: true,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/Nehal-aditya',
      'target': '_blank',
      'aria-label': 'GitHub'
    }]
  },
  footer: {
    credits: `Deepcomet AI • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/Nehal-aditya',
      'target': '_blank',
      'aria-label': 'Deepcomet on GitHub'
    }]
  },
  toc: {
    title: 'On this page',
    bottom: {
      title: 'Community',
      edit: '',
      links: [{
        icon: 'i-lucide-globe',
        label: 'Main Website',
        to: 'https://ai.deepcomet.space',
        target: '_blank'
      }, {
        icon: 'i-lucide-github',
        label: 'GitHub',
        to: 'https://github.com/Nehal-aditya',
        target: '_blank'
      }]
    }
  }
})
