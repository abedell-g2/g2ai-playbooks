import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

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
            className="text-[clamp(2rem,5.5vw,5.5rem)] leading-[1.05] tracking-tight text-[var(--g2-dark)] mb-3 whitespace-nowrap"
          >
            <span className="font-light">Where you go for </span>
            <AnimatedAI />
          </h1>
        </div>

        {/* Subheadline + CTAs */}
        <div className="flex flex-col items-center gap-6 -mt-3 px-8">
          <p className="text-[17px] text-white font-light">
            AI Playbooks — Discover expert-curated AI tool stacks
          </p>
          <div className="flex items-center gap-3">
            <Link
              to="/playbook/start"
              className="px-6 py-3 rounded-full bg-[var(--g2-purple)] text-white text-[15px] font-semibold hover:bg-[#7060c8] transition-colors"
            >
              Create a Playbook
            </Link>
            <a
              href="#"
              className="px-6 py-3 rounded-full border border-[var(--g2-border)] text-[var(--g2-dark)] text-[15px] font-semibold hover:border-[#7060c8] hover:text-[#7060c8] transition-colors"
            >
              Browse Playbooks
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
