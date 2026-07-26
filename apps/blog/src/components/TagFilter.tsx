import { useEffect, useState } from 'react';
import { useTranslations } from '../i18n/utils';

interface TagFilterProps {
  tags: { name: string; count: number }[]
  totalCount: number
  initialTags?: string[]
  locale?: string
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

export function TagFilter({ tags, totalCount, initialTags = [], locale = 'en' }: TagFilterProps) {
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
      <div className="mb-10 pb-6 border-b border-border flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
        <div className="flex items-center gap-3 flex-wrap min-w-0">
          <span className="text-sm text-muted-foreground shrink-0">{t('index.filterLabel')}</span>
          <span className="text-sm text-muted-foreground/60 shrink-0">{totalCount} {t('index.articleCount')}</span>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {tags.map((tag) => {
              const active = selectedTags.includes(tag.name)
              return (
                <button
                  key={tag.name}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => toggleTag(tag.name)}
                  className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide shrink-0 transition-colors cursor-pointer ${
                    active
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground'
                  }`}
                >
                  {tag.name}
                </button>
              )
            })}
          </div>
        </div>

        <div className="relative lg:ml-auto lg:shrink-0">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('tagFilter.placeholder')}
            className="w-full lg:w-64 rounded-md border border-border bg-transparent pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary/50"
          />
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
