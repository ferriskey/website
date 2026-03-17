'use client'

import * as React from 'react'
import { cn } from '@explainer/ui'

interface TabsProps {
  items: string[]
  children: React.ReactNode
  className?: string
}

interface TabProps {
  label: string
  children: React.ReactNode
}

export function Tabs({ items, children, className }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(0)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!containerRef.current) return

    const codeBlocks = containerRef.current.querySelectorAll('.code-block')
    if (codeBlocks.length > 0) {
      codeBlocks.forEach((el, index) => {
        ;(el as HTMLElement).style.display = index === activeTab ? 'block' : 'none'
      })
    } else {
      const preElements = containerRef.current.querySelectorAll('pre')
      preElements.forEach((el, index) => {
        ;(el as HTMLElement).style.display = index === activeTab ? 'block' : 'none'
      })
    }
  }, [activeTab])

  return (
    <div className={cn('my-4', className)}>
      <div className="flex border-b" role="tablist">
        {items.map((item, index) => (
          <button
            key={item}
            role="tab"
            type="button"
            aria-selected={activeTab === index}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px cursor-pointer',
              activeTab === index
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
            onClick={() => setActiveTab(index)}
          >
            {item}
          </button>
        ))}
      </div>
      <div ref={containerRef} className="pt-4 [&_.code-block-header]:hidden [&_.code-block]:my-0 [&_.code-block]:rounded-none [&_.code-block]:border-0 [&_pre]:my-0 [&_pre]:rounded-none [&_pre]:border-0">
        {children}
      </div>
    </div>
  )
}

export function Tab({ children }: TabProps) {
  return <>{children}</>
}
