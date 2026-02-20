import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import { X } from 'lucide-react'
import type { AITool } from './ToolSidebar'
import ToolLogo from '../ui/ToolLogo'

const CATEGORY_COLORS: Record<string, string> = {
  Generativity: 'bg-purple-100 text-purple-700',
  Automation: 'bg-blue-100 text-blue-700',
  Coding: 'bg-green-100 text-green-700',
  Vision: 'bg-pink-100 text-pink-700',
  Productivity: 'bg-indigo-100 text-indigo-700',
  Writing: 'bg-yellow-100 text-yellow-700',
  Video: 'bg-orange-100 text-orange-700',
  Audio: 'bg-teal-100 text-teal-700',
  Sales: 'bg-red-100 text-red-700',
}

type ToolNodeData = AITool & { onDelete?: (id: string) => void }

const ToolNode = memo(({ id, data, selected }: NodeProps) => {
  const tool = data as unknown as ToolNodeData

  return (
    <div
      className={`relative w-52 rounded-2xl border-2 bg-white shadow-sm transition-shadow ${
        selected ? 'border-[var(--g2-purple)] shadow-lg' : 'border-[var(--g2-border)]'
      }`}
    >
      {/* Delete button */}
      <button
        onClick={() => tool.onDelete?.(id)}
        aria-label={`Remove ${tool.name}`}
        className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full bg-white border border-[var(--g2-border)] flex items-center justify-center text-[var(--g2-muted)] hover:text-[var(--g2-orange)] hover:border-[var(--g2-orange)] transition-colors z-10"
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
            <p className="text-[13px] font-bold text-[#201f23] truncate">{tool.name}</p>
            <span
              className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${CATEGORY_COLORS[tool.category] ?? 'bg-gray-100 text-gray-600'}`}
            >
              {tool.category}
            </span>
          </div>
        </div>
        <p className="text-[11.5px] text-[#6f6d78] leading-relaxed">{tool.description}</p>
      </div>

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-[var(--g2-purple)] !border-2 !border-white !shadow"
      />
    </div>
  )
})

ToolNode.displayName = 'ToolNode'

export default ToolNode
