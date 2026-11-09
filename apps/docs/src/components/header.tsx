import { LocaleSwitcher, getAppLinks } from '@explainer/ui'
import { Icon } from '@iconify/react'
import * as React from 'react'
import type { NavItem, ProjectInfo } from '../lib/docs'
import { MobileMenu } from './mobile-menu'
import { ProjectTabs } from './project-tabs'
import { SearchCommand } from './search-command'
import { VersionSwitcher } from './version-switcher'

interface HeaderProps {
  title?: string
  projects: ProjectInfo[]
  currentProject: string
  currentVersion: string
  currentLocale: string
  locales: string[]
  projectSwitchUrls: Record<string, string>
  versionSwitchUrls: Record<string, string>
  localeSwitchUrls: Record<string, string>
  navItems: NavItem[]
  currentPath: string
  appUrlOverrides?: Partial<Record<string, string>>
}

export function Header({
  title,
  projects,
  currentProject,
  currentVersion,
  currentLocale,
  locales,
  projectSwitchUrls,
  versionSwitchUrls,
  localeSwitchUrls,
  navItems,
  currentPath,
  appUrlOverrides,
}: HeaderProps) {
  const currentProjectInfo = projects.find((p) => p.name === currentProject)
  const showTabs = projects.length > 1
  const appLinks = getAppLinks('docs', appUrlOverrides)

  const websiteHref = appLinks.find((app) => app.id === 'website')?.href ?? '/'
  const blogHref = appLinks.find((app) => app.id === 'blog')?.href ?? '/'
  const [dark, setDark] = React.useState(false)

  React.useEffect(() => {
    const read = () => setDark(document.documentElement.classList.contains('dark'))
    read()
    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    const next = dark ? 'light' : 'dark'
    localStorage.setItem('theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }
  const nextTheme = dark ? 'light' : 'dark'

  return (
    <div className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-12 max-w-[90rem] items-stretch border-x border-border">
        <div className="flex items-center border-r border-border px-1 lg:hidden">
          <MobileMenu
            items={navItems}
            currentPath={currentPath}
            locales={locales}
            currentLocale={currentLocale}
            localeSwitchUrls={localeSwitchUrls}
            versions={currentProjectInfo?.versions ?? []}
            currentVersion={currentVersion}
            hasVersioning={currentProjectInfo?.hasVersioning ?? false}
            versionSwitchUrls={versionSwitchUrls}
            appLinks={appLinks}
          />
        </div>

        <a href={websiteHref} className="flex shrink-0 items-center gap-2 border-r border-border px-4 text-[15px] font-semibold tracking-tight text-foreground">
          <img src="/logo.svg" alt="" width="20" height="22" className="h-[22px] w-5" />
          FerrisKey
        </a>
        <a href="/" className="flex shrink-0 items-center border-r border-border px-4 font-pixel text-[11px] uppercase tracking-[0.08em] text-primary">
          Docs
        </a>

        <nav aria-label="Main" className="hidden lg:flex">
          <a href={websiteHref} className="flex items-center border-r border-border px-4 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-foreground/[0.04] hover:text-foreground">Website</a>
          <a href={blogHref} className="flex items-center border-r border-border px-4 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-foreground/[0.04] hover:text-foreground">Blog</a>
        </nav>

        <div className="ml-auto flex items-stretch">
          {currentProjectInfo && (
            <div className="hidden items-center border-l border-border px-2 lg:flex">
              <VersionSwitcher
                versions={currentProjectInfo.versions}
                currentVersion={currentVersion}
                hasVersioning={currentProjectInfo.hasVersioning}
                switchUrls={versionSwitchUrls}
              />
            </div>
          )}
          <div className="hidden items-center border-l border-border px-2 md:flex">
            <SearchCommand locale={currentLocale} />
          </div>
          <div className="hidden items-center border-l border-border px-2 lg:flex">
            <LocaleSwitcher locales={locales} currentLocale={currentLocale} switchUrls={localeSwitchUrls} />
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${nextTheme} theme`}
            title={`Switch to ${nextTheme} theme`}
            className="flex w-12 cursor-pointer items-center justify-center border-l border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon icon={dark ? 'lucide:moon' : 'lucide:sun'} className="size-4" aria-hidden="true" />
          </button>
          <a
            href="https://github.com/ferriskey/ferriskey"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center bg-primary px-4 text-[13px] font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:flex"
          >
            GitHub
          </a>
        </div>
      </div>

      {showTabs && (
        <ProjectTabs projects={projects} currentProject={currentProject} switchUrls={projectSwitchUrls} />
      )}
    </div>
  )
}
