import { useEffect, useState } from 'react'
import { LocaleSwitcher, getAppLinks } from '@explainer/ui'
import { Icon } from '@iconify/react'
import { useTranslations } from '../i18n/utils'

interface BlogNavbarProps {
  activePath: string
  appUrlOverrides?: Partial<Record<string, string>>
  locale: string
  locales: string[]
  localeSwitchUrls: Record<string, string>
}

type Appearance = 'light' | 'dark'

function useAppearance() {
  const [appearance, setAppearance] = useState<Appearance>('light')

  useEffect(() => {
    const read = () => setAppearance(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
    read()
    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const toggle = () => {
    const next: Appearance = appearance === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  return { appearance, toggle }
}

interface Link {
  label: string
  href: string
  external?: boolean
}

export function BlogNavbar({ activePath, appUrlOverrides, locale: initialLocale, locales, localeSwitchUrls }: BlogNavbarProps) {
  const isListing = activePath === '/' || activePath === ''
  const [locale, setLocale] = useState(initialLocale)
  const [open, setOpen] = useState(false)
  const { appearance, toggle } = useAppearance()

  useEffect(() => {
    setLocale(initialLocale)
  }, [initialLocale])

  const t = useTranslations(locale)
  const appLinks = getAppLinks('blog', appUrlOverrides)
  const websiteHref = appLinks.find((app) => app.id === 'website')?.href ?? '/'
  const docsHref = appLinks.find((app) => app.id === 'docs')?.href ?? '/'

  const links: Link[] = [
    { label: t('nav.allArticles'), href: '/' },
    { label: t('nav.rss'), href: `/${locale}/rss.xml` },
    { label: 'Website', href: websiteHref },
    { label: 'Docs', href: docsHref },
  ]
  const next = appearance === 'dark' ? 'light' : 'dark'

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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-12 max-w-6xl items-stretch border-x border-border">
        <a href={websiteHref} className="flex shrink-0 items-center gap-2 border-r border-border px-4 text-[15px] font-semibold tracking-tight text-foreground">
          <img src="/logo.svg" alt="" width="20" height="22" className="h-[22px] w-5" />
          FerrisKey
        </a>
        <a href="/" className="flex shrink-0 items-center border-r border-border px-4 font-pixel text-[11px] uppercase tracking-[0.08em] text-primary">
          Blog
        </a>

        <nav aria-label="Main" className="hidden md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-current={link.href === activePath ? 'page' : undefined}
              className="flex items-center border-r border-border px-4 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-foreground/[0.04] hover:text-foreground aria-[current=page]:bg-foreground/[0.04] aria-[current=page]:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-stretch">
          <div className="hidden items-center border-l border-border px-2 sm:flex">
            <LocaleSwitcher
              locales={locales}
              currentLocale={locale}
              switchUrls={isListing ? {} : localeSwitchUrls}
              onLocaleChange={handleListingLocaleChange}
            />
          </div>
          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${next} theme`}
            title={`Switch to ${next} theme`}
            className="flex w-12 cursor-pointer items-center justify-center border-l border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon icon={appearance === 'dark' ? 'lucide:moon' : 'lucide:sun'} className="size-4" aria-hidden="true" />
          </button>
          <a
            href="https://github.com/ferriskey/ferriskey"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center bg-primary px-4 text-[13px] font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:flex"
          >
            GitHub
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex w-12 cursor-pointer items-center justify-center border-l border-border text-foreground md:hidden"
          >
            <Icon icon={open ? 'lucide:x' : 'lucide:menu'} className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-menu" aria-label="Main" className="border-t border-border bg-background md:hidden">
          {links.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="block border-b border-border px-5 py-3 text-sm font-medium text-foreground">
              {link.label}
            </a>
          ))}
          <div className="px-3 py-3">
            <LocaleSwitcher
              locales={locales}
              currentLocale={locale}
              switchUrls={isListing ? {} : localeSwitchUrls}
              onLocaleChange={handleListingLocaleChange}
            />
          </div>
        </nav>
      ) : null}
    </header>
  )
}
