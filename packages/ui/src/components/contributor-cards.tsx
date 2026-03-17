import type { Contributor } from '../lib/contributors'
import { cn } from '../lib/utils'

export interface ContributorCardsProps {
  contributors: Contributor[]
  title?: string
  className?: string
  max?: number
}

export function ContributorCards({ contributors, title = 'Contributors', className, max }: ContributorCardsProps) {
  if (contributors.length === 0) return null

  const displayed = max ? contributors.slice(0, max) : contributors

  return (
    <div className={cn('border-t border-dashed border-border pt-4 mt-4', className)}>
      <p className="text-sm font-medium mb-3">{title}</p>
      <div className="flex flex-wrap gap-1.5">
        {displayed.map((contributor) => (
          <a
            key={contributor.id}
            href={contributor.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={`${contributor.login} (${contributor.contributions} contributions)`}
            className="rounded-full transition-opacity hover:opacity-80"
          >
            <img
              src={`${contributor.avatarUrl}&s=64`}
              alt={contributor.login}
              className="h-8 w-8 rounded-full ring-1 ring-border"
              loading="lazy"
            />
          </a>
        ))}
      </div>
    </div>
  )
}
