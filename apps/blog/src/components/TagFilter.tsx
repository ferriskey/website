import { useEffect, useState } from 'react';
import { useTranslations } from '../i18n/utils';

interface TagFilterProps {
  tags: { name: string; count: number }[]
  initialTags?: string[]
  locale?: string
}

function TagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  )
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function readURL() {
  const params = new URLSearchParams(window.location.search)
  const tags = params.get('tags')?.split(',').filter(Boolean) ?? []
  const q = params.get('q') ?? ''
  return { tags, q }
}

function writeURL(selectedTags: string[], query: string) {
  const params = new URLSearchParams()
  if (selectedTags.length > 0) params.set('tags', selectedTags.join(','))
  if (query) params.set('q', query)
  const search = params.toString()
  const url = `${window.location.pathname}${search ? `?${search}` : ''}`
  window.history.replaceState(null, '', url)
}

export function TagFilter({ tags, initialTags = [], locale = 'en' }: TagFilterProps) {
  const t = useTranslations(locale)
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags)
  const [query, setQuery] = useState<string>('')

  useEffect(() => {
    const { tags: urlTags, q } = readURL()
    if (urlTags.length > 0) setSelectedTags(urlTags)
    if (q) setQuery(q)
  }, [])

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const [visibleCount, setVisibleCount] = useState<number | null>(null)
  const hasActiveFilter = selectedTags.length > 0 || query.trim().length > 0

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('[data-tags]')
    const normalizedQuery = query.toLowerCase().trim()
    let count = 0

    cards.forEach((card) => {
      const cardTags: string[] = JSON.parse(card.dataset.tags ?? '[]')
      const matchesTags =
        selectedTags.length === 0 || cardTags.some((t) => selectedTags.includes(t))

      const matchesQuery =
        !normalizedQuery ||
        (card.dataset.title ?? '').toLowerCase().includes(normalizedQuery) ||
        (card.dataset.description ?? '').toLowerCase().includes(normalizedQuery)

      const visible = matchesTags && matchesQuery
      card.hidden = !visible
      if (visible && card.style.display !== 'none') count++
    })

    setVisibleCount(count)
    writeURL(selectedTags, query)
    window.dispatchEvent(new Event('tags:filter'))
  }, [selectedTags, query])

  return (
    <>
      <div className="mb-10 space-y-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('tagFilter.placeholder')}
            className="w-full rounded-md border border-border bg-transparent pl-10 pr-4 py-2 max-w-sm text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary/50"
          />
        </div>

        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
          {tags.map((tag) => {
            const active = selectedTags.includes(tag.name)
            return (
              <button
                key={tag.name}
                type="button"
                onClick={() => toggleTag(tag.name)}
                className={`flex items-center gap-1.5 rounded-md border px-4 py-1.5 text-sm shrink-0 transition-colors cursor-pointer border-dashed ${
                  active
                    ? 'border-primary/50 bg-primary/5 text-primary font-medium'
                    : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground'
                }`}
              >
                <TagIcon className="size-3.5" />
                {tag.name}
              </button>
            )
          })}
        </div>
      </div>

      {hasActiveFilter && visibleCount === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-border py-20">
          <svg className="size-10 text-muted-foreground/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
            <path d="M8 11h6" />
          </svg>
          <p className="text-muted-foreground text-lg">{t('index.noResults')}</p>
        </div>
      )}
    </>
  )
}
