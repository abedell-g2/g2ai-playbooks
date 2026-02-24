import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, DollarSign, BarChart2, Zap } from 'lucide-react'
import G2Logo from '../components/ui/G2Logo'
import LoginCard from '../components/login/LoginCard'
import { useDemo } from '../context/DemoContext'

const features = [
  {
    icon: <DollarSign size={17} />,
    title: 'Up to 15% commission per sale',
    desc: 'Earn every time a reader buys a tool you recommend.',
  },
  {
    icon: <BarChart2 size={17} />,
    title: 'Real-time earnings dashboard',
    desc: 'Track clicks, conversions, and revenue in one place.',
  },
  {
    icon: <Zap size={17} />,
    title: 'Monthly payouts via Stripe',
    desc: 'No minimums. Automatic payments, every month.',
  },
]

export default function LoginA() {
  const { setModel } = useDemo()
  const navigate = useNavigate()

  useEffect(() => {
    setModel('A')
  }, [setModel])

  function handleSuccess() {
    navigate('/')
  }

  return (
    <div className="min-h-screen flex">

      {/* ── Mobile header (shown below lg) ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-5 bg-[var(--g2-bg)] border-b border-[var(--g2-border)] z-20">
        <G2Logo className="h-7 w-auto" />
        <Link
          to="/"
          className="flex items-center gap-1 text-[13px] text-[var(--g2-muted)] hover:text-[var(--g2-purple)] transition-colors"
        >
          <ArrowLeft size={14} /> Back
        </Link>
      </div>

      {/* ── Left panel: value proposition (desktop only) ── */}
      <div className="hidden lg:flex flex-col w-[58%] min-h-screen bg-gradient-to-br from-[#0d0a2e] via-[#1a1060] to-[#5746b2] px-14 py-12 text-white">

        {/* Logo + back */}
        <div className="flex items-center justify-between mb-20">
          <G2Logo className="h-8 w-auto" />
          <Link
            to="/"
            className="flex items-center gap-1.5 text-[13px] text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft size={13} /> Back
          </Link>
        </div>

        {/* Value prop */}
        <div className="flex-1 flex flex-col justify-center max-w-[430px]">
          <span className="text-[11px] font-bold uppercase tracking-widest text-purple-300 mb-5">
            New on G2.AI Playbooks
          </span>

          <h1 className="text-[48px] font-black leading-[1.0] mb-6 tracking-tight">
            Share your AI<br />expertise.<br />Get paid.
          </h1>

          <p className="text-[16px] text-white/75 leading-relaxed mb-10">
            When someone reads your playbook and purchases a recommended AI tool,
            you earn a commission. It's your expertise — start monetizing it.
          </p>

          {/* Feature list */}
          <div className="flex flex-col gap-5 mb-12">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  {f.icon}
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-white">{f.title}</p>
                  <p className="text-[13px] text-white/60 mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Metric callout */}
          <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-6">
            <p className="text-[40px] font-black text-white tracking-tight leading-none mb-1.5">
              $2,400<span className="text-[20px] font-medium text-white/55">/mo</span>
            </p>
            <p className="text-[13px] text-white/60 leading-relaxed">
              Average monthly earnings per active G2.AI Playbook creator
            </p>
          </div>
        </div>
      </div>

      {/* ── Right panel: login form ── */}
      <div className="flex flex-1 items-center justify-center px-8 pt-20 pb-10 lg:pt-0 lg:pb-0 bg-[var(--g2-bg)]">
        <LoginCard
          title="Create your account"
          subtitle="Start earning from your AI expertise today."
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  )
}
