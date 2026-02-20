import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ReactFlowProvider } from '@xyflow/react'
import { ArrowLeft, Share2, Save } from 'lucide-react'
import ToolSidebar from '../components/playbook/ToolSidebar'
import PlaybookCanvas from '../components/playbook/PlaybookCanvas'
import ThemeToggle from '../components/ui/ThemeToggle'
import G2Logo from '../components/ui/G2Logo'
import PlaybookWelcomeModal, { type PlaybookMeta } from '../components/playbook/PlaybookWelcomeModal'

interface PlaybookBuilderProps {
  dark: boolean
  onToggle: () => void
}

export default function PlaybookBuilder({ dark, onToggle }: PlaybookBuilderProps) {
  const [showModal, setShowModal] = useState(true)
  const [title, setTitle] = useState('')
  const [editing, setEditing] = useState(false)

  function handleModalSubmit(meta: PlaybookMeta) {
    setTitle(meta.title)
    setShowModal(false)
  }

  return (
    <div className="h-screen flex flex-col bg-[var(--g2-bg)] overflow-hidden">
      {showModal && <PlaybookWelcomeModal onSubmit={handleModalSubmit} />}
      {/* Top bar */}
      <header className="h-14 shrink-0 flex items-center gap-4 px-4 border-b border-[var(--g2-border)] bg-[var(--g2-bg)]">
        {/* Back */}
        <Link
          to="/"
          className="flex items-center gap-1.5 text-[13px] font-medium text-[var(--g2-muted)] hover:text-[var(--g2-purple)] transition-colors shrink-0"
          aria-label="Back to homepage"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Back</span>
        </Link>

        {/* G2.AI logo */}
        <G2Logo className="h-6 w-auto shrink-0" />

        {/* Editable playbook title */}
        <div className="flex-1 flex justify-center">
          {editing ? (
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setEditing(false)}
              onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
              className="text-[14px] font-semibold text-[var(--g2-dark)] bg-transparent border-b-2 border-[var(--g2-purple)] outline-none text-center w-64"
              aria-label="Playbook title"
            />
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="text-[14px] font-semibold hover:text-[var(--g2-purple)] transition-colors"
              style={{ color: title ? 'var(--g2-dark)' : 'var(--g2-muted)' }}
              aria-label="Edit playbook title"
            >
              {title || 'Untitled Playbook'}
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--g2-border)] text-[12.5px] font-semibold text-[var(--g2-text)] hover:border-[var(--g2-purple)] hover:text-[var(--g2-purple)] transition-colors">
            <Share2 size={13} />
            <span className="hidden sm:inline">Share</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--g2-purple)] text-white text-[12.5px] font-semibold hover:bg-purple-700 transition-colors">
            <Save size={13} />
            <span className="hidden sm:inline">Save</span>
          </button>
          <ThemeToggle dark={dark} onToggle={onToggle} />
        </div>
      </header>

      {/* Builder layout */}
      <div className="flex flex-1 overflow-hidden">
        <ToolSidebar />
        <ReactFlowProvider>
          <PlaybookCanvas dark={dark} />
        </ReactFlowProvider>
      </div>
    </div>
  )
}
