'use client'

import * as React from 'react'
import { Icon } from '@iconify/react'
import { cn } from '../lib/utils'

export interface LocaleSwitcherProps {
  locales: string[]
  currentLocale: string
  switchUrls?: Record<string, string>
  dropUp?: boolean
  onLocaleChange?: (locale: string) => void
}

const localeNames: Record<string, string> = {
  en: 'English',
  fr: 'Francais',
  de: 'Deutsch',
  es: 'Espanol',
  pt: 'Portugues',
  ja: 'Japanese',
  zh: 'Chinese',
  ko: 'Korean',
  ru: 'Russian',
  it: 'Italiano',
}

function setLocaleCookie(locale: string) {
  const hostname = window.location.hostname
  const parts = hostname.split('.')

  // Set cookie without domain for public suffixes (e.g. pages.dev, github.io)
  // and with root domain for custom domains (e.g. .explainer.dev)
  const isPublicSuffix = parts.length <= 2 || ['pages.dev', 'github.io', 'vercel.app', 'netlify.app', 'workers.dev'].some(
    (s) => hostname.endsWith(s)
  )

  const domainAttr = isPublicSuffix ? '' : `;domain=.${parts.slice(-2).join('.')}`
  document.cookie = `locale=${locale};path=/${domainAttr};max-age=${60 * 60 * 24 * 365};SameSite=Lax`
}

export function LocaleSwitcher({ locales, currentLocale, switchUrls = {}, dropUp, onLocaleChange }: LocaleSwitcherProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-accent transition-colors"
      >
        <Icon icon="lucide:globe" className="size-4" />
        {currentLocale.toUpperCase()}
        <Icon icon="lucide:chevrons-up-down" className="size-4 text-muted-foreground" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className={cn('absolute z-50 min-w-[140px] rounded-md border bg-popover p-1 shadow-md', dropUp ? 'left-0 bottom-full mb-1' : 'right-0 top-full mt-1')}>
            {locales.map((locale) => (
              <a
                key={locale}
                href={switchUrls[locale] ?? '#'}
                className={cn(
                  'flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors',
                  locale === currentLocale
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                )}
                onClick={(e) => {
                  setLocaleCookie(locale)
                  setOpen(false)
                  if (onLocaleChange) {
                    e.preventDefault()
                    onLocaleChange(locale)
                  }
                }}
              >
                {locale === currentLocale ? (
                  <Icon icon="lucide:check" className="size-3" />
                ) : (
                  <span className="size-3" />
                )}
                {localeNames[locale] ?? locale.toUpperCase()}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
