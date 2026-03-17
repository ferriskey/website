import * as React from 'react'
import { cn } from '@explainer/ui'
import { Icon } from '@iconify/react'

interface CardGroupProps {
  cols?: 1 | 2 | 3 | 4
  children: React.ReactNode
  className?: string
}

interface CardProps {
  label: string
  icon?: string
  href?: string
  children: React.ReactNode
}

export function CardGroup({ cols = 2, children, className }: CardGroupProps) {
  return (
    <div
      className={cn('my-4 grid gap-5', className)}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {children}
    </div>
  )
}

export function Card({ label, icon, href, children }: CardProps) {
  const content = (
    <>
      {icon && (
        <div className="flex size-8 items-center justify-center rounded-full border bg-secondary duration-150 group-hover:border-primary/60 group-hover:bg-primary/10">
          <Icon icon={icon} className="size-4 duration-150 group-hover:text-primary" />
        </div>
      )}
      <div className={cn(icon && 'mt-4')}>
        <p className="!mt-0 !p-0 font-semibold text-muted-foreground">{label}</p>
        <p className="!mt-0 !p-0 text-sm text-gray-500">{children}</p>
      </div>
    </>
  )

  const className = 'group flex w-full flex-col rounded-md border p-6 hover:bg-secondary'

  if (href) {
    return (
      <a href={href} className={cn(className, 'no-underline')}>
        {content}
      </a>
    )
  }

  return <div className={className}>{content}</div>
}
