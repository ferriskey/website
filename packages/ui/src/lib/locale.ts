export const supportedLocales = ['en', 'fr', 'zh-CN', 'zh-TW'] as const
export type Locale = (typeof supportedLocales)[number]

export function normalizeLocale(value: string): Locale | undefined {
  const locale = value.toLowerCase()
  if (locale === 'zh' || locale.startsWith('zh-')) {
    if (/(?:^|-)hans(?:-|$)/.test(locale)) return 'zh-CN'
    return /(?:^|-)hant(?:-|$)/.test(locale) || /(?:^|-)(tw|hk|mo)(?:-|$)/.test(locale)
      ? 'zh-TW'
      : 'zh-CN'
  }
  const language = locale.split('-')[0]
  return language === 'en' || language === 'fr' ? language : undefined
}

export function getClientLocale(): Locale {
  const cookie = document.cookie.match(/(?:^|; )locale=([^;]*)/)?.[1]
  const saved = cookie && normalizeLocale(cookie)
  if (saved) return saved
  for (const language of navigator.languages?.length ? navigator.languages : [navigator.language]) {
    const locale = normalizeLocale(language)
    if (locale) return locale
  }
  return 'en'
}
