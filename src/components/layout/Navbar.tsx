import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from '../ui/ThemeToggle'
import G2Logo from '../ui/G2Logo'

interface NavbarProps {
  dark: boolean
  onToggle: () => void
}

const menuLinks = [
  { label: 'My Playbooks', href: '#' },
  { label: 'My Profile',   href: '#' },
  { label: 'Account Settings', href: '#' },
]

export default function Navbar({ dark, onToggle }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--g2-bg)]/50 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-6 h-16 grid grid-cols-[auto_1fr_auto] items-center gap-6">
        {/* Logo */}
        <a href="/" aria-label="G2.AI home" className="shrink-0">
          <G2Logo className="h-9 w-auto" />
        </a>

        {/* Nav links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center justify-center gap-7">
          <a href="#" className="text-[15px] font-medium text-[var(--g2-muted)] hover:text-[var(--g2-dark)] transition-colors">Explore Software</a>
          <Link to="/playbook/new" className="text-[15px] font-medium text-[var(--g2-muted)] hover:text-[var(--g2-dark)] transition-colors">AI Playbooks</Link>
          <a href="#" className="text-[15px] font-medium text-[var(--g2-muted)] hover:text-[var(--g2-dark)] transition-colors">Categories</a>
          <a href="#" className="text-[15px] font-medium text-[var(--g2-muted)] hover:text-[var(--g2-dark)] transition-colors">Rankings</a>
        </nav>

        {/* Right: avatar + profile menu */}
        <div ref={menuRef} className="shrink-0 justify-self-end relative">
          <button
            onClick={() => setOpen(v => !v)}
            className="block rounded-full focus-visible:outline-2 focus-visible:outline-[var(--g2-purple)]"
            aria-label="Open profile menu"
            aria-expanded={open}
          >
            <img
              src="https://media.licdn.com/dms/image/v2/C5603AQF2xPA_A5YPIg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1653323249034?e=2147483647&v=beta&t=cQ2tQFG2kS-Z38clCSkC6fuw3ANhg6p9FpM9HJtb19Y"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[var(--g2-border)]"
            />
          </button>

          {open && (
            <div className="absolute right-0 top-[calc(100%+10px)] w-56 rounded-xl border border-[var(--g2-border)] bg-[var(--g2-bg)] shadow-lg shadow-black/10 py-1 z-50">
              {/* Greeting */}
              <div className="px-4 pt-3 pb-2">
                <p className="text-[13px] font-semibold text-[var(--g2-dark)]">Hi, Godard!</p>
              </div>

              <div className="h-px bg-[var(--g2-border)] mx-2 mb-1" />

              {/* Nav links */}
              {menuLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center px-4 py-2 text-[13px] text-[var(--g2-muted)] hover:text-[var(--g2-dark)] hover:bg-[var(--g2-border)]/40 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              ))}

              <div className="h-px bg-[var(--g2-border)] mx-2 mt-1 mb-2" />

              {/* UI Theme row */}
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-[13px] text-[var(--g2-muted)]">UI Theme</span>
                <ThemeToggle dark={dark} onToggle={onToggle} />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
