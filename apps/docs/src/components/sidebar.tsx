import { cn } from '@explainer/ui'
import { Icon } from '@iconify/react'
import * as React from 'react'
import type { NavItem } from '../lib/docs'

interface SidebarProps {
  items: NavItem[]
  currentPath: string
}

export function Sidebar({ items, currentPath }: SidebarProps) {
  return (
    <nav className="flex-1 overflow-y-auto">
      <ul>
        {items.map((item) => (
          <SidebarItem key={item.slug} item={item} currentPath={currentPath} />
        ))}
      </ul>
    </nav>
  )
}

function SidebarItem({ item, currentPath, depth = 0 }: { item: NavItem; currentPath: string; depth?: number }) {
  const [open, setOpen] = React.useState(() => {
    if (item.type === 'category') {
      return isActiveCategory(item, currentPath)
    }
    return false
  })

  // Group: bold label, no collapse, children always visible, depth resets
  if (item.type === 'group') {
    return (
      <li className="mt-6 first:mt-0">
        <div className="px-3 pb-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {item.title}
        </div>
        <ul>
          {item.children?.map((child) => (
            <SidebarItem key={child.slug} item={child} currentPath={currentPath} depth={0} />
          ))}
        </ul>
      </li>
    )
  }

  if (item.type === 'page') {
    const isActive = currentPath === item.href
    return (
      <li>
        <a
          href={item.href}
          className={cn(
            'flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:text-foreground',
            isActive
              ? 'bg-primary/10 text-primary font-medium'
              : 'text-muted-foreground hover:text-foreground',
          )}
          style={depth > 0 ? { paddingLeft: `${1.2 + depth}rem` } : undefined}
        >
          {item.icon && <Icon icon={`lucide:${item.icon}`} className="size-4 shrink-0" />}
          {item.title}
        </a>
      </li>
    )
  }

  // Category: collapsible
  return (
    <li>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex w-full items-center gap-2 px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:text-primary',
          'text-muted-foreground hover:text-foreground',
        )}
        style={depth > 0 ? { paddingLeft: `${0.75 + depth * 0.75}rem` } : undefined}
      >
        {item.icon && <Icon icon={`lucide:${item.icon}`} className="size-4 shrink-0" />}
        {item.title}
        <Icon
          icon="lucide:chevron-down"
          className={cn('size-3.5 shrink-0 text-muted-foreground transition-transform ml-auto', !open && '-rotate-90')}
        />
      </button>
      {open && item.children && (
        <ul>
          {item.children.map((child) => (
            <SidebarItem key={child.slug} item={child} currentPath={currentPath} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}

function isActiveCategory(item: NavItem, currentPath: string): boolean {
  if (item.type === 'page') return currentPath === item.href
  return item.children?.some((child) => isActiveCategory(child, currentPath)) ?? false
}
