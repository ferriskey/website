import * as React from 'react'
import { Icon } from '@iconify/react'
import { cn } from '@explainer/ui'

interface VersionSwitcherProps {
  versions: string[]
  currentVersion: string
  hasVersioning: boolean
  switchUrls: Record<string, string>
  dropUp?: boolean
}

export function VersionSwitcher({ versions, currentVersion, hasVersioning, switchUrls, dropUp }: VersionSwitcherProps) {
  const [open, setOpen] = React.useState(false)

  if (!hasVersioning) return null

  const displayVersion = currentVersion === 'default' ? 'latest' : currentVersion

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-accent transition-colors"
      >
        {displayVersion}
        <Icon icon="lucide:chevrons-up-down" className="size-4 text-muted-foreground" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className={cn('absolute z-50 min-w-[120px] rounded-md border bg-popover p-1 shadow-md', dropUp ? 'left-0 bottom-full mb-1' : 'left-0 top-full mt-1')}>
            {versions.map((version) => {
              const display = version === 'default' ? 'latest' : version
              return (
                <a
                  key={version}
                  href={switchUrls[version] ?? '#'}
                  className={cn(
                    'flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors',
                    version === currentVersion
                      ? 'bg-accent text-accent-foreground font-medium'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  )}
                  onClick={() => setOpen(false)}
                >
                  {version === currentVersion ? (
                    <Icon icon="lucide:check" className="size-3" />
                  ) : (
                    <span className="size-3" />
                  )}
                  {display}
                </a>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
