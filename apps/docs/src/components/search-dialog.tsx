import { cn } from '@explainer/ui'
import { Icon } from '@iconify/react'
import * as React from 'react'
import { createPortal } from 'react-dom'

interface PagefindResult {
  url: string
  meta: { title: string }
  excerpt: string
}

let pagefindInstance: any = null
let pagefindFailed = false

async function getPagefind() {
  if (pagefindInstance) return pagefindInstance
  if (pagefindFailed) return null
  try {
    const module = await new Function("return import('/pagefind/pagefind.js')")()
    await module.init()
    pagefindInstance = module
    return pagefindInstance
  } catch {
    pagefindFailed = false
    return null
  }
}

interface SearchDialogProps {
  open: boolean
  onClose: () => void
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = React.useState('')
  const [results, setResults] = React.useState<PagefindResult[]>([])
  const [loading, setLoading] = React.useState(false)
  const [unavailable, setUnavailable] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (open) {
      setQuery('')
      setResults([])
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  React.useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const timeout = setTimeout(async () => {
      setLoading(true)
      const pagefind = await getPagefind()
      if (!pagefind) {
        setLoading(false)
        setUnavailable(true)
        return
      }

      const search = await pagefind.search(query)
      const data = await Promise.all(search.results.slice(0, 8).map((r: any) => r.data()))
      setResults(data)
      setSelectedIndex(0)
      setLoading(false)
    }, 200)

    return () => clearTimeout(timeout)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault()
      window.location.href = results[selectedIndex].url
      onClose()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    }
  }

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-100 bg-background/80 backdrop-blur-sm" onMouseDown={onClose}>
      <div
        className="mx-auto mt-[20vh] max-w-lg rounded-lg border bg-popover shadow-lg"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b px-3">
          <Icon icon="lucide:search" className="size-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search docs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-muted-foreground"
          />
          {loading && (
            <Icon icon="lucide:loader-2" className="size-4 shrink-0 text-muted-foreground animate-spin" />
          )}
          <kbd className="ml-2 rounded border bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">Esc</kbd>
        </div>

        {results.length > 0 && (
          <div className="max-h-80 overflow-y-auto p-1">
            {results.map((result, i) => (
              <a
                key={i}
                href={result.url}
                className={cn(
                  'block rounded-sm px-3 py-2 text-sm transition-colors',
                  i === selectedIndex
                    ? 'bg-accent text-accent-foreground'
                    : 'text-foreground hover:bg-accent/50',
                )}
                onClick={onClose}
              >
                <div className="font-medium">{result.meta.title}</div>
                {result.excerpt && (
                  <div
                    className="text-xs text-muted-foreground mt-0.5 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: result.excerpt }}
                  />
                )}
              </a>
            ))}
          </div>
        )}

        {query.trim() && results.length === 0 && !loading && (
          <div className="p-6 text-center">
            <p className="text-sm text-muted-foreground">
              {unavailable ? 'Search is available after building the site' : 'No results found'}
            </p>
          </div>
        )}

        {!query.trim() && (
          <div className="p-6 text-center">
            <p className="text-sm text-muted-foreground">Start typing to search...</p>
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
