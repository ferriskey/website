import { type Sponsor } from '../lib/sponsors'
import { cn } from '../lib/utils'

export interface SponsorCardsProps {
  sponsors: Sponsor[]
  title?: string
  className?: string
}

function cellBorders(index: number, total: number, cols: number): string {
  const hasRight = index + 1 < total && (index + 1) % cols !== 0
  const hasBottom = index + cols < total
  return cn(hasRight && 'border-r border-border', hasBottom && 'border-b border-border')
}

function SponsorLogo({ sponsor, className }: { sponsor: Sponsor; className?: string }) {
  const same = sponsor.logoUrlLight === sponsor.logoUrlDark
  return (
    <a
      href={sponsor.href}
      target="_blank"
      rel="noopener noreferrer"
      title={sponsor.name}
      className={cn('flex items-center justify-center p-2 transition-opacity hover:opacity-60', className)}
    >
      <div className="rounded p-1.5 aspect-square w-full flex items-center justify-center">
        {same ? (
          <img src={sponsor.logoUrlLight} alt={sponsor.name} className="w-full h-full object-contain" loading="lazy" />
        ) : (
          <>
            <img src={sponsor.logoUrlLight} alt={sponsor.name} className="w-full h-full object-contain dark:hidden" loading="lazy" />
            <img src={sponsor.logoUrlDark} alt={sponsor.name} className="w-full h-full object-contain hidden dark:block" loading="lazy" />
          </>
        )}
      </div>
    </a>
  )
}

export function SponsorCards({ sponsors, title = 'Sponsors', className }: SponsorCardsProps) {
  if (sponsors.length === 0) return null

  const lead = sponsors.filter((s) => s.tier === 'lead')
  const partner = sponsors.filter((s) => s.tier === 'partner')

  return (
    <div className={cn('border-t border-dashed border-border pt-4 mt-4', className)}>
      <p className="text-sm font-medium mb-3">{title}</p>

      <div className="space-y-3">
        {lead.length > 0 && (
          <div className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-primary/70">Lead sponsor</p>
            <div className="grid grid-cols-2">
              {lead.map((sponsor, i) => (
                <SponsorLogo key={sponsor.id} sponsor={sponsor} className={cellBorders(i, lead.length, 2)} />
              ))}
            </div>
          </div>
        )}

        {partner.length > 0 && (
          <div className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Partners</p>
            <div className="grid grid-cols-3">
              {partner.map((sponsor, i) => (
                <SponsorLogo key={sponsor.id} sponsor={sponsor} className={cellBorders(i, partner.length, 3)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
