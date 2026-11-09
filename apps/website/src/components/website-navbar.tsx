import { LocaleSwitcher, getAppLinks } from '@explainer/ui'
import { Icon } from '@iconify/react'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from '../i18n/utils'
import { modules } from '../lib/modules'
import { moduleSprites } from '../lib/module-sprites'
import { PixelSprite } from './pixel/pixel-sprite'
import { getClientLocale, supportedLocales } from '../i18n/locale'

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

interface WebsiteNavbarProps {
  appUrlOverrides?: Partial<Record<string, string>>
}

/** Le menu des modules : s'ouvre au survol et au clavier, se ferme en sortant, sur Échap ou en cliquant ailleurs. */
function ModulesMenu({ label, allLabel }: { label: string; allLabel: string }) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const timer = useRef<number | undefined>(undefined)

  const show = () => {
    window.clearTimeout(timer.current)
    setOpen(true)
  }
  const hide = () => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setOpen(false), 120)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onClick = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open])

  return (
    <div ref={root} className="relative flex" onMouseEnter={show} onMouseLeave={hide}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`flex cursor-pointer items-center gap-1.5 border-r border-border px-4 text-[13px] font-medium transition-colors hover:bg-foreground/[0.04] hover:text-foreground ${open ? 'bg-foreground/[0.04] text-foreground' : 'text-muted-foreground'}`}
      >
        {label}
        <Icon icon="lucide:chevron-down" className={`size-3.5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {open ? (
        <>
          {/* Voile sur le reste de la page : le menu passe devant, le contenu recule. */}
          <div aria-hidden="true" className="fixed inset-x-0 top-12 z-40 h-screen bg-background/30" />
        <div className="absolute left-0 top-full z-50 w-[34rem] border border-t-0 border-border border-t-primary bg-background shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0_0_rgba(0,0,0,0.45)]">
          <ul className="grid grid-cols-2">
            {modules.map((m, i) => (
              <li key={m.slug} className={`border-border ${i % 2 === 0 ? 'border-r' : ''} ${i < modules.length - 2 ? 'border-b' : ''}`}>
                <a href={`/modules/${m.slug}`} onClick={() => setOpen(false)} className="group flex items-start gap-3 px-4 py-4 transition-colors hover:bg-foreground/[0.04]">
                  <PixelSprite sprite={moduleSprites[m.slug]} className="mt-0.5 block size-8 shrink-0 transition-transform group-hover:-translate-y-0.5" />
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-foreground">{m.name}</span>
                    <span className="mt-0.5 block font-pixel text-[9px] uppercase leading-4 tracking-[0.06em] text-muted-foreground">{m.tagline}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a href="/modules" onClick={() => setOpen(false)} className="flex items-center justify-between border-t border-border bg-surface-tint px-4 py-3 text-[13px] font-semibold text-foreground transition-colors hover:text-primary">
            {allLabel}
            <span aria-hidden="true">→</span>
          </a>
        </div>
        </>
      ) : null}
    </div>
  )
}

interface Link {
  label: string
  href: string
  external?: boolean
}

export function WebsiteNavbar({ appUrlOverrides }: WebsiteNavbarProps) {
  const [locale, setLocale] = useState('en')
  const [open, setOpen] = useState(false)
  const { appearance, toggle } = useAppearance()
  const t = useTranslations(locale)
  const appLinks = getAppLinks('website', appUrlOverrides)
  const docsBase = (appLinks.find((app) => app.id === 'docs')?.href ?? '/').replace(/\/$/, '')
  const docsLocale = locale === 'fr' ? 'en' : locale
  const docsHref = `${docsBase}/${docsLocale}/discover/getting-started`
  const blogHref = appLinks.find((app) => app.id === 'blog')?.href

  useEffect(() => {
    setLocale(getClientLocale())
  }, [])

  const links: Link[] = [
    { label: t('nav.roadmap'), href: 'https://github.com/orgs/ferriskey/projects/1', external: true },
    { label: t('nav.releaseNotes'), href: '/release-notes' },
    { label: t('nav.getStarted'), href: docsHref },
    ...(blogHref ? [{ label: 'Blog', href: blogHref }] : []),
  ]
  const externalProps = (link: Link) => (link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})
  const next = appearance === 'dark' ? 'light' : 'dark'

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-12 max-w-6xl items-stretch border-x border-border">
        <a href="/" className="flex shrink-0 items-center gap-2 border-r border-border px-4 text-[15px] font-semibold tracking-tight text-foreground">
          <img src="/logo.svg" alt="" width="20" height="22" className="h-[22px] w-5" />
          FerrisKey
        </a>

        <nav aria-label="Main" className="hidden md:flex">
          <ModulesMenu label={t('nav.modules')} allLabel={t('nav.allModules')} />
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              {...externalProps(link)}
              className="flex items-center border-r border-border px-4 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-foreground/[0.04] hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-stretch">
          <a
            href="https://github.com/ferriskey/ferriskey"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 border-l border-border px-4 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            <Icon icon="lucide:github" className="size-4" aria-hidden="true" />
            GitHub
          </a>
          <div className="flex items-center border-l border-border px-2">
            <LocaleSwitcher
              locales={[...supportedLocales]}
              currentLocale={locale}
              onLocaleChange={(nextLocale) => {
                setLocale(nextLocale)
                window.dispatchEvent(new CustomEvent('ferriskey:locale-change', { detail: { locale: nextLocale } }))
              }}
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
            href={docsHref}
            className="hidden items-center bg-primary px-4 text-[13px] font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:flex"
          >
            {t('nav.getStarted')}
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
          <a href="/modules" onClick={() => setOpen(false)} className="block border-b border-border px-5 py-3 text-sm font-semibold text-foreground">
            {t('nav.modules')}
          </a>
          {modules.map((m) => (
            <a
              key={m.slug}
              href={`/modules/${m.slug}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 border-b border-border bg-surface-tint px-8 py-2.5 text-sm text-foreground"
            >
              <PixelSprite sprite={moduleSprites[m.slug]} className="block size-5" />
              {m.name}
            </a>
          ))}
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              {...externalProps(link)}
              onClick={() => setOpen(false)}
              className="block border-b border-border px-5 py-3 text-sm font-medium text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a href="https://github.com/ferriskey/ferriskey" className="block px-5 py-3 text-sm font-medium text-foreground">
            GitHub
          </a>
        </nav>
      ) : null}
    </header>
  )
}
