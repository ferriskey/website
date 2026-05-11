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

const INDENT_PX = 16

export function TableOfContents({ headings, contributors = [] }: TocProps) {
  const filtered = headings.filter((h) => h.depth >= 2 && h.depth <= 3)
  const [activeIds, setActiveIds] = React.useState<Set<string>>(new Set())

  React.useEffect(() => {
    const elements = filtered.map((h) => document.getElementById(h.slug)).filter(Boolean) as HTMLElement[]
    if (elements.length === 0) return

    const update = () => {
      const scrollY = window.scrollY
      const viewportH = window.innerHeight
      const docH = document.documentElement.scrollHeight
      const headerVar = getComputedStyle(document.documentElement).getPropertyValue('--header-height').trim()
      const headerH = headerVar.endsWith('rem')
        ? parseFloat(headerVar) * 16
        : parseFloat(headerVar) || 56
      const readingLine = scrollY + headerH + 8
      const tops = elements.map((el) => el.getBoundingClientRect().top + scrollY)

      const active = new Set<string>()
      // Primary active: last heading whose top is at or above the reading line.
      let primary = -1
      for (let i = 0; i < tops.length; i++) {
        if (tops[i] <= readingLine) primary = i
        else break
      }
      if (primary >= 0) active.add(elements[primary].id)
      else active.add(elements[0].id)

      // Also activate any heading whose own top is visible below the reading line in the viewport.
      const visibleBottom = scrollY + viewportH - 40
      for (let i = Math.max(primary, -1) + 1; i < tops.length; i++) {
        if (tops[i] <= visibleBottom) {
          active.add(elements[i].id)
        } else break
      }

      if (scrollY + viewportH >= docH - 8) {
        active.add(elements[elements.length - 1].id)
      }
      setActiveIds(active)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [filtered.map((h) => h.slug).join(',')])

  if (filtered.length === 0) return null

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
    <nav className="w-56 shrink-0 hidden xl:block sticky top-(--header-height,4rem) py-6 pl-4">
      <p className="text-sm font-medium mb-3">On this page</p>
      <ul>
        {numbered.map((heading, i) => {
          const isActive = activeIds.has(heading.slug)
          const indent = (heading.depth - 2) * INDENT_PX
          const prev = i > 0 ? numbered[i - 1] : null
          const prevIndent = prev ? (prev.depth - 2) * INDENT_PX : indent
          const prevActive = prev ? activeIds.has(prev.slug) : false
          const bendNeeded = prev !== null && prevIndent !== indent
          const bendLeft = Math.min(indent, prevIndent)
          const bendWidth = Math.abs(indent - prevIndent)
          const bendActive = isActive || prevActive

          return (
            <li key={heading.slug} className="relative">
              <span
                aria-hidden
                className={cn(
                  'pointer-events-none absolute top-0 bottom-0 w-px transition-colors',
                  isActive ? 'bg-primary' : 'bg-border',
                )}
                style={{ left: indent }}
              />
              {bendNeeded && (
                <span
                  aria-hidden
                  className={cn(
                    'pointer-events-none absolute h-px transition-colors',
                    bendActive ? 'bg-primary' : 'bg-border',
                  )}
                  style={{ top: 0, left: bendLeft, width: bendWidth }}
                />
              )}
              <a
                href={`#${heading.slug}`}
                data-slug={heading.slug}
                className={cn(
                  'block py-1 pr-2 transition-colors focus-visible:outline-none focus-visible:text-foreground',
                  heading.depth === 3 ? 'text-xs' : 'text-sm',
                  isActive ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground',
                )}
                style={{ paddingLeft: indent + 12 }}
              >
                {heading.label}
              </a>
            </li>
          )
        })}
      </ul>
      <div>
        <SponsorCards sponsors={defaultSponsors} />
        <ContributorCards contributors={contributors} />
      </div>
    </nav>
  )
}
