import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export function Footer() {
  return (
    <footer
      className="section-py"
      style={{ backgroundColor: 'var(--color-dark-bg)', color: 'var(--color-bg)' }}
    >
      <div
        className="container"
        style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--container-px)' }}
      >
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12 mb-20">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-6"
              style={{ color: 'rgba(247,249,242,0.4)', letterSpacing: '0.15em' }}
            >
              Ready?
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              Start your<br />
              <em>turning point.</em>
            </h2>
          </div>

          <Link href="/contact" className="cta-pill self-start">
            <span className="cta-pill-label" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-ink)' }}>
              Get in Touch
            </span>
            <div className="cta-pill-icon" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-ink)' }}>
              <ArrowUpRight className="arr-out" size={15} />
              <ArrowUpRight className="arr-in"  size={15} />
            </div>
          </Link>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(247,249,242,0.1)', paddingTop: '2rem' }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <span
              className="text-sm font-semibold tracking-widest uppercase"
              style={{ letterSpacing: '0.15em' }}
            >
              THE PIVOT
            </span>

            <nav className="flex flex-wrap gap-6">
              {['Services', 'Work', 'Process', 'About', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-sm link-underline"
                  style={{ color: 'rgba(247,249,242,0.6)' }}
                >
                  {item}
                </Link>
              ))}
            </nav>

            <p className="text-xs" style={{ color: 'rgba(247,249,242,0.3)' }}>
              © {new Date().getFullYear()} The Pivot. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
