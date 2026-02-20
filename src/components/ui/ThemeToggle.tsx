interface ThemeToggleProps {
  dark: boolean
  onToggle: () => void
}

export default function ThemeToggle({ dark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={dark}
      aria-label="Toggle dark mode"
      className="relative inline-flex items-center w-[58px] h-[30px] rounded-full border border-[var(--g2-border)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--g2-purple)]"
      style={{ background: dark ? '#2a2740' : '#e8e6f0' }}
    >
      {/* Moon icon (left side) */}
      <span className="absolute left-[6px] text-[13px] leading-none select-none">🌙</span>
      {/* Sun icon (right side) */}
      <span className="absolute right-[6px] text-[12px] leading-none select-none">☀️</span>
      {/* Thumb */}
      <span
        className="absolute top-[3px] w-[22px] h-[22px] rounded-full bg-[var(--g2-purple)] shadow transition-all duration-200"
        style={{ left: dark ? '3px' : 'calc(100% - 25px)' }}
      />
    </button>
  )
}
