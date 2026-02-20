import ToolCard, { type Tool } from '../ui/ToolCard'

const TRENDING_TOOLS: Tool[] = [
  {
    name: 'Automateed',
    category: 'Writing',
    categoryColor: 'bg-green-100 text-green-700',
    description: 'Create eBooks effortlessly with Automateed, the AI-powered writing tool.',
    previewBg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    previewContent: 'AUTOMATEED',
    logoEmoji: '📝',
    likes: 38,
    comments: 12,
  },
  {
    name: 'BeatJar',
    category: 'Music',
    categoryColor: 'bg-orange-100 text-orange-700',
    description: 'Turn your story into a custom song with AI-powered music generation.',
    previewBg: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b69 50%, #11998e 100%)',
    previewContent: 'BEATJAR',
    logoEmoji: '🎵',
    likes: 24,
    comments: 8,
  },
  {
    name: 'PromptWatch',
    category: 'SEO',
    categoryColor: 'bg-blue-100 text-blue-700',
    description: 'Boost your company\'s visibility in AI search results and get discovered.',
    previewBg: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 50%, #42a5f5 100%)',
    previewContent: 'PromptWatch',
    logoEmoji: '🔍',
    likes: 31,
    comments: 15,
  },
  {
    name: 'X-Pilot AI',
    category: 'Education',
    categoryColor: 'bg-red-100 text-red-700',
    description: 'Turn live Zoom or Course videos into structured knowledge with AI visualization.',
    previewBg: 'linear-gradient(135deg, #b71c1c 0%, #c62828 50%, #ef5350 100%)',
    previewContent: 'X-Pilot',
    logoEmoji: '🚀',
    likes: 19,
    comments: 6,
  },
  {
    name: 'Guidde',
    category: 'Video',
    categoryColor: 'bg-purple-100 text-purple-700',
    description: 'Create step-by-step video instructions automatically with AI assistance.',
    previewBg: 'linear-gradient(135deg, #4a148c 0%, #6a1b9a 50%, #ab47bc 100%)',
    previewContent: 'guidde',
    logoEmoji: '🎬',
    likes: 42,
    comments: 20,
  },
  {
    name: 'DeepReel',
    category: 'Video',
    categoryColor: 'bg-orange-100 text-orange-700',
    description: 'AI agent for Videos and Images — generate, edit, and enhance with ease.',
    previewBg: 'linear-gradient(135deg, #e65100 0%, #f4511e 50%, #ff7043 100%)',
    previewContent: 'DeepReel',
    logoEmoji: '🎥',
    likes: 33,
    comments: 11,
  },
  {
    name: 'Runable',
    category: 'Generativity',
    categoryColor: 'bg-teal-100 text-teal-700',
    description: 'World\'s first design-driven general AI agent for workflow automation.',
    previewBg: 'linear-gradient(135deg, #004d40 0%, #00695c 50%, #26a69a 100%)',
    previewContent: 'Runable',
    logoEmoji: '⚡',
    likes: 27,
    comments: 9,
  },
  {
    name: 'Intervo AI',
    category: 'Generativity',
    categoryColor: 'bg-teal-100 text-teal-700',
    description: 'Open-source platform for conversational AI agents — build and deploy easily.',
    previewBg: 'linear-gradient(135deg, #1a237e 0%, #283593 50%, #5c6bc0 100%)',
    previewContent: 'Intervo',
    logoEmoji: '💬',
    likes: 16,
    comments: 4,
  },
  {
    name: 'Loti',
    category: 'Legal',
    categoryColor: 'bg-slate-100 text-slate-700',
    description: 'Protect public figures from online content misuse with AI-powered monitoring.',
    previewBg: 'linear-gradient(135deg, #37474f 0%, #455a64 50%, #78909c 100%)',
    previewContent: 'Loti',
    logoEmoji: '🛡️',
    likes: 22,
    comments: 7,
  },
]

export default function TrendingGrid() {
  return (
    <section aria-labelledby="trending-heading" className="max-w-[1200px] mx-auto px-6 pb-16">
      {/* Section heading */}
      <div className="flex items-center gap-2 mb-6">
        <h2
          id="trending-heading"
          className="text-[22px] font-black text-[var(--g2-dark)]"
        >
          Trending
        </h2>
        <span aria-hidden="true" className="text-xl">📈</span>
      </div>

      {/* 3-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TRENDING_TOOLS.map((tool) => (
          <ToolCard key={tool.name} tool={tool} />
        ))}
      </div>

      {/* Load more */}
      <div className="flex justify-center mt-8">
        <button className="px-6 py-2.5 rounded-full border border-[var(--g2-border)] text-[var(--g2-text)] text-[13px] font-semibold hover:border-[var(--g2-purple)] hover:text-[var(--g2-purple)] transition-colors">
          See All
        </button>
      </div>
    </section>
  )
}
