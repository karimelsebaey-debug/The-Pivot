'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

// ─── Field ────────────────────────────────────────────────────────────────────

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  multiline,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  error?: string
  multiline?: boolean
}) {
  const base: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: `1px solid ${error ? '#c0392b' : 'rgba(10,33,31,0.25)'}`,
    borderRadius: 999,
    outline: 'none',
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    color: 'var(--color-ink)',
    padding: '0.9rem 1.25rem',
    transition: 'border-color 0.2s ease',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label
        htmlFor={name}
        style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(10,33,31,0.75)',
        }}
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ ...base, borderRadius: 20, resize: 'none' as const, lineHeight: 1.6 }}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={base}
        />
      )}

      {error && (
        <span role="alert" style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#c0392b' }}>
          {error}
        </span>
      )}
    </div>
  )
}

// ─── Select ───────────────────────────────────────────────────────────────────

function Select({
  label,
  name,
  placeholder,
  options,
  value,
  onChange,
}: {
  label: string
  name: string
  placeholder: string
  options: string[]
  value: string
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label
        id={`${name}-label`}
        style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(10,33,31,0.75)',
        }}
      >
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <button
          type="button"
          id={name}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={`${name}-label`}
          onClick={() => setOpen(o => !o)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            background: 'transparent',
            border: `1px solid ${open ? 'var(--color-ink)' : 'rgba(10,33,31,0.25)'}`,
            borderRadius: 999,
            outline: 'none',
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            color: value ? 'var(--color-ink)' : 'rgba(10,33,31,0.4)',
            padding: '0.9rem 1.25rem',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'border-color 0.2s ease',
          }}
        >
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value || placeholder}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
            <path d="M2 4l4 4 4-4" stroke="rgba(10,33,31,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {open && (
          <div
            role="listbox"
            aria-labelledby={`${name}-label`}
            className="contact-dropdown"
            style={{
              position: 'absolute',
              top: 'calc(100% + 10px)',
              left: 0,
              right: 0,
              zIndex: 20,
              background: 'var(--color-bg)',
              border: '1px solid rgba(10,33,31,0.12)',
              borderRadius: 20,
              boxShadow: '0 24px 48px -12px rgba(10,33,31,0.28)',
              overflow: 'hidden',
              maxHeight: 260,
              overflowY: 'auto',
              padding: 6,
            }}
          >
            {options.map(opt => {
              const selected = value === opt
              return (
                <button
                  key={opt}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => { onChange(opt); setOpen(false) }}
                  className="contact-option"
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.75rem 1rem',
                    background: selected ? 'var(--color-accent)' : 'transparent',
                    border: 'none',
                    borderRadius: 14,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.92rem',
                    fontWeight: selected ? 600 : 400,
                    color: 'var(--color-ink)',
                    transition: 'background-color 0.15s ease',
                  }}
                >
                  {opt}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

const DESIGN_NEEDS_OPTIONS = ['Ongoing design needs (monthly, quarterly etc.)', 'One-time project']
const DESIGN_BUDGET_OPTIONS = ['Under $500/month', '$500 - $1,000/month', '$1,000 - $5,000/month', '$5,000 - $10,000/month', '$10,000+/month', 'Not sure yet']

// ─── ContactPage ──────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ContactPage() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef    = useRef<HTMLDivElement>(null)

  const [step, setStep] = useState<1 | 2>(1)
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [designNeeds,  setDesignNeeds]  = useState('')
  const [designBudget, setDesignBudget] = useState('')
  const [errors,  setErrors]  = useState<{ name?: string; email?: string }>({})

  const [submitted, setSubmitted] = useState(false)
  const [sending,   setSending]   = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  useGSAP(() => {
    if (!cardRef.current) return
    gsap.from(cardRef.current, { opacity: 0, y: 24, duration: 0.9, ease: 'power3.out' })
  }, { scope: sectionRef })

  function goToStepTwo() {
    const nextErrors: { name?: string; email?: string } = {}
    if (!name.trim()) nextErrors.name = 'Full name is required.'
    if (!email.trim()) nextErrors.email = 'Email is required.'
    else if (!EMAIL_RE.test(email.trim())) nextErrors.email = 'Enter a valid email.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) setStep(2)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormError(null)

    if (!designNeeds) {
      setFormError('Let us know your design needs.')
      return
    }
    if (!designBudget) {
      setFormError('Let us know your expected budget.')
      return
    }
    if (!message.trim()) {
      setFormError('Tell us a bit about your project.')
      return
    }

    const fullMessage = `Design needs: ${designNeeds}\nDesign budget: ${designBudget}\n\n${message.trim()}`

    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intent: 'project', name: name.trim(), email: email.trim(), company, message: fullMessage }),
      })
      if (!res.ok) {
        const { error } = await res.json()
        setFormError(error || 'Something went wrong. Please try again.')
        return
      }
      setSubmitted(true)
    } catch {
      setFormError('Network error. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(10,33,31,0.6)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(20px,4vw,48px)',
        overflowY: 'auto',
      }}
    >
      <Link
        href="/"
        aria-label="Close"
        style={{
          position: 'fixed',
          top: 'clamp(16px,3vh,32px)',
          right: 'clamp(16px,3vw,32px)',
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: '1px solid rgba(242,244,231,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#F2F4E7',
          textDecoration: 'none',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 2l12 12M14 2 2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </Link>
      <div
        ref={cardRef}
        className="contact-card"
        style={{
          width: '100%',
          maxWidth: 640,
          background: 'var(--color-bg)',
          borderRadius: 28,
          padding: 'clamp(32px,5vw,56px)',
          color: 'var(--color-ink)',
        }}
      >
        {submitted ? (
          /* ── Success state ── */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 20, padding: '24px 0' }}>
            <div
              style={{
                width: 48, height: 48, borderRadius: '50%',
                border: '2px solid var(--color-dark-bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <polyline points="4,10 8,14 16,6" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              Message received.<br />
              <em>We&apos;ll be in touch.</em>
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'rgba(10,33,31,0.6)', lineHeight: 1.7 }}>
              Expect a reply within 3-5 business days.
            </p>
          </div>
        ) : (
          <>
            <h1
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1.6rem, 3.2vw, 2.1rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
                textAlign: 'center',
                marginBottom: 'clamp(28px,4vw,40px)',
              }}
            >
              <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>Let&apos;s build</em> something real.
            </h1>

            {step === 1 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div className="contact-step-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <Field label="Full Name" name="name" placeholder="Your name" value={name} onChange={v => { setName(v); if (errors.name) setErrors(e => ({ ...e, name: undefined })) }} error={errors.name} />
                  <Field label="Email" name="email" type="email" placeholder="you@company.com" value={email} onChange={v => { setEmail(v); if (errors.email) setErrors(e => ({ ...e, email: undefined })) }} error={errors.email} />
                </div>
                <Field label="Company / Brand" name="company" placeholder="Optional" value={company} onChange={setCompany} />

                <button
                  type="button"
                  onClick={goToStepTwo}
                  className="cta-pill"
                  style={{ marginTop: 8, alignSelf: 'flex-end', border: 'none' }}
                >
                  <span className="cta-pill-text">Continue →</span>
                  <span className="cta-pill-text-hover" aria-hidden="true">Continue →</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <Select
                  label="Design Needs"
                  name="designNeeds"
                  placeholder="Tell us about your design needs"
                  options={DESIGN_NEEDS_OPTIONS}
                  value={designNeeds}
                  onChange={setDesignNeeds}
                />

                <Select
                  label="Design Budget"
                  name="designBudget"
                  placeholder="What is your expected design budget?"
                  options={DESIGN_BUDGET_OPTIONS}
                  value={designBudget}
                  onChange={setDesignBudget}
                />

                <Field
                  label="Tell us about your project"
                  name="message"
                  multiline
                  placeholder="What are you building? What do you need?"
                  value={message}
                  onChange={setMessage}
                />

                {formError && (
                  <p role="alert" style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#c0392b', margin: 0 }}>
                    {formError}
                  </p>
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    aria-label="Back"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: 40, height: 40, borderRadius: '50%',
                      border: '1px solid rgba(10,33,31,0.2)', background: 'transparent',
                      cursor: 'pointer', color: 'var(--color-ink)',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <button
                    type="submit"
                    disabled={sending}
                    className="cta-pill"
                    style={{
                      border: 'none',
                      cursor: sending ? 'not-allowed' : 'pointer',
                      opacity: sending ? 0.6 : 1,
                    }}
                  >
                    <span className="cta-pill-text">{sending ? 'Sending…' : 'Send Message'}</span>
                    <span className="cta-pill-text-hover" aria-hidden="true">{sending ? 'Sending…' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>

      <style>{`
        .contact-card input::placeholder,
        .contact-card textarea::placeholder {
          color: rgba(10,33,31,0.3);
        }
        .contact-card input:-webkit-autofill,
        .contact-card input:-webkit-autofill:hover,
        .contact-card input:-webkit-autofill:focus {
          -webkit-text-fill-color: var(--color-ink);
          -webkit-box-shadow: 0 0 0px 1000px var(--color-bg) inset;
          box-shadow: 0 0 0px 1000px var(--color-bg) inset;
          transition: background-color 9999s ease-in-out 0s;
        }
        .contact-dropdown {
          animation: contact-dropdown-in 0.16s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes contact-dropdown-in {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (hover: hover) {
          .contact-option:not([aria-selected="true"]):hover {
            background: rgba(185,138,85,0.35) !important;
          }
        }
        @media (max-width: 640px) {
          .contact-step-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
