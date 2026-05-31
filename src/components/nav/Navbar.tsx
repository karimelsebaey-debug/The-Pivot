'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { MegaDropdown } from './MegaDropdown'
import { PillCTA } from '@/components/ui/PillCTA'
import { SERVICE_CATEGORIES } from '@/lib/services-data'

export function Navbar() {
  const pathname  = usePathname()
  const isHome    = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Hero is pinned for ~280% scroll travel; stay transparent until past it
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 3.2)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (closeTimer.current) clearTimeout(closeTimer.current)
    }
  }, [])

  function openDropdown() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setDropdownOpen(true)
  }

  function closeDropdown() {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 120)
  }

  return (
    <header
      style={{
        height: 'var(--header-height)',
        backgroundColor: '#0A211F',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        borderBottom: scrolled ? '1px solid rgba(246,249,240,0.12)' : '1px solid transparent',
        color: '#f6f9f0',
        transition: `background-color var(--t-std) var(--ease), border-color var(--t-std) var(--ease)`,
      }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center"
    >
      <div
        className="container flex items-center justify-between"
        style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--container-px)' }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', textDecoration: 'none', userSelect: 'none' }}>
          <Image
            src="/logo.png"
            alt="The Pivot"
            width={80}
            height={80}
            style={{ filter: 'brightness(0) invert(1)', opacity: 0.9 }}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {/* Services with dropdown */}
          <div
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
          >
            <button
              className="flex items-center gap-1 text-sm link-underline"
              style={{ transition: `color var(--t-fast) var(--ease)` }}
              aria-expanded={dropdownOpen}
            >
              Capabilities
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                style={{
                  transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                  transition: `transform var(--t-med) var(--ease)`,
                }}
              >
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {dropdownOpen && (
              <MegaDropdown
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              />
            )}
          </div>

          {[
            { label: 'Selected Work', href: '/selected-work' },
            { label: 'Perspectives', href: '/perspectives' },
            { label: "Let's Talk", href: '/contact' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm link-underline"
              style={{ transition: `color var(--t-fast) var(--ease)` }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <PillCTA href="/contact" label="Start a Project" />
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden flex-col gap-1.5 w-6 h-6 justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ transition: `all var(--t-med) var(--ease)` }}
        >
          <span
            className="block h-px bg-current"
            style={{
              transform: menuOpen ? 'rotate(45deg) translateY(4px)' : 'none',
              transition: `transform var(--t-med) var(--ease)`,
            }}
          />
          <span
            className="block h-px bg-current"
            style={{
              opacity: menuOpen ? 0 : 1,
              transition: `opacity var(--t-med) var(--ease)`,
            }}
          />
          <span
            className="block h-px bg-current"
            style={{
              transform: menuOpen ? 'rotate(-45deg) translateY(-4px)' : 'none',
              transition: `transform var(--t-med) var(--ease)`,
            }}
          />
        </button>
      </div>

      {/* Mobile menu — full-screen overlay */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 overflow-y-auto"
          style={{
            backgroundColor: 'var(--color-bg)',
            color: 'var(--color-ink)',
            zIndex: 200,
            animation: 'fade-in 0.22s var(--ease) forwards',
          }}
        >
          {/* Sticky header row */}
          <div style={{
            position: 'sticky', top: 0,
            backgroundColor: 'var(--color-bg)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            height: 'var(--header-height)',
            padding: '0 var(--container-px)',
            borderBottom: '1px solid var(--color-border)',
            zIndex: 1,
          }}>
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <Image src="/logo.png" alt="The Pivot" width={80} height={80}
                style={{ filter: 'brightness(0)', opacity: 0.85 }} />
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 40, height: 40, borderRadius: '50%',
                border: '1px solid var(--color-border)',
                backgroundColor: 'transparent', cursor: 'pointer',
                color: 'var(--color-ink)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Scrollable body */}
          <div style={{ padding: '28px var(--container-px) 56px' }}>

            {/* Capabilities label */}
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 600,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--color-ink)', opacity: 0.4, marginBottom: 20,
            }}>
              Capabilities
            </p>

            {/* Service categories */}
            {SERVICE_CATEGORIES.map((cat) => (
              <div key={cat.slug} style={{ marginBottom: 32 }}>
                {/* Category pill */}
                <Link
                  href={`/capabilities/${cat.slug}`}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 20px', borderRadius: 999,
                    backgroundColor: cat.accent, color: cat.bg,
                    fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 600,
                    letterSpacing: '-0.01em', textDecoration: 'none', marginBottom: 12,
                  }}
                >
                  {cat.title}
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>

                {/* Service items */}
                <div style={{ borderTop: '1px solid var(--color-border)' }}>
                  {cat.items.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/services/${item.slug}`}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '13px 0', borderBottom: '1px solid var(--color-border)',
                        textDecoration: 'none', color: 'var(--color-ink)',
                      }}
                    >
                      <div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.93rem', fontWeight: 600, marginBottom: 2 }}>
                          {item.title}
                        </div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', opacity: 0.48, lineHeight: 1.3 }}>
                          {item.description}
                        </div>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, opacity: 0.28, marginLeft: 12 }}>
                        <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Nav links */}
            <div style={{ borderTop: '1px solid rgba(10,33,31,0.15)', paddingTop: 8, marginTop: 8 }}>
              {[
                { label: 'Selected Work', href: '/selected-work' },
                { label: 'Perspectives', href: '/perspectives' },
                { label: "Let's Talk", href: '/contact' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '16px 0', borderBottom: '1px solid var(--color-border)',
                    textDecoration: 'none', color: 'var(--color-ink)',
                    fontFamily: 'var(--font-display)', fontSize: '1.4rem', letterSpacing: '-0.01em',
                  }}
                >
                  {item.label}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.28 }}>
                    <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div style={{ paddingTop: 32 }}>
              <Link href="/contact" className="cta-pill" onClick={() => setMenuOpen(false)}>
                <span className="cta-pill-label">Start a Project</span>
                <div className="cta-pill-icon">
                  <svg className="arr-out" width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M3 12L12 3M12 3H5M12 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  <svg className="arr-in"  width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M3 12L12 3M12 3H5M12 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
