import * as React from 'react'
import { cn } from '@explainer/ui'

export function Paragraph({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('leading-7 [&:not(:first-child)]:mt-4', className)} {...props} />
}
