import * as React from 'react'
import { cn } from '@explainer/ui'
import { Icon } from '@iconify/react'
import { languageIcons, shellLanguages, terminalCommands } from '../../language-icons'

function extractTextContent(children: React.ReactNode): string {
  if (typeof children === 'string') return children
  if (typeof children === 'number') return String(children)
  if (Array.isArray(children)) return children.map(extractTextContent).join('')
  if (React.isValidElement(children)) return extractTextContent((children.props as any).children)
  return ''
}

function resolveIcon(language: string | undefined, label: string | undefined, children: React.ReactNode): string {
  const lang = (language || '').toLowerCase()
  const lbl = (label || '').toLowerCase()

  // Check label first, then language
  let icon = languageIcons[lbl] || languageIcons[lang] || 'mdi:code-tags'

  // For shell languages, detect package manager from content
  if (shellLanguages.includes(lang)) {
    const text = extractTextContent(children).trim()
    const match = text.match(/^(\w+)/)
    if (match) {
      const cmd = match[1].toLowerCase()
      if (terminalCommands.includes(cmd) && languageIcons[cmd]) {
        icon = languageIcons[cmd]
      }
    }
  }

  return icon
}

export function Pre({ className, children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const language = (props as any)['data-language'] as string | undefined
  const label = (props as any)['data-label'] as string | undefined

  if (label) {
    const icon = resolveIcon(language, label, children)
    return (
      <div className="code-block group relative my-4 overflow-hidden rounded-lg border bg-background text-sm">
        <div className="code-block-header flex items-center gap-2 border-b bg-background px-4 py-2.5">
          <Icon icon={icon} className="size-4 text-muted-foreground" />
          <span className="font-medium text-muted-foreground">{label}</span>
        </div>
        <div className="relative">
          <pre
            className={cn('overflow-x-auto p-4 text-sm leading-relaxed', className)}
            {...props}
          >
            {children}
          </pre>
        </div>
      </div>
    )
  }

  return (
    <pre
      className={cn(
        'my-4 overflow-x-auto rounded-lg border bg-muted p-4 text-sm leading-relaxed',
        className,
      )}
      {...props}
    >
      {children}
    </pre>
  )
}

export function Code({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
  const isInline = typeof children === 'string' && !className?.includes('astro-code')
  if (isInline) {
    return (
      <code
        className={cn(
          'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
          className,
        )}
        {...props}
      >
        {children}
      </code>
    )
  }
  return (
    <code className={className} {...props}>
      {children}
    </code>
  )
}
