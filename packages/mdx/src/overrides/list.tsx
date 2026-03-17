import * as React from 'react'
import { cn } from '@explainer/ui'

export function UnorderedList({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn('my-4 ml-6 list-disc [&>li]:mt-2', className)} {...props} />
}

export function OrderedList({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) {
  return <ol className={cn('my-4 ml-6 list-decimal [&>li]:mt-2', className)} {...props} />
}
