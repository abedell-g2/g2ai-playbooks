import { useState, useRef, useEffect } from 'react'
import { Sparkles } from 'lucide-react'

export interface PlaybookMeta {
  title: string
  description: string
  company: string
}

interface PlaybookWelcomeModalProps {
  onSubmit: (meta: PlaybookMeta) => void
}

export default function PlaybookWelcomeModal({ onSubmit }: PlaybookWelcomeModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [company, setCompany] = useState('')
  const titleRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  const canSubmit = title.trim().length > 0

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    onSubmit({ title: title.trim(), description: description.trim(), company: company.trim() })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-heading"
    >
      <div className="w-full max-w-[480px] rounded-2xl border border-[var(--g2-border)] bg-[var(--g2-surface)] shadow-2xl p-8 flex flex-col gap-6">

        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--g2-purple-light)]">
              <Sparkles size={15} className="text-[var(--g2-purple)]" />
            </span>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--g2-muted)]">
              G2.AI Playbooks
            </p>
          </div>
          <h1 id="welcome-heading" className="text-[22px] font-black text-[var(--g2-dark)]">
            Share your AI Playbook
          </h1>
          <p className="text-[13.5px] text-[var(--g2-muted)] leading-relaxed">
            Show the world how your team uses AI — from the tools you rely on to how they connect.
            Help other software professionals discover what's working.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="pb-title" className="text-[12px] font-semibold text-[var(--g2-dark)]">
              Playbook title <span className="text-[var(--g2-orange)]">*</span>
            </label>
            <input
              ref={titleRef}
              id="pb-title"
              type="text"
              placeholder="e.g. Our Content Marketing AI Stack"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl border border-[var(--g2-border)] bg-[var(--g2-bg)] px-4 py-2.5 text-[13.5px] text-[var(--g2-dark)] placeholder:text-[var(--g2-muted)] outline-none focus:border-[var(--g2-purple)] transition-colors"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="pb-company" className="text-[12px] font-semibold text-[var(--g2-dark)]">
              Company
            </label>
            <input
              id="pb-company"
              type="text"
              placeholder="e.g. Acme Inc."
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="rounded-xl border border-[var(--g2-border)] bg-[var(--g2-bg)] px-4 py-2.5 text-[13.5px] text-[var(--g2-dark)] placeholder:text-[var(--g2-muted)] outline-none focus:border-[var(--g2-purple)] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="pb-description" className="text-[12px] font-semibold text-[var(--g2-dark)]">
              Description
            </label>
            <textarea
              id="pb-description"
              placeholder="Briefly describe what this playbook covers and who it's for..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="rounded-xl border border-[var(--g2-border)] bg-[var(--g2-bg)] px-4 py-2.5 text-[13.5px] text-[var(--g2-dark)] placeholder:text-[var(--g2-muted)] outline-none focus:border-[var(--g2-purple)] transition-colors resize-none"
            />
          </div>

          {/* Author */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[var(--g2-border)] bg-[var(--g2-bg)]">
            <img
              src="https://media.licdn.com/dms/image/v2/C5603AQF2xPA_A5YPIg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1653323249034?e=2147483647&v=beta&t=cQ2tQFG2kS-Z38clCSkC6fuw3ANhg6p9FpM9HJtb19Y"
              alt="Godard Abel"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-[var(--g2-border)] shrink-0"
            />
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-[var(--g2-dark)]">Godard Abel</p>
              <p className="text-[12px] text-[var(--g2-muted)]">CEO @ G2</p>
            </div>
            <span className="ml-auto text-[11px] font-semibold text-[var(--g2-purple)] bg-[var(--g2-purple-light)] px-2.5 py-1 rounded-full shrink-0">
              Author
            </span>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-1 w-full py-3 rounded-full bg-[var(--g2-purple)] text-white text-[13.5px] font-semibold hover:bg-purple-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Start Building
          </button>
        </form>

      </div>
    </div>
  )
}
