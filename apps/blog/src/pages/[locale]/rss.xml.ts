import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { getPublishedPosts, getPostsByLocale, getPostSlug, getLocales } from '../../lib/posts'
import { useTranslations } from '../../i18n/utils'
import type { APIContext } from 'astro'

export async function getStaticPaths() {
  const allPosts = await getCollection('posts')
  const locales = getLocales(allPosts)

  return locales.map((locale) => ({
    params: { locale },
  }))
}

export async function GET(context: APIContext) {
  const locale = context.params.locale!
  const t = useTranslations(locale)
  const allPosts = await getCollection('posts')
  const localePosts = getPostsByLocale(allPosts, locale)
  const posts = getPublishedPosts(localePosts)

  return rss({
    title: t('rss.title'),
    description: t('rss.description'),
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/${locale}/${getPostSlug(post)}`,
    })),
  })
}
