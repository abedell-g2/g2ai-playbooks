import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#0077B5" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

const socialButtonClass =
  'flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[var(--g2-border)] bg-[var(--g2-surface)] text-[var(--g2-dark)] text-[12.5px] font-medium hover:border-[var(--g2-purple)]/40 hover:bg-[var(--g2-border)]/30 transition-colors'

interface Props {
  title: string
  subtitle: string
  onSuccess: () => void
}

export default function LoginCard({ title, subtitle, onSuccess }: Props) {
  const [email, setEmail] = useState('')

  return (
    <div className="w-full">
      <div className="mb-7">
        <h2 className="text-[22px] font-black text-[var(--g2-dark)] mb-1.5 leading-tight">{title}</h2>
        <p className="text-[13.5px] text-[var(--g2-muted)] leading-relaxed">{subtitle}</p>
      </div>

      {/* Email form */}
      <form
        onSubmit={(e) => { e.preventDefault(); onSuccess() }}
        className="flex flex-col gap-3 mb-5"
      >
        <input
          type="email"
          required
          placeholder="Work email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border px-4 py-2.5 text-[14px] text-[var(--g2-dark)] placeholder:text-[var(--g2-muted)] outline-none focus:border-[var(--g2-purple)] transition-colors"
          style={{ background: 'var(--g2-surface)', borderColor: 'var(--g2-border)' }}
        />
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--g2-purple)] text-white text-[14px] font-semibold hover:bg-[#7060c8] transition-colors"
        >
          Continue with email
          <ArrowRight size={15} />
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-[var(--g2-border)]" />
        <span className="text-[12px] text-[var(--g2-muted)] shrink-0">or continue with</span>
        <div className="flex-1 h-px bg-[var(--g2-border)]" />
      </div>

      {/* Social buttons — unified secondary style, brand color in logo only */}
      <div className="grid grid-cols-3 gap-2.5 mb-6">
        <button onClick={onSuccess} className={socialButtonClass}>
          <LinkedInIcon /> LinkedIn
        </button>
        <button onClick={onSuccess} className={socialButtonClass}>
          <GoogleIcon /> Google
        </button>
        <button onClick={onSuccess} className={socialButtonClass}>
          <AppleIcon /> Apple
        </button>
      </div>

      <p className="text-[13px] text-[var(--g2-muted)] text-center">
        Already have an account?{' '}
        <button
          onClick={onSuccess}
          className="text-[var(--g2-purple)] font-semibold hover:underline"
        >
          Sign in
        </button>
      </p>
    </div>
  )
}
