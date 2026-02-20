import { useState } from 'react'
import { Star } from 'lucide-react'

interface StarRatingProps {
  value: number
  onChange: (rating: number) => void
}

export default function StarRating({ value, onChange }: StarRatingProps) {
  const [hovered, setHovered] = useState(0)
  const active = hovered || value

  return (
    <div className="flex items-center gap-0.5" role="group" aria-label="Rate this tool">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={(e) => { e.stopPropagation(); onChange(star) }}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          aria-label={`${star} star${star !== 1 ? 's' : ''}`}
          className="transition-colors leading-none"
        >
          <Star
            size={13}
            className={
              star <= active
                ? 'fill-amber-400 text-amber-400'
                : 'fill-none text-[var(--g2-border)]'
            }
          />
        </button>
      ))}
    </div>
  )
}
