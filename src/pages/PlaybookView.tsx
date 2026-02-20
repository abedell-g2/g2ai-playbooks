import { useParams, useNavigate } from 'react-router-dom'
import { Star, Shuffle, PenLine, ArrowLeft, BookOpen } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import ToolLogo from '../components/ui/ToolLogo'
import { getPlaybookById, getProductById } from '../data/searchData'

interface Props {
  dark: boolean
  onToggle: () => void
}

function Stars({ rating, size = 13 }: { rating: number; size?: number }) {
  const filled = Math.round(rating)
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          fill={s <= filled ? '#f97316' : 'none'}
          stroke={s <= filled ? '#f97316' : 'currentColor'}
          strokeWidth={1.5}
          className={s <= filled ? '' : 'text-[var(--g2-border)]'}
        />
      ))}
    </span>
  )
}

export default function PlaybookView({ dark, onToggle }: Props) {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const playbook = id ? getPlaybookById(id) : undefined

  if (!playbook) {
    return (
      <div className="min-h-screen bg-[var(--g2-bg)]">
        <Navbar dark={dark} onToggle={onToggle} />
        <div className="max-w-[860px] mx-auto px-8 py-24 text-center">
          <p className="text-[var(--g2-muted)] text-lg">Playbook not found.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 px-6 py-2.5 rounded-full bg-[var(--g2-purple)] text-white font-semibold text-[14px] hover:bg-purple-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  const tools = playbook.toolIds.map((tid) => getProductById(tid)).filter(Boolean)

  return (
    <div className="min-h-screen bg-[var(--g2-bg)] transition-colors duration-200">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar dark={dark} onToggle={onToggle} />

      <main id="main-content" className="max-w-[860px] mx-auto px-8 py-12">

        {/* Back link */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-[13px] text-[var(--g2-muted)] hover:text-[var(--g2-purple)] transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back
        </button>

        {/* Header */}
        <div className="flex flex-col gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[var(--g2-purple-light)] flex items-center justify-center shrink-0">
              <BookOpen size={22} className="text-[var(--g2-purple)]" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--g2-muted)]">
                AI Playbook
              </p>
              <h1 className="text-[28px] font-black text-[var(--g2-dark)] leading-tight">
                {playbook.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Stars rating={playbook.rating} />
              <span className="text-[13px] font-semibold text-[var(--g2-dark)]">
                {playbook.rating.toFixed(1)}
              </span>
              <span className="text-[12px] text-[var(--g2-muted)]">
                ({playbook.ratingCount} reviews)
              </span>
            </div>
            <span className="text-[var(--g2-border)]">·</span>
            <span className="text-[13px] text-[var(--g2-muted)]">
              by <span className="font-semibold text-[var(--g2-dark)]">{playbook.author}</span>
              {' '}&mdash; {playbook.authorRole} at{' '}
              <span className="font-semibold text-[var(--g2-dark)]">{playbook.company}</span>
            </span>
          </div>

          <p className="text-[15px] text-[var(--g2-text)] leading-relaxed max-w-[640px]">
            {playbook.description}
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => navigate(`/playbook/new?remix=${playbook.id}`)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--g2-purple)] text-white font-semibold text-[13.5px] hover:bg-purple-700 transition-colors"
            >
              <Shuffle size={14} />
              Remix this Playbook
            </button>
            <button
              onClick={() => navigate('/playbook/new')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--g2-border)] text-[var(--g2-text)] font-semibold text-[13.5px] hover:border-[var(--g2-purple)] hover:text-[var(--g2-purple)] transition-colors"
            >
              <PenLine size={14} />
              Start from Scratch
            </button>
          </div>
        </div>

        {/* Tools used */}
        <div className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--g2-muted)] mb-4">
            Tools in this Playbook
          </p>
          <div className="flex flex-wrap gap-3">
            {tools.map((tool) => tool && (
              <div
                key={tool.id}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[var(--g2-border)] bg-[var(--g2-surface)]"
              >
                <ToolLogo domain={tool.domain} name={tool.name} size={28} />
                <div>
                  <p className="text-[13px] font-semibold text-[var(--g2-dark)]">{tool.name}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${tool.categoryColor}`}>
                    {tool.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--g2-muted)] mb-4">
            Playbook Steps
          </p>
          <div className="flex flex-col gap-0">
            {playbook.steps.map((step, i) => {
              const tool = getProductById(step.toolId)
              return (
                <div key={i} className="flex gap-4">
                  {/* Step line + number */}
                  <div className="flex flex-col items-center gap-0">
                    <div className="w-8 h-8 rounded-full bg-[var(--g2-purple-light)] text-[var(--g2-purple)] flex items-center justify-center text-[12px] font-bold shrink-0 z-10">
                      {i + 1}
                    </div>
                    {i < playbook.steps.length - 1 && (
                      <div className="w-px flex-1 bg-[var(--g2-border)] my-1" />
                    )}
                  </div>

                  {/* Step content */}
                  <div className="pb-6 pt-1 flex-1 min-w-0">
                    {tool && (
                      <div className="flex items-center gap-2 mb-1.5">
                        <ToolLogo domain={tool.domain} name={tool.name} size={20} />
                        <span className="text-[13px] font-bold text-[var(--g2-dark)]">{tool.name}</span>
                      </div>
                    )}
                    <p className="text-[14px] text-[var(--g2-text)] leading-relaxed">{step.action}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTAs */}
        <div className="mt-10 pt-10 border-t border-[var(--g2-border)] flex items-center gap-3">
          <button
            onClick={() => navigate(`/playbook/new?remix=${playbook.id}`)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--g2-purple)] text-white font-semibold text-[13.5px] hover:bg-purple-700 transition-colors"
          >
            <Shuffle size={14} />
            Remix this Playbook
          </button>
          <button
            onClick={() => navigate('/playbook/new')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--g2-border)] text-[var(--g2-text)] font-semibold text-[13.5px] hover:border-[var(--g2-purple)] hover:text-[var(--g2-purple)] transition-colors"
          >
            <PenLine size={14} />
            Start from Scratch
          </button>
        </div>

      </main>
    </div>
  )
}
