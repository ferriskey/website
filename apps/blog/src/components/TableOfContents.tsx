import * as React from 'react'
import { cn, SponsorCards, defaultSponsors } from '@explainer/ui'
import { useTranslations } from '../i18n/utils'
import { AuthorCard } from './AuthorCard'

export interface TocHeading {
  depth: number
  slug: string
  text: string
}

interface Author {
  name: string
  title: string
  avatar: string
  href?: string
}

interface TableOfContentsProps {
  headings: TocHeading[]
  locale?: string
  author?: Author
}

export function TableOfContents({ headings, locale = 'en', author }: TableOfContentsProps) {
  const t = useTranslations(locale)
  const filtered = headings.filter((h) => h.depth >= 2 && h.depth <= 3)
  const [activeId, setActiveId] = React.useState<string>(filtered[0]?.slug ?? '')

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

  return (
    <nav className="sticky top-24 h-fit">
      <p className="text-sm font-medium mb-3">{t('toc.title')}</p>
      <ul className="border-l border-border space-y-0.5">
        {filtered.map((heading) => (
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
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
      {author && <AuthorCard author={author} label={t('author.label')} />}
      <SponsorCards sponsors={defaultSponsors} title={t('sponsors.title')} />
    </nav>
  )
}
