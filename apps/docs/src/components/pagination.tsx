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
    <nav className="mt-16 grid border border-border sm:grid-cols-2">
      {prev ? (
        <a
          href={prev.href}
          className="group flex items-center gap-3 border-b border-border px-5 py-5 transition-colors hover:bg-foreground/[0.03] sm:border-b-0 sm:border-r"
        >
          <Icon icon="lucide:arrow-left" className="size-4 text-muted-foreground transition-transform group-hover:-translate-x-0.5 group-hover:text-primary" />
          <div className="min-w-0">
            <p className="font-pixel text-[10px] uppercase tracking-[0.08em] text-muted-foreground">Previous</p>
            <p className="mt-1 truncate text-sm font-medium text-foreground">{prev.title}</p>
          </div>
        </a>
      ) : (
        <div className="hidden sm:block sm:border-r sm:border-border" />
      )}
      {next ? (
        <a
          href={next.href}
          className="group flex items-center justify-end gap-3 px-5 py-5 text-right transition-colors hover:bg-foreground/[0.03]"
        >
          <div className="min-w-0">
            <p className="font-pixel text-[10px] uppercase tracking-[0.08em] text-muted-foreground">Next</p>
            <p className="mt-1 truncate text-sm font-medium text-foreground">{next.title}</p>
          </div>
          <Icon icon="lucide:arrow-right" className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
        </a>
      ) : (
        <div />
      )}
    </nav>
  )
}
