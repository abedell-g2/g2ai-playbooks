import { useState } from 'react'

interface ToolLogoProps {
  domain?: string
  name: string
  size?: number
  className?: string
}

// To upgrade to Logo.dev (higher quality), sign up free at https://logo.dev,
// grab your public token, and set VITE_LOGODEV_TOKEN in a .env file.
// Falls back to Google's favicon service (no signup needed).
const LOGODEV_TOKEN = import.meta.env.VITE_LOGODEV_TOKEN as string | undefined

function logoUrl(domain: string, size: number): string {
  if (LOGODEV_TOKEN) {
    return `https://img.logo.dev/${domain}?token=${LOGODEV_TOKEN}&size=${size}&format=png`
  }
  // Google's favicon service — works for all domains, no auth needed
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=${Math.max(size, 64)}`
}

export default function ToolLogo({ domain, name, size = 36, className = '' }: ToolLogoProps) {
  const [errored, setErrored] = useState(false)

  const sizeStyle = { width: size, height: size }
  const initial = name.trim()[0]?.toUpperCase() ?? '?'

  if (domain && !errored) {
    return (
      <img
        src={logoUrl(domain, size)}
        alt={name}
        style={sizeStyle}
        className={`rounded-full object-contain bg-white ${className}`}
        onError={() => setErrored(true)}
      />
    )
  }

  return (
    <span
      aria-label={name}
      style={{ ...sizeStyle, fontSize: size * 0.38 }}
      className={`flex items-center justify-center rounded-full bg-[var(--g2-purple-light)] text-[var(--g2-purple)] font-bold select-none ${className}`}
    >
      {initial}
    </span>
  )
}
