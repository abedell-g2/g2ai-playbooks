import ThemeToggle from '../ui/ThemeToggle'

interface NavbarProps {
  dark: boolean
  onToggle: () => void
}

export default function Navbar({ dark, onToggle }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--g2-border)] bg-[var(--g2-bg)]/90 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center gap-6">
        {/* Logo */}
        <a href="/" aria-label="G2.AI home" className="flex items-center gap-1.5 shrink-0">
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[var(--g2-orange)]">
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
              <path d="M7.5 8H10.5V10.5C9.6 11.4 8.4 12 7 12C4.2 12 2 9.8 2 7C2 4.2 4.2 2 7 2C8.4 2 9.65 2.55 10.55 3.45L12.3 1.7C11 0.65 9.08 0 7 0C3.13 0 0 3.13 0 7C0 10.87 3.13 14 7 14C10.12 14 12.72 12.08 13.66 9.4L13.82 8.96V6H7.5V8Z" fill="white"/>
            </svg>
          </span>
          <span className="text-[15px] font-bold tracking-tight text-[var(--g2-dark)]">
            G2<span className="text-[var(--g2-purple)]">.ai</span>
          </span>
        </a>

        {/* Nav links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-5 mx-auto">
          {['Explore Software', 'AI Playbooks', 'Categories', 'Rankings'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-[13.5px] font-medium text-[var(--g2-muted)] hover:text-[var(--g2-dark)] transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Theme toggle */}
        <div className="ml-auto shrink-0">
          <ThemeToggle dark={dark} onToggle={onToggle} />
        </div>
      </div>
    </header>
  )
}
