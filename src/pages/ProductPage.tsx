import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft, Star, ExternalLink, Plus, ChevronUp,
  MessageSquare, Clock, BarChart3, Users, Bot, Code2, BookOpen,
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import ToolLogo from '../components/ui/ToolLogo'
import G2Logo from '../components/ui/G2Logo'
import { getProductById, PLAYBOOKS, type ProductData } from '../data/searchData'
import { useDemo } from '../context/DemoContext'


interface Props {
  dark: boolean
  onToggle: () => void
}

// ── Deterministic pseudo-random helpers ────────────────────────────────────
function hash(str: string): number {
  let h = 5381
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h) ^ str.charCodeAt(i)
  }
  return Math.abs(h)
}

function seededRange(seed: number, min: number, max: number): number {
  const r = (seed * 1664525 + 1013904223) & 0x7fffffff
  return Math.round(min + (r / 0x7fffffff) * (max - min))
}

function getMetrics(id: string) {
  const h = hash(id)
  return {
    ttft: seededRange(hash(id + 'ttft'), 180, 1100),
    contextAdherence: seededRange(hash(id + 'ca'), 62, 94),
    agentActionCompletion: seededRange(hash(id + 'aac'), 54, 91),
    toolSelectionQuality: seededRange(hash(id + 'tsq'), 50, 88),
    autonomyLevel: Math.min(6, Math.max(1, seededRange(h, 1, 6))),
  }
}

function getVersionHistory(product: ProductData) {
  const h = hash(product.id)
  const major = seededRange(h, 2, 4)
  return [
    {
      label: `${product.name} ${major}.${seededRange(hash(product.id + 'r1'), 1, 3)}`,
      date: 'Feb 2025',
      note: 'Latest stable release — improved accuracy, reduced latency, expanded API endpoints.',
    },
    {
      label: `${product.name} ${major}.0`,
      date: 'Oct 2024',
      note: 'Major release with extended context window and enhanced reasoning capabilities.',
    },
    {
      label: `${product.name} ${major - 1}.${seededRange(hash(product.id + 'r3'), 4, 9)}`,
      date: 'Jun 2024',
      note: 'Performance improvements, new integrations, and a refreshed developer dashboard.',
    },
    {
      label: `${product.name} ${major - 1}.0`,
      date: 'Jan 2024',
      note: 'Initial public launch with core AI features and web-based access.',
    },
  ]
}

function getPricingTiers(category: string, id: string): string[] {
  const h = hash(id + 'price')
  const hasFree = h % 3 !== 0
  const hasApi = ['Generative AI', 'Coding', 'Writing', 'Research', 'Automation'].includes(category)
  const tiers: string[] = []
  if (hasFree) tiers.push('Free tier')
  tiers.push(`Pro ($${seededRange(hash(id + 'cost'), 12, 39)}/mo)`)
  if (hasApi) tiers.push('API access')
  if (['Sales', 'Legal', 'HR & Recruiting'].includes(category)) tiers.push('Enterprise')
  return tiers
}

// ── Shared display components ───────────────────────────────────────────────
function Stars({ rating, size = 13 }: { rating: number; size?: number }) {
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

function CircleMetric({
  label, value, color,
}: { label: string; value: number; color: string }) {
  const r = 28
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - value / 100)
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-[72px] h-[72px]">
        <svg width="72" height="72" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
          <circle
            cx="36" cy="36" r={r} fill="none"
            stroke={color} strokeWidth="5"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[16px] font-bold text-white">
          {value}%
        </span>
      </div>
      <span
        className="text-[11px] text-center leading-tight max-w-[72px]"
        style={{ color: 'rgba(255,255,255,0.55)' }}
      >
        {label}
      </span>
    </div>
  )
}

// ── Branded product card (instant, no external image dependency) ───────────
function ProductCard({
  product, dark,
}: { product: ProductData; dark: boolean }) {
  const filled = Math.round(product.rating)

  return (
    <div
      className="rounded-2xl border border-[var(--g2-border)] overflow-hidden shadow-xl shadow-black/10"
      style={{ background: dark ? '#1e1b36' : '#f5f3ff' }}
    >
      {/* Top accent strip */}
      <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, var(--g2-purple), #a594f9)' }} />

      {/* Card body */}
      <div className="flex flex-col items-center gap-5 px-8 py-10">
        {/* Logo */}
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-lg"
          style={{ background: dark ? '#16132b' : 'white' }}
        >
          <ToolLogo domain={product.domain} name={product.name} size={72} />
        </div>

        {/* Name + category */}
        <div className="text-center">
          <p className="text-[22px] font-black text-[var(--g2-dark)] mb-2">{product.name}</p>
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${product.categoryColor}`}>
            {product.category}
          </span>
        </div>

        {/* Rating row */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={14}
                strokeWidth={1.5}
                style={
                  s <= filled
                    ? { fill: 'var(--g2-star)', color: 'var(--g2-star)' }
                    : { fill: 'none', color: 'var(--g2-border)' }
                }
              />
            ))}
          </span>
          <span className="text-[15px] font-bold text-[var(--g2-dark)]">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-[12px] text-[var(--g2-muted)]">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-1.5">
          {product.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2.5 py-1 rounded-full border border-[var(--g2-border)] text-[var(--g2-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Visit link */}
        <a
          href={`https://${product.domain}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--g2-purple)] hover:underline"
        >
          {product.domain} <ExternalLink size={12} />
        </a>
      </div>
    </div>
  )
}

// ── Static mock data ────────────────────────────────────────────────────────
const MOCK_DISCUSSIONS = [
  {
    id: 'd1',
    author: 'Sarah K.',
    role: 'Head of Product at Stripe',
    avatar: 'SK',
    time: '3 days ago',
    text: "We've been using this in our documentation workflow and the accuracy improvements are significant. Highly recommend pairing it with a solid prompt library.",
    upvotes: 42,
    replies: 7,
  },
  {
    id: 'd2',
    author: 'Marcus T.',
    role: 'AI Engineer at Vercel',
    avatar: 'MT',
    time: '1 week ago',
    text: 'API latency has improved noticeably in the past two releases. Integration with our CI/CD pipeline took about a day to set up properly.',
    upvotes: 28,
    replies: 4,
  },
  {
    id: 'd3',
    author: 'Priya M.',
    role: 'Ops Lead at Figma',
    avatar: 'PM',
    time: '2 weeks ago',
    text: "Anyone have good prompt templates for multi-step reasoning tasks? Would love to swap notes on what's working.",
    upvotes: 19,
    replies: 11,
  },
]

// ── Main component ──────────────────────────────────────────────────────────
export default function ProductPage({ dark, onToggle }: Props) {
  const { id } = useParams<{ id: string }>()
  const { model, openLoginModal } = useDemo()
  const product = id ? getProductById(id) : undefined

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--g2-bg)] flex flex-col">
        <Navbar dark={dark} onToggle={onToggle} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-[var(--g2-muted)] text-[15px] mb-4">Product not found.</p>
            <Link to="/" className="text-[var(--g2-purple)] text-[14px] font-semibold hover:underline">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const metrics = getMetrics(product.id)
  const releases = getVersionHistory(product)
  const pricing = getPricingTiers(product.category, product.id)
  const featuredIn = PLAYBOOKS.filter((pb) => pb.toolIds.includes(product.id))
  const relatedTools = product.relatedIds
    .slice(0, 4)
    .map((rid) => getProductById(rid))
    .filter(Boolean) as ProductData[]

  const ttftLabel =
    metrics.ttft < 300 ? '#1 Fastest' :
    metrics.ttft < 500 ? 'Top 3' :
    metrics.ttft < 700 ? 'Top 10' : 'Avg Speed'

  return (
    <div className="min-h-screen bg-[var(--g2-bg)]">
      <Navbar dark={dark} onToggle={onToggle} />

      {/* ── HERO with glow + background treatment ── */}
      <section
        className="relative"
        style={{ background: 'var(--hero-glow), var(--g2-bg)' }}
        aria-labelledby="product-heading"
      >
        <div className="relative max-w-[1160px] mx-auto px-6 pt-5 pb-12">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--g2-muted)] hover:text-[var(--g2-purple)] transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to Playbooks
          </Link>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-10 items-center">

            {/* LEFT — branding + identity + CTAs */}
            <div>
              {/* G2.AI "Reviewed on" badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--g2-border)] bg-[var(--g2-surface)]/60 backdrop-blur-sm mb-6">
                <G2Logo className="h-4 w-auto" />
                <span className="text-[11px] font-semibold text-[var(--g2-muted)]">
                  Reviewed on G2.AI
                </span>
              </div>

              {/* Logo + name */}
              <div className="flex items-center gap-4 mb-3">
                <ToolLogo domain={product.domain} name={product.name} size={64} className="shrink-0" />
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1
                      id="product-heading"
                      className="text-[36px] font-black text-[var(--g2-dark)] leading-tight"
                    >
                      {product.name}
                    </h1>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${product.categoryColor}`}>
                      {product.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 mt-1.5">
                    <Stars rating={product.rating} size={15} />
                    <span className="text-[15px] font-bold text-[var(--g2-dark)]">
                      {product.rating.toFixed(1)}
                    </span>
                    <span className="text-[13px] text-[var(--g2-muted)]">
                      {product.reviewCount.toLocaleString()} reviews
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[15px] text-[var(--g2-muted)] leading-relaxed max-w-[520px] mb-6">
                {product.shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                {model === 'auth' ? (
                  <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--g2-purple)] text-white text-[14px] font-semibold hover:bg-[#7060c8] transition-colors">
                    <Plus size={15} />
                    Add to Playbook
                  </button>
                ) : (
                  <button
                    onClick={openLoginModal}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--g2-purple)] text-white text-[14px] font-semibold hover:bg-[#7060c8] transition-colors"
                  >
                    <Plus size={15} />
                    Add to Playbook
                  </button>
                )}
                <a
                  href={`https://${product.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--g2-border)] text-[var(--g2-dark)] text-[14px] font-semibold hover:border-[var(--g2-purple)] hover:text-[var(--g2-purple)] transition-colors"
                >
                  Visit {product.name}
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* RIGHT — branded product card */}
            <ProductCard product={product} dark={dark} />
          </div>
        </div>
      </section>

      <div className="border-t border-[var(--g2-border)]" />

      {/* ── MAIN CONTENT (two-column) ── */}
      <section className="max-w-[1160px] mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">

        {/* LEFT — description + tags + releases */}
        <div>
          <h2 className="text-[20px] font-bold text-[var(--g2-dark)] mb-4">
            About {product.name}
          </h2>
          <p className="text-[15px] text-[var(--g2-text)] leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Tag chips */}
          <div className="flex flex-wrap gap-2 mb-10">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="text-[12px] font-medium px-3 py-1.5 rounded-full border border-[var(--g2-border)] text-[var(--g2-muted)] cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Releases */}
          <h3 className="text-[16px] font-bold text-[var(--g2-dark)] mb-4">Releases</h3>
          <div className="flex flex-col gap-3">
            {releases.map((rel, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-xl border border-[var(--g2-border)] bg-[var(--g2-surface)]"
              >
                <span className="shrink-0 mt-0.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[var(--g2-purple-light)] text-[var(--g2-purple)] whitespace-nowrap">
                  {rel.label}
                </span>
                <p className="flex-1 text-[13.5px] text-[var(--g2-text)] leading-relaxed">
                  {rel.note}
                </p>
                <span className="text-[12px] text-[var(--g2-muted)] shrink-0 mt-0.5">
                  {rel.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — pricing + quick stats */}
        <div className="flex flex-col gap-4">
          {/* Pricing */}
          <div className="p-4 rounded-xl border border-[var(--g2-border)] bg-[var(--g2-surface)]">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--g2-muted)] mb-3">
              Pricing
            </p>
            <div className="flex flex-wrap gap-2">
              {pricing.map((tier) => (
                <span
                  key={tier}
                  className="text-[12px] px-2.5 py-1 rounded-full bg-[var(--g2-purple-light)] text-[var(--g2-purple)] font-medium"
                >
                  {tier}
                </span>
              ))}
            </div>
          </div>

          {/* Quick stats */}
          <div className="p-4 rounded-xl border border-[var(--g2-border)] bg-[var(--g2-surface)]">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--g2-muted)] mb-3">
              At a Glance
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'G2 Score', value: `${product.rating.toFixed(1)} / 5.0` },
                { label: 'Reviews', value: product.reviewCount.toLocaleString() },
                { label: 'Used in Playbooks', value: featuredIn.length > 0 ? `${featuredIn.length}` : '—' },
                { label: 'Category', value: product.category },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[11px] text-[var(--g2-muted)]">{label}</p>
                  <p className="text-[14px] font-bold text-[var(--g2-dark)] mt-0.5 truncate">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AI PERFORMANCE METRICS ── */}
      <section className="py-12 px-6" style={{ background: '#16132b' }}>
        <div className="max-w-[1160px] mx-auto">
          <div className="flex items-center gap-2.5 mb-1.5">
            <BarChart3 size={18} style={{ color: '#a594f9' }} />
            <h2 className="text-[20px] font-bold text-white">AI Performance Metrics</h2>
          </div>
          <p className="text-[13px] mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Benchmarked by G2.AI across real-world agentic tasks
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {/* TTFT — big number treatment */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-0.5">
                <Clock size={13} style={{ color: 'rgba(255,255,255,0.4)' }} />
                <span
                  className="text-[11px] font-semibold uppercase tracking-wider"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  Time to First Token
                </span>
              </div>
              <p className="text-[36px] font-black text-white leading-none">
                {metrics.ttft}
                <span
                  className="text-[15px] font-normal ml-1"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  ms
                </span>
              </p>
              <span
                className="text-[11px] font-bold px-2 py-0.5 rounded-full w-fit"
                style={{ background: '#a594f9', color: '#1e1b36' }}
              >
                {ttftLabel}
              </span>
            </div>

            <CircleMetric label="Context Adherence" value={metrics.contextAdherence} color="#a594f9" />
            <CircleMetric label="Agent Action Completion" value={metrics.agentActionCompletion} color="#6ef0a0" />
            <CircleMetric label="Tool Selection Quality" value={metrics.toolSelectionQuality} color="#f9a8d4" />
          </div>

          {/* Agent Autonomy Scale */}
          <div
            className="rounded-2xl p-6"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[14px] font-bold text-white">Agent Autonomy Scale</p>
                <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  How independently can this tool execute multi-step tasks?
                </p>
              </div>
              <span className="text-[14px] font-bold text-white">
                Level {metrics.autonomyLevel} / 6
              </span>
            </div>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <div
                  key={level}
                  className="flex-1 h-3 rounded-full"
                  style={{
                    background:
                      level <= metrics.autonomyLevel
                        ? 'linear-gradient(90deg, #a594f9, #6ef0a0)'
                        : 'rgba(255,255,255,0.1)',
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Single-step
              </span>
              <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Fully autonomous
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED IN PLAYBOOKS ── */}
      {featuredIn.length > 0 && (
        <section className="max-w-[1160px] mx-auto px-6 py-10">
          <h2 className="text-[20px] font-bold text-[var(--g2-dark)] mb-6">
            Featured in Playbooks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredIn.slice(0, 6).map((pb) => (
              <Link
                key={pb.id}
                to={`/playbook/view/${pb.id}`}
                className="flex items-start gap-3.5 p-4 rounded-xl border border-[var(--g2-border)] bg-[var(--g2-surface)] hover:border-[var(--g2-purple)]/40 hover:shadow-md transition-all"
              >
                <div className="w-9 h-9 shrink-0 rounded-lg bg-[var(--g2-purple-light)] flex items-center justify-center">
                  <BookOpen size={16} className="text-[var(--g2-purple)]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-[var(--g2-dark)] leading-snug line-clamp-2">
                    {pb.title}
                  </p>
                  <p className="text-[12px] text-[var(--g2-muted)] mt-0.5 truncate">
                    {pb.author} · {pb.company}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── DISCUSSIONS ── */}
      <section className="border-t border-[var(--g2-border)]">
        <div className="max-w-[1160px] mx-auto px-6 py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[20px] font-bold text-[var(--g2-dark)] flex items-center gap-2">
              <MessageSquare size={18} className="text-[var(--g2-purple)]" />
              Discussions
            </h2>
            {model === 'auth' ? (
              <button className="px-4 py-2 rounded-full bg-[var(--g2-purple-light)] text-[var(--g2-purple)] text-[13px] font-semibold hover:bg-[var(--g2-purple)] hover:text-white transition-colors">
                Start a discussion
              </button>
            ) : (
              <button
                onClick={openLoginModal}
                className="px-4 py-2 rounded-full bg-[var(--g2-purple-light)] text-[var(--g2-purple)] text-[13px] font-semibold hover:bg-[var(--g2-purple)] hover:text-white transition-colors"
              >
                Log in to discuss
              </button>
            )}
          </div>

          <div className="flex flex-col gap-4 max-w-[760px]">
            {MOCK_DISCUSSIONS.map((disc) => (
              <div
                key={disc.id}
                className="p-5 rounded-xl border border-[var(--g2-border)] bg-[var(--g2-surface)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--g2-purple-light)] text-[var(--g2-purple)] text-[10px] font-bold flex items-center justify-center shrink-0">
                    {disc.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13.5px] font-semibold text-[var(--g2-dark)]">
                      {disc.author}
                    </p>
                    <p className="text-[11.5px] text-[var(--g2-muted)]">
                      {disc.role} · {disc.time}
                    </p>
                  </div>
                </div>
                <p className="text-[14px] text-[var(--g2-text)] leading-relaxed mb-3">
                  {disc.text}
                </p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 text-[12px] text-[var(--g2-muted)] hover:text-[var(--g2-purple)] transition-colors">
                    <ChevronUp size={14} />
                    {disc.upvotes}
                  </button>
                  <button className="flex items-center gap-1.5 text-[12px] text-[var(--g2-muted)] hover:text-[var(--g2-purple)] transition-colors">
                    <MessageSquare size={12} />
                    {disc.replies} replies
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED TOOLS ── */}
      {relatedTools.length > 0 && (
        <section className="border-t border-[var(--g2-border)]">
          <div className="max-w-[1160px] mx-auto px-6 py-10">
            <h2 className="text-[20px] font-bold text-[var(--g2-dark)] mb-6">Related Tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.id}
                  to={`/product/${tool.id}`}
                  className="flex flex-col items-center gap-3 p-5 rounded-xl border border-[var(--g2-border)] bg-[var(--g2-surface)] hover:border-[var(--g2-purple)]/40 hover:shadow-md text-center transition-all"
                >
                  <ToolLogo domain={tool.domain} name={tool.name} size={44} />
                  <div>
                    <p className="text-[13.5px] font-semibold text-[var(--g2-dark)]">{tool.name}</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Stars rating={tool.rating} size={11} />
                      <span className="text-[11px] text-[var(--g2-muted)]">
                        {tool.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RESOURCE CARDS ── */}
      <section className="border-t border-[var(--g2-border)]">
        <div className="max-w-[1160px] mx-auto px-6 py-10">
          <h2 className="text-[20px] font-bold text-[var(--g2-dark)] mb-6">Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                icon: <Users size={20} className="text-[var(--g2-purple)]" />,
                title: 'Customer Stories',
                desc: `See how leading teams build production workflows with ${product.name}.`,
                cta: 'Browse stories',
              },
              {
                icon: <Bot size={20} className="text-[var(--g2-purple)]" />,
                title: 'Building Effective Agents',
                desc: `Best practices for integrating ${product.name} into agentic pipelines and automation flows.`,
                cta: 'Read the guide',
              },
              {
                icon: <Code2 size={20} className="text-[var(--g2-purple)]" />,
                title: 'API & Integration',
                desc: `Explore the ${product.name} API docs, SDKs, and integration recipes for your stack.`,
                cta: 'View docs',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="flex flex-col gap-4 p-6 rounded-2xl border border-[var(--g2-border)] bg-[var(--g2-surface)] hover:border-[var(--g2-purple)]/40 hover:shadow-lg hover:shadow-[var(--g2-purple)]/5 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--g2-purple-light)] flex items-center justify-center">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[var(--g2-dark)] mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-[13px] text-[var(--g2-muted)] leading-relaxed">{card.desc}</p>
                </div>
                <a
                  href="#"
                  className="text-[13px] font-semibold text-[var(--g2-purple)] hover:underline mt-auto"
                >
                  {card.cta} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
