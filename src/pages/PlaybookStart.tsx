import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mic, Pause, ArrowRight, ArrowLeft, X, Plus, Search, TrendingDown, AlertTriangle, Sparkles } from 'lucide-react'
import G2Logo from '../components/ui/G2Logo'
import ToolLogo from '../components/ui/ToolLogo'
import { PRODUCTS, getProductById } from '../data/searchData'
import { useDemo } from '../context/DemoContext'

const SpeechRecognitionAPI =
  typeof window !== 'undefined'
    ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    : null

function extractToolIds(text: string): string[] {
  const q = text.toLowerCase()
  const found: string[] = []
  for (const p of PRODUCTS) {
    if (q.includes(p.name.toLowerCase()) || p.tags.some((t) => q.includes(t))) {
      if (!found.includes(p.id)) found.push(p.id)
    }
  }
  return found
}

// ── Shared tool chip list with inline add dropdown ──────────────────────────

interface ToolChipListProps {
  toolIds: string[]
  onRemove: (id: string) => void
  onAdd: (id: string) => void
  dark: boolean
}

function ToolChipList({ toolIds, onRemove, onAdd, dark }: ToolChipListProps) {
  const [addOpen, setAddOpen] = useState(false)
  const [addQuery, setAddQuery] = useState('')
  const addRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!addOpen) return
    function handleClick(e: MouseEvent) {
      if (addRef.current && !addRef.current.contains(e.target as Node)) {
        setAddOpen(false)
        setAddQuery('')
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [addOpen])

  const available = PRODUCTS.filter(
    (p) =>
      !toolIds.includes(p.id) &&
      (addQuery === '' ||
        p.name.toLowerCase().includes(addQuery.toLowerCase()) ||
        p.tags.some((t) => t.includes(addQuery.toLowerCase())))
  )

  return (
    <div className="w-full">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--g2-muted)] mb-3">
        AI Tools Found
      </p>
      <div className="flex flex-wrap gap-2 items-center">
        {toolIds.map((id) => {
          const p = getProductById(id)
          if (!p) return null
          return (
            <span
              key={id}
              className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1.5 rounded-full border border-[var(--g2-border)] bg-[var(--g2-surface)] text-[12.5px] font-medium text-[var(--g2-dark)]"
            >
              <ToolLogo domain={p.domain} name={p.name} size={18} />
              {p.name}
              <button
                onClick={() => onRemove(id)}
                className="ml-0.5 text-[var(--g2-muted)] hover:text-[var(--g2-dark)] transition-colors"
                aria-label={`Remove ${p.name}`}
              >
                <X size={11} />
              </button>
            </span>
          )
        })}

        {/* Add tool button + dropdown */}
        <div ref={addRef} className="relative">
          <button
            onClick={() => { setAddOpen((v) => !v); setAddQuery('') }}
            aria-label="Add a tool"
            className="w-[34px] h-[34px] rounded-full border-2 border-dashed border-[var(--g2-border)] text-[var(--g2-muted)] hover:border-[var(--g2-purple)] hover:text-[var(--g2-purple)] flex items-center justify-center transition-colors"
          >
            <Plus size={15} />
          </button>

          {addOpen && (
            <div
              className="absolute left-0 top-[calc(100%+8px)] z-50 w-60 rounded-xl border border-[var(--g2-border)] shadow-xl overflow-hidden"
              style={{ background: dark ? '#16132b' : 'var(--g2-bg)' }}
            >
              {/* Search input */}
              <div
                className="flex items-center gap-2 px-3 py-2.5 border-b border-[var(--g2-border)]"
              >
                <Search size={13} className="shrink-0 text-[var(--g2-muted)]" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search tools…"
                  value={addQuery}
                  onChange={(e) => setAddQuery(e.target.value)}
                  className="flex-1 bg-transparent text-[13px] text-[var(--g2-dark)] placeholder:text-[var(--g2-muted)] outline-none"
                />
              </div>
              {/* Results */}
              <div className="max-h-52 overflow-y-auto py-1">
                {available.length > 0 ? (
                  available.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => { onAdd(p.id); setAddOpen(false); setAddQuery('') }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-[var(--g2-muted)] hover:text-[var(--g2-dark)] hover:bg-[var(--g2-border)]/40 transition-colors"
                    >
                      <ToolLogo domain={p.domain} name={p.name} size={20} />
                      <span className="font-medium">{p.name}</span>
                    </button>
                  ))
                ) : (
                  <p className="px-3 py-4 text-[12px] text-[var(--g2-muted)] text-center">
                    No tools found
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Model B: Optimization insights panel ─────────────────────────────────────

function OptimizationInsights({ toolIds }: { toolIds: string[] }) {
  const savingsCount = Math.min(Math.max(toolIds.length - 1, 1), 3)
  const hasRedundancy = toolIds.length >= 3

  return (
    <div className="w-full rounded-2xl border border-[var(--g2-purple)]/25 bg-[var(--g2-purple)]/5 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-[var(--g2-purple)]" />
          <span className="text-[13px] font-bold text-[var(--g2-dark)]">
            G2.AI Optimization Preview
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--g2-purple)]/10 text-[var(--g2-purple)]">
          BETA
        </span>
      </div>
      <p className="text-[12px] text-[var(--g2-muted)] mb-4 leading-relaxed">
        Publish your playbook to unlock your full AI stack audit.
      </p>

      {/* Insight cards */}
      <div className="flex flex-col gap-2.5">

        {/* Cost savings */}
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[var(--g2-surface)] border border-[var(--g2-border)]">
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
            <TrendingDown size={14} className="text-emerald-500" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[var(--g2-dark)]">
              {savingsCount} cheaper alternative{savingsCount !== 1 ? 's' : ''} found
            </p>
            <p className="text-[12px] text-[var(--g2-muted)] mt-0.5">
              Tools with similar features at a lower cost, based on your stack.
            </p>
          </div>
        </div>

        {/* Redundancy (only shown when 3+ tools detected) */}
        {hasRedundancy && (
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[var(--g2-surface)] border border-[var(--g2-border)]">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
              <AlertTriangle size={14} className="text-amber-500" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[var(--g2-dark)]">
                1 potential redundancy detected
              </p>
              <p className="text-[12px] text-[var(--g2-muted)] mt-0.5">
                Two tools in your stack have significant feature overlap.
              </p>
            </div>
          </div>
        )}

        {/* Emerging tools */}
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[var(--g2-surface)] border border-[var(--g2-border)]">
          <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
            <Sparkles size={14} className="text-blue-500" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[var(--g2-dark)]">
              3 emerging tools in your category
            </p>
            <p className="text-[12px] text-[var(--g2-muted)] mt-0.5">
              Tools gaining momentum that could enhance your workflow.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

// ── Main page ────────────────────────────────────────────────────────────────

interface Props {
  dark: boolean
}

export default function PlaybookStart({ dark }: Props) {
  const { model } = useDemo()
  const navigate = useNavigate()
  const [step, setStep] = useState<1 | 2>(1)

  // Step 1 — voice
  const supported = !!SpeechRecognitionAPI
  const [recording, setRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [interim, setInterim] = useState('')
  const [toolIds, setToolIds] = useState<string[]>([])
  const recognitionRef = useRef<any>(null)
  const transcriptBaseRef = useRef('')

  // Step 2 — author (pre-populated for logged-in user)
  const [author, setAuthor] = useState('Godard Abel')
  const [authorRole, setAuthorRole] = useState('CEO')
  const [company, setCompany] = useState('G2')
  const [linkedin, setLinkedin] = useState('https://www.linkedin.com/in/godardabel/')

  useEffect(() => {
    setToolIds(extractToolIds(transcript))
  }, [transcript])

  function toggleRecording() {
    if (recording) {
      recognitionRef.current?.stop()
      return
    }

    transcriptBaseRef.current = transcript

    const recognition = new SpeechRecognitionAPI()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onresult = (event: any) => {
      let finalPart = ''
      let interimPart = ''
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) finalPart += event.results[i][0].transcript + ' '
        else interimPart += event.results[i][0].transcript
      }
      setTranscript(transcriptBaseRef.current + finalPart)
      setInterim(interimPart)
    }

    recognition.onend = () => { setRecording(false); setInterim('') }
    recognition.onerror = () => { setRecording(false); setInterim('') }

    recognitionRef.current = recognition
    recognition.start()
    setRecording(true)
  }

  function addTool(id: string) {
    setToolIds((ids) => (ids.includes(id) ? ids : [...ids, id]))
  }
  function removeTool(id: string) {
    setToolIds((ids) => ids.filter((i) => i !== id))
  }

  function handleBuild() {
    const title = company
      ? `${company} AI Playbook`
      : author
      ? `${author}'s AI Playbook`
      : 'My AI Playbook'
    navigate('/playbook/new', {
      state: { toolIds, title, author, authorRole, company, linkedin },
    })
  }

  const canContinue = transcript.trim().length > 5 || toolIds.length > 0
  const canBuild = author.trim().length > 0

  const inputBase =
    'rounded-xl border px-4 py-2.5 text-[13.5px] text-[var(--g2-dark)] placeholder:text-[var(--g2-muted)] outline-none focus:border-[var(--g2-purple)] transition-colors w-full'
  const inputStyle = {
    background: dark ? '#1e1b36' : 'var(--g2-bg)',
    borderColor: dark ? '#4a4570' : 'var(--g2-border)',
  }

  return (
    <div className="min-h-screen bg-[var(--g2-bg)] flex flex-col">

      {/* Top bar */}
      <header className="h-14 shrink-0 flex items-center px-6 border-b border-[var(--g2-border)] bg-[var(--g2-bg)]">
        <button
          onClick={() => (step === 2 ? setStep(1) : navigate('/'))}
          className="flex items-center gap-1.5 text-[13px] font-medium text-[var(--g2-muted)] hover:text-[var(--g2-purple)] transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="flex-1 flex justify-center">
          <G2Logo className="h-6 w-auto" />
        </div>

        {/* Step pill indicators */}
        <div className="flex items-center gap-1.5">
          <div className={`h-2 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-[var(--g2-purple)] w-5' : 'bg-[var(--g2-border)] w-2'}`} />
          <div className={`h-2 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-[var(--g2-purple)] w-5' : 'bg-[var(--g2-border)] w-2'}`} />
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 flex items-start justify-center px-6 py-16">
        <div className="w-full max-w-[540px]">

          {/* ── Step 1: Voice ── */}
          {step === 1 && (
            <div className="flex flex-col items-center gap-4">

              <div className="w-full">
                <p className="text-[12px] font-semibold uppercase tracking-widest text-white/60 mb-3">
                  Step 1 of 2
                </p>
                <h1 className="text-[30px] font-black text-[var(--g2-dark)] mb-2">
                  Describe your AI workflow
                </h1>
                <p className="text-[15px] text-white/70 leading-relaxed">
                  {supported
                    ? "Hit the microphone icon, describe how you use AI in your normal workflow and we'll detect the tools automatically."
                    : "Type out how you use AI in your normal workflow and we'll detect the tools automatically."}
                </p>
              </div>

              {/* Mic button with pulse rings */}
              {supported && (
                <div className="relative flex items-center justify-center w-52 h-52">
                  {recording && (
                    <>
                      <span className="absolute inset-0 rounded-full bg-[var(--g2-purple)]/20 animate-ping" />
                      <span
                        className="absolute rounded-full bg-[var(--g2-purple)]/10 animate-ping"
                        style={{ inset: '-14px', animationDelay: '0.35s' }}
                      />
                    </>
                  )}
                  <button
                    onClick={toggleRecording}
                    aria-label={recording ? 'Stop recording' : 'Start recording'}
                    className={`relative z-10 w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                      recording
                        ? 'bg-[var(--g2-purple)] text-white shadow-2xl shadow-[var(--g2-purple)]/50 scale-110'
                        : 'bg-[var(--g2-purple)]/15 border-2 border-[var(--g2-purple)]/60 text-[var(--g2-purple)] hover:bg-[var(--g2-purple)]/25 hover:border-[var(--g2-purple)] hover:scale-105'
                    }`}
                  >
                    {recording ? <Pause size={36} /> : <Mic size={36} />}
                  </button>
                </div>
              )}

              {/* Mic status label */}
              {supported && (
                <p className={`-mt-6 text-[13px] font-medium transition-colors ${recording ? 'text-[var(--g2-purple)]' : 'text-white/50'}`}>
                  {recording ? 'Listening…' : transcript ? 'Click microphone to add more' : 'Click microphone to start speaking'}
                </p>
              )}

              {/* Transcript textarea */}
              <div className="w-full flex flex-col gap-1.5 mt-4">
                <textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  placeholder={
                    supported
                      ? 'Your words will appear here as you speak…'
                      : 'e.g. "We use Claude for writing, Cursor for coding, and Perplexity for research…"'
                  }
                  rows={4}
                  className="w-full rounded-xl border px-4 py-3 text-[14px] text-[var(--g2-dark)] placeholder:text-[var(--g2-muted)] outline-none focus:border-[var(--g2-purple)] transition-colors resize-none leading-relaxed"
                  style={{
                    background: dark ? '#1e1b36' : 'var(--g2-surface)',
                    borderColor: recording ? 'var(--g2-purple)' : dark ? '#4a4570' : 'var(--g2-border)',
                  }}
                />
                {interim && recording && (
                  <p className="text-[13px] text-[var(--g2-muted)] italic px-1">{interim}…</p>
                )}
              </div>

              {/* Tool chips — shown once user has started */}
              {(transcript.trim().length > 0 || toolIds.length > 0) && (
                <ToolChipList
                  toolIds={toolIds}
                  onRemove={removeTool}
                  onAdd={addTool}
                  dark={dark}
                />
              )}

              {/* Model B: Optimization preview — shown when tools detected */}
              {model === 'B' && toolIds.length > 0 && (
                <OptimizationInsights toolIds={toolIds} />
              )}

              {/* Continue */}
              <div className="w-full pt-2 flex flex-col items-center gap-3">
                <button
                  onClick={() => setStep(2)}
                  disabled={!canContinue}
                  className="w-full py-3.5 rounded-full bg-[var(--g2-purple)] text-white text-[14px] font-semibold hover:bg-[#7060c8] transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Continue
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => navigate('/playbook/new')}
                  className="text-[14px] text-white/50 hover:text-white transition-colors cursor-pointer"
                >
                  No thanks, I'll build it myself
                </button>
              </div>

            </div>
          )}

          {/* ── Step 2: Author info ── */}
          {step === 2 && (
            <div className="flex flex-col gap-7">

              <div>
                <p className="text-[12px] font-semibold uppercase tracking-widest text-white/60 mb-3">
                  Step 2 of 2
                </p>
                <h1 className="text-[30px] font-black text-[var(--g2-dark)] mb-2">
                  A little about you
                </h1>
                <p className="text-[15px] text-white/70 leading-relaxed">
                  This helps others know whose playbook they're learning from.
                </p>
              </div>

              {/* Same tool chip list — editable in step 2 too */}
              <ToolChipList
                toolIds={toolIds}
                onRemove={removeTool}
                onAdd={addTool}
                dark={dark}
              />

              {/* Profile fields — pre-populated */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="s2-author" className="text-[12px] font-semibold text-[var(--g2-dark)]">
                    Full name <span className="text-[var(--g2-orange)]">*</span>
                  </label>
                  <input
                    id="s2-author"
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className={inputBase}
                    style={inputStyle}
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label htmlFor="s2-role" className="text-[12px] font-semibold text-[var(--g2-dark)]">
                      Title / Role
                    </label>
                    <input
                      id="s2-role"
                      type="text"
                      value={authorRole}
                      onChange={(e) => setAuthorRole(e.target.value)}
                      className={inputBase}
                      style={inputStyle}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label htmlFor="s2-company" className="text-[12px] font-semibold text-[var(--g2-dark)]">
                      Company
                    </label>
                    <input
                      id="s2-company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className={inputBase}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="s2-linkedin" className="text-[12px] font-semibold text-[var(--g2-dark)]">
                    LinkedIn profile URL
                  </label>
                  <input
                    id="s2-linkedin"
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className={inputBase}
                    style={inputStyle}
                  />
                </div>
              </div>

              <button
                onClick={handleBuild}
                disabled={!canBuild}
                className="w-full py-3.5 rounded-full bg-[var(--g2-purple)] text-white text-[14px] font-semibold hover:bg-[#7060c8] transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Build your Playbook
                <ArrowRight size={16} />
              </button>

            </div>
          )}

        </div>
      </main>
    </div>
  )
}
