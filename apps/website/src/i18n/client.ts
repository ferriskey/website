import { ui } from './ui'
import { getClientLocale } from './locale'

function applyTranslations() {
  const locale = getClientLocale()
  document.documentElement.lang = locale
  const translations = ui[locale]

  document.querySelectorAll<HTMLElement>('[data-t]').forEach((el) => {
    const key = el.dataset.t as keyof typeof ui.en
    const text = translations[key] ?? ui.en[key]
    if (text !== undefined) el.textContent = text
  })

  const docsLocale = locale === 'fr' ? 'en' : locale
  document.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((anchor) => {
    const url = new URL(anchor.href)
    if (
      /^\/(?:en|zh-CN|zh-TW)\/(?:discover|modules|cli|kubernetes|learn|terraform)\//.test(
        url.pathname,
      )
    ) {
      url.pathname = url.pathname.replace(/^\/[^/]+\//, `/${docsLocale}/`)
      anchor.href = url.href
    }
  })

  const thumbnail = new URL(
    locale === 'fr' ? '/thumbnails/fr/thumbnail.png' : '/thumbnail.png',
    window.location.origin,
  ).href
  document
    .querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]')
    .forEach((el) => {
      el.setAttribute('content', thumbnail)
    })
}

applyTranslations()
document.addEventListener('astro:after-swap', applyTranslations)
window.addEventListener('ferriskey:locale-change', applyTranslations)
