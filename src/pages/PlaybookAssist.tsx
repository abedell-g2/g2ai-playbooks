import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, Mic, Pause, Check,
  PenLine, Search, Mail, Code2, Zap, ImageIcon,
  BarChart2, MessageCircle, Users,
} from 'lucide-react'
import G2Logo from '../components/ui/G2Logo'
import { useDemo } from '../context/DemoContext'

const SpeechRecognitionAPI =
  typeof window !== 'undefined'
    ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    : null

// ── Focus areas ───────────────────────────────────────────────────────────────

const FOCUS_AREAS = [
  { id: 'writing',    label: 'Writing & Content',   Icon: PenLine },
  { id: 'research',   label: 'Research & Analysis', Icon: Search },
  { id: 'outreach',   label: 'Outreach & Sales',    Icon: Mail },
  { id: 'coding',     label: 'Coding & Dev',        Icon: Code2 },
  { id: 'meetings',   label: 'Meetings & Notes',    Icon: Mic },
  { id: 'automation', label: 'Automation & Ops',    Icon: Zap },
  { id: 'creative',   label: 'Creative & Design',   Icon: ImageIcon },
  { id: 'data',       label: 'Data & Analytics',    Icon: BarChart2 },
  { id: 'support',    label: 'Customer Support',    Icon: MessageCircle },
  { id: 'recruiting', label: 'Recruiting & HR',     Icon: Users },
]

// ── Context questions ─────────────────────────────────────────────────────────

const CTX_QUESTIONS = [
  { id: 'teamSize', label: 'Team size',      options: ['Just me', 'Small team (2–10)', 'Mid-size (11–50)', 'Enterprise'] },
  { id: 'goal',     label: 'Primary goal',   options: ['Save time', 'Cut costs', 'Improve quality', 'Scale output'] },
  { id: 'budget',   label: 'Monthly budget', options: ['Free only', 'Under $50', '$50–$200', 'No limit'] },
]

// ── Tool recommendations ──────────────────────────────────────────────────────

const AREA_TOOLS: Record<string, string[]> = {
  writing:    ['claude', 'chatgpt', 'jasper', 'grammarly', 'writesonic'],
  research:   ['perplexity', 'elicit', 'consensus', 'claude', 'you-com'],
  outreach:   ['apollo', 'lavender', 'superhuman', 'chatgpt', '6sense'],
  coding:     ['cursor', 'copilot', 'windsurf', 'claude', 'codeium'],
  meetings:   ['otter-ai', 'fireflies-ai', 'gong', 'notion-ai', 'loom'],
  automation: ['zapier-ai', 'make', 'n8n', 'bardeen', 'reclaim-ai'],
  creative:   ['midjourney', 'canva-ai', 'runway', 'adobe-firefly', 'figma'],
  data:       ['julius-ai', 'hex', 'tableau-ai', 'chatgpt', 'perplexity'],
  support:    ['intercom', 'drift', 'tidio', 'claude', 'gong'],
  recruiting: ['eightfold-ai', 'paradox-ai', 'chatgpt', 'notion-ai', 'otter-ai'],
}

function recommendTools(areas: string[]): string[] {
  const seen = new Set<string>()
  const result: string[] = []
  for (const area of areas) {
    for (const id of (AREA_TOOLS[area] ?? []).slice(0, 2)) {
      if (!seen.has(id)) { seen.add(id); result.push(id) }
      if (result.length >= 6) return result
    }
  }
  return result
}

function generateTitle(areas: string[]): string {
  if (areas.length === 0) return 'My AI Playbook'
  const first = FOCUS_AREAS.find(f => f.id === areas[0])?.label ?? areas[0]
  const second = areas[1] ? FOCUS_AREAS.find(f => f.id === areas[1])?.label : null
  return second ? `${first} & ${second} Playbook` : `${first} Playbook`
}

// ── Stacked Card ──────────────────────────────────────────────────────────────

interface CardProps {
  stepLabel: string
  title: string
  subtitle: string
  isActive: boolean
  isDone: boolean
  doneSummary: string
  onEdit: () => void
  onContinue: () => void
  continueLabel: string
  canContinue: boolean
  children: React.ReactNode
  dark: boolean
}

function StackedCard({
  stepLabel, title, subtitle,
  isActive, isDone, doneSummary, onEdit,
  onContinue, continueLabel, canContinue,
  children, dark,
}: CardProps) {
  if (!isActive && !isDone) return null

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{
        animation: 'cardReveal 0.65s cubic-bezier(0.16,1,0.3,1) both',
        background: dark ? '#1e1b36' : 'white',
        borderColor: dark ? '#4a4570' : '#e5e3f0',
        borderWidth: '1.5px',
      }}
    >
      {isDone ? (
        /* ── Collapsed summary ── */
        <div className="flex items-center gap-3.5 px-5 py-4">
          <div className="w-7 h-7 rounded-full bg-[var(--g2-purple)] flex items-center justify-center shrink-0">
            <Check size={13} strokeWidth={2.5} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--g2-muted)] mb-0.5">
              {stepLabel}
            </p>
            <p className="text-[13px] font-medium text-[var(--g2-dark)] truncate">{doneSummary}</p>
          </div>
          <button
            onClick={onEdit}
            className="shrink-0 text-[12px] font-semibold text-[var(--g2-muted)] border border-[var(--g2-border)] rounded-full px-3.5 py-1.5 hover:border-[var(--g2-purple)] hover:text-[var(--g2-purple)] transition-colors"
          >
            Edit
          </button>
        </div>
      ) : (
        /* ── Active form ── */
        <div className="p-7">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--g2-muted)] mb-1.5">
            {stepLabel}
          </p>
          <h2 className="text-[22px] font-black text-[var(--g2-dark)] leading-tight mb-1.5">
            {title}
          </h2>
          <p className="text-[14px] text-[var(--g2-muted)] leading-relaxed mb-6">
            {subtitle}
          </p>
          {children}
          <div className="flex justify-end pt-5">
            <button
              onClick={onContinue}
              disabled={!canContinue}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--g2-purple)] text-white text-[14px] font-semibold hover:bg-[#7060c8] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {continueLabel}
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function Connector({ visible }: { visible: boolean }) {
  return (
    <div
      className="w-0.5 h-6 mx-auto rounded-full transition-opacity duration-500"
      style={{
        opacity: visible ? 1 : 0,
        background: 'linear-gradient(to bottom, #c4bbf0, #e5e3f0)',
      }}
    />
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

interface Props {
  dark: boolean
}

export default function PlaybookAssist({ dark }: Props) {
  const { model } = useDemo()
  const navigate = useNavigate()
  const supported = !!SpeechRecognitionAPI

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [maxStep, setMaxStep] = useState<1 | 2 | 3>(1)

  // Step 1: Problem
  const [problem, setProblem] = useState('')
  const [recording, setRecording] = useState(false)
  const [interim, setInterim] = useState('')
  const recognitionRef = useRef<any>(null)
  const problemBaseRef = useRef('')

  // Step 2: Focus areas
  const [areas, setAreas] = useState<string[]>([])

  // Step 3: Context
  const [context, setContext] = useState<Record<string, string>>({})

  function advance(next: 2 | 3 | 'done') {
    if (next === 'done') {
      navigate('/playbook/new', {
        state: {
          toolIds: recommendTools(areas),
          title: generateTitle(areas),
          author: model === 'auth' ? 'Godard Abel' : '',
          authorRole: model === 'auth' ? 'CEO' : '',
          company: model === 'auth' ? 'G2' : '',
          linkedin: model === 'auth' ? 'https://www.linkedin.com/in/godardabel/' : '',
        },
      })
      return
    }
    setMaxStep(prev => (next > prev ? next : prev) as 1 | 2 | 3)
    setStep(next)
  }

  // Voice recording
  function toggleRecording() {
    if (recording) {
      recognitionRef.current?.stop()
      return
    }
    problemBaseRef.current = problem
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
      setProblem(problemBaseRef.current + finalPart)
      setInterim(interimPart)
    }
    recognition.onend = () => { setRecording(false); setInterim('') }
    recognition.onerror = () => { setRecording(false); setInterim('') }
    recognitionRef.current = recognition
    recognition.start()
    setRecording(true)
  }

  const inputBg = { background: dark ? '#16132b' : '#fafafa', borderColor: dark ? '#4a4570' : 'var(--g2-border)' }
  const ctxDone = CTX_QUESTIONS.map(q => context[q.id]).filter(Boolean).join(' · ')

  return (
    <div className="min-h-screen bg-[var(--g2-bg)] flex flex-col">

      {/* Top bar */}
      <header className="h-14 shrink-0 flex items-center px-6 border-b border-[var(--g2-border)] bg-[var(--g2-bg)]">
        <Link
          to="/playbook/mode"
          className="flex items-center gap-1.5 text-[13px] font-medium text-[var(--g2-muted)] hover:text-[var(--g2-purple)] transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
        <div className="flex-1 flex justify-center">
          <G2Logo className="h-6 w-auto" />
        </div>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map(n => (
            <div
              key={n}
              className={`h-2 rounded-full transition-all duration-300 ${step >= n ? 'bg-[var(--g2-purple)] w-5' : 'bg-[var(--g2-border)] w-2'}`}
            />
          ))}
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center px-6 py-12">
        <div className="w-full max-w-[560px]">

          {/* Intro — only visible on step 1 */}
          {step === 1 && maxStep === 1 && (
            <div className="mb-8">
              <p className="text-[12px] font-semibold uppercase tracking-widest text-[var(--g2-muted)] mb-2">
                Playbook Assist
              </p>
              <h1 className="text-[30px] font-black text-[var(--g2-dark)] mb-2">
                Let's build your playbook
              </h1>
              <p className="text-[15px] text-[var(--g2-muted)] leading-relaxed">
                Answer three quick questions and we'll recommend a tailored AI tool stack.
              </p>
            </div>
          )}

          {/* ── Card 1: Problem ── */}
          <StackedCard
            stepLabel="Step 1 of 3"
            title="What problem do you want to solve?"
            subtitle="Describe your situation and we'll map it to the right AI tools."
            isActive={step === 1}
            isDone={step !== 1 && maxStep >= 1}
            doneSummary={problem.trim().slice(0, 90) + (problem.trim().length > 90 ? '…' : '')}
            onEdit={() => setStep(1)}
            onContinue={() => advance(2)}
            continueLabel="See matching areas"
            canContinue={problem.trim().length > 5}
            dark={dark}
          >
            {/* Compact mic row */}
            {supported && (
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={toggleRecording}
                  aria-label={recording ? 'Stop recording' : 'Start recording'}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    recording
                      ? 'bg-[var(--g2-purple)] text-white shadow-lg shadow-[var(--g2-purple)]/40'
                      : 'border-2 border-[var(--g2-border)] text-[var(--g2-muted)] hover:border-[var(--g2-purple)] hover:text-[var(--g2-purple)]'
                  }`}
                >
                  {recording ? <Pause size={15} /> : <Mic size={15} />}
                </button>
                <span className={`text-[12px] font-medium transition-colors ${recording ? 'text-[var(--g2-purple)]' : 'text-[var(--g2-muted)]'}`}>
                  {recording ? 'Listening…' : 'Tap to speak'}
                </span>
              </div>
            )}

            <textarea
              value={problem}
              onChange={e => setProblem(e.target.value)}
              placeholder="e.g. Our SDR team spends too much time on manual prospecting and writing first-touch emails…"
              rows={4}
              className="w-full rounded-xl border px-4 py-3 text-[14px] text-[var(--g2-dark)] placeholder:text-[var(--g2-muted)] outline-none focus:border-[var(--g2-purple)] transition-colors resize-none leading-relaxed"
              style={{
                ...inputBg,
                borderColor: recording ? 'var(--g2-purple)' : inputBg.borderColor,
              }}
            />
            {interim && recording && (
              <p className="mt-1.5 text-[13px] text-[var(--g2-muted)] italic px-1">{interim}…</p>
            )}

            {/* Starter chips */}
            <div className="flex items-center gap-2 flex-wrap mt-4 pt-3.5 border-t border-[var(--g2-border)]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--g2-muted)] mr-1">Try:</span>
              {["We're struggling with ", "I want to automate ", "Our team spends too much time on "].map(s => (
                <button
                  key={s}
                  onClick={() => setProblem(s)}
                  className="text-[12px] font-semibold text-[var(--g2-purple)] bg-[var(--g2-purple)]/8 border border-[var(--g2-purple)]/20 rounded-full px-3 py-1 hover:bg-[var(--g2-purple)] hover:text-white hover:border-[var(--g2-purple)] transition-colors"
                >
                  {s.trim()}…
                </button>
              ))}
            </div>
          </StackedCard>

          <Connector visible={maxStep >= 2} />

          {/* ── Card 2: Focus areas ── */}
          {maxStep >= 2 && (
            <StackedCard
              stepLabel="Step 2 of 3"
              title="Which areas apply?"
              subtitle="Select the workflows you want to improve. We'll use these to recommend tools."
              isActive={step === 2}
              isDone={step !== 2 && maxStep >= 2}
              doneSummary={areas.map(a => FOCUS_AREAS.find(f => f.id === a)?.label).filter(Boolean).join(', ')}
              onEdit={() => setStep(2)}
              onContinue={() => advance(3)}
              continueLabel="Continue"
              canContinue={areas.length > 0}
              dark={dark}
            >
              <div className="grid grid-cols-2 gap-2.5">
                {FOCUS_AREAS.map(({ id, label, Icon }) => {
                  const selected = areas.includes(id)
                  return (
                    <button
                      key={id}
                      onClick={() => setAreas(prev => selected ? prev.filter(a => a !== id) : [...prev, id])}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                        selected
                          ? 'border-[var(--g2-purple)] bg-[var(--g2-purple)]/8'
                          : 'border-[var(--g2-border)] hover:border-[var(--g2-purple)]/50'
                      }`}
                      style={{ background: selected ? undefined : dark ? '#16132b' : '#fafafa' }}
                    >
                      <Icon
                        size={15}
                        className={`shrink-0 ${selected ? 'text-[var(--g2-purple)]' : 'text-[var(--g2-muted)]'}`}
                      />
                      <span className={`text-[13px] font-semibold leading-snug ${selected ? 'text-[var(--g2-dark)]' : 'text-[var(--g2-muted)]'}`}>
                        {label}
                      </span>
                    </button>
                  )
                })}
              </div>
              {areas.length > 0 && (
                <p className="mt-3 text-[12px] font-semibold text-[var(--g2-purple)]">
                  {areas.length} selected
                </p>
              )}
            </StackedCard>
          )}

          <Connector visible={maxStep >= 3} />

          {/* ── Card 3: Setup ── */}
          {maxStep >= 3 && (
            <StackedCard
              stepLabel="Step 3 of 3"
              title="Tell us about your setup"
              subtitle="This helps us weight the tools that fit your situation best."
              isActive={step === 3}
              isDone={step !== 3 && maxStep >= 3}
              doneSummary={ctxDone}
              onEdit={() => setStep(3)}
              onContinue={() => advance('done')}
              continueLabel="Build my Playbook"
              canContinue={CTX_QUESTIONS.every(q => !!context[q.id])}
              dark={dark}
            >
              <div className="flex flex-col gap-5">
                {CTX_QUESTIONS.map(q => (
                  <div key={q.id}>
                    <p className="text-[13px] font-bold text-[var(--g2-dark)] mb-2.5">{q.label}</p>
                    <div className="flex flex-wrap gap-2">
                      {q.options.map(opt => {
                        const selected = context[q.id] === opt
                        return (
                          <button
                            key={opt}
                            onClick={() => setContext(prev => ({ ...prev, [q.id]: opt }))}
                            className={`text-[13px] font-semibold rounded-full px-4 py-2 border-2 transition-all ${
                              selected
                                ? 'border-[var(--g2-purple)] bg-[var(--g2-purple)]/8 text-[var(--g2-dark)]'
                                : 'border-[var(--g2-border)] text-[var(--g2-muted)] hover:border-[var(--g2-purple)]/50 hover:text-[var(--g2-dark)]'
                            }`}
                            style={{ background: selected ? undefined : dark ? '#16132b' : '#fafafa' }}
                          >
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </StackedCard>
          )}

          <div className="h-16" />
        </div>
      </main>
    </div>
  )
}
