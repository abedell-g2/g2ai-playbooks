import { Link } from 'react-router-dom'
import ThemeToggle from '../ui/ThemeToggle'
import G2Logo from '../ui/G2Logo'

interface NavbarProps {
  dark: boolean
  onToggle: () => void
}

export default function Navbar({ dark, onToggle }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--g2-border)] bg-[var(--g2-bg)]/90 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center gap-6">
        {/* Logo */}
        <a href="/" aria-label="G2.AI home" className="shrink-0">
          <G2Logo className="h-7 w-auto" />
        </a>

        {/* Nav links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-5 mx-auto">
          <a href="#" className="text-[13.5px] font-medium text-[var(--g2-muted)] hover:text-[var(--g2-dark)] transition-colors">Explore Software</a>
          <Link to="/playbook/new" className="text-[13.5px] font-medium text-[var(--g2-muted)] hover:text-[var(--g2-dark)] transition-colors">AI Playbooks</Link>
          <a href="#" className="text-[13.5px] font-medium text-[var(--g2-muted)] hover:text-[var(--g2-dark)] transition-colors">Categories</a>
          <a href="#" className="text-[13.5px] font-medium text-[var(--g2-muted)] hover:text-[var(--g2-dark)] transition-colors">Rankings</a>
        </nav>

        {/* Theme toggle */}
        <div className="ml-auto shrink-0">
          <ThemeToggle dark={dark} onToggle={onToggle} />
        </div>
      </div>
    </header>
  )
}
