'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

// ─── Types ────────────────────────────────────────────────────────────────────

type Intent = 'project' | 'demo' | 'touch'

const INTENTS: { key: Intent; label: string; sub: string }[] = [
  { key: 'project', label: 'Start a Project',  sub: 'Brand, motion, digital'   },
  { key: 'demo',    label: 'Book a Demo',       sub: 'See how we work'          },
  { key: 'touch',   label: 'Get in Touch',      sub: 'Questions & partnerships' },
]

// ─── Field ────────────────────────────────────────────────────────────────────

function Field({
  label,
  name,
  type = 'text',
  required = true,
  placeholder,
  multiline,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
  multiline?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const [filled,  setFilled]  = useState(false)

  const borderColor = focused
    ? 'var(--color-ink)'
    : filled
    ? 'rgba(10,33,31,0.5)'
    : 'rgba(10,33,31,0.2)'

  const base: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${borderColor}`,
    outline: 'none',
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    fontWeight: 400,
    color: 'var(--color-ink)',
    paddingBottom: '0.875rem',
    paddingTop: '0.25rem',
    transition: 'border-color 0.2s ease',
    resize: 'none' as const,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label
        htmlFor={name}
        style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.8rem',
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--color-ink)',
          transition: 'color 0.2s ease',
        }}
      >
        {label}{required && <span style={{ color: 'var(--color-ink)', marginLeft: 3 }}>*</span>}
      </label>

      {multiline ? (
        <textarea
          id={name}
          name={name}
          required={required}
          rows={4}
          placeholder={placeholder}
          style={{ ...base, lineHeight: 1.6 }}
          onFocus={() => setFocused(true)}
          onBlur={e => { setFocused(false); setFilled(e.target.value.length > 0) }}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          style={base}
          onFocus={() => setFocused(true)}
          onBlur={e => { setFocused(false); setFilled(e.target.value.length > 0) }}
        />
      )}
    </div>
  )
}

// ─── ContactPage ──────────────────────────────────────────────────────────────

export function ContactPage() {
  const sectionRef = useRef<HTMLElement>(null)
  const headRef    = useRef<HTMLHeadingElement>(null)
  const leftRef    = useRef<HTMLDivElement>(null)
  const rightRef   = useRef<HTMLDivElement>(null)

  const [intent,    setIntent]    = useState<Intent>('project')
  const [submitted, setSubmitted] = useState(false)
  const [sending,   setSending]   = useState(false)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    tl.from(headRef.current!.querySelectorAll('span > span'), {
        yPercent: 110, opacity: 0, stagger: 0.1, duration: 1.0,
      })
      .from(leftRef.current!.querySelectorAll('.intent-pill'), {
        opacity: 0, y: 16, stagger: 0.08, duration: 0.7,
      }, '-=0.5')
      .from(rightRef.current!.querySelectorAll('.form-field'), {
        opacity: 0, y: 20, stagger: 0.07, duration: 0.7,
      }, '-=0.6')
  }, { scope: sectionRef })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)

    const form = e.currentTarget
    const data = {
      intent,
      name:    (form.elements.namedItem('name')    as HTMLInputElement).value,
      email:   (form.elements.namedItem('email')   as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const { error } = await res.json()
        alert(error || 'Something went wrong. Please try again.')
        return
      }
      setSubmitted(true)
    } catch {
      alert('Network error. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100dvh',
        background: 'var(--color-bg)',
        color: 'var(--color-ink)',
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      {/* ── Grid ──────────────────────────────────────────────────────────── */}
      <div
        style={{
          width: '100%',
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          padding: 'clamp(96px,12vh,140px) clamp(20px,4vw,64px) clamp(64px,8vh,96px)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(48px,6vw,96px)',
          alignItems: 'start',
        }}
        className="contact-grid"
      >

        {/* ── Left ──────────────────────────────────────────────────────── */}
        <div ref={leftRef} style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>

          {/* Heading */}
          <h1
            ref={headRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.75rem, 5.5vw, 6rem)',
              lineHeight: 1.03,
              letterSpacing: '-0.025em',
              color: 'var(--color-ink)',
            }}
          >
            <span className="block overflow-hidden">
              <span className="block">Let&apos;s build</span>
            </span>
            <span className="block" style={{ overflow: 'hidden', paddingBottom: '0.18em', marginBottom: '-0.18em' }}>
              <span className="block italic" style={{ color: 'var(--color-dark-bg)' }}>
                something real.
              </span>
            </span>
          </h1>

          {/* Intent selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.65rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(10,33,31,0.45)',
                marginBottom: 4,
              }}
            >
              I want to
            </p>

            {INTENTS.map(({ key, label, sub }) => {
              const active = intent === key
              return (
                <button
                  key={key}
                  className="intent-pill"
                  onClick={() => setIntent(key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '18px 22px',
                    borderRadius: 14,
                    border: `1px solid ${active ? 'rgba(10,33,31,0.45)' : 'rgba(10,33,31,0.12)'}`,
                    background: active ? 'rgba(10,33,31,0.05)' : 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'border-color 0.2s ease, background 0.2s ease',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)',
                        color: 'var(--color-ink)',
                        letterSpacing: '-0.01em',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8rem',
                        color: 'rgba(10,33,31,0.45)',
                        marginTop: 3,
                      }}
                    >
                      {sub}
                    </div>
                  </div>

                  {/* Active dot */}
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: active ? 'var(--color-ink)' : 'rgba(10,33,31,0.18)',
                      flexShrink: 0,
                      transition: 'background 0.2s ease',
                    }}
                  />
                </button>
              )
            })}
          </div>

          {/* Info */}
          <div
            style={{
              borderTop: '1px solid rgba(10,33,31,0.1)',
              paddingTop: 32,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            {[
              { label: 'Email',    value: 'hello@thepivot.co' },
              { label: 'Response', value: 'Within 24 hours'   },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.62rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'rgba(10,33,31,0.4)',
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    color: 'var(--color-ink)',
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Form ───────────────────────────────────────────────── */}
        <div
          ref={rightRef}
          style={{
            position: 'sticky',
            top: 'calc(var(--header-height, 56px) + 32px)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {submitted ? (
            /* ── Success state ── */
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                padding: '48px 0',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  border: '2px solid var(--color-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <polyline points="4,10 8,14 16,6" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-ink)',
                }}
              >
                Message received.<br />
                <em style={{ color: 'var(--color-accent)' }}>We&apos;ll be in touch.</em>
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'rgba(10,33,31,0.6)',
                  lineHeight: 1.7,
                }}
              >
                Expect a reply within 24 hours. We review every message personally.
              </p>
            </div>
          ) : (
            /* ── Form ── */
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 36 }}
              noValidate
            >
              <input type="hidden" name="intent" value={intent} />

              <div className="form-field">
                <Field label="Full Name" name="name" placeholder="Your name" />
              </div>

              <div className="form-field">
                <Field label="Email" name="email" type="email" placeholder="you@company.com" />
              </div>

              <div className="form-field">
                <Field label="Company / Brand" name="company" required={false} placeholder="Optional" />
              </div>

              <div className="form-field">
                <Field
                  label="Tell us about your project"
                  name="message"
                  multiline
                  placeholder="What are you building? What do you need?"
                />
              </div>

              {/* Submit */}
              <div className="form-field" style={{ paddingTop: 8 }}>
                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '14px 28px',
                    borderRadius: 999,
                    background: sending ? 'rgba(216,255,133,0.5)' : 'var(--color-accent)',
                    color: 'var(--color-ink)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    border: 'none',
                    cursor: sending ? 'not-allowed' : 'pointer',
                    transition: 'background 0.25s ease, color 0.25s ease, transform 0.15s ease',
                    letterSpacing: '-0.01em',
                  }}
                  onMouseEnter={e => {
                    if (!sending) {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = 'var(--color-ink)'
                      el.style.color = 'var(--color-accent)'
                    }
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = sending ? 'rgba(216,255,133,0.5)' : 'var(--color-accent)'
                    el.style.color = 'var(--color-ink)'
                  }}
                  onMouseDown={e => { if (!sending) (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)' }}
                  onMouseUp={e => { if (!sending) (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
                >
                  {sending ? (
                    <>
                      <span
                        style={{
                          width: 16,
                          height: 16,
                          border: '2px solid rgba(242,244,231,0.3)',
                          borderTopColor: '#F2F4E7',
                          borderRadius: '50%',
                          animation: 'spin 0.7s linear infinite',
                          display: 'inline-block',
                          flexShrink: 0,
                        }}
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .contact-grid input::placeholder,
        .contact-grid textarea::placeholder {
          color: rgba(10,33,31,0.3);
        }

        @media (max-width: 767px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
