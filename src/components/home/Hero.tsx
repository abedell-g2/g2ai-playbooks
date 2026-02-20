import { Search, Sparkles, PenLine } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import SearchDropdown from './SearchDropdown'

const BASE = import.meta.env.BASE_URL

const AI_FRAMES = Array.from({ length: 18 }, (_, i) =>
  `${BASE}images/ai-images/Property${i + 1}.png`
)
const FRAME_MS = 110

function AnimatedAI() {
  const [ready, setReady] = useState(false)
  const [frame, setFrame] = useState(0)
  // Pick the landing frame once at mount so it's consistent per page load
  const [finalFrame] = useState(() => Math.floor(Math.random() * AI_FRAMES.length))
  const done = frame >= AI_FRAMES.length

  // Preload all frames, then start
  useEffect(() => {
    let loaded = 0
    AI_FRAMES.forEach((src) => {
      const img = new Image()
      img.onload = img.onerror = () => {
        if (++loaded === AI_FRAMES.length) setReady(true)
      }
      img.src = src
    })
  }, [])

  // Advance one frame at a time
  useEffect(() => {
    if (!ready || done) return
    const t = setTimeout(() => setFrame((f) => f + 1), FRAME_MS)
    return () => clearTimeout(t)
  }, [ready, frame, done])

  // While cycling use the current frame; once done, hold the random landing frame
  const displaySrc = ready
    ? AI_FRAMES[done ? finalFrame : Math.min(frame, AI_FRAMES.length - 1)]
    : AI_FRAMES[0]

  return (
    <span
      className="inline-block"
      style={{ height: '1.65em', verticalAlign: '-0.3em' }}
    >
      <img
        src={displaySrc}
        alt="AI."
        aria-label="AI."
        style={{
          display: 'block',
          height: '100%',
          width: 'auto',
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </span>
  )
}

interface HeroProps {
  dark: boolean
}

export default function Hero({ dark }: HeroProps) {
  const bgImage = dark
    ? `${BASE}images/Background_DarkMode.svg`
    : `${BASE}images/Background_LightMode.svg`

  const [query, setQuery] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Close on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const showDropdown = dropdownOpen && query.length > 0

  return (
    <section
      className="relative py-16 md:py-24 text-center"
      style={{ background: 'var(--hero-glow), var(--g2-bg)' }}
      aria-labelledby="hero-heading"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src={bgImage}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative">
        {/* Heading */}
        <div className="max-w-[860px] mx-auto px-8">
          <h1
            id="hero-heading"
            className="text-[clamp(2rem,5.5vw,5.5rem)] leading-[1.05] tracking-tight text-[var(--g2-dark)] mb-7 whitespace-nowrap"
          >
            <span className="font-light">Where you go for </span>
            <AnimatedAI />
          </h1>
        </div>

        {/* Search bar + dropdown wrapper */}
        <div ref={searchRef} className="relative max-w-[1100px] mx-auto px-8">
          {/* Search form — centered inside the wider wrapper */}
          <div className="max-w-[620px] mx-auto">
            <form
              role="search"
              aria-label="Find AI software"
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-3 rounded-full border px-6 py-5 shadow-sm transition-all focus-within:shadow-md"
              style={{
                background: dark ? '#1e1b36' : 'var(--g2-surface)',
                borderColor: dark ? '#4a4570' : 'var(--g2-border)',
              }}
            >
              <Search size={18} className="shrink-0 text-[var(--g2-muted)]" aria-hidden="true" />
              <input
                type="search"
                value={query}
                placeholder="Find AI software, playbooks, and more..."
                aria-label="Find AI software"
                className="flex-1 bg-transparent text-[var(--g2-dark)] placeholder:text-[var(--g2-muted)] text-[16px] outline-none"
                onChange={(e) => {
                  setQuery(e.target.value)
                  if (e.target.value.length > 0) setDropdownOpen(true)
                }}
                onFocus={() => { if (query.length > 0) setDropdownOpen(true) }}
              />
              <button
                type="submit"
                aria-label="Search with AI"
                className="shrink-0 text-[var(--g2-purple)] hover:text-[var(--g2-orange)] transition-colors"
              >
                <Sparkles size={18} aria-hidden="true" />
              </button>
            </form>
          </div>

          {/* CTA below search */}
          {!showDropdown && (
            <div className="flex justify-center mt-4">
              <Link
                to="/playbook/new"
                className="flex items-center gap-2 text-[13.5px] font-semibold text-[var(--g2-muted)] hover:text-[var(--g2-purple)] transition-colors"
              >
                <PenLine size={14} />
                Create your AI Playbook
              </Link>
            </div>
          )}

          {/* Dropdown */}
          {showDropdown && (
            <SearchDropdown
              query={query}
              dark={dark}
              onClose={() => {
                setDropdownOpen(false)
                setQuery('')
              }}
            />
          )}
        </div>
      </div>
    </section>
  )
}
