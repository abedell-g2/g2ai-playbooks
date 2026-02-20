import { Heart, MessageCircle, Repeat2, Send } from 'lucide-react'

export interface Tool {
  name: string
  category: string
  categoryColor: string
  description: string
  previewBg: string
  previewContent?: string
  logoEmoji: string
  likes: number
  comments: number
}

interface ToolCardProps {
  tool: Tool
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <article className="flex flex-col rounded-2xl border border-[var(--g2-border)] bg-[var(--g2-bg)] overflow-hidden hover:shadow-md transition-shadow">
      {/* Card header */}
      <div className="flex items-center gap-2.5 px-4 pt-4 pb-3">
        <div className="w-9 h-9 rounded-full bg-[var(--g2-border)] flex items-center justify-center shrink-0 text-lg">
          {tool.logoEmoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13.5px] font-bold text-[var(--g2-dark)] truncate">{tool.name}</p>
        </div>
        <span
          className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${tool.categoryColor}`}
        >
          {tool.category}
        </span>
      </div>

      {/* Preview image */}
      <div
        className="mx-4 rounded-xl overflow-hidden h-[160px] flex items-center justify-center text-4xl"
        style={{ background: tool.previewBg }}
        aria-hidden="true"
      >
        {tool.previewContent && (
          <span className="text-white text-opacity-90 font-black text-2xl tracking-tight">
            {tool.previewContent}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="px-4 pt-3 pb-3 text-[12.5px] text-[var(--g2-muted)] leading-relaxed line-clamp-2">
        {tool.description}
      </p>

      {/* Engagement icons */}
      <div className="flex items-center gap-4 px-4 pb-4 mt-auto text-[var(--g2-muted)]">
        <button aria-label={`Like — ${tool.likes}`} className="flex items-center gap-1.5 text-[12px] hover:text-[var(--g2-purple)] transition-colors">
          <Heart size={15} />
          <span>{tool.likes}</span>
        </button>
        <button aria-label={`${tool.comments} comments`} className="flex items-center gap-1.5 text-[12px] hover:text-[var(--g2-purple)] transition-colors">
          <MessageCircle size={15} />
          <span>{tool.comments}</span>
        </button>
        <button aria-label="Repost" className="flex items-center gap-1.5 text-[12px] hover:text-[var(--g2-purple)] transition-colors">
          <Repeat2 size={15} />
        </button>
        <button aria-label="Share" className="flex items-center gap-1.5 text-[12px] hover:text-[var(--g2-purple)] transition-colors ml-auto">
          <Send size={15} />
        </button>
      </div>
    </article>
  )
}
