import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import G2Logo from '../ui/G2Logo'
import LoginCard from './LoginCard'
import { useDemo } from '../../context/DemoContext'

const modelContent = {
  A: {
    badge: 'New on G2.AI Playbooks',
    headline: 'Share your AI expertise.\nGet paid.',
    sub: 'Earn a commission every time a reader purchases a tool you recommended in your playbook.',
    features: ['Up to 15% commission', 'Real-time earnings dashboard', 'Monthly Stripe payouts'],
    cardTitle: 'Create your account',
    cardSubtitle: 'Start earning from your AI expertise today.',
  },
  B: {
    badge: 'Powered by G2.AI',
    headline: 'Your AI stack,\noptimized.',
    sub: 'Share your workflow and our AI surfaces cheaper alternatives, spots redundancies, and highlights emerging tools.',
    features: ['Find cheaper alternatives', 'Spot redundancies', 'Emerging tool alerts'],
    cardTitle: 'Analyze my AI stack',
    cardSubtitle: 'Get your personalized optimization report in minutes.',
  },
}

export default function LoginModal() {
  const { model, loginModalOpen, closeLoginModal, setModel } = useDemo()
  const backdropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loginModalOpen) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeLoginModal()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [loginModalOpen, closeLoginModal])

  if (!loginModalOpen || model === 'auth') return null

  const content = modelContent[model]

  function handleSuccess() {
    setModel('auth')
    closeLoginModal()
  }

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === backdropRef.current) closeLoginModal() }}
    >
      <div className="w-full max-w-[800px] flex rounded-2xl overflow-hidden border border-[var(--g2-border)] shadow-2xl shadow-black/40 max-h-[90vh]">

        {/* ── Left: pitch panel ── */}
        <div className="hidden sm:flex flex-col justify-center w-[42%] shrink-0 bg-gradient-to-br from-[#0d0a2e] via-[#1a1060] to-[#5746b2] px-9 py-10 text-white">
          <G2Logo className="h-6 w-auto self-start mb-9" />

          <span className="text-[11px] font-bold uppercase tracking-widest text-purple-300 mb-4 block">
            {content.badge}
          </span>

          <h2 className="text-[26px] font-black leading-[1.1] mb-4 whitespace-pre-line">
            {content.headline}
          </h2>

          <p className="text-[13.5px] text-white/70 leading-relaxed mb-7">
            {content.sub}
          </p>

          <div className="flex flex-col gap-2.5">
            {content.features.map((f) => (
              <span
                key={f}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-white text-[12.5px] font-semibold self-start"
              >
                <span aria-hidden="true" className="text-[10px]">✓</span>
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right: login form ── */}
        <div className="flex-1 flex flex-col justify-center bg-[var(--g2-bg)] px-9 py-10 relative overflow-y-auto">
          <button
            onClick={closeLoginModal}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-[var(--g2-muted)] hover:text-[var(--g2-dark)] hover:bg-[var(--g2-border)]/50 transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>

          <LoginCard
            title={content.cardTitle}
            subtitle={content.cardSubtitle}
            onSuccess={handleSuccess}
          />
        </div>

      </div>
    </div>
  )
}
