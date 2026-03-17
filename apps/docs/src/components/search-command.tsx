import { Icon } from '@iconify/react'
import * as React from 'react'
import { SearchDialog } from './search-dialog'

export function SearchCommand() {
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
        className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors w-64 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Icon icon="lucide:search" className="size-4 shrink-0" />
        <span className="flex-1 text-left">Search docs...</span>
        <kbd className="flex items-center gap-0.5 rounded border bg-background px-1.5 py-0.5 text-xs"><span className="text-[14px]">⌘</span><span className="text-[12px]">K</span></kbd>
      </button>
      <SearchDialog open={open} onClose={() => setOpen(false)} />
    </>
  )
}
