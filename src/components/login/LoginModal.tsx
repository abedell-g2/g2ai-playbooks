import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import G2Logo from '../ui/G2Logo'
import LoginCard from './LoginCard'
import { useDemo } from '../../context/DemoContext'

const modelContent = {
  A: {
    badge: 'New on G2.AI Playbooks',
    headline: 'Share your AI expertise. Get paid.',
    sub: 'Earn a commission every time a reader purchases a tool you recommended in your playbook.',
    features: ['Up to 15% commission', 'Real-time earnings dashboard', 'Monthly Stripe payouts'],
    cardTitle: 'Create your account',
    cardSubtitle: 'Start earning from your AI expertise today.',
  },
  B: {
    badge: 'Powered by G2.AI',
    headline: 'Your AI stack, optimized.',
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
      <div className="w-full max-w-[520px] rounded-2xl border border-[var(--g2-border)] bg-[var(--g2-bg)] shadow-2xl shadow-black/40 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[var(--g2-border)]">
          <G2Logo className="h-6 w-auto" />
          <button
            onClick={closeLoginModal}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--g2-muted)] hover:text-[var(--g2-dark)] hover:bg-[var(--g2-border)]/50 transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">

          {/* Pitch section */}
          <div className="mb-6 pb-6 border-b border-[var(--g2-border)]">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--g2-purple)] mb-3 block">
              {content.badge}
            </span>
            <h2 className="text-[22px] font-black text-[var(--g2-dark)] leading-tight mb-2">
              {content.headline}
            </h2>
            <p className="text-[13.5px] text-[var(--g2-muted)] leading-relaxed mb-4">
              {content.sub}
            </p>
            <div className="flex flex-wrap gap-2">
              {content.features.map((f) => (
                <span
                  key={f}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--g2-purple-light)] text-[12px] font-semibold text-[var(--g2-purple)]"
                >
                  <span aria-hidden="true">✓</span>
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Login form */}
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
