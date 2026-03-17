import { sponsorBadgeStyles, sponsorTierStyles, type Sponsor } from '../lib/sponsors'
import { cn } from '../lib/utils'

export interface SponsorCardsProps {
  sponsors: Sponsor[]
  title?: string
  className?: string
}

export function SponsorCards({ sponsors, title = 'Sponsors', className }: SponsorCardsProps) {
  if (sponsors.length === 0) return null

  return (
    <div className={cn('border-t border-dashed border-border pt-4 mt-4', className)}>
      <p className="text-sm font-medium mb-3">{title}</p>
      <div className="space-y-2">
        {sponsors.map((sponsor) => (
          <a
            key={sponsor.id}
            href={sponsor.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-center gap-2.5 rounded-md border p-2 transition-colors hover:bg-accent/50',
              sponsorTierStyles[sponsor.tier],
            )}
          >
            <img
              src={sponsor.logoUrl}
              alt={sponsor.name}
              className="h-6 w-6 shrink-0 rounded"
              loading="lazy"
            />
            <span className="text-sm font-medium truncate">{sponsor.name}</span>
            <span
              className={cn(
                'ml-auto text-[10px] font-semibold uppercase tracking-wider rounded-full px-1.5 py-0.5 shrink-0',
                sponsorBadgeStyles[sponsor.tier],
              )}
            >
              {sponsor.tier}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
