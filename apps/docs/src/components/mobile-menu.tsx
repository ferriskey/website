import { MobileMenu as MobileMenuShell, LocaleSwitcher } from '@explainer/ui'
import type { AppLink } from '@explainer/ui'
import { Sidebar } from './sidebar'
import { VersionSwitcher } from './version-switcher'
import type { NavItem } from '../lib/docs'

interface MobileMenuProps {
  items: NavItem[]
  currentPath: string
  locales: string[]
  currentLocale: string
  localeSwitchUrls: Record<string, string>
  versions: string[]
  currentVersion: string
  hasVersioning: boolean
  versionSwitchUrls: Record<string, string>
  appLinks?: AppLink[]
}

export function MobileMenu({
  items,
  currentPath,
  locales,
  currentLocale,
  localeSwitchUrls,
  versions,
  currentVersion,
  hasVersioning,
  versionSwitchUrls,
  appLinks,
}: MobileMenuProps) {
  return (
    <MobileMenuShell
      breakpoint="lg"
      footer={
        <>
          <LocaleSwitcher
            locales={locales}
            currentLocale={currentLocale}
            switchUrls={localeSwitchUrls}
            dropUp
          />
          <VersionSwitcher
            versions={versions}
            currentVersion={currentVersion}
            hasVersioning={hasVersioning}
            switchUrls={versionSwitchUrls}
            dropUp
          />
        </>
      }
    >
      <Sidebar items={items} currentPath={currentPath} />
      {appLinks && appLinks.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <span className="px-3 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Explainer
          </span>
          <nav className="flex flex-col gap-1 mt-1">
            {appLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  link.current
                    ? 'bg-secondary text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </MobileMenuShell>
  )
}
