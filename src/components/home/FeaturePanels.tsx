import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { Link } from 'react-router-dom'

const RANKINGS = [
  {
    rank: 1,
    name: 'ChatGPT',
    logo: 'https://logo.clearbit.com/openai.com',
    categories: ['Generativity', 'Writing'],
    score: 4.355,
  },
  {
    rank: 2,
    name: 'Gemini',
    logo: 'https://logo.clearbit.com/google.com',
    categories: ['Generativity', 'Writing'],
    score: 4.869,
  },
  {
    rank: 3,
    name: 'Thea',
    logo: null,
    categories: ['Generativity', 'Coding'],
    score: 4.746,
  },
]

const CATEGORIES = [
  { label: 'Generativity', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300' },
  { label: 'Coding', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' },
  { label: 'Marketing', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300' },
  { label: 'Writing', color: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' },
  { label: 'Data Analytics', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300' },
  { label: 'Vision', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300' },
  { label: 'Legal', color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
  { label: 'Education', color: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300' },
  { label: 'Sales', color: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300' },
  { label: 'Productivity', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' },
]

const panelClass =
  'flex flex-col rounded-2xl border border-[var(--g2-border)] bg-[var(--g2-bg)] p-6 gap-5'

export default function FeaturePanels() {
  return (
    <section aria-label="Feature highlights" className="max-w-[1200px] mx-auto px-6 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Panel 1: AI Playbook */}
        <div className={panelClass}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--g2-muted)] mb-0.5">
              Share your
            </p>
            <h2 className="text-xl font-black text-[var(--g2-dark)]">AI Playbook</h2>
          </div>

          {/* Binder illustration placeholder */}
          <div className="flex justify-center">
            <div className="w-[100px] h-[90px] rounded-xl bg-gradient-to-br from-[var(--g2-purple-light)] to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40 flex items-center justify-center">
              <span className="text-4xl" role="img" aria-label="Playbook">📋</span>
            </div>
          </div>

          <p className="text-[13px] text-[var(--g2-muted)] leading-relaxed">
            From simple workflows to complex ecosystems, share your AI blueprint with the community
            to help other software experts.
          </p>

          <div className="flex items-center gap-2 mt-auto">
            <Link
              to="/playbook/new"
              className="px-4 py-2 rounded-full bg-[var(--g2-purple)] text-white text-[13px] font-semibold hover:bg-purple-700 transition-colors"
            >
              Start Your Playbook
            </Link>
            <a
              href="#"
              className="px-4 py-2 rounded-full border border-[var(--g2-border)] text-[var(--g2-text)] text-[13px] font-semibold hover:border-[var(--g2-purple)] hover:text-[var(--g2-purple)] transition-colors"
            >
              See All
            </a>
          </div>
        </div>

        {/* Panel 2: AI Tool Rankings */}
        <div className={panelClass}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--g2-muted)] mb-0.5">
              AI Tool
            </p>
            <h2 className="text-xl font-black text-[var(--g2-dark)]">Rankings</h2>
          </div>

          <div className="flex flex-col gap-2">
            {RANKINGS.map((item) => (
              <div
                key={item.rank}
                className="flex items-center gap-3 rounded-xl border border-[var(--g2-border)] px-3 py-2.5"
              >
                {/* Rank badge */}
                <span className="w-6 h-6 rounded-full bg-[var(--g2-purple-light)] text-[var(--g2-purple)] text-[11px] font-bold flex items-center justify-center shrink-0">
                  #{item.rank}
                </span>

                {/* Logo */}
                <div className="w-7 h-7 rounded-full bg-[var(--g2-border)] overflow-hidden shrink-0 flex items-center justify-center">
                  {item.logo ? (
                    <img src={item.logo} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] font-bold text-[var(--g2-muted)]">
                      {item.name[0]}
                    </span>
                  )}
                </div>

                {/* Name + categories */}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[var(--g2-dark)] truncate">{item.name}</p>
                  <div className="flex gap-1 flex-wrap mt-0.5">
                    {item.categories.map((cat) => (
                      <span
                        key={cat}
                        className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--g2-purple-light)] text-[var(--g2-purple)]"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Score + thumbs */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[12px] font-bold text-[var(--g2-dark)]">
                    {item.score.toFixed(2)}
                  </span>
                  <div className="flex gap-1 text-[var(--g2-muted)]">
                    <ThumbsUp size={12} />
                    <ThumbsDown size={12} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <a
            href="#"
            className="mt-auto self-start px-4 py-2 rounded-full border border-[var(--g2-border)] text-[var(--g2-text)] text-[13px] font-semibold hover:border-[var(--g2-purple)] hover:text-[var(--g2-purple)] transition-colors"
          >
            See All
          </a>
        </div>

        {/* Panel 3: Popular AI Categories */}
        <div className={panelClass}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--g2-muted)] mb-0.5">
              Popular AI
            </p>
            <h2 className="text-xl font-black text-[var(--g2-dark)]">Categories</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.label}
                href="#"
                className={`text-[12px] font-semibold px-3 py-1.5 rounded-full transition-opacity hover:opacity-80 ${cat.color}`}
              >
                {cat.label}
              </a>
            ))}
          </div>

          <a
            href="#"
            className="mt-auto self-start px-4 py-2 rounded-full border border-[var(--g2-border)] text-[var(--g2-text)] text-[13px] font-semibold hover:border-[var(--g2-purple)] hover:text-[var(--g2-purple)] transition-colors"
          >
            See All
          </a>
        </div>
      </div>
    </section>
  )
}
