import { Search, Sparkles } from 'lucide-react'

const BASE = import.meta.env.BASE_URL

interface HeroProps {
  dark: boolean
}

export default function Hero({ dark }: HeroProps) {
  const bgImage = dark
    ? `${BASE}images/Background_DarkMode.svg`
    : `${BASE}images/Background_LightMode.svg`

  return (
    <section
      className="relative overflow-hidden py-28 md:py-36 text-center"
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

      <div className="relative max-w-[860px] mx-auto px-8">
        {/* Heading */}
        <h1
          id="hero-heading"
          className="text-[clamp(3rem,7.5vw,5.5rem)] leading-[1.05] tracking-tight text-[var(--g2-dark)] mb-10"
        >
          <span className="font-light">Where you go for </span>
          <span
            className="font-black italic"
            style={{ color: 'var(--g2-ai-text)' }}
          >
            AI.
          </span>
        </h1>

        {/* Search bar */}
        <div className="max-w-[560px] mx-auto">
          <form
            role="search"
            aria-label="Find AI software"
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-3 rounded-full border border-[var(--g2-border)] bg-[var(--g2-surface)] px-5 py-4 shadow-sm transition-all focus-within:border-[var(--g2-purple)] focus-within:shadow-md"
          >
            <Search size={17} className="shrink-0 text-[var(--g2-muted)]" aria-hidden="true" />
            <input
              type="search"
              placeholder="Find AI software..."
              aria-label="Find AI software"
              className="flex-1 bg-transparent text-[var(--g2-dark)] placeholder:text-[var(--g2-muted)] text-[15px] outline-none"
            />
            <button
              type="submit"
              aria-label="Search with AI"
              className="shrink-0 text-[var(--g2-purple)] hover:text-[var(--g2-orange)] transition-colors"
            >
              <Sparkles size={17} aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
