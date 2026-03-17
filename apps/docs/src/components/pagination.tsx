import { cn } from '@explainer/ui'
import { Icon } from '@iconify/react'

interface PaginationLink {
  title: string
  href: string
}

interface PaginationProps {
  prev: PaginationLink | null
  next: PaginationLink | null
}

export function Pagination({ prev, next }: PaginationProps) {
  if (!prev && !next) return null

  return (
    <nav className="flex items-center justify-between border-t pt-6 mt-12">
      {prev ? (
        <a
          href={prev.href}
          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon icon="lucide:chevron-left" className="size-4 transition-transform group-hover:-translate-x-0.5" />
          <div>
            <p className="text-xs text-muted-foreground">Previous</p>
            <p className="font-medium text-foreground">{prev.title}</p>
          </div>
        </a>
      ) : (
        <div />
      )}
      {next ? (
        <a
          href={next.href}
          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-right"
        >
          <div>
            <p className="text-xs text-muted-foreground">Next</p>
            <p className="font-medium text-foreground">{next.title}</p>
          </div>
          <Icon icon="lucide:chevron-right" className="size-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      ) : (
        <div />
      )}
    </nav>
  )
}
