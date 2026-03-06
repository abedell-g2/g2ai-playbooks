import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import { X } from 'lucide-react'
import type { AITool } from './ToolSidebar'
import ToolLogo from '../ui/ToolLogo'
import StarRating from './StarRating'

const CATEGORY_COLORS: Record<string, string> = {
  Generative:      'bg-violet-50 text-violet-500',
  Automation:      'bg-indigo-50 text-indigo-500',
  Coding:          'bg-sky-50 text-sky-600',
  'Image Creation':'bg-rose-50 text-rose-500',
  Productivity:    'bg-blue-50 text-blue-500',
  Writing:         'bg-emerald-50 text-emerald-600',
  Video:           'bg-orange-50 text-orange-500',
  Audio:           'bg-cyan-50 text-cyan-600',
  Sales:           'bg-red-50 text-red-500',
}

type ToolNodeData = AITool & {
  rating?: number
  onDelete?: (id: string) => void
  onRate?: (id: string, rating: number) => void
}

const ToolNode = memo(({ id, data, selected }: NodeProps) => {
  const tool = data as unknown as ToolNodeData

  return (
    <div
      className={`relative w-52 rounded-2xl border-2 bg-[var(--g2-surface)] shadow-sm transition-shadow ${
        selected ? 'border-[var(--g2-purple)] shadow-lg' : 'border-[var(--g2-border)]'
      }`}
    >
      {/* Delete button */}
      <button
        onClick={() => tool.onDelete?.(id)}
        aria-label={`Remove ${tool.name}`}
        className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full bg-[var(--g2-surface)] border border-[var(--g2-border)] flex items-center justify-center text-[var(--g2-muted)] hover:text-[var(--g2-orange)] hover:border-[var(--g2-orange)] transition-colors z-10"
      >
        <X size={10} />
      </button>

      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-[var(--g2-purple)] !border-2 !border-white !shadow"
      />

      {/* Card content */}
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <ToolLogo domain={tool.domain} name={tool.name} size={32} className="shrink-0" />
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-[var(--g2-dark)] truncate">{tool.name}</p>
            <span
              className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${CATEGORY_COLORS[tool.category] ?? 'bg-gray-100 text-gray-600'}`}
            >
              {tool.category}
            </span>
          </div>
        </div>

        <p className="text-[11.5px] text-[var(--g2-muted)] leading-relaxed mb-2.5">
          {tool.description}
        </p>

        <StarRating
          value={tool.rating ?? 0}
          onChange={(rating) => tool.onRate?.(id, rating)}
        />
      </div>

      {/* Output handle — right (connects to next tool) */}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="!w-3 !h-3 !bg-[var(--g2-purple)] !border-2 !border-white !shadow"
      />

      {/* Output handle — bottom (connects to optimization suggestions) */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="!w-3 !h-3 !bg-[var(--g2-purple)] !border-2 !border-white !shadow"
      />
    </div>
  )
})

ToolNode.displayName = 'ToolNode'

export default ToolNode
