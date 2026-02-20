import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import ToolLogo from '../ui/ToolLogo'

const BASE = import.meta.env.BASE_URL

const RANKINGS = [
  {
    rank: 1,
    name: 'ChatGPT',
    domain: 'openai.com',
    categories: ['Generative', 'Writing'],
    score: 4.565,
  },
  {
    rank: 2,
    name: 'Gemini',
    domain: 'gemini.google.com',
    categories: ['Generative', 'Writing'],
    score: 4.505,
  },
  {
    rank: 3,
    name: 'Thea',
    domain: 'thea.so',
    categories: ['Generative', 'Coding'],
    score: 4.565,
  },
]

const CATEGORIES = [
  { label: 'Generative',    color: 'bg-violet-50 text-violet-500' },
  { label: 'Coding',        color: 'bg-sky-50 text-sky-600' },
  { label: 'Marketing',     color: 'bg-orange-50 text-orange-500' },
  { label: 'Writing',       color: 'bg-emerald-50 text-emerald-600' },
  { label: 'Data Analytics',color: 'bg-amber-50 text-amber-600' },
  { label: 'Image Creation', color: 'bg-rose-50 text-rose-500' },
  { label: 'Legal',         color: 'bg-slate-50 text-slate-500' },
  { label: 'Education',     color: 'bg-teal-50 text-teal-500' },
  { label: 'Sales',         color: 'bg-red-50 text-red-500' },
  { label: 'Productivity',  color: 'bg-indigo-50 text-indigo-500' },
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
            <img
              src={`${BASE}images/Playbook-Image.png`}
              alt="AI Playbook"
              className="w-[160px] h-[140px] object-contain rounded-2xl"
            />
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
                        className="text-[10px] px-2 py-0.5 rounded-full bg-violet-50 text-violet-500 font-medium"
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
