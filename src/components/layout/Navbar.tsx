import { Link } from 'react-router-dom'
import ThemeToggle from '../ui/ThemeToggle'
import G2Logo from '../ui/G2Logo'

interface NavbarProps {
  dark: boolean
  onToggle: () => void
}

export default function Navbar({ dark, onToggle }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--g2-bg)]/50 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-6 h-16 grid grid-cols-[auto_1fr_auto] items-center gap-6">
        {/* Logo */}
        <a href="/" aria-label="G2.AI home" className="shrink-0">
          <G2Logo className="h-9 w-auto" />
        </a>

        {/* Nav links — centered in the middle column */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center justify-center gap-7">
          <a href="#" className="text-[15px] font-medium text-[var(--g2-muted)] hover:text-[var(--g2-dark)] transition-colors">Explore Software</a>
          <Link to="/playbook/new" className="text-[15px] font-medium text-[var(--g2-muted)] hover:text-[var(--g2-dark)] transition-colors">AI Playbooks</Link>
          <a href="#" className="text-[15px] font-medium text-[var(--g2-muted)] hover:text-[var(--g2-dark)] transition-colors">Categories</a>
          <a href="#" className="text-[15px] font-medium text-[var(--g2-muted)] hover:text-[var(--g2-dark)] transition-colors">Rankings</a>
        </nav>

        {/* Theme toggle */}
        <div className="shrink-0 justify-self-end">
          <ThemeToggle dark={dark} onToggle={onToggle} />
        </div>
      </div>
    </header>
  )
}
