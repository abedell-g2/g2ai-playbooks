import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Pencil, Sparkles } from 'lucide-react'
import G2Logo from '../components/ui/G2Logo'

interface Props {
  dark: boolean
}

export default function PlaybookMode({ dark }: Props) {
  return (
    <div className="min-h-screen bg-[var(--g2-bg)] flex flex-col">

      {/* Top bar */}
      <header className="h-14 shrink-0 flex items-center px-6 border-b border-[var(--g2-border)] bg-[var(--g2-bg)]">
        <Link
          to="/"
          className="flex items-center gap-1.5 text-[13px] font-medium text-[var(--g2-muted)] hover:text-[var(--g2-purple)] transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
        <div className="flex-1 flex justify-center">
          <G2Logo className="h-6 w-auto" />
        </div>
        <div className="w-16" />
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[580px]">

          <div className="text-center mb-10">
            <h1 className="text-[30px] font-black text-[var(--g2-dark)] mb-2">
              How would you like to start?
            </h1>
            <p className="text-[15px] text-[var(--g2-muted)] leading-relaxed">
              Choose the path that fits where you are.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">

            {/* Option A: existing workflow */}
            <Link
              to="/playbook/start"
              className="flex-1 group rounded-2xl border-2 border-[var(--g2-border)] p-7 transition-all hover:border-[var(--g2-purple)] hover:shadow-lg hover:shadow-[var(--g2-purple)]/10"
              style={{ background: dark ? '#1e1b36' : 'white' }}
            >
              <div className="w-11 h-11 rounded-xl bg-[var(--g2-purple-fg)]/15 flex items-center justify-center mb-4 group-hover:bg-[var(--g2-purple-fg)]/25 transition-colors">
                <Pencil size={20} className="text-[var(--g2-purple-fg)]" />
              </div>
              <h2 className="text-[17px] font-bold text-[var(--g2-dark)] mb-2">
                I have a workflow
              </h2>
              <p className="text-[13.5px] text-[var(--g2-muted)] leading-relaxed mb-6">
                Document an existing AI workflow and share it as a playbook.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--g2-purple-fg)]">
                Get started <ArrowRight size={14} />
              </span>
            </Link>

            {/* Option B: guided assist */}
            <Link
              to="/playbook/assist"
              className="flex-1 group rounded-2xl border-2 border-[var(--g2-purple)]/40 p-7 transition-all hover:border-[var(--g2-purple)] hover:shadow-lg hover:shadow-[var(--g2-purple)]/10 relative overflow-hidden"
              style={{ background: dark ? '#1e1b36' : 'white' }}
            >
              {/* Subtle purple glow in corner */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[var(--g2-purple)]/8 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[var(--g2-purple-fg)]/15 flex items-center justify-center group-hover:bg-[var(--g2-purple-fg)]/25 transition-colors">
                    <Sparkles size={20} className="text-[var(--g2-purple-fg)]" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--g2-purple-fg)] bg-[var(--g2-purple-fg)]/15 px-2.5 py-1 rounded-full">
                    Recommended
                  </span>
                </div>
                <h2 className="text-[17px] font-bold text-[var(--g2-dark)] mb-2">
                  Help me build one
                </h2>
                <p className="text-[13.5px] text-[var(--g2-muted)] leading-relaxed mb-6">
                  Describe a problem and G2.AI will recommend a playbook tailored to your needs.
                </p>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--g2-purple-fg)]">
                  Start guided build <ArrowRight size={14} />
                </span>
              </div>
            </Link>

          </div>
        </div>
      </main>
    </div>
  )
}
