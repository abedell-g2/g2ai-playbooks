import { Heart, MessageCircle, Repeat2, Send } from 'lucide-react'
import ToolLogo from './ToolLogo'

export interface Tool {
  name: string
  domain?: string
  category: string
  categoryColor: string
  description: string
  previewBg: string
  previewContent?: string
  rating: number
  likes: number
  comments: number
}

interface ToolCardProps {
  tool: Tool
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <article className="flex flex-col rounded-2xl border border-[var(--g2-border)] bg-[var(--g2-surface)] overflow-hidden hover:shadow-lg transition-shadow">

      {/* Card header */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-4">
        <ToolLogo domain={tool.domain} name={tool.name} size={40} className="shrink-0" />
        <div className="flex-1 min-w-0 flex items-center gap-2">
          <p className="text-[14px] font-bold text-[var(--g2-dark)] truncate">{tool.name}</p>
          <span className="shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[var(--g2-purple-light)] text-[var(--g2-purple)]">
            {tool.rating.toFixed(1)}
          </span>
        </div>
        <span className={`text-[11px] font-semibold px-3 py-1.5 rounded-full shrink-0 ${tool.categoryColor}`}>
          {tool.category}
        </span>
      </div>

      {/* Preview image */}
      <div
        className="mx-5 rounded-xl overflow-hidden h-[168px] flex items-center justify-center"
        style={{ background: tool.previewBg }}
        aria-hidden="true"
      >
        {tool.previewContent && (
          <span className="text-white/90 font-black text-2xl tracking-tight px-4 text-center">
            {tool.previewContent}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="px-5 pt-4 pb-4 text-[13px] text-[var(--g2-muted)] leading-relaxed line-clamp-2">
        {tool.description}
      </p>

      {/* Engagement icons */}
      <div className="flex items-center gap-5 px-5 pb-5 mt-auto text-[var(--g2-muted)]">
        <button aria-label={`Like — ${tool.likes}`} className="flex items-center gap-1.5 text-[12.5px] hover:text-[var(--g2-purple)] transition-colors">
          <Heart size={15} />
          <span>{tool.likes}</span>
        </button>
        <button aria-label={`${tool.comments} comments`} className="flex items-center gap-1.5 text-[12.5px] hover:text-[var(--g2-purple)] transition-colors">
          <MessageCircle size={15} />
          <span>{tool.comments}</span>
        </button>
        <button aria-label="Repost" className="flex items-center gap-1.5 text-[12.5px] hover:text-[var(--g2-purple)] transition-colors">
          <Repeat2 size={15} />
        </button>
        <button aria-label="Share" className="flex items-center gap-1.5 text-[12.5px] hover:text-[var(--g2-purple)] transition-colors ml-auto">
          <Send size={15} />
        </button>
      </div>

    </article>
  )
}
