export type OptType = 'cost' | 'speed' | 'capability'

export interface OptSuggestion {
  altToolId: string
  type: OptType
  metric: string   // headline e.g. "Save $8/mo"
  detail: string   // one-liner e.g. "Similar features at lower cost"
}

// Maps a source toolId to its single best optimization suggestion
export const OPTIMIZATION_MAP: Record<string, OptSuggestion> = {
  chatgpt: {
    altToolId: 'claude',
    type: 'capability',
    metric: 'Better reasoning',
    detail: 'Stronger on complex, multi-step analysis tasks',
  },
  cursor: {
    altToolId: 'copilot',
    type: 'cost',
    metric: 'Save ~$8/mo',
    detail: 'Similar AI coding assistance at a lower price',
  },
  copilot: {
    altToolId: 'cursor',
    type: 'capability',
    metric: 'Full repo context',
    detail: 'Deeper codebase awareness for AI completions',
  },
  'notion-ai': {
    altToolId: 'perplexity',
    type: 'speed',
    metric: '3× faster research',
    detail: 'Real-time web search built directly in',
  },
  jasper: {
    altToolId: 'claude',
    type: 'capability',
    metric: 'More natural output',
    detail: 'Better tone control and long-form coherence',
  },
  grammarly: {
    altToolId: 'claude',
    type: 'capability',
    metric: 'Richer rewrites',
    detail: 'Rewrites full passages, not just corrections',
  },
  replit: {
    altToolId: 'cursor',
    type: 'capability',
    metric: 'Deeper AI pairing',
    detail: 'Better model integration for local development',
  },
  perplexity: {
    altToolId: 'claude',
    type: 'capability',
    metric: 'Deeper analysis',
    detail: 'Better at synthesis and long-form reasoning',
  },
  claude: {
    altToolId: 'perplexity',
    type: 'speed',
    metric: 'Real-time sources',
    detail: 'Live web search for up-to-date research tasks',
  },
}
