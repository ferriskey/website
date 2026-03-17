'use client'

import { Icon } from '@iconify/react'
import { cn } from '../lib/utils'
import type { NavbarLink } from './navbar'
import type { AppLink } from '../lib/app-links'

interface MobileNavLinksProps {
  links: NavbarLink[]
  appLinks?: AppLink[]
  activePath?: string
  onNavigate?: () => void
}

export function MobileNavLinks({ links, appLinks, activePath, onNavigate }: MobileNavLinksProps) {
  return (
    <nav className="flex flex-col gap-1">
      {links.map((link) => {
        const isActive = activePath === link.href
        return (
          <a
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-secondary text-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50',
            )}
            onClick={onNavigate}
            {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {link.icon && <Icon icon={link.icon} className="size-4" />}
            {link.label}
          </a>
        )
      })}

      {appLinks && appLinks.length > 0 && (
        <>
          <div className="my-2 border-t" />
          <span className="px-3 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Explainer
          </span>
          {appLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                link.current
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50',
              )}
              onClick={onNavigate}
            >
              {link.label}
            </a>
          ))}
        </>
      )}
    </nav>
  )
}
