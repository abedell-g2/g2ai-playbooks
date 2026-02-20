import ToolCard, { type Tool } from '../ui/ToolCard'

const BASE = import.meta.env.BASE_URL

const PRODUCT_IMAGES = [
  `${BASE}images/product-images/rounded-1.png`,
  `${BASE}images/product-images/rounded-2.png`,
  `${BASE}images/product-images/rounded-3.png`,
  `${BASE}images/product-images/rounded-4.png`,
  `${BASE}images/product-images/rounded-5.png`,
  `${BASE}images/product-images/rounded-6.png`,
  `${BASE}images/product-images/rounded-7.png`,
  `${BASE}images/product-images/rounded.png`,
]

const TRENDING_TOOLS: Tool[] = [
  {
    name: 'Automateed',
    domain: 'automateed.com',
    category: 'Writing',
    categoryColor: 'bg-emerald-50 text-emerald-600',
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
    categoryColor: 'bg-amber-50 text-amber-600',
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
    categoryColor: 'bg-sky-50 text-sky-600',
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
    categoryColor: 'bg-rose-50 text-rose-500',
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
    categoryColor: 'bg-violet-50 text-violet-500',
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
    categoryColor: 'bg-orange-50 text-orange-500',
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
    category: 'Generative',
    categoryColor: 'bg-teal-50 text-teal-500',
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
    category: 'Generative',
    categoryColor: 'bg-teal-50 text-teal-500',
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
    categoryColor: 'bg-slate-50 text-slate-500',
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
        <svg aria-hidden="true" className="h-5 w-auto text-[var(--g2-purple)]" viewBox="0 0 512 512" fill="currentColor">
          <path d="M511.58,140.9c-.07-.73-.18-1.45-.31-2.16l0-.14c-.14-.71-.31-1.41-.51-2.09,0-.06,0-.12-.05-.17-.2-.68-.44-1.34-.7-2l-.09-.23c-.26-.64-.55-1.26-.87-1.87,0-.09-.09-.18-.14-.27-.32-.61-.67-1.2-1-1.78l-.17-.25c-.4-.6-.83-1.18-1.28-1.74l-.12-.16c-.51-.62-1-1.21-1.6-1.77h0c-.57-.56-1.16-1.1-1.77-1.6l-.16-.13c-.56-.45-1.14-.88-1.74-1.28l-.26-.16q-.87-.56-1.77-1l-.28-.14q-.92-.47-1.86-.87l-.25-.09q-1-.39-2-.69l-.18-.06c-.68-.19-1.38-.37-2.08-.5l-.16,0c-.7-.13-1.41-.24-2.14-.31h-.14c-.72-.07-1.44-.1-2.18-.11H356.48a24,24,0,0,0,0,48h73.27L305.65,291.34l-102-102a24,24,0,0,0-33.94,0L7.34,351.79a24,24,0,1,0,33.94,33.95L186.72,240.29l102,102a24,24,0,0,0,33.94,0L463.69,201.18v73.26a24,24,0,0,0,48,0V143.24h0c0-.75,0-1.48-.1-2.21A.49.49,0,0,1,511.58,140.9Z"/>
        </svg>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {TRENDING_TOOLS.map((tool, i) => (
          <ToolCard key={tool.name} tool={{ ...tool, previewImage: PRODUCT_IMAGES[i % PRODUCT_IMAGES.length] }} />
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
