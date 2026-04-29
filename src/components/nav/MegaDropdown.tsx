'use client'

import Link from 'next/link'

const COLUMNS = [
  {
    title: 'Creative Design',
    items: [
      'Ad Creative',
      'Social Media Creative',
      'Presentation Design',
      'Illustration Design',
      'Branding Services',
      'eBooks & Reports',
      'Concept Creation',
    ],
  },
  {
    title: 'Specialized Production',
    items: [
      'Motion Design',
      'Email Creation',
      'Web Design',
      'Copywriting',
      'Design Systems',
      'Product Design',
    ],
  },
  {
    title: 'AI Services',
    items: [
      'AI-Powered Creative',
      'AI Consulting',
      'Automation',
      'Data Services',
    ],
  },
  {
    title: 'Marketing',
    items: ['Campaign Strategy'],
  },
]

interface Props {
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export function MegaDropdown({ onMouseEnter, onMouseLeave }: Props) {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[720px] rounded-2xl shadow-xl p-8"
      style={{
        backgroundColor: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
        animation: 'slideDownAppearing 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        boxShadow: '0 24px 64px rgba(10, 33, 31, 0.12)',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="grid grid-cols-4 gap-8">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: 'var(--color-ink-muted)', letterSpacing: '0.12em' }}
            >
              {col.title}
            </p>
            <ul className="flex flex-col gap-2.5">
              {col.items.map((item) => (
                <li key={item}>
                  <Link
                    href={`/services/${item.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                    className="text-sm link-underline"
                    style={{
                      color: 'var(--color-ink)',
                      transition: `color var(--t-fast) var(--ease)`,
                    }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer row */}
      <div
        className="mt-8 pt-6 flex items-center justify-between"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
          Not sure where to start?
        </p>
        <Link
          href="/contact"
          className="text-sm font-semibold arrow-btn"
          style={{ color: 'var(--color-ink)' }}
        >
          Talk to us
          <svg className="arrow-out" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg className="arrow-in" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
