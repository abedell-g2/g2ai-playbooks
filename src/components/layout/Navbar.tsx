import { useState, useRef, useEffect } from 'react'
import { Search, Sparkles, Pencil } from 'lucide-react'
import ThemeToggle from '../ui/ThemeToggle'
import G2Logo from '../ui/G2Logo'
import SearchDropdown from '../home/SearchDropdown'
import { useDemo } from '../../context/DemoContext'

interface NavbarProps {
  dark: boolean
  onToggle: () => void
}

const myPlaybooks = [
  { label: 'Sales Automation Stack' },
  { label: 'Content Creation Workflow' },
]

const bottomLinks = [
  { label: 'My Profile' },
  { label: 'Account Settings' },
]

export default function Navbar({ dark, onToggle }: NavbarProps) {
  const { model, openLoginModal } = useDemo()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Close profile menu on outside click
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

  // Close search dropdown on outside click
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
    <header className="sticky top-0 z-50 w-full bg-[var(--g2-bg)]/50 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-6 h-16 grid grid-cols-[auto_1fr_auto] items-center gap-6">
        {/* Logo */}
        <a href="/" aria-label="G2.AI home" className="shrink-0">
          <G2Logo className="h-9 w-auto" />
        </a>

        {/* Search */}
        <div ref={searchRef} className="relative max-w-[780px] w-full justify-self-center">
          <form
            role="search"
            aria-label="Find AI software"
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2.5 rounded-full border px-4 py-2 transition-all focus-within:shadow-md max-w-[420px] mx-auto"
            style={{
              background: dark ? '#1e1b36' : 'var(--g2-surface)',
              borderColor: dark ? '#4a4570' : 'var(--g2-border)',
            }}
          >
            <Search size={15} className="shrink-0 text-[var(--g2-muted)]" aria-hidden="true" />
            <input
              type="search"
              value={query}
              placeholder="Find AI Playbooks, experts, AI software and more..."
              aria-label="Find AI Playbooks, experts, AI software and more"
              className="flex-1 bg-transparent text-[var(--g2-dark)] placeholder:text-[var(--g2-muted)] text-[14px] outline-none"
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
              <Sparkles size={15} aria-hidden="true" />
            </button>
          </form>

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

        {/* Right: avatar + profile menu (authenticated) or Log-in button (demo A/B) */}
        {model === 'auth' ? (
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
              <div className="absolute right-0 top-[calc(100%+10px)] w-64 rounded-xl border border-[var(--g2-border)] bg-[var(--g2-bg)] shadow-lg shadow-black/10 py-1.5 z-50">
                {/* Greeting */}
                <div className="px-4 pt-3 pb-2.5">
                  <p className="text-[15px] font-semibold text-[var(--g2-dark)]">Hi, Godard!</p>
                </div>

                <div className="h-px bg-[var(--g2-border)] mx-2 mb-1.5" />

                {/* My Playbooks section */}
                <div className="px-4 pt-1 pb-0.5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--g2-muted)]">My Playbooks</p>
                </div>
                {myPlaybooks.map(({ label }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between px-4 py-2 group hover:bg-[var(--g2-border)]/40 transition-colors cursor-pointer"
                  >
                    <span className="text-[14px] text-[var(--g2-dark)] truncate">{label}</span>
                    <button
                      aria-label={`Edit ${label}`}
                      className="ml-2 shrink-0 text-[var(--g2-muted)] group-hover:text-[var(--g2-purple)] transition-colors"
                    >
                      <Pencil size={13} />
                    </button>
                  </div>
                ))}

                <div className="h-px bg-[var(--g2-border)] mx-2 my-1.5" />

                {/* Bottom links */}
                {bottomLinks.map(({ label }) => (
                  <a
                    key={label}
                    href="#"
                    className="flex items-center px-4 py-2 text-[14px] text-[var(--g2-muted)] hover:text-[var(--g2-dark)] hover:bg-[var(--g2-border)]/40 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </a>
                ))}

                <div className="h-px bg-[var(--g2-border)] mx-2 mt-1.5 mb-2" />

                {/* UI Theme row */}
                <div className="flex items-center justify-between px-4 py-2">
                  <span className="text-[14px] text-[var(--g2-muted)]">UI Theme</span>
                  <ThemeToggle dark={dark} onToggle={onToggle} />
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={openLoginModal}
            className="shrink-0 justify-self-end px-4 py-2 rounded-full bg-[var(--g2-purple)] text-white text-[13px] font-semibold hover:bg-[#7060c8] transition-colors whitespace-nowrap"
          >
            Log-in / Contribute
          </button>
        )}
      </div>
    </header>
  )
}
