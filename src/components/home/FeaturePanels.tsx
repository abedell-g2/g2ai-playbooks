import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import ToolLogo from '../ui/ToolLogo'

const RANKINGS = [
  {
    rank: 1,
    name: 'ChatGPT',
    domain: 'openai.com',
    categories: ['Generativity', 'Writing'],
    score: 4.565,
  },
  {
    rank: 2,
    name: 'Gemini',
    domain: 'gemini.google.com',
    categories: ['Generativity', 'Writing'],
    score: 4.505,
  },
  {
    rank: 3,
    name: 'Thea',
    domain: 'thea.so',
    categories: ['Generativity', 'Coding'],
    score: 4.565,
  },
]

const CATEGORIES = [
  { label: 'Generativity', color: 'bg-purple-100 text-purple-700' },
  { label: 'Coding', color: 'bg-blue-100 text-blue-700' },
  { label: 'Marketing', color: 'bg-orange-100 text-orange-700' },
  { label: 'Writing', color: 'bg-green-100 text-green-700' },
  { label: 'Data Analytics', color: 'bg-yellow-100 text-yellow-700' },
  { label: 'Vision', color: 'bg-pink-100 text-pink-700' },
  { label: 'Legal', color: 'bg-slate-100 text-slate-700' },
  { label: 'Education', color: 'bg-teal-100 text-teal-700' },
  { label: 'Sales', color: 'bg-red-100 text-red-700' },
  { label: 'Productivity', color: 'bg-indigo-100 text-indigo-700' },
]

export default function FeaturePanels() {
  return (
    <section aria-label="Feature highlights" className="max-w-[1160px] mx-auto px-8 py-6 pb-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Panel 1: AI Playbook */}
        <div className="flex flex-col rounded-2xl border border-[var(--g2-border)] bg-[var(--g2-surface)] p-7 gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--g2-muted)] mb-1">
              Share your
            </p>
            <h2 className="text-[22px] font-black text-[var(--g2-dark)]">AI Playbook</h2>
          </div>

          <div className="flex justify-center py-2">
            <div className="w-[110px] h-[96px] rounded-2xl bg-gradient-to-br from-[var(--g2-purple-light)] to-purple-200 flex items-center justify-center">
              <span className="text-5xl" role="img" aria-label="Playbook">📋</span>
            </div>
          </div>

          <p className="text-[13.5px] text-[var(--g2-muted)] leading-relaxed">
            From simple workflows to complex ecosystems, share your AI blueprint with the community
            to help other software experts.
          </p>

          <div className="flex items-center gap-3 mt-auto">
            <Link
              to="/playbook/new"
              className="px-5 py-2.5 rounded-full bg-[var(--g2-purple)] text-white text-[13px] font-semibold hover:bg-purple-700 transition-colors"
            >
              Start Your Playbook
            </Link>
            <a
              href="#"
              className="px-5 py-2.5 rounded-full border border-[var(--g2-border)] text-[var(--g2-text)] text-[13px] font-semibold hover:border-[var(--g2-purple)] hover:text-[var(--g2-purple)] transition-colors"
            >
              See All
            </a>
          </div>
        </div>

        {/* Panel 2: AI Tool Rankings */}
        <div className="flex flex-col rounded-2xl border border-[var(--g2-border)] bg-[var(--g2-surface)] p-7 gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--g2-muted)] mb-1">
              AI Tool
            </p>
            <h2 className="text-[22px] font-black text-[var(--g2-dark)]">Rankings</h2>
          </div>

          <div className="flex flex-col gap-3">
            {RANKINGS.map((item) => (
              <div
                key={item.rank}
                className="flex items-center gap-3 rounded-xl border border-[var(--g2-border)] px-4 py-3"
              >
                {/* Rank badge */}
                <span className="w-8 h-8 rounded-full bg-[var(--g2-purple-light)] text-[var(--g2-purple)] text-[11px] font-bold flex items-center justify-center shrink-0">
                  #{item.rank}
                </span>

                {/* Logo */}
                <ToolLogo domain={item.domain} name={item.name} size={32} className="shrink-0" />

                {/* Name + categories */}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[var(--g2-dark)] truncate">{item.name}</p>
                  <div className="flex gap-1.5 flex-wrap mt-1">
                    {item.categories.map((cat) => (
                      <span
                        key={cat}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--g2-purple-light)] text-[var(--g2-purple)] font-medium"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Score + thumbs */}
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[12px] font-bold text-[var(--g2-dark)]">
                    {item.score.toFixed(3)}
                  </span>
                  <div className="flex gap-1.5 text-[var(--g2-muted)]">
                    <ThumbsUp size={11} />
                    <ThumbsDown size={11} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <a
            href="#"
            className="mt-auto self-start px-5 py-2.5 rounded-full border border-[var(--g2-border)] text-[var(--g2-text)] text-[13px] font-semibold hover:border-[var(--g2-purple)] hover:text-[var(--g2-purple)] transition-colors"
          >
            See All
          </a>
        </div>

        {/* Panel 3: Popular AI Categories */}
        <div className="flex flex-col rounded-2xl border border-[var(--g2-border)] bg-[var(--g2-surface)] p-7 gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--g2-muted)] mb-1">
              Popular AI
            </p>
            <h2 className="text-[22px] font-black text-[var(--g2-dark)]">Categories</h2>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.label}
                href="#"
                className={`text-[12px] font-semibold px-3.5 py-1.5 rounded-full transition-opacity hover:opacity-80 ${cat.color}`}
              >
                {cat.label}
              </a>
            ))}
          </div>

          <a
            href="#"
            className="mt-auto self-start px-5 py-2.5 rounded-full border border-[var(--g2-border)] text-[var(--g2-text)] text-[13px] font-semibold hover:border-[var(--g2-purple)] hover:text-[var(--g2-purple)] transition-colors"
          >
            See All
          </a>
        </div>

      </div>
    </section>
  )
}
