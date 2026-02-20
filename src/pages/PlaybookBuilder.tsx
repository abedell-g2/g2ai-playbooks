import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ReactFlowProvider } from '@xyflow/react'
import { ArrowLeft, Share2, Save } from 'lucide-react'
import ToolSidebar from '../components/playbook/ToolSidebar'
import PlaybookCanvas from '../components/playbook/PlaybookCanvas'
import ThemeToggle from '../components/ui/ThemeToggle'

interface PlaybookBuilderProps {
  dark: boolean
  onToggle: () => void
}

export default function PlaybookBuilder({ dark, onToggle }: PlaybookBuilderProps) {
  const [title, setTitle] = useState('My AI Playbook')
  const [editing, setEditing] = useState(false)

  return (
    <div className="h-screen flex flex-col bg-[var(--g2-bg)] overflow-hidden">
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
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--g2-orange)]">
            <svg width="12" height="14" viewBox="0 0 14 16" fill="none" aria-hidden="true">
              <path d="M7.5 8H10.5V10.5C9.6 11.4 8.4 12 7 12C4.2 12 2 9.8 2 7C2 4.2 4.2 2 7 2C8.4 2 9.65 2.55 10.55 3.45L12.3 1.7C11 0.65 9.08 0 7 0C3.13 0 0 3.13 0 7C0 10.87 3.13 14 7 14C10.12 14 12.72 12.08 13.66 9.4L13.82 8.96V6H7.5V8Z" fill="white"/>
            </svg>
          </span>
          <span className="text-[14px] font-bold text-[var(--g2-dark)]">
            G2<span className="text-[var(--g2-purple)]">.ai</span>
          </span>
        </div>

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
              className="text-[14px] font-semibold text-[var(--g2-dark)] hover:text-[var(--g2-purple)] transition-colors"
              aria-label="Edit playbook title"
            >
              {title}
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
          <PlaybookCanvas />
        </ReactFlowProvider>
      </div>
    </div>
  )
}
