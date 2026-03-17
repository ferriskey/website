import * as React from 'react'
import { cn } from '@explainer/ui'

export function Link({
  className,
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = href?.startsWith('http')
  return (
    <a
      href={href}
      className={cn(
        'font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors',
        className,
      )}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
    </a>
  )
}
