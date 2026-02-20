import { useState } from 'react'
import { Star, BookOpen, ArrowRight, ExternalLink, Shuffle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ToolLogo from '../ui/ToolLogo'
import {
  searchProducts,
  searchPlaybooks,
  getProductById,
  type ProductData,
  type PlaybookData,
} from '../../data/searchData'

const BASE = import.meta.env.BASE_URL

const IMGS = [
  `${BASE}images/product-images/rounded-1.png`,
  `${BASE}images/product-images/rounded-2.png`,
  `${BASE}images/product-images/rounded-3.png`,
  `${BASE}images/product-images/rounded-4.png`,
  `${BASE}images/product-images/rounded-5.png`,
  `${BASE}images/product-images/rounded-6.png`,
  `${BASE}images/product-images/rounded-7.png`,
  `${BASE}images/product-images/rounded.png`,
]

// Each product gets 3 distinct screenshots — no repeats within a row
const SCREENSHOTS: Record<string, [number, number, number]> = {
  'claude':     [0, 3, 6],
  'chatgpt':    [1, 4, 7],
  'cursor':     [2, 5, 0],
  'copilot':    [3, 6, 1],
  'perplexity': [4, 7, 2],
  'midjourney': [5, 0, 3],
  'notion-ai':  [6, 1, 4],
  'jasper':     [7, 2, 5],
  'replit':     [0, 5, 3],
  'grammarly':  [1, 6, 4],
}

function getScreenshots(productId: string): [string, string, string] {
  const [a, b, c] = SCREENSHOTS[productId] ?? [0, 1, 2]
  return [IMGS[a], IMGS[b], IMGS[c]]
}

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
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const matchedProducts = searchProducts(query)
  const matchedPlaybooks = searchPlaybooks(query)

  const featured: ProductData | null = matchedProducts[0] ?? null
  const screenshots = featured ? getScreenshots(featured.id) : getScreenshots('chatgpt')

  // Related products for the featured product
  const relatedProducts: ProductData[] = featured
    ? featured.relatedIds
        .map((id) => getProductById(id))
        .filter((p): p is ProductData => !!p)
    : []

  // Category chips from related products
  const categories: string[] = [
    ...new Set(relatedProducts.map((p) => p.category)),
  ]

  const filteredRelated = activeCategory
    ? relatedProducts.filter((p) => p.category === activeCategory)
    : relatedProducts

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
      <div className="flex divide-x divide-[var(--g2-border)]">

        {/* ── LEFT: Featured Product ── */}
        {featured && (
          <div className="flex-[3] p-5 flex flex-col gap-4 min-w-0">

            {/* Screenshots */}
            <div className="grid grid-cols-3 gap-2">
              {screenshots.map((src, i) => (
                <div key={i} className="rounded-xl overflow-hidden aspect-[4/3] bg-[var(--g2-bg)]">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Product identity */}
            <div className="flex items-center gap-3">
              <ToolLogo domain={featured.domain} name={featured.name} size={36} />
              <div className="min-w-0">
                <p className="text-[15px] font-bold text-[var(--g2-dark)] truncate">{featured.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Stars rating={featured.rating} />
                  <span className="text-[12px] font-semibold text-[var(--g2-muted)]">
                    {featured.rating.toFixed(1)}
                  </span>
                  <span className="text-[11px] text-[var(--g2-muted)]">
                    ({featured.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>
              </div>
              <span className={`ml-auto text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${featured.categoryColor}`}>
                {featured.category}
              </span>
            </div>

            {/* Description */}
            <p className="text-[13px] text-[var(--g2-muted)] leading-relaxed line-clamp-2">
              {featured.description}
            </p>

            {/* CTAs */}
            <div className="flex gap-2.5">
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--g2-purple)] text-white text-[12.5px] font-semibold hover:bg-purple-700 transition-colors"
              >
                <ExternalLink size={13} />
                Explore {featured.name}
              </button>
              <a
                href="#"
                onClick={onClose}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--g2-border)] text-[var(--g2-text)] text-[12.5px] font-semibold hover:border-[var(--g2-purple)] hover:text-[var(--g2-purple)] transition-colors"
              >
                Try {featured.name}
              </a>
            </div>

            {/* Related AI Tools */}
            {relatedProducts.length > 0 && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] font-semibold uppercase tracking-widest text-[var(--g2-muted)]">
                    Related AI Tools
                  </p>
                </div>

                {/* Category chips */}
                {categories.length > 1 && (
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setActiveCategory(null)}
                      className={`text-[11px] font-semibold px-3 py-1 rounded-full transition-colors ${
                        activeCategory === null
                          ? 'bg-[var(--g2-purple)] text-white'
                          : 'bg-[var(--g2-purple-light)] text-[var(--g2-purple)] hover:bg-[var(--g2-purple)] hover:text-white'
                      }`}
                    >
                      All
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                        className={`text-[11px] font-semibold px-3 py-1 rounded-full transition-colors ${
                          activeCategory === cat
                            ? 'bg-[var(--g2-purple)] text-white'
                            : 'bg-[var(--g2-purple-light)] text-[var(--g2-purple)] hover:bg-[var(--g2-purple)] hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}

                {/* Related tools grid */}
                <div className="grid grid-cols-2 gap-2">
                  {filteredRelated.slice(0, 4).map((tool) => (
                    <div
                      key={tool.id}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl border border-[var(--g2-border)] hover:border-[var(--g2-purple)] transition-colors cursor-pointer"
                    >
                      <ToolLogo domain={tool.domain} name={tool.name} size={28} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-semibold text-[var(--g2-dark)] truncate">{tool.name}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Stars rating={tool.rating} size={9} />
                          <span className="text-[10px] text-[var(--g2-muted)]">{tool.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── RIGHT: Playbooks ── */}
        <div className="flex-[2] flex flex-col min-w-0">
          <div className="p-5 pb-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--g2-muted)] mb-0.5">
              Popular
            </p>
            <h3 className="text-[18px] font-black text-[var(--g2-dark)]">AI Playbooks</h3>
          </div>

          <div className="flex flex-col divide-y divide-[var(--g2-border)] flex-1">
            {displayPlaybooks.map((pb) => (
              <div key={pb.id} className="px-5 py-3.5 flex flex-col gap-2 hover:bg-[var(--g2-purple-light)] transition-colors">
                <div className="flex items-start gap-3">
                  {/* Playbook icon */}
                  <div className="w-8 h-8 rounded-lg bg-[var(--g2-purple-light)] flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen size={15} className="text-[var(--g2-purple)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-[var(--g2-dark)] leading-snug line-clamp-2">
                      {pb.title}
                    </p>
                    <p className="text-[11.5px] text-[var(--g2-muted)] mt-0.5">
                      {pb.author} · {pb.authorRole} at {pb.company}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 pl-11">
                  <Stars rating={pb.rating} size={10} />
                  <span className="text-[11px] font-semibold text-[var(--g2-muted)]">
                    {pb.rating.toFixed(1)}
                  </span>
                  <span className="text-[10px] text-[var(--g2-muted)]">({pb.ratingCount})</span>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 pl-11">
                  <button
                    onClick={() => handlePlaybook(pb.id)}
                    className="text-[11.5px] font-semibold px-3 py-1.5 rounded-full bg-[var(--g2-purple)] text-white hover:bg-purple-700 transition-colors"
                  >
                    See Playbook
                  </button>
                  <button
                    onClick={() => handleRemix(pb.id)}
                    className="flex items-center gap-1 text-[11.5px] font-semibold px-3 py-1.5 rounded-full border border-[var(--g2-border)] text-[var(--g2-text)] hover:border-[var(--g2-purple)] hover:text-[var(--g2-purple)] transition-colors"
                  >
                    <Shuffle size={11} />
                    Remix
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-5 py-3.5 border-t border-[var(--g2-border)]">
            <button
              onClick={() => { onClose(); navigate('/playbook/new') }}
              className="flex items-center gap-1.5 text-[12px] font-semibold text-[var(--g2-purple)] hover:text-purple-700 transition-colors"
            >
              View All Relevant Playbooks
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
