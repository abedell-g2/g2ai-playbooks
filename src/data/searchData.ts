export interface ProductData {
  id: string
  name: string
  domain: string
  category: string
  categoryColor: string
  shortDescription: string
  description: string
  rating: number
  reviewCount: number
  tags: string[]
  relatedIds: string[]
}

export interface PlaybookStep {
  toolId: string
  action: string
}

export interface PlaybookData {
  id: string
  title: string
  author: string
  authorRole: string
  company: string
  toolIds: string[]
  rating: number
  ratingCount: number
  description: string
  steps: PlaybookStep[]
}

export const PRODUCTS: ProductData[] = [
  {
    id: 'claude',
    name: 'Claude',
    domain: 'claude.ai',
    category: 'Generative',
    categoryColor: 'bg-violet-50 text-violet-500',
    shortDescription: 'AI assistant by Anthropic for analysis, writing, and coding',
    description:
      'Claude is Anthropic\'s AI assistant — helpful, harmless, and honest. Use it for complex analysis, long-form writing, code review, and nuanced reasoning across any domain.',
    rating: 4.7,
    reviewCount: 2341,
    tags: ['generative', 'writing', 'coding', 'analysis', 'assistant', 'anthropic', 'claude'],
    relatedIds: ['chatgpt', 'perplexity', 'cursor', 'copilot'],
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    domain: 'openai.com',
    category: 'Generative',
    categoryColor: 'bg-violet-50 text-violet-500',
    shortDescription: "The world's leading AI assistant by OpenAI",
    description:
      "ChatGPT is OpenAI's conversational AI that helps with writing, analysis, coding, math, and creative projects. Available in GPT-3.5 and GPT-4 variants with plugin support.",
    rating: 4.6,
    reviewCount: 12450,
    tags: ['generative', 'writing', 'coding', 'openai', 'gpt', 'chatgpt', 'assistant'],
    relatedIds: ['claude', 'perplexity', 'jasper', 'copilot'],
  },
  {
    id: 'cursor',
    name: 'Cursor',
    domain: 'cursor.com',
    category: 'Coding',
    categoryColor: 'bg-sky-50 text-sky-600',
    shortDescription: 'The AI-first code editor for pair programming',
    description:
      'Cursor is an AI-first code editor built on VS Code. It offers tab completion, inline code generation, and a built-in AI chat that understands your entire codebase.',
    rating: 4.8,
    reviewCount: 3120,
    tags: ['coding', 'developer', 'editor', 'ide', 'cursor', 'code', 'vscode'],
    relatedIds: ['copilot', 'claude', 'replit'],
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    domain: 'github.com',
    category: 'Coding',
    categoryColor: 'bg-sky-50 text-sky-600',
    shortDescription: 'AI pair programmer directly in your IDE',
    description:
      "GitHub Copilot is an AI pair programmer that offers autocomplete suggestions in real time. Trained on billions of lines of code, it integrates with VS Code, JetBrains, and more.",
    rating: 4.5,
    reviewCount: 8934,
    tags: ['coding', 'developer', 'github', 'copilot', 'autocomplete', 'ide'],
    relatedIds: ['cursor', 'claude', 'replit'],
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    domain: 'perplexity.ai',
    category: 'Research',
    categoryColor: 'bg-teal-50 text-teal-500',
    shortDescription: 'AI-powered search engine that cites sources',
    description:
      'Perplexity is an AI search engine that answers questions with cited sources in real time. It combines large language models with live web search for accurate, verifiable answers.',
    rating: 4.4,
    reviewCount: 5678,
    tags: ['search', 'research', 'perplexity', 'citations', 'web', 'ai search'],
    relatedIds: ['chatgpt', 'claude', 'notion-ai'],
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    domain: 'midjourney.com',
    category: 'Image Creation',
    categoryColor: 'bg-rose-50 text-rose-500',
    shortDescription: 'Text-to-image AI for stunning visual creation',
    description:
      'Midjourney is an AI image generator that creates stunning visuals from text prompts. Known for its artistic quality and ability to produce highly stylized, creative imagery.',
    rating: 4.6,
    reviewCount: 15230,
    tags: ['image', 'design', 'art', 'midjourney', 'generative', 'visual', 'creative', 'text-to-image'],
    relatedIds: ['chatgpt', 'notion-ai', 'jasper'],
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    domain: 'notion.so',
    category: 'Productivity',
    categoryColor: 'bg-indigo-50 text-indigo-500',
    shortDescription: 'AI writing and summarization built into Notion',
    description:
      'Notion AI integrates directly into your Notion workspace to help you write, summarize, translate, and brainstorm — without leaving the context of your notes and docs.',
    rating: 4.3,
    reviewCount: 4120,
    tags: ['productivity', 'writing', 'notion', 'notes', 'docs', 'workspace', 'summarize'],
    relatedIds: ['claude', 'jasper', 'perplexity', 'grammarly'],
  },
  {
    id: 'jasper',
    name: 'Jasper',
    domain: 'jasper.ai',
    category: 'Marketing',
    categoryColor: 'bg-orange-50 text-orange-500',
    shortDescription: 'AI marketing copy and content creation platform',
    description:
      'Jasper is an enterprise AI platform for marketing teams. Create on-brand content at scale — blog posts, ads, social media, email campaigns, and more with brand voice control.',
    rating: 4.2,
    reviewCount: 3456,
    tags: ['marketing', 'writing', 'content', 'jasper', 'copywriting', 'ads', 'seo'],
    relatedIds: ['chatgpt', 'notion-ai', 'grammarly'],
  },
  {
    id: 'replit',
    name: 'Replit',
    domain: 'replit.com',
    category: 'Coding',
    categoryColor: 'bg-sky-50 text-sky-600',
    shortDescription: 'Collaborative browser-based coding with AI assistance',
    description:
      'Replit is a cloud-based IDE that supports 50+ languages and includes an AI coding assistant (Ghostwriter). Build, run, and deploy apps directly from the browser.',
    rating: 4.1,
    reviewCount: 2890,
    tags: ['coding', 'developer', 'replit', 'ide', 'browser', 'deploy', 'cloud'],
    relatedIds: ['cursor', 'copilot', 'claude'],
  },
  {
    id: 'grammarly',
    name: 'Grammarly',
    domain: 'grammarly.com',
    category: 'Writing',
    categoryColor: 'bg-emerald-50 text-emerald-600',
    shortDescription: 'AI writing assistant for grammar, clarity, and tone',
    description:
      'Grammarly is an AI writing assistant that checks grammar, spelling, style, and tone in real time. Available as a browser extension, desktop app, and API for teams.',
    rating: 4.4,
    reviewCount: 9870,
    tags: ['writing', 'grammar', 'grammarly', 'editing', 'proofreading', 'clarity'],
    relatedIds: ['notion-ai', 'jasper', 'claude'],
  },
]

export const PLAYBOOKS: PlaybookData[] = [
  {
    id: 'atlassian-engineering',
    title: 'Atlassian AI Engineering Playbook',
    author: 'Marcus Chen',
    authorRole: 'Staff Engineer',
    company: 'Atlassian',
    toolIds: ['claude', 'cursor', 'copilot', 'perplexity'],
    rating: 4.8,
    ratingCount: 134,
    description:
      "How Atlassian's engineering teams use AI to accelerate development — from code review with Claude to IDE assistance with Cursor and Copilot.",
    steps: [
      { toolId: 'cursor', action: 'Write and refactor code with AI pair programming' },
      { toolId: 'copilot', action: 'Get intelligent autocomplete across all repositories' },
      { toolId: 'claude', action: 'Review PRs, generate test cases, and debug issues' },
      { toolId: 'perplexity', action: 'Research solutions and find relevant documentation' },
    ],
  },
  {
    id: 'hubspot-sales',
    title: 'HubSpot Sales AI Stack',
    author: 'Sarah Martinez',
    authorRole: 'VP of Sales',
    company: 'HubSpot',
    toolIds: ['chatgpt', 'jasper', 'perplexity', 'notion-ai'],
    rating: 4.6,
    ratingCount: 89,
    description:
      "The AI stack HubSpot's sales team uses to qualify leads, personalize outreach, and close deals faster.",
    steps: [
      { toolId: 'perplexity', action: 'Research prospects and gather company intelligence' },
      { toolId: 'chatgpt', action: 'Draft personalized outreach emails and follow-ups' },
      { toolId: 'jasper', action: 'Create sales collateral, case studies, and decks' },
      { toolId: 'notion-ai', action: 'Summarize call notes and update CRM records' },
    ],
  },
  {
    id: 'figma-design',
    title: 'Figma Design Team AI Workflow',
    author: 'Priya Patel',
    authorRole: 'Design Lead',
    company: 'Figma',
    toolIds: ['midjourney', 'chatgpt', 'claude', 'notion-ai'],
    rating: 4.7,
    ratingCount: 211,
    description:
      "From ideation to handoff — how Figma's design team integrates AI to speed up research, generate concepts, and document design decisions.",
    steps: [
      { toolId: 'midjourney', action: 'Generate visual concepts and mood boards' },
      { toolId: 'chatgpt', action: 'Write UX copy and microcopy variants' },
      { toolId: 'claude', action: 'Analyze user research and synthesize insights' },
      { toolId: 'notion-ai', action: 'Document design decisions and create specs' },
    ],
  },
  {
    id: 'shopify-ecommerce',
    title: 'Shopify E-commerce AI Playbook',
    author: 'Jordan Kim',
    authorRole: 'Growth Manager',
    company: 'Shopify',
    toolIds: ['jasper', 'chatgpt', 'midjourney', 'cursor'],
    rating: 4.5,
    ratingCount: 67,
    description:
      'How Shopify merchants use AI to create product listings, generate ad creative, and automate customer support at scale.',
    steps: [
      { toolId: 'midjourney', action: 'Create product photography and ad visuals' },
      { toolId: 'jasper', action: 'Write product descriptions and email campaigns' },
      { toolId: 'chatgpt', action: 'Build customer FAQ and support templates' },
      { toolId: 'cursor', action: 'Customize Shopify theme and automation scripts' },
    ],
  },
  {
    id: 'vercel-frontend',
    title: 'Vercel Frontend Engineering Stack',
    author: 'Alex Thompson',
    authorRole: 'Frontend Engineer',
    company: 'Vercel',
    toolIds: ['cursor', 'claude', 'copilot', 'chatgpt'],
    rating: 4.9,
    ratingCount: 302,
    description:
      "The AI tools powering Vercel's frontend engineering team — from building Next.js apps to debugging performance issues.",
    steps: [
      { toolId: 'cursor', action: 'Build and refactor Next.js components with AI' },
      { toolId: 'copilot', action: 'Get AI completions while typing' },
      { toolId: 'claude', action: 'Debug complex issues and optimize performance' },
      { toolId: 'chatgpt', action: 'Generate documentation and API references' },
    ],
  },
  {
    id: 'content-marketing',
    title: 'Content Marketing AI Workflow',
    author: 'Emma Wilson',
    authorRole: 'Content Strategist',
    company: 'Buffer',
    toolIds: ['perplexity', 'claude', 'jasper', 'grammarly', 'midjourney'],
    rating: 4.4,
    ratingCount: 156,
    description:
      'A complete AI workflow for content teams — from research and ideation to writing, editing, and distributing at scale.',
    steps: [
      { toolId: 'perplexity', action: 'Research trending topics and gather sources' },
      { toolId: 'claude', action: 'Create outlines and first drafts' },
      { toolId: 'jasper', action: 'Generate ad copy and social media variants' },
      { toolId: 'grammarly', action: 'Edit and polish final copy' },
      { toolId: 'midjourney', action: 'Create custom blog header images' },
    ],
  },
  {
    id: 'startup-mvp',
    title: 'Startup MVP Builder Playbook',
    author: 'David Park',
    authorRole: 'Founder & CTO',
    company: 'YC S24',
    toolIds: ['claude', 'cursor', 'replit', 'chatgpt', 'perplexity'],
    rating: 4.8,
    ratingCount: 445,
    description:
      'How to go from idea to shipped MVP in days using AI. A no-nonsense playbook for founders who want to build fast.',
    steps: [
      { toolId: 'perplexity', action: 'Validate idea and research competitors' },
      { toolId: 'claude', action: 'Architect the product and write technical specs' },
      { toolId: 'cursor', action: 'Build the core product features' },
      { toolId: 'replit', action: 'Deploy and test in the browser instantly' },
      { toolId: 'chatgpt', action: 'Create landing page copy and pitch deck' },
    ],
  },
  {
    id: 'legal-research',
    title: 'Law Firm AI Research Playbook',
    author: 'Rebecca Torres',
    authorRole: 'Senior Associate',
    company: 'Davis Polk',
    toolIds: ['claude', 'perplexity', 'notion-ai', 'grammarly'],
    rating: 4.6,
    ratingCount: 78,
    description:
      'How modern law firms use AI for case research, document drafting, and due diligence — while keeping privileged information secure.',
    steps: [
      { toolId: 'perplexity', action: 'Research case law and regulatory precedents' },
      { toolId: 'claude', action: 'Summarize lengthy documents and identify key issues' },
      { toolId: 'grammarly', action: 'Review and polish legal memos and briefs' },
      { toolId: 'notion-ai', action: 'Organize research notes and timelines' },
    ],
  },
]

export function searchProducts(query: string): ProductData[] {
  const q = query.toLowerCase().trim()
  if (!q) return PRODUCTS.slice(0, 5)
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q)) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q),
  )
}

export function searchPlaybooks(query: string): PlaybookData[] {
  const q = query.toLowerCase().trim()
  if (!q) return PLAYBOOKS.slice(0, 5)
  return PLAYBOOKS.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.company.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.toolIds.some((id) => id.includes(q)) ||
      p.author.toLowerCase().includes(q),
  )
}

export function getProductById(id: string): ProductData | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function getPlaybookById(id: string): PlaybookData | undefined {
  return PLAYBOOKS.find((p) => p.id === id)
}
