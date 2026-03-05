import { useState, useRef } from 'react'
import { ArrowRight, ArrowLeft, Eye, EyeOff, Mail } from 'lucide-react'

// ── Social icons ──────────────────────────────────────────────────────────────

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

// ── Types & constants ─────────────────────────────────────────────────────────

type AuthStep = 'email' | 'create' | 'signin' | 'verify' | 'twofa' | 'forgot' | 'forgot-sent'

const passwordRules = [
  { label: 'At least 8 characters',  test: (pw: string) => pw.length >= 8 },
  { label: 'One uppercase letter',    test: (pw: string) => /[A-Z]/.test(pw) },
  { label: 'One number',              test: (pw: string) => /[0-9]/.test(pw) },
  { label: 'One special character',   test: (pw: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pw) },
]

const inputClass =
  'w-full rounded-xl border px-4 py-2.5 text-[14px] text-[var(--g2-dark)] placeholder:text-[var(--g2-muted)] outline-none focus:border-[var(--g2-purple)] transition-colors bg-[var(--g2-surface)] border-[var(--g2-border)]'

const primaryBtnClass =
  'w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--g2-purple)] text-white text-[14px] font-semibold hover:bg-[#6858c4] transition-colors disabled:opacity-40 disabled:cursor-not-allowed'

const socialBtnClass =
  'flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[var(--g2-border)] bg-[var(--g2-surface)] text-[var(--g2-dark)] text-[12.5px] font-medium hover:border-[var(--g2-purple)]/40 hover:bg-[var(--g2-border)]/30 transition-colors'

// ── Props ─────────────────────────────────────────────────────────────────────

interface Props {
  title: string
  subtitle: string
  onSuccess: () => void
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function LoginCard({ title, subtitle, onSuccess }: Props) {
  const [step, setStep]                   = useState<AuthStep>('email')
  const [email, setEmail]                 = useState('')
  const [firstName, setFirstName]         = useState('')
  const [lastName, setLastName]           = useState('')
  const [password, setPassword]           = useState('')
  const [passwordConfirm, setConfirm]     = useState('')
  const [showPassword, setShowPw]         = useState(false)
  const [showConfirm, setShowConfirm]     = useState(false)
  const [termsAccepted, setTerms]         = useState(false)
  const [marketingOptIn, setMarketing]    = useState(false)
  const [forgotEmail, setForgotEmail]     = useState('')
  const [tfaCode, setTfaCode]             = useState(Array(6).fill(''))
  const tfaRefs                           = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null))

  const maskedEmail = email.replace(/^(.{2})(.+?)(@.+)$/, (_, a, b, c) => a + b.replace(/./g, '•') + c)
  const pwAllValid  = passwordRules.every(r => r.test(password))
  const confirmOk   = password === passwordConfirm && passwordConfirm.length > 0

  function goBack(to: AuthStep) {
    setStep(to)
  }

  function handleTfaInput(i: number, val: string) {
    if (!/^\d?$/.test(val)) return
    const next = [...tfaCode]
    next[i] = val
    setTfaCode(next)
    if (val && i < 5) tfaRefs.current[i + 1]?.focus()
  }

  function handleTfaKey(i: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !tfaCode[i] && i > 0) tfaRefs.current[i - 1]?.focus()
  }

  // ── Back link (reusable inline) ──────────────────────────────────────────

  const BackLink = ({ to }: { to: AuthStep }) => (
    <button
      type="button"
      onClick={() => goBack(to)}
      className="flex items-center gap-1.5 text-[12.5px] text-[var(--g2-muted)] hover:text-[var(--g2-dark)] mb-6 transition-colors"
    >
      <ArrowLeft size={13} /> Back
    </button>
  )

  // ── Step: Email entry ────────────────────────────────────────────────────

  if (step === 'email') return (
    <div className="w-full">
      <div className="mb-7">
        <h2 className="text-[22px] font-black text-[var(--g2-dark)] mb-1.5 leading-tight">{title}</h2>
        <p className="text-[13.5px] text-[var(--g2-muted)] leading-relaxed">{subtitle}</p>
      </div>

      <form onSubmit={e => { e.preventDefault(); setStep('create') }} className="flex flex-col gap-3 mb-5">
        <input
          type="email" required placeholder="Work email address"
          value={email} onChange={e => setEmail(e.target.value)}
          className={inputClass}
        />
        <button type="submit" className={primaryBtnClass}>
          Continue with email <ArrowRight size={15} />
        </button>
      </form>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-[var(--g2-border)]" />
        <span className="text-[12px] text-[var(--g2-muted)] shrink-0">or continue with</span>
        <div className="flex-1 h-px bg-[var(--g2-border)]" />
      </div>

      <div className="grid grid-cols-2 gap-2.5 mb-6">
        <button type="button" onClick={onSuccess} className={socialBtnClass}><LinkedInIcon /> LinkedIn</button>
        <button type="button" onClick={onSuccess} className={socialBtnClass}><GoogleIcon /> Google</button>
      </div>

      <p className="text-[13px] text-[var(--g2-muted)] text-center">
        Already have an account?{' '}
        <button type="button" onClick={() => setStep('signin')} className="text-[var(--g2-purple)] font-semibold hover:underline">
          Sign in
        </button>
      </p>
    </div>
  )

  // ── Step: Create account ─────────────────────────────────────────────────

  if (step === 'create') return (
    <div className="w-full">
      <BackLink to="email" />

      <div className="mb-6">
        <h2 className="text-[22px] font-black text-[var(--g2-dark)] mb-1">Create your account</h2>
        <p className="text-[13px] text-[var(--g2-muted)]">{email}</p>
      </div>

      <form
        onSubmit={e => { e.preventDefault(); if (pwAllValid && confirmOk && termsAccepted) setStep('verify') }}
        className="flex flex-col gap-3"
      >
        {/* Name row */}
        <div className="grid grid-cols-2 gap-2.5">
          <input
            type="text" required placeholder="First name"
            value={firstName} onChange={e => setFirstName(e.target.value)}
            className={inputClass}
          />
          <input
            type="text" required placeholder="Last name"
            value={lastName} onChange={e => setLastName(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'} required placeholder="Password"
            value={password} onChange={e => setPassword(e.target.value)}
            className={inputClass + ' pr-10'}
          />
          <button
            type="button" onClick={() => setShowPw(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--g2-muted)] hover:text-[var(--g2-dark)] transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>

        {/* Live password rules */}
        {password.length > 0 && (
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 px-0.5">
            {passwordRules.map(r => {
              const ok = r.test(password)
              return (
                <span key={r.label} className={`flex items-center gap-1.5 text-[11px] ${ok ? 'text-green-600 dark:text-green-400' : 'text-[var(--g2-muted)]'}`}>
                  <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${ok ? 'bg-green-500 border-green-500' : 'border-[var(--g2-border)]'}`}>
                    {ok && (
                      <svg width="7" height="7" viewBox="0 0 8 8" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="1,4 3,6 7,2" />
                      </svg>
                    )}
                  </span>
                  {r.label}
                </span>
              )
            })}
          </div>
        )}

        {/* Confirm password */}
        <div className="relative">
          <input
            type={showConfirm ? 'text' : 'password'} required placeholder="Confirm password"
            value={passwordConfirm} onChange={e => setConfirm(e.target.value)}
            className={inputClass + ' pr-10'}
          />
          <button
            type="button" onClick={() => setShowConfirm(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--g2-muted)] hover:text-[var(--g2-dark)] transition-colors"
            aria-label={showConfirm ? 'Hide password' : 'Show password'}
          >
            {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        {passwordConfirm.length > 0 && !confirmOk && (
          <p className="text-[11.5px] text-red-500 -mt-1 px-0.5">Passwords don't match</p>
        )}

        {/* Consent checkboxes */}
        <div className="flex flex-col gap-3 pt-1 pb-1">
          <label className="flex items-start gap-2.5 cursor-pointer group">
            <input
              type="checkbox" required checked={termsAccepted} onChange={e => setTerms(e.target.checked)}
              className="mt-0.5 accent-[var(--g2-purple)] shrink-0"
            />
            <span className="text-[12px] text-[var(--g2-muted)] leading-relaxed">
              I agree to G2's{' '}
              <a href="https://legal.g2.com/terms-of-use" target="_blank" rel="noopener" className="text-[var(--g2-purple)] hover:underline">Terms of Use</a>
              {' '}and{' '}
              <a href="https://legal.g2.com/privacy-policy" target="_blank" rel="noopener" className="text-[var(--g2-purple)] hover:underline">Privacy Policy</a>
            </span>
          </label>
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox" checked={marketingOptIn} onChange={e => setMarketing(e.target.checked)}
              className="mt-0.5 accent-[var(--g2-purple)] shrink-0"
            />
            <span className="text-[12px] text-[var(--g2-muted)] leading-relaxed">
              Send me product updates, new playbooks, and AI tool recommendations
            </span>
          </label>
        </div>

        <button type="submit" disabled={!pwAllValid || !confirmOk || !termsAccepted} className={primaryBtnClass}>
          Create account <ArrowRight size={15} />
        </button>
      </form>

      <p className="text-[13px] text-[var(--g2-muted)] text-center mt-5">
        Already have an account?{' '}
        <button type="button" onClick={() => setStep('signin')} className="text-[var(--g2-purple)] font-semibold hover:underline">
          Sign in
        </button>
      </p>
    </div>
  )

  // ── Step: Sign in ────────────────────────────────────────────────────────

  if (step === 'signin') return (
    <div className="w-full">
      <BackLink to="email" />

      <div className="mb-6">
        <h2 className="text-[22px] font-black text-[var(--g2-dark)] mb-1">Welcome back</h2>
        <p className="text-[13px] text-[var(--g2-muted)]">{email || 'Sign in to your G2 account'}</p>
      </div>

      <form onSubmit={e => { e.preventDefault(); setStep('twofa') }} className="flex flex-col gap-3">
        {!email && (
          <input
            type="email" required placeholder="Work email address"
            value={email} onChange={e => setEmail(e.target.value)}
            className={inputClass}
          />
        )}

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'} required placeholder="Password"
            value={password} onChange={e => setPassword(e.target.value)}
            className={inputClass + ' pr-10'}
          />
          <button
            type="button" onClick={() => setShowPw(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--g2-muted)] hover:text-[var(--g2-dark)] transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>

        <div className="flex justify-end -mt-1">
          <button type="button" onClick={() => setStep('forgot')} className="text-[12px] text-[var(--g2-purple)] hover:underline">
            Forgot password?
          </button>
        </div>

        <button type="submit" className={primaryBtnClass}>
          Sign in <ArrowRight size={15} />
        </button>
      </form>

      <p className="text-[13px] text-[var(--g2-muted)] text-center mt-5">
        Don't have an account?{' '}
        <button type="button" onClick={() => setStep('create')} className="text-[var(--g2-purple)] font-semibold hover:underline">
          Create one
        </button>
      </p>
    </div>
  )

  // ── Step: Verify email (post-signup) ─────────────────────────────────────

  if (step === 'verify') return (
    <div className="w-full">
      <div className="flex flex-col items-center text-center mb-8 mt-2">
        <div className="w-14 h-14 rounded-2xl bg-[var(--g2-purple)]/10 flex items-center justify-center mb-5">
          <Mail size={24} className="text-[var(--g2-purple)]" />
        </div>
        <h2 className="text-[22px] font-black text-[var(--g2-dark)] mb-2">Verify your email</h2>
        <p className="text-[13.5px] text-[var(--g2-muted)] leading-relaxed">
          We sent a verification link to<br />
          <span className="font-semibold text-[var(--g2-dark)]">{maskedEmail}</span>
        </p>
        <p className="text-[12px] text-[var(--g2-muted)] mt-2 leading-relaxed">
          Click the link in the email to activate your account. Check your spam folder if you don't see it.
        </p>
      </div>

      <button type="button" onClick={onSuccess} className={primaryBtnClass + ' mb-3'}>
        I've verified my email <ArrowRight size={15} />
      </button>

      <div className="flex flex-col items-center gap-2.5 mt-1">
        <button type="button" className="text-[12.5px] text-[var(--g2-muted)] hover:text-[var(--g2-dark)] transition-colors">
          Resend verification email
        </button>
        <button type="button" onClick={() => setStep('email')} className="text-[12.5px] text-[var(--g2-muted)] hover:text-[var(--g2-dark)] transition-colors">
          Use a different email
        </button>
      </div>
    </div>
  )

  // ── Step: Two-factor auth ────────────────────────────────────────────────

  if (step === 'twofa') {
    const codeComplete = tfaCode.every(d => d !== '')
    return (
      <div className="w-full">
        <BackLink to="signin" />

        <div className="mb-7">
          <h2 className="text-[22px] font-black text-[var(--g2-dark)] mb-2">Check your email</h2>
          <p className="text-[13.5px] text-[var(--g2-muted)] leading-relaxed">
            We sent a 6-digit code to <span className="font-semibold text-[var(--g2-dark)]">{maskedEmail}</span>. Enter it below to complete sign in.
          </p>
        </div>

        {/* OTP boxes */}
        <div className="flex gap-2 mb-6 justify-between">
          {tfaCode.map((digit, i) => (
            <input
              key={i}
              ref={el => { tfaRefs.current[i] = el }}
              type="text" inputMode="numeric" maxLength={1}
              value={digit}
              onChange={e => handleTfaInput(i, e.target.value)}
              onKeyDown={e => handleTfaKey(i, e)}
              className="flex-1 h-12 rounded-xl border text-center text-[18px] font-bold text-[var(--g2-dark)] bg-[var(--g2-surface)] border-[var(--g2-border)] outline-none focus:border-[var(--g2-purple)] transition-colors"
              aria-label={`Digit ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button" onClick={onSuccess} disabled={!codeComplete}
          className={primaryBtnClass + ' mb-3'}
        >
          Verify and sign in <ArrowRight size={15} />
        </button>

        <p className="text-[12.5px] text-[var(--g2-muted)] text-center">
          Didn't receive a code?{' '}
          <button type="button" className="text-[var(--g2-purple)] hover:underline">Resend</button>
        </p>
      </div>
    )
  }

  // ── Step: Forgot password ────────────────────────────────────────────────

  if (step === 'forgot') return (
    <div className="w-full">
      <BackLink to="signin" />

      <div className="mb-6">
        <h2 className="text-[22px] font-black text-[var(--g2-dark)] mb-1.5">Reset your password</h2>
        <p className="text-[13.5px] text-[var(--g2-muted)] leading-relaxed">
          Enter your email and we'll send a reset link if an account exists.
        </p>
      </div>

      <form onSubmit={e => { e.preventDefault(); setStep('forgot-sent') }} className="flex flex-col gap-3">
        <input
          type="email" required placeholder="Work email address"
          value={forgotEmail || email} onChange={e => setForgotEmail(e.target.value)}
          className={inputClass}
        />
        <button type="submit" className={primaryBtnClass}>
          Send reset link <ArrowRight size={15} />
        </button>
      </form>

      <p className="text-[12px] text-[var(--g2-muted)] text-center mt-5 leading-relaxed">
        Password reset is not available for accounts created with LinkedIn or Google.
      </p>
    </div>
  )

  // ── Step: Forgot password sent ───────────────────────────────────────────

  if (step === 'forgot-sent') return (
    <div className="w-full">
      <div className="flex flex-col items-center text-center mb-8 mt-2">
        <div className="w-14 h-14 rounded-2xl bg-[var(--g2-purple)]/10 flex items-center justify-center mb-5">
          <Mail size={24} className="text-[var(--g2-purple)]" />
        </div>
        <h2 className="text-[22px] font-black text-[var(--g2-dark)] mb-2">Check your email</h2>
        <p className="text-[13.5px] text-[var(--g2-muted)] leading-relaxed">
          If an account exists for{' '}
          <span className="font-semibold text-[var(--g2-dark)]">{forgotEmail || maskedEmail}</span>,
          you'll receive a password reset link shortly.
        </p>
      </div>

      <button type="button" onClick={() => setStep('signin')} className={primaryBtnClass + ' mb-3'}>
        Back to sign in
      </button>

      <p className="text-[12.5px] text-[var(--g2-muted)] text-center">
        Didn't receive it?{' '}
        <button type="button" onClick={() => setStep('forgot')} className="text-[var(--g2-purple)] hover:underline">
          Try again
        </button>
      </p>
    </div>
  )

  return null
}
