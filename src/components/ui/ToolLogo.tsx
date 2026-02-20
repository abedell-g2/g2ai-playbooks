import { useState } from 'react'

interface ToolLogoProps {
  domain?: string
  name: string
  size?: number
  className?: string
}

export default function ToolLogo({ domain, name, size = 36, className = '' }: ToolLogoProps) {
  const [errored, setErrored] = useState(false)

  const sizeClass = `w-[${size}px] h-[${size}px]`
  const initial = name.trim()[0]?.toUpperCase() ?? '?'

  if (domain && !errored) {
    return (
      <img
        src={`https://logo.clearbit.com/${domain}`}
        alt={name}
        width={size}
        height={size}
        className={`rounded-full object-contain bg-white ${className}`}
        onError={() => setErrored(true)}
      />
    )
  }

  // Letter avatar fallback
  return (
    <span
      aria-label={name}
      className={`flex items-center justify-center rounded-full bg-[var(--g2-purple-light)] text-[var(--g2-purple)] font-bold select-none ${sizeClass} ${className}`}
      style={{ fontSize: size * 0.38 }}
    >
      {initial}
    </span>
  )
}
