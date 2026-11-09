import { Icon } from '@iconify/react'
import * as React from 'react'
import { SearchDialog } from './search-dialog'

export function SearchCommand({ locale }: { locale: string }) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground transition-colors w-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Icon icon="lucide:search" className="size-4 shrink-0" />
        <span className="flex-1 text-left">Search docs...</span>
        <kbd className="flex items-center gap-0.5 border border-border bg-background px-1.5 py-0.5 text-xs"><span className="text-[14px]">⌘</span><span className="text-[12px]">K</span></kbd>
      </button>
      <SearchDialog locale={locale} open={open} onClose={() => setOpen(false)} />
    </>
  )
}
