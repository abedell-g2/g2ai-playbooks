import { useState, useRef, useEffect } from 'react'
import { Link2 } from 'lucide-react'

export interface ConnectionMeta {
  name: string
  description: string
}

interface ConnectionModalProps {
  onSubmit: (meta: ConnectionMeta) => void
  onSkip: () => void
}

export default function ConnectionModal({ onSubmit, onSkip }: ConnectionModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({ name: name.trim(), description: description.trim() })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="conn-heading"
    >
      <div className="w-full max-w-[420px] rounded-2xl border border-[var(--g2-border)] bg-[var(--g2-surface)] shadow-2xl p-7 flex flex-col gap-5">

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--g2-purple-light)]">
              <Link2 size={14} className="text-[var(--g2-purple)]" />
            </span>
            <h2 id="conn-heading" className="text-[17px] font-black text-[var(--g2-dark)]">
              Name this connection
            </h2>
          </div>
          <p className="text-[13px] text-[var(--g2-muted)] leading-relaxed">
            Describe how these tools work together in your workflow.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="conn-name" className="text-[12px] font-semibold text-[var(--g2-dark)]">
              Connection name
            </label>
            <input
              ref={inputRef}
              id="conn-name"
              type="text"
              placeholder="e.g. Content Generation Pipeline"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl border border-[var(--g2-border)] bg-[var(--g2-bg)] px-4 py-2.5 text-[13.5px] text-[var(--g2-dark)] placeholder:text-[var(--g2-muted)] outline-none focus:border-[var(--g2-purple)] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="conn-desc" className="text-[12px] font-semibold text-[var(--g2-dark)]">
              How do you use these together?
            </label>
            <textarea
              id="conn-desc"
              placeholder="Describe the workflow between these tools..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="rounded-xl border border-[var(--g2-border)] bg-[var(--g2-bg)] px-4 py-2.5 text-[13.5px] text-[var(--g2-dark)] placeholder:text-[var(--g2-muted)] outline-none focus:border-[var(--g2-purple)] transition-colors resize-none"
            />
          </div>

          <div className="flex gap-2.5 mt-1">
            <button
              type="button"
              onClick={onSkip}
              className="flex-1 py-2.5 rounded-full border border-[var(--g2-border)] text-[var(--g2-text)] text-[13px] font-semibold hover:border-[var(--g2-purple)] hover:text-[var(--g2-purple)] transition-colors"
            >
              Skip
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-full bg-[var(--g2-purple)] text-white text-[13px] font-semibold hover:bg-purple-700 transition-colors"
            >
              Save Connection
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}
