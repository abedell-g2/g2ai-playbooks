export type OptType = 'cost' | 'speed' | 'capability'

export interface OptSuggestion {
  altToolId: string
  type: OptType
  metric: string   // headline e.g. "Save $8/mo"
  detail: string   // one-liner e.g. "Similar features at lower cost"
}

// Maps a source toolId to its single best optimization suggestion
export const OPTIMIZATION_MAP: Record<string, OptSuggestion> = {
  // Generative AI
  chatgpt: { altToolId: 'claude', type: 'capability', metric: 'Better reasoning', detail: 'Stronger on complex, multi-step analysis tasks' },
  claude: { altToolId: 'perplexity', type: 'speed', metric: 'Real-time sources', detail: 'Live web search for up-to-date research tasks' },
  'google-gemini': { altToolId: 'claude', type: 'capability', metric: 'Stronger reasoning', detail: 'Better at nuanced analysis and long-form writing' },
  'microsoft-copilot': { altToolId: 'claude', type: 'capability', metric: 'More versatile', detail: 'Works across any tool, not just Microsoft 365' },
  // Coding
  cursor: { altToolId: 'windsurf', type: 'capability', metric: 'Agentic coding', detail: 'Executes multi-step changes autonomously across your repo' },
  copilot: { altToolId: 'cursor', type: 'capability', metric: 'Full repo context', detail: 'Deeper codebase awareness and inline AI chat' },
  windsurf: { altToolId: 'cursor', type: 'capability', metric: 'Mature ecosystem', detail: 'Larger plugin library and more stable completions' },
  codeium: { altToolId: 'copilot', type: 'capability', metric: 'Deeper integrations', detail: 'More IDE plugins and enterprise support options' },
  tabnine: { altToolId: 'codeium', type: 'cost', metric: 'Free tier available', detail: 'Similar privacy controls with a generous free plan' },
  replit: { altToolId: 'cursor', type: 'capability', metric: 'Deeper AI pairing', detail: 'Better model integration for local development' },
  // Writing
  jasper: { altToolId: 'copy-ai', type: 'cost', metric: 'Save ~$40/mo', detail: 'Similar marketing output with workflow automation included' },
  grammarly: { altToolId: 'writer', type: 'capability', metric: 'Brand controls', detail: 'Enforces org-wide style guides and terminology' },
  'copy-ai': { altToolId: 'jasper', type: 'capability', metric: 'Brand voice', detail: 'Stronger long-form and brand consistency features' },
  writesonic: { altToolId: 'jasper', type: 'capability', metric: 'Better quality', detail: 'More coherent long-form output and brand controls' },
  writer: { altToolId: 'grammarly', type: 'cost', metric: 'Lower per-seat cost', detail: 'More affordable for large teams with similar quality' },
  wordtune: { altToolId: 'grammarly', type: 'capability', metric: 'Deeper grammar checks', detail: 'More comprehensive error detection and suggestions' },
  // Research
  perplexity: { altToolId: 'claude', type: 'capability', metric: 'Deeper analysis', detail: 'Better at synthesis and long-form reasoning' },
  'you-com': { altToolId: 'perplexity', type: 'capability', metric: 'Better citations', detail: 'More reliable source attribution and real-time accuracy' },
  elicit: { altToolId: 'perplexity', type: 'speed', metric: 'Broader web coverage', detail: 'Real-time web results beyond academic literature' },
  // Image
  midjourney: { altToolId: 'adobe-firefly', type: 'capability', metric: 'Commercial rights', detail: 'Commercially safe with no copyright concerns' },
  'adobe-firefly': { altToolId: 'midjourney', type: 'capability', metric: 'Higher artistry', detail: 'More stylized and creative image quality' },
  'canva-ai': { altToolId: 'adobe-firefly', type: 'capability', metric: 'More powerful models', detail: 'Better image quality for professional creative work' },
  'stability-ai': { altToolId: 'midjourney', type: 'capability', metric: 'Better quality', detail: 'Consistently higher-quality outputs out of the box' },
  // Video
  runway: { altToolId: 'heygen', type: 'cost', metric: 'Save ~$50/mo', detail: 'Similar talking-head video at a lower price point' },
  heygen: { altToolId: 'synthesia', type: 'capability', metric: 'More avatar options', detail: '230+ avatars vs 40+ with stronger enterprise support' },
  synthesia: { altToolId: 'heygen', type: 'cost', metric: 'More affordable', detail: 'Lower per-video cost for high-volume use cases' },
  // Audio
  elevenlabs: { altToolId: 'murf-ai', type: 'cost', metric: 'Save ~$15/mo', detail: 'Similar voice quality at a more accessible price' },
  'murf-ai': { altToolId: 'elevenlabs', type: 'capability', metric: 'More realistic voices', detail: 'Best-in-class voice cloning and emotional range' },
  descript: { altToolId: 'otter-ai', type: 'cost', metric: 'Save ~$10/mo', detail: 'Solid transcription without the full editing suite' },
  // Productivity
  'notion-ai': { altToolId: 'microsoft-copilot', type: 'capability', metric: 'Deeper integrations', detail: 'Embedded across Office, Teams, and your entire workflow' },
  'otter-ai': { altToolId: 'fireflies-ai', type: 'capability', metric: 'CRM sync', detail: 'Automatically pushes summaries to HubSpot and Salesforce' },
  'fireflies-ai': { altToolId: 'otter-ai', type: 'capability', metric: 'Better accuracy', detail: 'Higher transcription accuracy with speaker detection' },
  // Sales
  gong: { altToolId: 'fireflies-ai', type: 'cost', metric: 'Save ~$100/mo', detail: 'Solid call recording and summaries at a fraction of the cost' },
  lavender: { altToolId: 'copy-ai', type: 'capability', metric: 'Full sequences', detail: 'Builds entire outreach workflows, not just single emails' },
  apollo: { altToolId: 'chatgpt', type: 'cost', metric: 'Save on enrichment', detail: 'Use AI for personalization without a dedicated platform' },
  superhuman: { altToolId: 'microsoft-copilot', type: 'cost', metric: 'Save ~$25/mo', detail: 'Copilot in Outlook handles email AI at no extra cost' },
  // Data
  'julius-ai': { altToolId: 'claude', type: 'capability', metric: 'Broader use cases', detail: 'More versatile beyond data — coding, writing, analysis' },
}
