export const defaultLang = 'en' as const

export const ui = {
  en: {
    // Index page
    'index.title': 'Articles',
    'index.heading.prefix': 'Latest',
    'index.heading.highlight': 'articles',
    'index.empty': 'No articles yet.',
    'index.noResults': 'No articles match your search.',

    // RSS
    'rss.title': 'Explainer Blog',
    'rss.description': 'Latest articles from the Explainer blog',

    // Footer
    'footer.text': 'Built with Explainer v2',

    // Post layout
    'post.back': 'Back to writing',
    'post.published': 'Published',

    // Hero section
    'hero.minRead': 'min read',

    // Navbar
    'nav.allArticles': 'All articles',
    'nav.categories': 'Categories',
    'nav.rss': 'RSS',

    // Tag filter
    'tagFilter.placeholder': 'Search articles...',

    // Table of contents
    'toc.title': 'On this page',

    // Sponsors
    'sponsors.title': 'Sponsors',

    // Author
    'author.label': 'Written by',

    // Share buttons
    'share.linkedin': 'Share on LinkedIn',
    'share.twitter': 'Share on Twitter',
    'share.facebook': 'Share on Facebook',
    'share.copyLink': 'Copy link',
  },
  fr: {
    // Index page
    'index.title': 'Articles',
    'index.heading.prefix': 'Derniers',
    'index.heading.highlight': 'articles',
    'index.empty': 'Aucun article pour le moment.',
    'index.noResults': 'Aucun article ne correspond à votre recherche.',

    // RSS
    'rss.title': 'Blog Explainer',
    'rss.description': 'Les derniers articles du blog Explainer',

    // Footer
    'footer.text': 'Construit avec Explainer v2',

    // Post layout
    'post.back': "Retour aux articles",
    'post.published': 'Publié le',

    // Hero section
    'hero.minRead': 'min de lecture',

    // Navbar
    'nav.allArticles': 'Tous les articles',
    'nav.categories': 'Catégories',
    'nav.rss': 'RSS',

    // Tag filter
    'tagFilter.placeholder': 'Rechercher un article...',

    // Table of contents
    'toc.title': 'Sur cette page',

    // Sponsors
    'sponsors.title': 'Sponsors',

    // Author
    'author.label': 'Écrit par',

    // Share buttons
    'share.linkedin': 'Partager sur LinkedIn',
    'share.twitter': 'Partager sur Twitter',
    'share.facebook': 'Partager sur Facebook',
    'share.copyLink': 'Copier le lien',
  },
} as const

export type UiKey = keyof (typeof ui)['en']
