import ToolCard, { type Tool } from '../ui/ToolCard'

const TRENDING_TOOLS: Tool[] = [
  {
    name: 'Automateed',
    domain: 'automateed.com',
    category: 'Writing',
    categoryColor: 'bg-green-100 text-green-700',
    description: 'Create eBooks effortlessly with Automateed, the AI-powered writing tool.',
    previewBg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    previewContent: 'AUTOMATEED',
    rating: 3.8,
    likes: 38,
    comments: 12,
  },
  {
    name: 'BeatJar',
    domain: 'beatjar.com',
    category: 'Music',
    categoryColor: 'bg-orange-100 text-orange-700',
    description: 'Turn your story into a custom song with AI-powered music generation.',
    previewBg: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b69 50%, #11998e 100%)',
    previewContent: 'BEATJAR',
    rating: 2.5,
    likes: 24,
    comments: 8,
  },
  {
    name: 'PromptWatch',
    domain: 'promptwatch.io',
    category: 'SEO',
    categoryColor: 'bg-blue-100 text-blue-700',
    description: 'Boost your company\'s visibility in AI search results and get discovered.',
    previewBg: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 50%, #42a5f5 100%)',
    previewContent: 'PromptWatch',
    rating: 4.1,
    likes: 31,
    comments: 15,
  },
  {
    name: 'X-Pilot AI',
    domain: 'xpilot.ai',
    category: 'Education',
    categoryColor: 'bg-red-100 text-red-700',
    description: 'Turn live Zoom or Course videos into structured knowledge with AI visualization.',
    previewBg: 'linear-gradient(135deg, #b71c1c 0%, #c62828 50%, #ef5350 100%)',
    previewContent: 'X-Pilot',
    rating: 2.5,
    likes: 19,
    comments: 6,
  },
  {
    name: 'Guidde',
    domain: 'guidde.com',
    category: 'Video',
    categoryColor: 'bg-purple-100 text-purple-700',
    description: 'Create step-by-step video instructions automatically with AI assistance.',
    previewBg: 'linear-gradient(135deg, #4a148c 0%, #6a1b9a 50%, #ab47bc 100%)',
    previewContent: 'guidde',
    rating: 2.6,
    likes: 42,
    comments: 20,
  },
  {
    name: 'DeepReel',
    domain: 'deepreel.com',
    category: 'Video',
    categoryColor: 'bg-orange-100 text-orange-700',
    description: 'AI agent for Videos and Images — generate, edit, and enhance with ease.',
    previewBg: 'linear-gradient(135deg, #e65100 0%, #f4511e 50%, #ff7043 100%)',
    previewContent: 'DeepReel',
    rating: 2.6,
    likes: 33,
    comments: 11,
  },
  {
    name: 'Runable',
    domain: 'runable.com',
    category: 'Generativity',
    categoryColor: 'bg-teal-100 text-teal-700',
    description: 'World\'s first design-driven general AI agent for workflow automation.',
    previewBg: 'linear-gradient(135deg, #004d40 0%, #00695c 50%, #26a69a 100%)',
    previewContent: 'Runable',
    rating: 3.9,
    likes: 27,
    comments: 9,
  },
  {
    name: 'Intervo AI',
    domain: 'intervo.ai',
    category: 'Generativity',
    categoryColor: 'bg-teal-100 text-teal-700',
    description: 'Open-source platform for conversational AI agents — build and deploy easily.',
    previewBg: 'linear-gradient(135deg, #1a237e 0%, #283593 50%, #5c6bc0 100%)',
    previewContent: 'Intervo',
    rating: 3.2,
    likes: 16,
    comments: 4,
  },
  {
    name: 'Loti',
    domain: 'loti.com',
    category: 'Legal',
    categoryColor: 'bg-slate-100 text-slate-700',
    description: 'Protect public figures from online content misuse with AI-powered monitoring.',
    previewBg: 'linear-gradient(135deg, #37474f 0%, #455a64 50%, #78909c 100%)',
    previewContent: 'Loti',
    rating: 4.3,
    likes: 22,
    comments: 7,
  },
]

export default function TrendingGrid() {
  return (
    <section aria-labelledby="trending-heading" className="max-w-[1160px] mx-auto px-8 pt-4 pb-20">

      <div className="flex items-center gap-2.5 mb-10">
        <h2 id="trending-heading" className="text-[24px] font-black text-[var(--g2-dark)]">
          Trending
        </h2>
        <span aria-hidden="true" className="text-2xl">📈</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {TRENDING_TOOLS.map((tool) => (
          <ToolCard key={tool.name} tool={tool} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button className="px-7 py-3 rounded-full border border-[var(--g2-border)] text-[var(--g2-text)] text-[13px] font-semibold hover:border-[var(--g2-purple)] hover:text-[var(--g2-purple)] transition-colors">
          See All
        </button>
      </div>

    </section>
  )
}
