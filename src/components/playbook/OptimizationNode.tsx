import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import ToolLogo from '../ui/ToolLogo'
import type { OptType } from '../../data/optimizationData'

export type OptimizationNodeData = {
  name: string
  domain: string
  category: string
  type: OptType
  metric: string
  detail: string
} & Record<string, unknown>

const TYPE_CONFIG: Record<OptType, { border: string; badgeBg: string; badgeText: string; icon: string; label: string }> = {
  cost: {
    border: '#10b981',
    badgeBg: '#ecfdf5',
    badgeText: '#065f46',
    icon: '💸',
    label: 'Cost Saving',
  },
  speed: {
    border: '#3b82f6',
    badgeBg: '#eff6ff',
    badgeText: '#1e40af',
    icon: '⚡',
    label: 'Speed Boost',
  },
  capability: {
    border: '#8b5cf6',
    badgeBg: '#f5f3ff',
    badgeText: '#5b21b6',
    icon: '✨',
    label: 'Better Capability',
  },
}

const OptimizationNode = memo(({ data }: NodeProps) => {
  const d = data as unknown as OptimizationNodeData
  const cfg = TYPE_CONFIG[d.type] ?? TYPE_CONFIG.capability

  return (
    <div
      className="relative w-48 rounded-2xl bg-[var(--g2-surface)] shadow-md"
      style={{ border: `2px solid ${cfg.border}` }}
    >
      {/* Top handle — receives the dashed branch edge */}
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className="!w-3 !h-3 !border-2 !border-white !shadow"
        style={{ background: cfg.border }}
      />

      {/* Type badge */}
      <div className="px-2.5 pt-2.5 pb-0">
        <span
          className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{ background: cfg.badgeBg, color: cfg.badgeText }}
        >
          {cfg.icon} {cfg.label}
        </span>
      </div>

      {/* Tool info */}
      <div className="p-2.5">
        <div className="flex items-center gap-2 mb-2">
          <ToolLogo domain={d.domain} name={d.name} size={26} className="shrink-0" />
          <p className="text-[12.5px] font-bold text-[var(--g2-dark)] truncate">{d.name}</p>
        </div>

        {/* Metric headline */}
        <p
          className="text-[15px] font-black leading-tight mb-0.5"
          style={{ color: cfg.border }}
        >
          {d.metric}
        </p>

        {/* Detail */}
        <p className="text-[11px] text-[var(--g2-muted)] leading-snug">{d.detail}</p>
      </div>

      {/* Bottom source handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="!w-3 !h-3 !border-2 !border-white !shadow"
        style={{ background: cfg.border }}
      />
    </div>
  )
})

OptimizationNode.displayName = 'OptimizationNode'
export default OptimizationNode
