import Link from 'next/link'

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

          <Link
            href="/contact"
            className="self-start inline-flex items-center gap-3 text-sm font-semibold px-7 py-4 arrow-btn"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-ink)',
              borderRadius: 'var(--radius-xl)',
            }}
          >
            Get in Touch
            <svg className="arrow-out" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg className="arrow-in" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
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
