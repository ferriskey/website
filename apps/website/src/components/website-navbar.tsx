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
  const appLinks = getAppLinks('website', appUrlOverrides)
  const t = useTranslations(locale)

  useEffect(() => {
    setLocale(getClientLocale())
  }, [])

  const websiteLinks: NavbarLink[] = [
    { label: t('nav.features'), href: '#features' },
    { label: t('nav.getStarted'), href: '#get-started' },
  ]

  return (
    <Navbar
      currentApp="website"
      appUrlOverrides={appUrlOverrides}
      links={websiteLinks}
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
          onLocaleChange={() => window.location.reload()}
        />
      }
    />
  )
}
