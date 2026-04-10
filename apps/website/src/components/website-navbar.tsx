import type { NavbarLink } from '@explainer/ui'
import { LocaleSwitcher, MobileMenu, MobileNavLinks, Navbar, getAppLinks } from '@explainer/ui'
import { useEffect, useState } from 'react'
import { useTranslations } from '../i18n/utils'

function getClientLocale(): string {
  const match = document.cookie.match(/(?:^|; )locale=([^;]*)/)
  const cookie = match?.[1]
  if (cookie === 'en' || cookie === 'fr') return cookie
  const browser = (navigator.language || '').split('-')[0]
  if (browser === 'en' || browser === 'fr') return browser
  return 'en'
}

interface WebsiteNavbarProps {
  appUrlOverrides?: Partial<Record<string, string>>
}

export function WebsiteNavbar({ appUrlOverrides }: WebsiteNavbarProps) {
  const [locale, setLocale] = useState('en')
  const [pathname, setPathname] = useState('/')
  const appLinks = getAppLinks(pathname === '/' ? 'website' : '', appUrlOverrides)
  const t = useTranslations(locale)
  const docsHref = appUrlOverrides?.docs ?? '/'

  useEffect(() => {
    setLocale(getClientLocale())
    setPathname(window.location.pathname)
  }, [])

  const websiteLinks: NavbarLink[] = [
    { label: t('nav.roadmap'), href: '/roadmap' },
    { label: t('nav.releaseNotes'), href: '/release-notes' },
    { label: t('nav.getStarted'), href: docsHref },
  ]

  return (
    <Navbar
      currentApp={pathname === '/' ? 'website' : ''}
      appUrlOverrides={appUrlOverrides}
      links={websiteLinks}
      activePath={pathname}
      leftSlot={
        <MobileMenu>
          <MobileNavLinks
            links={websiteLinks}
            appLinks={appLinks}
          />
        </MobileMenu>
      }
      rightSlot={
        <LocaleSwitcher
          locales={['en', 'fr']}
          currentLocale={locale}
          onLocaleChange={(nextLocale) => {
            setLocale(nextLocale)
            window.dispatchEvent(new CustomEvent('ferriskey:locale-change', { detail: { locale: nextLocale } }))
            window.setTimeout(() => window.location.reload(), 50)
          }}
        />
      }
    />
  )
}
