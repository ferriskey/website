import type { CollectionEntry } from 'astro:content'

export type Post = CollectionEntry<'posts'>

const localeBcp47: Record<string, string> = {
  en: 'en-US',
  fr: 'fr-FR',
  de: 'de-DE',
  es: 'es-ES',
  pt: 'pt-BR',
  ja: 'ja-JP',
}

export function getPublishedPosts(posts: Post[]): Post[] {
  return posts
    .filter((post) => post.data.status === 'published')
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
}

export function getAllTags(posts: Post[]): { name: string; count: number }[] {
  const tagMap = new Map<string, number>()
  for (const post of posts) {
    if (post.data.status !== 'published') continue
    for (const tag of post.data.tags) {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1)
    }
  }
  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

export function getPostLocale(post: Post): string {
  return post.id.split('/')[0]
}

export function getPostSlug(post: Post): string {
  // id is "en/my-post.mdx" or "en/my-post" — strip locale prefix and extension
  const withoutLocale = post.id.includes('/') ? post.id.split('/').slice(1).join('/') : post.id
  return withoutLocale.replace(/\.mdx$/, '')
}

export function getPostHref(post: Post): string {
  return `/${getPostLocale(post)}/${getPostSlug(post)}`
}

export function getPostsByLocale(posts: Post[], locale: string): Post[] {
  return posts.filter((post) => getPostLocale(post) === locale)
}

export function getLocales(posts: Post[]): string[] {
  const locales = new Set<string>()
  for (const post of posts) {
    locales.add(getPostLocale(post))
  }
  return Array.from(locales).sort()
}

export function buildLocaleSwitchUrls(posts: Post[], currentPost: Post, locales: string[]): Record<string, string> {
  const slug = getPostSlug(currentPost)
  const urls: Record<string, string> = {}
  for (const locale of locales) {
    const match = posts.find((p) => getPostLocale(p) === locale && getPostSlug(p) === slug)
    if (match) {
      urls[locale] = getPostHref(match)
    } else {
      urls[locale] = '/'
    }
  }
  return urls
}

export function buildListingSwitchUrls(locales: string[]): Record<string, string> {
  const urls: Record<string, string> = {}
  for (const locale of locales) {
    urls[locale] = `/${locale}`
  }
  return urls
}

export function formatDate(date: Date, locale = 'en'): string {
  const bcp47 = localeBcp47[locale] ?? `${locale}-${locale.toUpperCase()}`
  return date.toLocaleDateString(bcp47, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getReadingTime(body: string): number {
  const text = body.replace(/<[^>]*>/g, '').replace(/\{[^}]*\}/g, '')
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

export function getFeaturedPosts(posts: Post[], count = 3): Post[] {
  return posts.slice(0, count)
}

export function getNonFeaturedPosts(posts: Post[], featuredCount = 3): Post[] {
  return posts.slice(featuredCount)
}

export const POSTS_PER_PAGE = 10

export function paginatePosts(posts: Post[], page: number): { posts: Post[]; totalPages: number } {
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const start = (page - 1) * POSTS_PER_PAGE
  return {
    posts: posts.slice(start, start + POSTS_PER_PAGE),
    totalPages,
  }
}
