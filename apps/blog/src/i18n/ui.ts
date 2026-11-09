export const defaultLang = 'en' as const

export const ui = {
  'zh-TW': {
    'index.title': '文章',
    'index.label': '部落格',
    'index.heading.prefix': '最新動態，來自',
    'index.heading.highlight': 'FerrisKey。',
    'index.empty': '暫無文章。',
    'index.noResults': '沒有符合搜尋條件的文章。',
    'index.filterLabel': '按分類篩選',
    'index.articleCount': '篇文章',
    'rss.title': 'Explainer 部落格',
    'rss.description': 'Explainer 部落格的最新文章',
    'footer.text': '© 2025 Ferriskey · Apache 2.0',
    'footer.tagline': '使用 Rust 編寫的開源身分與存取管理平臺。',
    'post.back': '返回文章列表',
    'post.published': '釋出於',
    'hero.minRead': '分鐘閱讀',
    'nav.allArticles': '所有文章',
    'nav.categories': '分類',
    'nav.rss': 'RSS',
    'tagFilter.placeholder': '搜尋文章…',
    'toc.title': '本頁內容',
    'sponsors.title': '贊助商',
    'author.label': '作者',
    'share.linkedin': '分享到 LinkedIn',
    'share.twitter': '分享到 Twitter',
    'share.facebook': '分享到 Facebook',
    'share.copyLink': '複製連結',
  },
  'zh-CN': {
    'index.title': '文章',
    'index.label': '博客',
    'index.heading.prefix': '最新动态，来自',
    'index.heading.highlight': 'FerrisKey。',
    'index.empty': '暂无文章。',
    'index.noResults': '没有符合搜索条件的文章。',
    'index.filterLabel': '按分类筛选',
    'index.articleCount': '篇文章',
    'rss.title': 'Explainer 博客',
    'rss.description': 'Explainer 博客的最新文章',
    'footer.text': '© 2025 Ferriskey · Apache 2.0',
    'footer.tagline': '使用 Rust 编写的开源身分与访问管理平台。',
    'post.back': '返回文章列表',
    'post.published': '发布于',
    'hero.minRead': '分钟阅读',
    'nav.allArticles': '所有文章',
    'nav.categories': '分类',
    'nav.rss': 'RSS',
    'tagFilter.placeholder': '搜索文章…',
    'toc.title': '本页内容',
    'sponsors.title': '赞助商',
    'author.label': '作者',
    'share.linkedin': '分享到 LinkedIn',
    'share.twitter': '分享到 Twitter',
    'share.facebook': '分享到 Facebook',
    'share.copyLink': '复制链接',
  },
  en: {
    // Index page
    'index.title': 'Articles',
    'index.label': 'Blog',
    'index.heading.prefix': 'Latest updates from',
    'index.heading.highlight': 'FerrisKey.',
    'index.empty': 'No articles yet.',
    'index.noResults': 'No articles match your search.',
    'index.filterLabel': 'Filter by category',
    'index.articleCount': 'articles',

    // RSS
    'rss.title': 'Explainer Blog',
    'rss.description': 'Latest articles from the Explainer blog',

    // Footer
    'footer.text': '© 2025 Ferriskey · Apache 2.0',
    'footer.tagline': 'Open-source identity and access management, written in Rust.',

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
    'index.label': 'Blog',
    'index.heading.prefix': 'Les dernières nouvelles de',
    'index.heading.highlight': 'FerrisKey.',
    'index.empty': 'Aucun article pour le moment.',
    'index.noResults': 'Aucun article ne correspond à votre recherche.',
    'index.filterLabel': 'Filtrer par catégorie',
    'index.articleCount': 'articles',

    // RSS
    'rss.title': 'Blog Explainer',
    'rss.description': 'Les derniers articles du blog Explainer',

    // Footer
    'footer.text': '© 2025 Ferriskey · Apache 2.0',
    'footer.tagline': 'Gestion des identités et des accès open source, écrite en Rust.',

    // Post layout
    'post.back': 'Retour aux articles',
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
