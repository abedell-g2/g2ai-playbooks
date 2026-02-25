import { useState, useRef, useEffect } from 'react'
import { Link, useSearchParams, useLocation } from 'react-router-dom'
import { useDemo } from '../context/DemoContext'
import { ReactFlowProvider } from '@xyflow/react'
import { ArrowLeft, Share2, Save } from 'lucide-react'
import ToolSidebar, { type AITool } from '../components/playbook/ToolSidebar'
import PlaybookCanvas, { type RemixTool } from '../components/playbook/PlaybookCanvas'
import ThemeToggle from '../components/ui/ThemeToggle'
import G2Logo from '../components/ui/G2Logo'
import PlaybookWelcomeModal, { type PlaybookMeta } from '../components/playbook/PlaybookWelcomeModal'
import { getPlaybookById, getProductById, type ProductData } from '../data/searchData'

interface PlaybookBuilderProps {
  dark: boolean
  onToggle: () => void
}

function productToAITool(product: ProductData): AITool {
  return {
    id: product.id,
    name: product.name,
    domain: product.domain,
    category: product.category,
    description: product.shortDescription,
  }
}

interface StartState {
  toolIds?: string[]
  title?: string
  author?: string
  authorRole?: string
  company?: string
  linkedin?: string
}

export default function PlaybookBuilder({ dark, onToggle }: PlaybookBuilderProps) {
  const { model, openLoginModal } = useDemo()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const remixId = searchParams.get('remix')

  // State passed from the PlaybookStart onboarding flow
  const startState = (location.state as StartState | null) ?? null

  // Resolve remix data at render time (stable — remixId doesn't change)
  const remixPlaybook = remixId ? getPlaybookById(remixId) : undefined
  const remixTools: RemixTool[] | undefined = remixPlaybook
    ? (remixPlaybook.steps
        .map((step) => {
          const product = getProductById(step.toolId)
          return product ? { tool: productToAITool(product), action: step.action } : null
        })
        .filter(Boolean) as RemixTool[])
    : undefined

  // Tools pre-populated from the voice onboarding
  const startTools: RemixTool[] | undefined = startState?.toolIds?.length
    ? (startState.toolIds
        .map((id) => {
          const product = getProductById(id)
          return product ? { tool: productToAITool(product), action: '' } : null
        })
        .filter(Boolean) as RemixTool[])
    : undefined

  const initialTools = startTools ?? remixTools

  const [showModal, setShowModal] = useState(!remixPlaybook && !startState)
  const [title, setTitle] = useState(
    startState?.title ?? (remixPlaybook ? `Remix: ${remixPlaybook.title}` : '')
  )
  const [editing, setEditing] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [menuOpen])

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
          {/* Avatar + profile dropdown (authenticated) or Log-in button (demo A/B) */}
          {model === 'auth' ? (
            <div ref={menuRef} className="relative shrink-0">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="block rounded-full focus-visible:outline-2 focus-visible:outline-[var(--g2-purple)]"
                aria-label="Open profile menu"
                aria-expanded={menuOpen}
              >
                <img
                  src="https://media.licdn.com/dms/image/v2/C5603AQF2xPA_A5YPIg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1653323249034?e=2147483647&v=beta&t=cQ2tQFG2kS-Z38clCSkC6fuw3ANhg6p9FpM9HJtb19Y"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-[var(--g2-border)]"
                />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-[calc(100%+10px)] w-56 rounded-xl border border-[var(--g2-border)] bg-[var(--g2-bg)] shadow-lg shadow-black/10 py-1 z-50">
                  <div className="px-4 pt-3 pb-2">
                    <p className="text-[13px] font-semibold text-[var(--g2-dark)]">Hi, Godard!</p>
                  </div>
                  <div className="h-px bg-[var(--g2-border)] mx-2 mb-1" />
                  {[
                    { label: 'My Playbooks', href: '#' },
                    { label: 'My Profile',   href: '#' },
                    { label: 'Account Settings', href: '#' },
                  ].map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="flex items-center px-4 py-2 text-[13px] text-[var(--g2-muted)] hover:text-[var(--g2-dark)] hover:bg-[var(--g2-border)]/40 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </a>
                  ))}
                  <div className="h-px bg-[var(--g2-border)] mx-2 mt-1 mb-2" />
                  <div className="flex items-center justify-between px-4 py-2">
                    <span className="text-[13px] text-[var(--g2-muted)]">UI Theme</span>
                    <ThemeToggle dark={dark} onToggle={onToggle} />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={openLoginModal}
              className="shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--g2-purple)] text-white text-[12.5px] font-semibold hover:bg-[#7060c8] transition-colors"
            >
              Log-in / Contribute
            </button>
          )}
        </div>
      </header>

      {/* Builder layout */}
      <div className="flex flex-1 overflow-hidden">
        <ToolSidebar />
        <ReactFlowProvider>
          <PlaybookCanvas dark={dark} initialTools={initialTools} />
        </ReactFlowProvider>
      </div>
    </div>
  )
}
