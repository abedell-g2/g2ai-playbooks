import { Star, BookOpen, ArrowRight, ExternalLink, Shuffle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ToolLogo from '../ui/ToolLogo'
import {
  searchProducts,
  searchPlaybooks,
  type ProductData,
  type PlaybookData,
} from '../../data/searchData'

function Stars({ rating, size = 11 }: { rating: number; size?: number }) {
  const filled = Math.round(rating)
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
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

interface Props {
  query: string
  dark: boolean
  onClose: () => void
}

export default function SearchDropdown({ query, dark, onClose }: Props) {
  const navigate = useNavigate()

  const matchedProducts = searchProducts(query)
  const matchedPlaybooks = searchPlaybooks(query)

  const featured: ProductData | null = matchedProducts[0] ?? null

  const displayPlaybooks: PlaybookData[] = matchedPlaybooks.slice(0, 3)

  function handlePlaybook(id: string) {
    onClose()
    navigate(`/playbook/view/${id}`)
  }

  function handleRemix(id: string) {
    onClose()
    navigate(`/playbook/new?remix=${id}`)
  }

  if (!featured && displayPlaybooks.length === 0) return null

  return (
    <div
      className="absolute top-full mt-3 left-0 right-0 z-50 rounded-2xl border overflow-hidden shadow-2xl text-left"
      style={{
        background: dark ? '#16132b' : 'var(--g2-surface)',
        borderColor: dark ? '#2a2740' : 'var(--g2-border)',
        animation: 'dropdown-enter 0.18s ease both',
      }}
    >
      {/* ── Featured Product ── */}
      {featured && (
        <div className="p-5 flex flex-col gap-4">

          {/* Product identity */}
          <div className="flex items-center gap-3">
            <ToolLogo domain={featured.domain} name={featured.name} size={36} />
            <div className="min-w-0">
              <p className="text-[16px] font-bold text-[var(--g2-dark)] truncate">{featured.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <Stars rating={featured.rating} />
                <span className="text-[13px] font-semibold text-[var(--g2-muted)]">
                  {featured.rating.toFixed(1)}
                </span>
                <span className="text-[12px] text-[var(--g2-muted)]">
                  ({featured.reviewCount.toLocaleString()} reviews)
                </span>
              </div>
            </div>
            <span className={`ml-auto text-[12px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${featured.categoryColor}`}>
              {featured.category}
            </span>
          </div>

          {/* Description */}
          <p className="text-[14px] text-[var(--g2-muted)] leading-relaxed line-clamp-2">
            {featured.description}
          </p>

          {/* CTAs */}
          <div className="flex gap-2.5">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--g2-purple)] text-white text-[13px] font-semibold hover:bg-purple-700 transition-colors"
            >
              <ExternalLink size={13} />
              Explore {featured.name}
            </button>
            <a
              href="#"
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--g2-border)] text-[var(--g2-text)] text-[13px] font-semibold hover:border-[var(--g2-purple)] hover:text-[var(--g2-purple)] transition-colors"
            >
              Try {featured.name}
            </a>
          </div>

        </div>
      )}

      {/* ── Popular Playbooks — horizontal row at bottom ── */}
      {displayPlaybooks.length > 0 && (
        <div className="border-t border-[var(--g2-border)]">
          <div className="px-5 pt-4 pb-2 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--g2-muted)] mb-0.5">Popular</p>
              <h3 className="text-[15px] font-black text-[var(--g2-dark)]">AI Playbooks</h3>
            </div>
            <button
              onClick={() => { onClose(); navigate('/playbook/new') }}
              className="flex items-center gap-1 text-[12px] font-semibold text-[var(--g2-purple)] hover:text-purple-700 transition-colors"
            >
              View All
              <ArrowRight size={12} />
            </button>
          </div>

          <div className="px-5 pb-5 grid grid-cols-3 gap-3">
            {displayPlaybooks.map((pb) => (
              <div
                key={pb.id}
                className="flex flex-col gap-2.5 p-3.5 rounded-xl border border-[var(--g2-border)] hover:border-[var(--g2-purple)] hover:bg-[var(--g2-purple-light)] transition-colors"
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[var(--g2-purple-light)] flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen size={13} className="text-[var(--g2-purple)]" />
                  </div>
                  <p className="text-[13px] font-bold text-[var(--g2-dark)] leading-snug line-clamp-2">
                    {pb.title}
                  </p>
                </div>
                <p className="text-[11.5px] text-[var(--g2-muted)] truncate">
                  {pb.author} · {pb.company}
                </p>
                <div className="flex items-center gap-1.5">
                  <Stars rating={pb.rating} size={9} />
                  <span className="text-[11px] font-semibold text-[var(--g2-muted)]">{pb.rating.toFixed(1)}</span>
                  <span className="text-[11px] text-[var(--g2-muted)]">({pb.ratingCount})</span>
                </div>
                <div className="flex items-center gap-1.5 mt-auto">
                  <button
                    onClick={() => handlePlaybook(pb.id)}
                    className="text-[11.5px] font-semibold px-2.5 py-1 rounded-full border border-[var(--g2-border)] text-[var(--g2-text)] hover:border-[var(--g2-purple)] hover:text-[var(--g2-purple)] transition-colors"
                  >
                    See Playbook
                  </button>
                  <button
                    onClick={() => handleRemix(pb.id)}
                    className="flex items-center gap-1 text-[11.5px] font-semibold px-2.5 py-1 rounded-full border border-[var(--g2-border)] text-[var(--g2-text)] hover:border-[var(--g2-purple)] hover:text-[var(--g2-purple)] transition-colors"
                  >
                    <Shuffle size={10} />
                    Remix
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
