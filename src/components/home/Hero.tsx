import { Search, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36 text-center" aria-labelledby="hero-heading">
      {/* Decorative + grid */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <DotGrid />
      </div>

      <div className="relative max-w-[860px] mx-auto px-8">
        {/* Heading */}
        <h1
          id="hero-heading"
          className="text-[clamp(3rem,7.5vw,5.5rem)] font-black leading-[1.05] tracking-tight text-[var(--g2-dark)] mb-10"
        >
          Where you go for{' '}
          <span className="italic text-[var(--g2-purple)]">AI.</span>
        </h1>

        {/* Search bar */}
        <div className="max-w-[560px] mx-auto">
          <form
            role="search"
            aria-label="Find AI software"
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-3 rounded-full border border-[var(--g2-border)] bg-[var(--g2-bg)] px-5 py-4 shadow-sm transition-all focus-within:border-[var(--g2-purple)] focus-within:shadow-md"
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

function DotGrid() {
  const marks = []
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 10; col++) {
      marks.push(
        <span
          key={`${row}-${col}`}
          className="absolute text-[var(--g2-border)] text-base select-none"
          style={{ top: `${row * 18 + 4}%`, left: `${col * 11 + 1}%`, opacity: 0.6 }}
        >
          +
        </span>
      )
    }
  }
  return <>{marks}</>
}
