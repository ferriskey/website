'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import { Icon } from '@iconify/react'
import { cn } from '../lib/utils'

export interface MobileMenuProps {
  children: React.ReactNode
  footer?: React.ReactNode
  title?: string
  breakpoint?: 'md' | 'lg'
}

export function MobileMenu({ children, footer, title = 'Menu', breakpoint = 'md' }: MobileMenuProps) {
  const [open, setOpen] = React.useState(false)
  const [visible, setVisible] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
    requestAnimationFrame(() => setVisible(true))
  }

  const handleClose = () => {
    setVisible(false)
    setTimeout(() => setOpen(false), 200)
  }

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const bpHidden = breakpoint === 'lg' ? 'lg:hidden' : 'md:hidden'

  return (
    <>
      <button
        onClick={handleOpen}
        className={cn(bpHidden, 'flex items-center justify-center size-9 rounded-md hover:bg-accent transition-colors')}
        aria-label="Open menu"
      >
        <Icon icon="lucide:menu" className="size-5" />
      </button>
      {open &&
        createPortal(
          <div className={cn('fixed inset-0 z-[90]', bpHidden)}>
            <div
              className={cn(
                'fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-200',
                visible ? 'opacity-100' : 'opacity-0',
              )}
              onMouseDown={handleClose}
            />
            <div
              className={cn(
                'fixed inset-y-0 left-0 w-72 bg-background border-r shadow-lg overflow-y-auto flex flex-col transition-transform duration-200 ease-out',
                visible ? 'translate-x-0' : '-translate-x-full',
              )}
            >
              <div className="flex items-center justify-between p-4 pb-2">
                <span className="font-semibold text-lg">{title}</span>
                <button
                  onClick={handleClose}
                  className="flex items-center justify-center size-8 rounded-md hover:bg-accent transition-colors"
                  aria-label="Close menu"
                >
                  <Icon icon="lucide:x" className="size-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-4 pb-4">{children}</div>
              {footer && <div className="border-t p-4 flex items-center gap-2">{footer}</div>}
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
