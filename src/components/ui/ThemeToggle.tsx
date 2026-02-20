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
          <circle cx="10.7947" cy="10.7946" r="4.79765" fill="#FF492C"/>
          <rect y="9.59521" width="4.79765" height="2.39883" rx="1.19941" fill="#FF492C"/>
          <rect x="16.7919" y="9.59521" width="4.79765" height="2.39883" rx="1.19941" fill="#FF492C"/>
          <rect x="2.3136" y="17.5795" width="4.79765" height="2.39883" rx="1.19941" transform="rotate(-45 2.3136 17.5795)" fill="#FF492C"/>
          <rect x="14.1873" y="5.70593" width="4.79765" height="2.39883" rx="1.19941" transform="rotate(-45 14.1873 5.70593)" fill="#FF492C"/>
          <rect x="2.3136" y="4.00977" width="2.39883" height="4.79765" rx="1.19941" transform="rotate(-45 2.3136 4.00977)" fill="#FF492C"/>
          <rect x="14.1873" y="15.8833" width="2.39883" height="4.79765" rx="1.19941" transform="rotate(-45 14.1873 15.8833)" fill="#FF492C"/>
          <rect x="9.59534" width="2.39883" height="4.79765" rx="1.19941" fill="#FF492C"/>
          <rect x="9.59534" y="16.7916" width="2.39883" height="4.79765" rx="1.19941" fill="#FF492C"/>
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
