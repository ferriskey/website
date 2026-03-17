'use client'

import * as React from 'react'
import { Icon } from '@iconify/react'
import { cn } from '../lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown'

type Theme = 'light' | 'dark' | 'system'

function applyTheme(theme: Theme) {
  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', isDark)
}

const icons: Record<Theme, string> = {
  light: 'lucide:sun',
  dark: 'lucide:moon',
  system: 'lucide:monitor',
}

const labels: Record<Theme, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = React.useState<Theme>('light')

  React.useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    const initial: Theme = stored ?? 'system'
    setTheme(initial)
    applyTheme(initial)

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      if ((localStorage.getItem('theme') ?? 'system') === 'system') {
        applyTheme('system')
      }
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const select = (next: Theme) => {
    setTheme(next)
    localStorage.setItem('theme', next)
    applyTheme(next)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors',
            className,
          )}
          aria-label="Toggle theme"
        >
          <Icon
            icon={theme === 'system' ? 'lucide:monitor' : theme === 'dark' ? 'lucide:moon' : 'lucide:sun'}
            className="size-5"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(['light', 'dark', 'system'] as const).map((t) => (
          <DropdownMenuItem key={t} onClick={() => select(t)}>
            <Icon icon={icons[t]} className="size-4" />
            {labels[t]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
