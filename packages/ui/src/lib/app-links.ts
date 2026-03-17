export interface AppLink {
  id: string
  label: string
  href: string
  current?: boolean
}

export const defaultAppLinks: AppLink[] = [
  { id: 'website', label: 'Home', href: '/' },
  { id: 'docs', label: 'Docs', href: '/' },
  { id: 'blog', label: 'Blog', href: '/' },
]

export function getAppLinks(currentApp: string, overrides?: Partial<Record<string, string>>): AppLink[] {
  return defaultAppLinks.map((app) => ({
    ...app,
    href: overrides?.[app.id] ?? app.href,
    current: app.id === currentApp,
  }))
}
