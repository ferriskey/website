import { cn } from '@explainer/ui'
import * as React from 'react'

function getAnchor(text: React.ReactNode): string {
  if (typeof text === 'string') {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }
  return ''
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Tag = `h${level}` as const
  const styles: Record<number, string> = {
    1: 'text-4xl font-bold tracking-tight mt-8 mb-4',
    2: 'text-3xl font-semibold tracking-tight mt-8 mb-3 pb-2',
    3: 'text-2xl font-semibold tracking-tight mt-6 mb-3',
    4: 'text-xl font-semibold tracking-tight mt-6 mb-2',
    5: 'text-lg font-semibold mt-4 mb-2',
    6: 'text-base font-semibold mt-4 mb-2',
  }

  const Heading = ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const anchor = getAnchor(children)
    return (
      <Tag id={anchor} className={cn(styles[level], 'scroll-mt-20 group', className)} {...props}>
        {children}
        {anchor && (
          <a
            href={`#${anchor}`}
            className="ml-2 opacity-0 group-hover:opacity-100 text-muted-foreground transition-opacity"
            aria-label={`Link to ${typeof children === 'string' ? children : 'section'}`}
          >
            #
          </a>
        )}
      </Tag>
    )
  }
  Heading.displayName = `Heading${level}`
  return Heading
}

export const H1 = createHeading(1)
export const H2 = createHeading(2)
export const H3 = createHeading(3)
export const H4 = createHeading(4)
export const H5 = createHeading(5)
export const H6 = createHeading(6)
