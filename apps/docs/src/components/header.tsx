import { LocaleSwitcher, Navbar, getAppLinks } from '@explainer/ui'
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
  title = 'Explainer',
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

  return (
    <div className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur `supports-backdrop-filter:bg-background/60">
      <Navbar
        brand={title}
        brandHref="/"
        currentApp="docs"
        appUrlOverrides={appUrlOverrides}
        breakpoint="lg"
        sticky={false}
        className="border-b"
        leftSlot={
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
        }
        rightSlot={
          <>
            {currentProjectInfo && (
              <div className="hidden lg:block">
                <VersionSwitcher
                  versions={currentProjectInfo.versions}
                  currentVersion={currentVersion}
                  hasVersioning={currentProjectInfo.hasVersioning}
                  switchUrls={versionSwitchUrls}
                />
              </div>
            )}
            <div className="hidden md:block">
              <SearchCommand />
            </div>
            <div className="hidden lg:block">
              <LocaleSwitcher
                locales={locales}
                currentLocale={currentLocale}
                switchUrls={localeSwitchUrls}
              />
            </div>
          </>
        }
      />

      {showTabs && (
        <ProjectTabs
          projects={projects}
          currentProject={currentProject}
          switchUrls={projectSwitchUrls}
        />
      )}
    </div>
  )
}
