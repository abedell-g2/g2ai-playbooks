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
      <span className="absolute left-[6px] flex items-center justify-center w-[14px] h-[14px]">
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M7.02419 0.933728C7.30649 0.469339 6.91236 -0.160154 6.40601 0.0372408C2.65683 1.49883 3.9216e-07 5.14376 3.9216e-07 9.41019C0.00016074 14.965 4.50379 19.4678 10.0586 19.4678C14.3247 19.4677 17.9689 16.8114 19.4305 13.0627C19.6279 12.5564 18.9984 12.1622 18.534 12.4444C17.2679 13.2137 15.7823 13.6573 14.1924 13.6573C9.5633 13.6573 5.81055 9.90451 5.81055 5.27543C5.81064 3.6854 6.25456 2.19979 7.02419 0.933728Z" fill="#988ED2"/>
        </svg>
      </span>
      {/* Sun icon (right side) */}
      <span className="absolute right-[6px] flex items-center justify-center w-[14px] h-[14px]">
        <svg width="14" height="14" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="10.79" cy="10.79" r="4.8" fill="#fff"/>
          <rect y="9.6" width="4.8" height="2.4" rx="1.2" fill="#fff"/>
          <rect x="16.79" y="9.6" width="4.8" height="2.4" rx="1.2" fill="#fff"/>
          <rect x="2.46" y="15.53" width="4.8" height="2.4" rx="1.2" transform="translate(-10.41 8.34) rotate(-45)" fill="#fff"/>
          <rect x="14.33" y="3.66" width="4.8" height="2.4" rx="1.2" transform="translate(1.47 13.25) rotate(-45)" fill="#fff"/>
          <rect x="3.66" y="2.46" width="2.4" height="4.8" rx="1.2" transform="translate(-2.01 4.86) rotate(-45)" fill="#fff"/>
          <rect x="15.53" y="14.33" width="2.4" height="4.8" rx="1.2" transform="translate(-6.93 16.73) rotate(-45)" fill="#fff"/>
          <rect x="9.6" width="2.4" height="4.8" rx="1.2" fill="#fff"/>
          <rect x="9.6" y="16.79" width="2.4" height="4.8" rx="1.2" fill="#fff"/>
        </svg>
      </span>
      {/* Thumb */}
      <span
        className="absolute top-[3px] w-[22px] h-[22px] rounded-full bg-[var(--g2-purple)] shadow transition-all duration-200"
        style={{ left: dark ? '3px' : 'calc(100% - 25px)' }}
      />
    </button>
  )
}
