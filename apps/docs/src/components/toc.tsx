import { cn, defaultSponsors, SponsorCards, ContributorCards, type Contributor } from '@explainer/ui'
import * as React from 'react'

export interface TocHeading {
  depth: number
  slug: string
  text: string
}

interface TocProps {
  headings: TocHeading[]
  contributors?: Contributor[]
}

export function TableOfContents({ headings, contributors = [] }: TocProps) {
  const filtered = headings.filter((h) => h.depth >= 2 && h.depth <= 3)
  const [activeId, setActiveId] = React.useState<string>('')

  React.useEffect(() => {
    const elements = filtered.map((h) => document.getElementById(h.slug)).filter(Boolean) as HTMLElement[]
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-80px 0px -75% 0px' },
    )

    for (const el of elements) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [filtered.map((h) => h.slug).join(',')])

  if (filtered.length === 0) return null

  // Number h3 headings: counter resets at each h2
  let h3Counter = 0
  const numbered = filtered.map((heading) => {
    if (heading.depth === 2) {
      h3Counter = 0
      return { ...heading, label: heading.text }
    }
    h3Counter++
    return { ...heading, label: `${h3Counter}. ${heading.text}` }
  })

  return (
    <nav className="w-56 shrink-0 hidden xl:block h-[calc(100vh-var(--header-height,4rem))] overflow-y-auto sticky top-(--header-height,4rem) py-6 pl-4">
      <p className="text-sm font-medium mb-3">On this page</p>
      <ul className="border-l border-border space-y-0.5">
        {numbered.map((heading) => (
          <li key={heading.slug}>
            <a
              href={`#${heading.slug}`}
              className={cn(
                'block -ml-px border-l-2 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:text-foreground',
                heading.depth === 3 ? 'pl-6' : 'pl-3',
                activeId === heading.slug
                  ? 'border-primary text-primary font-medium'
                  : 'border-transparent text-muted-foreground hover:text-foreground',
              )}
            >
              {heading.label}
            </a>
          </li>
        ))}
      </ul>
      <SponsorCards sponsors={defaultSponsors} />
      <ContributorCards contributors={contributors} />
    </nav>
  )
}
