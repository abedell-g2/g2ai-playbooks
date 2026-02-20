import { useState } from 'react'
import { Search } from 'lucide-react'
import ToolLogo from '../ui/ToolLogo'

export interface AITool {
  id: string
  name: string
  domain?: string
  category: string
  description: string
}

export const AI_TOOLS: AITool[] = [
  { id: 'claude',         name: 'Claude',         domain: 'anthropic.com',     category: 'Generativity', description: 'Anthropic\'s AI assistant' },
  { id: 'chatgpt',        name: 'ChatGPT',        domain: 'openai.com',        category: 'Generativity', description: 'OpenAI conversational AI' },
  { id: 'gemini',         name: 'Gemini',         domain: 'gemini.google.com', category: 'Generativity', description: 'Google\'s multimodal AI' },
  { id: 'n8n',            name: 'N8N',            domain: 'n8n.io',            category: 'Automation',   description: 'Workflow automation platform' },
  { id: 'zapier',         name: 'Zapier',         domain: 'zapier.com',        category: 'Automation',   description: 'Connect apps & automate work' },
  { id: 'github-copilot', name: 'GitHub Copilot', domain: 'github.com',        category: 'Coding',       description: 'AI pair programmer' },
  { id: 'midjourney',     name: 'Midjourney',     domain: 'midjourney.com',    category: 'Vision',       description: 'AI image generation' },
  { id: 'dalle',          name: 'DALL-E',         domain: 'openai.com',        category: 'Vision',       description: 'OpenAI image generation' },
  { id: 'notion-ai',      name: 'Notion AI',      domain: 'notion.so',         category: 'Productivity', description: 'AI-powered workspace' },
  { id: 'jasper',         name: 'Jasper',         domain: 'jasper.ai',         category: 'Writing',      description: 'AI marketing copywriter' },
  { id: 'copyai',         name: 'Copy.ai',        domain: 'copy.ai',           category: 'Writing',      description: 'AI copywriting tool' },
  { id: 'grammarly',      name: 'Grammarly',      domain: 'grammarly.com',     category: 'Writing',      description: 'AI writing assistant' },
  { id: 'runway',         name: 'Runway',         domain: 'runwayml.com',      category: 'Video',        description: 'AI video generation' },
  { id: 'synthesia',      name: 'Synthesia',      domain: 'synthesia.io',      category: 'Video',        description: 'AI avatar videos' },
  { id: 'elevenlabs',     name: 'ElevenLabs',     domain: 'elevenlabs.io',     category: 'Audio',        description: 'AI voice generation' },
  { id: 'deepl',          name: 'DeepL',          domain: 'deepl.com',         category: 'Writing',      description: 'AI translation' },
  { id: 'gong',           name: 'Gong',           domain: 'gong.io',           category: 'Sales',        description: 'Revenue intelligence AI' },
  { id: 'zoominfo',       name: 'ZoomInfo',       domain: 'zoominfo.com',      category: 'Sales',        description: 'B2B data & intelligence' },
  { id: 'huggingface',    name: 'Hugging Face',   domain: 'huggingface.co',    category: 'Generativity', description: 'Open-source AI models' },
  { id: 'replicate',      name: 'Replicate',      domain: 'replicate.com',     category: 'Generativity', description: 'Run AI models in the cloud' },
]

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

export default function ToolSidebar() {
  const [query, setQuery] = useState('')

  const filtered = AI_TOOLS.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.category.toLowerCase().includes(query.toLowerCase())
  )

  const onDragStart = (e: React.DragEvent, tool: AITool) => {
    e.dataTransfer.setData('application/g2-tool', JSON.stringify(tool))
    e.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside
      aria-label="AI tool library"
      className="w-64 shrink-0 h-full flex flex-col border-r border-[var(--g2-border)] bg-[var(--g2-bg)]"
    >
      {/* Sidebar header */}
      <div className="p-4 border-b border-[var(--g2-border)]">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--g2-muted)] mb-3">
          AI Tools
        </p>
        <div className="flex items-center gap-2 rounded-lg border border-[var(--g2-border)] px-3 py-2 bg-[var(--g2-bg)] focus-within:border-[var(--g2-purple)]">
          <Search size={14} className="text-[var(--g2-muted)] shrink-0" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-[13px] bg-transparent text-[var(--g2-dark)] placeholder:text-[var(--g2-muted)] outline-none"
            aria-label="Search AI tools"
          />
        </div>
      </div>

      {/* Drag hint */}
      <p className="px-4 pt-3 pb-1 text-[11px] text-[var(--g2-muted)]">
        Drag tools onto the canvas to add them to your playbook.
      </p>

      {/* Tool list */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1.5">
        {filtered.map((tool) => (
          <div
            key={tool.id}
            draggable
            onDragStart={(e) => onDragStart(e, tool)}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-[var(--g2-border)] cursor-grab active:cursor-grabbing hover:border-[var(--g2-purple)] hover:bg-[var(--g2-purple-light)] transition-colors select-none"
            title={tool.description}
          >
            <ToolLogo domain={tool.domain} name={tool.name} size={28} className="shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[12.5px] font-semibold text-[var(--g2-dark)] truncate">{tool.name}</p>
              <span
                className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${CATEGORY_COLORS[tool.category] ?? 'bg-gray-100 text-gray-600'}`}
              >
                {tool.category}
              </span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-[13px] text-[var(--g2-muted)] py-8">No tools found</p>
        )}
      </div>
    </aside>
  )
}
