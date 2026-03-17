'use client'

import { cn } from '@explainer/ui'
import { Icon } from '@iconify/react'
import { type PropsWithChildren, useEffect, useRef, useState } from 'react'
import { languageIcons, terminalCommands } from '../../language-icons'

interface Tab {
  label: string
  language: string
  icon: string
}

function getIcon(label?: string, language?: string): string {
  const l = label?.toLowerCase()
  const lang = language?.toLowerCase()
  return (l && languageIcons[l]) || (lang && languageIcons[lang]) || 'mdi:code-tags'
}

interface CodeGroupProps {
  titles?: string[]
  className?: string
}

export function CodeGroup({ titles, children, className }: PropsWithChildren<CodeGroupProps>) {
  const [activeTab, setActiveTab] = useState(0)
  const [tabs, setTabs] = useState<Tab[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const preElements = containerRef.current.querySelectorAll('pre')
    const newTabs: Tab[] = []

    preElements.forEach((el, index) => {
      const label =
        el.getAttribute('data-label') ||
        el.getAttribute('data-language') ||
        `Tab ${index + 1}`
      const language = el.getAttribute('data-language') || 'text'

      let icon = getIcon(label, language)

      if (['bash', 'sh', 'shell'].includes(language.toLowerCase())) {
        const text = el.textContent?.trim() || ''
        const match = text.replace(/^\$\s*/, '').match(/^(\w+)/)
        if (match) {
          const cmd = match[1].toLowerCase()
          if (terminalCommands.includes(cmd) && languageIcons[cmd]) {
            icon = languageIcons[cmd]
          }
        }
      }

      newTabs.push({ label, language, icon })
    })

    setTabs(newTabs)
  }, [children])

  useEffect(() => {
    if (!containerRef.current) return

    // Hide/show .code-block wrappers (from pre.astro with label) or raw pre elements
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
  }, [activeTab, tabs])

  return (
    <div className={cn('my-4 overflow-hidden rounded-lg border bg-background', className)}>
      {tabs.length > 0 && (
        <div className="flex gap-2 overflow-x-auto border-b p-2">
          {tabs.map((tab, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveTab(i)}
              className={cn(
                'inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-1.5 text-sm transition-colors cursor-pointer',
                activeTab === i
                  ? 'bg-muted font-medium text-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <Icon icon={tab.icon} width={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      )}
      <div
        ref={containerRef}
        className="[&_.code-block-header]:hidden [&_.code-block]:my-0 [&_.code-block]:rounded-none [&_.code-block]:border-0 [&_pre]:my-0 [&_pre]:rounded-none [&_pre]:border-0"
      >
        {children}
      </div>
    </div>
  )
}
