import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mic, MicOff, ArrowRight, ArrowLeft, X } from 'lucide-react'
import G2Logo from '../components/ui/G2Logo'
import ToolLogo from '../components/ui/ToolLogo'
import { PRODUCTS, getProductById } from '../data/searchData'

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

interface Props {
  dark: boolean
}

export default function PlaybookStart({ dark }: Props) {
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

  // Step 2 — author
  const [author, setAuthor] = useState('')
  const [authorRole, setAuthorRole] = useState('')
  const [company, setCompany] = useState('')
  const [linkedin, setLinkedin] = useState('')

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

    recognition.onend = () => {
      setRecording(false)
      setInterim('')
    }
    recognition.onerror = () => {
      setRecording(false)
      setInterim('')
    }

    recognitionRef.current = recognition
    recognition.start()
    setRecording(true)
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
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              step >= 1 ? 'bg-[var(--g2-purple)] w-5' : 'bg-[var(--g2-border)] w-2'
            }`}
          />
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              step >= 2 ? 'bg-[var(--g2-purple)] w-5' : 'bg-[var(--g2-border)] w-2'
            }`}
          />
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 flex items-start justify-center px-6 py-16">
        <div className="w-full max-w-[540px]">

          {/* ── Step 1: Voice ── */}
          {step === 1 && (
            <div className="flex flex-col items-center gap-8">

              <div className="text-center">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--g2-muted)] mb-3">
                  Step 1 of 2
                </p>
                <h1 className="text-[28px] font-black text-[var(--g2-dark)] mb-2">
                  Describe your AI workflow
                </h1>
                <p className="text-[14px] text-[var(--g2-muted)] leading-relaxed">
                  {supported
                    ? 'Hit the mic and tell us how you use AI. We\'ll detect the tools automatically.'
                    : 'Type out how you use AI tools — we\'ll detect them automatically.'}
                </p>
              </div>

              {/* Mic button with pulse rings */}
              {supported && (
                <div className="relative flex items-center justify-center w-36 h-36">
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
                    className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                      recording
                        ? 'bg-[var(--g2-purple)] text-white shadow-2xl shadow-[var(--g2-purple)]/40 scale-110'
                        : 'bg-[var(--g2-surface)] border-2 border-[var(--g2-border)] text-[var(--g2-muted)] hover:border-[var(--g2-purple)] hover:text-[var(--g2-purple)] hover:scale-105'
                    }`}
                  >
                    {recording ? <MicOff size={28} /> : <Mic size={28} />}
                  </button>
                </div>
              )}

              {/* Mic status label */}
              {supported && (
                <p
                  className={`-mt-4 text-[13px] font-medium transition-colors ${
                    recording ? 'text-[var(--g2-purple)]' : 'text-[var(--g2-muted)]'
                  }`}
                >
                  {recording
                    ? 'Listening…'
                    : transcript
                    ? 'Click to add more'
                    : 'Click to start speaking'}
                </p>
              )}

              {/* Transcript textarea */}
              <div className="w-full flex flex-col gap-1.5">
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
                    borderColor: recording
                      ? 'var(--g2-purple)'
                      : dark
                      ? '#4a4570'
                      : 'var(--g2-border)',
                  }}
                />
                {/* Interim preview */}
                {interim && recording && (
                  <p className="text-[13px] text-[var(--g2-muted)] italic px-1">{interim}…</p>
                )}
              </div>

              {/* Detected tools */}
              {toolIds.length > 0 && (
                <div className="w-full">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--g2-muted)] mb-3">
                    {toolIds.length} tool{toolIds.length !== 1 ? 's' : ''} detected
                  </p>
                  <div className="flex flex-wrap gap-2">
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
                            onClick={() => setToolIds((ids) => ids.filter((i) => i !== id))}
                            className="ml-0.5 text-[var(--g2-muted)] hover:text-[var(--g2-dark)] transition-colors"
                            aria-label={`Remove ${p.name}`}
                          >
                            <X size={11} />
                          </button>
                        </span>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Continue */}
              <div className="w-full pt-2">
                <button
                  onClick={() => setStep(2)}
                  disabled={!canContinue}
                  className="w-full py-3.5 rounded-full bg-[var(--g2-purple)] text-white text-[14px] font-semibold hover:bg-[#7060c8] transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Continue
                  <ArrowRight size={16} />
                </button>
                {!canContinue && (
                  <p className="text-center text-[12px] text-[var(--g2-muted)] mt-2.5">
                    Describe your workflow first
                  </p>
                )}
              </div>

            </div>
          )}

          {/* ── Step 2: Author info ── */}
          {step === 2 && (
            <div className="flex flex-col gap-7">

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--g2-muted)] mb-3">
                  Step 2 of 2
                </p>
                <h1 className="text-[28px] font-black text-[var(--g2-dark)] mb-2">
                  A little about you
                </h1>
                <p className="text-[14px] text-[var(--g2-muted)] leading-relaxed">
                  This helps others know whose playbook they're learning from.
                </p>
              </div>

              {/* Recap pill */}
              {toolIds.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap py-3 px-4 rounded-xl border border-[var(--g2-border)] bg-[var(--g2-surface)]">
                  <span className="text-[12px] font-semibold text-[var(--g2-muted)] mr-1">
                    Your tools:
                  </span>
                  {toolIds.map((id) => {
                    const p = getProductById(id)
                    if (!p) return null
                    return <ToolLogo key={id} domain={p.domain} name={p.name} size={22} />
                  })}
                </div>
              )}

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="s2-author" className="text-[12px] font-semibold text-[var(--g2-dark)]">
                    Full name <span className="text-[var(--g2-orange)]">*</span>
                  </label>
                  <input
                    id="s2-author"
                    type="text"
                    placeholder="Godard Abel"
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
                      placeholder="CEO, Engineer…"
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
                      placeholder="Acme Inc."
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
                    placeholder="https://linkedin.com/in/yourname"
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
