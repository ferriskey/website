import { cn } from '@explainer/ui'

export interface AuthorCardProps {
  author: {
    name: string
    title: string
    avatar: string
    href?: string
  }
  label?: string
  className?: string
}

export function AuthorCard({ author, label = 'Written by', className }: AuthorCardProps) {
  const content = (
    <div className="flex items-center gap-3">
      <img
        src={author.avatar}
        alt={author.name}
        className="h-10 w-10 rounded-full ring-1 ring-border shrink-0"
        loading="lazy"
      />
      <div className="min-w-0">
        <p className="text-sm font-medium truncate">{author.name}</p>
        <p className="text-xs text-muted-foreground truncate">{author.title}</p>
      </div>
    </div>
  )

  return (
    <div className={cn('border-t border-dashed border-border pt-4 mt-4', className)}>
      <p className="text-sm font-medium mb-3">{label}</p>
      {author.href ? (
        <a
          href={author.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-md p-2 -mx-2 transition-colors hover:bg-accent/50"
        >
          {content}
        </a>
      ) : (
        <div className="p-2 -mx-2">{content}</div>
      )}
    </div>
  )
}
