import { useState, useRef, useEffect } from 'react'
import { Star, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ToolLogo from '../ui/ToolLogo'
import { PLAYBOOKS, getProductById, type PlaybookData } from '../../data/searchData'

const PAGE_SIZE = 6

const CATEGORY_COLORS: Record<string, string> = {
  'Coding':           'bg-sky-50 text-sky-600',
  'Sales':            'bg-red-50 text-red-500',
  'Design':           'bg-fuchsia-50 text-fuchsia-500',
  'Marketing':        'bg-orange-50 text-orange-500',
  'Writing':          'bg-emerald-50 text-emerald-600',
  'Productivity':     'bg-indigo-50 text-indigo-500',
  'Legal':            'bg-slate-50 text-slate-500',
  'Data Analytics':   'bg-amber-50 text-amber-600',
  'Customer Support': 'bg-lime-50 text-lime-600',
  'Education':        'bg-blue-50 text-blue-500',
  'Automation':       'bg-purple-50 text-purple-500',
  'Research':         'bg-teal-50 text-teal-500',
  'Generative':       'bg-violet-50 text-violet-500',
}

function Stars({ rating }: { rating: number }) {
  const filled = Math.round(rating)
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={11}
          strokeWidth={1.5}
          style={
            s <= filled
              ? { fill: 'var(--g2-star)', color: 'var(--g2-star)' }
              : { fill: 'none', color: 'var(--g2-border)' }
          }
        />
      ))}
    </span>
  )
}

function authorInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

function PlaybookCard({ playbook }: { playbook: PlaybookData }) {
  const navigate = useNavigate()
  const tools = playbook.toolIds
    .slice(0, 5)
    .map((id) => getProductById(id))
    .filter(Boolean)

  const chipColor = CATEGORY_COLORS[playbook.category] ?? 'bg-violet-50 text-violet-500'

  return (
    <article
      onClick={() => navigate(`/playbook/view/${playbook.id}`)}
      className="flex flex-col rounded-2xl border border-[var(--g2-border)] bg-[var(--g2-surface)] p-5 gap-4 cursor-pointer hover:shadow-lg hover:border-[var(--g2-purple)]/40 transition-all"
    >
      {/* Category + rating */}
      <div className="flex items-center justify-between gap-2">
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${chipColor}`}>
          {playbook.category}
        </span>
        <div className="flex items-center gap-1.5">
          <Stars rating={playbook.rating} />
          <span className="text-[12px] font-semibold text-[var(--g2-dark)]">
            {playbook.rating.toFixed(1)}
          </span>
          <span className="text-[11px] text-[var(--g2-muted)]">({playbook.ratingCount})</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-[16px] font-bold text-[var(--g2-dark)] leading-snug line-clamp-2">
        {playbook.title}
      </h3>

      {/* Description */}
      <p className="text-[13.5px] text-[var(--g2-muted)] leading-relaxed line-clamp-3 -mt-1">
        {playbook.description}
      </p>

      {/* Tool logos */}
      <div className="flex items-center gap-2">
        {tools.map((tool) => (
          <ToolLogo key={tool!.id} domain={tool!.domain} name={tool!.name} size={28} />
        ))}
        {playbook.toolIds.length > 5 && (
          <span className="text-[11px] text-[var(--g2-muted)] font-medium ml-1">
            +{playbook.toolIds.length - 5} more
          </span>
        )}
      </div>

      {/* Divider + author */}
      <div className="border-t border-[var(--g2-border)] pt-3.5 flex items-center gap-2.5 -mb-0.5">
        <div className="w-7 h-7 rounded-full bg-[var(--g2-purple-light)] text-[var(--g2-purple)] text-[10px] font-bold flex items-center justify-center shrink-0">
          {authorInitials(playbook.author)}
        </div>
        <div className="min-w-0">
          <p className="text-[12.5px] font-semibold text-[var(--g2-dark)] truncate">{playbook.author}</p>
          <p className="text-[11.5px] text-[var(--g2-muted)] truncate">
            {playbook.authorRole} at {playbook.company}
          </p>
        </div>
      </div>
    </article>
  )
}

const ALL_CATEGORIES = [...new Set(PLAYBOOKS.map((p) => p.category))].sort()
const VISIBLE_COUNT = 7
const INLINE_CATEGORIES = ALL_CATEGORIES.slice(0, VISIBLE_COUNT)
const OVERFLOW_CATEGORIES = ALL_CATEGORIES.slice(VISIBLE_COUNT)

interface Props {
  dark: boolean
}

export default function AllPlaybooks({ dark }: Props) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [overflowOpen, setOverflowOpen] = useState(false)
  const overflowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!overflowOpen) return
    function handleClick(e: MouseEvent) {
      if (overflowRef.current && !overflowRef.current.contains(e.target as Node)) {
        setOverflowOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [overflowOpen])

  const filtered = PLAYBOOKS.filter((p) => {
    const matchCat = !activeCategory || p.category === activeCategory
    const q = query.toLowerCase()
    const matchQ =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q) ||
      p.company.toLowerCase().includes(q)
    return matchCat && matchQ
  })

  const shown = filtered.slice(0, visible)
  const hasMore = visible < filtered.length

  function handleCategoryClick(cat: string | null) {
    setActiveCategory(cat)
    setVisible(PAGE_SIZE)
  }

  function handleSearch(val: string) {
    setQuery(val)
    setVisible(PAGE_SIZE)
  }

  return (
    <section aria-labelledby="playbooks-heading" className="max-w-[1160px] mx-auto px-8 pt-4 pb-20">

      {/* Header row */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 id="playbooks-heading" className="text-[24px] font-black text-[var(--g2-dark)] shrink-0">
          All Playbooks
        </h2>

        {/* Search */}
        <div
          className="flex items-center gap-2 rounded-full border px-4 py-2 max-w-[280px] w-full"
          style={{
            background: dark ? '#1e1b36' : 'var(--g2-surface)',
            borderColor: dark ? '#4a4570' : 'var(--g2-border)',
          }}
        >
          <Search size={14} className="shrink-0 text-[var(--g2-muted)]" aria-hidden="true" />
          <input
            type="search"
            value={query}
            placeholder="Search playbooks..."
            aria-label="Search playbooks"
            className="flex-1 bg-transparent text-[var(--g2-dark)] placeholder:text-[var(--g2-muted)] text-[13px] outline-none"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Category filter chips */}
      <div className="flex flex-wrap gap-2 mb-8 items-center">
        {/* All */}
        <button
          onClick={() => handleCategoryClick(null)}
          className={`text-[12px] font-semibold px-3.5 py-1.5 rounded-full border transition-colors ${
            !activeCategory
              ? 'bg-[var(--g2-purple)] text-white border-[var(--g2-purple)]'
              : 'border-[var(--g2-border)] text-[var(--g2-muted)] hover:border-[var(--g2-purple)] hover:text-[var(--g2-purple)]'
          }`}
        >
          All
        </button>

        {/* Inline categories */}
        {INLINE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`text-[12px] font-semibold px-3.5 py-1.5 rounded-full border transition-colors ${
              activeCategory === cat
                ? 'bg-[var(--g2-purple)] text-white border-[var(--g2-purple)]'
                : 'border-[var(--g2-border)] text-[var(--g2-muted)] hover:border-[var(--g2-purple)] hover:text-[var(--g2-purple)]'
            }`}
          >
            {cat}
          </button>
        ))}

        {/* Overflow "..." chip */}
        {OVERFLOW_CATEGORIES.length > 0 && (
          <div ref={overflowRef} className="relative">
            <button
              onClick={() => setOverflowOpen((v) => !v)}
              className={`text-[12px] font-semibold px-3.5 py-1.5 rounded-full border transition-colors ${
                OVERFLOW_CATEGORIES.includes(activeCategory ?? '')
                  ? 'bg-[var(--g2-purple)] text-white border-[var(--g2-purple)]'
                  : overflowOpen
                  ? 'border-[var(--g2-purple)] text-[var(--g2-purple)]'
                  : 'border-[var(--g2-border)] text-[var(--g2-muted)] hover:border-[var(--g2-purple)] hover:text-[var(--g2-purple)]'
              }`}
            >
              •••
            </button>

            {overflowOpen && (
              <div
                className="absolute left-0 top-[calc(100%+8px)] z-50 min-w-[160px] rounded-xl border border-[var(--g2-border)] bg-[var(--g2-bg)] shadow-lg shadow-black/10 py-1"
              >
                {OVERFLOW_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      handleCategoryClick(cat)
                      setOverflowOpen(false)
                    }}
                    className={`w-full text-left px-4 py-2 text-[13px] font-medium transition-colors ${
                      activeCategory === cat
                        ? 'text-[var(--g2-purple)] font-semibold'
                        : 'text-[var(--g2-muted)] hover:text-[var(--g2-dark)] hover:bg-[var(--g2-border)]/40'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Grid */}
      {shown.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {shown.map((playbook) => (
            <PlaybookCard key={playbook.id} playbook={playbook} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-[var(--g2-muted)] text-[15px]">
          No playbooks found.
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="px-7 py-3 rounded-full border border-[var(--g2-border)] text-[var(--g2-text)] text-[13px] font-semibold hover:border-[#7060c8] hover:text-[#7060c8] transition-colors"
          >
            Load More
          </button>
        </div>
      )}

    </section>
  )
}
