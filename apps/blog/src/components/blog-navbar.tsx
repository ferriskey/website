import { useState, useEffect } from 'react'
import type { NavbarLink } from '@explainer/ui'
import { LocaleSwitcher, MobileMenu, MobileNavLinks, Navbar, getAppLinks } from '@explainer/ui'
import { useTranslations } from '../i18n/utils'

interface BlogNavbarProps {
  activePath: string
  appUrlOverrides?: Partial<Record<string, string>>
  locale: string
  locales: string[]
  localeSwitchUrls: Record<string, string>
}

export function BlogNavbar({ activePath, appUrlOverrides, locale: initialLocale, locales, localeSwitchUrls }: BlogNavbarProps) {
  const isListing = activePath === '/' || activePath === ''
  const [locale, setLocale] = useState(initialLocale)

  useEffect(() => {
    setLocale(initialLocale)
  }, [initialLocale])
  const appLinks = getAppLinks('blog', appUrlOverrides)
  const t = useTranslations(locale)

  const blogLinks: NavbarLink[] = [
    { label: t('nav.allArticles'), href: '/', icon: 'lucide:newspaper' },
    { label: t('nav.rss'), href: `/${locale}/rss.xml`, icon: 'lucide:rss' },
  ]

  const handleListingLocaleChange = isListing
    ? (newLocale: string) => {
        setLocale(newLocale)
        document.querySelectorAll<HTMLElement>('[data-locale]').forEach((el) => {
          el.style.display = el.dataset.locale === newLocale ? '' : 'none'
        })
        document.dispatchEvent(new Event('tags:filter'))
      }
    : undefined

  return (
    <Navbar
      currentApp="blog"
      appUrlOverrides={appUrlOverrides}
      brandHref={appUrlOverrides?.website ?? '/'}
      links={blogLinks}
      activePath={activePath}
      leftSlot={
        <MobileMenu>
          <MobileNavLinks
            links={blogLinks}
            appLinks={appLinks}
            activePath={activePath}
          />
        </MobileMenu>
      }
      rightSlot={
        <LocaleSwitcher
          locales={locales}
          currentLocale={locale}
          switchUrls={isListing ? {} : localeSwitchUrls}
          onLocaleChange={handleListingLocaleChange}
        />
      }
    />
  )
}
