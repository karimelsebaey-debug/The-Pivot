'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { MegaDropdown } from './MegaDropdown'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
        backgroundColor: scrolled ? 'var(--color-bg)' : 'rgba(247, 249, 242, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        transition: `background-color var(--t-std) var(--ease), border-color var(--t-std) var(--ease)`,
      }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center"
    >
      <div
        className="container flex items-center justify-between"
        style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--container-px)' }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-sm font-semibold tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.15em' }}
        >
          THE PIVOT
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
        <Link
          href="/contact"
          className="hidden md:inline-flex items-center gap-2 font-semibold rounded-full arrow-btn"
          style={{
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-ink)',
            borderRadius: 'var(--radius-xl)',
            fontSize: '0.95rem',
            padding: '12px 28px',
            transition: `box-shadow var(--t-fast) var(--ease)`,
          }}
        >
          Start a Project
          <svg className="arrow-out" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg className="arrow-in" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

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

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="absolute top-full left-0 right-0 section-dark px-6 py-8 flex flex-col gap-6 md:hidden"
          style={{ animation: 'fade-in 0.2s var(--ease) forwards' }}
        >
          {[
            { label: 'Capabilities', href: '/capabilities' },
            { label: 'Selected Work', href: '/selected-work' },
            { label: 'Perspectives', href: '/perspectives' },
            { label: "Let's Talk", href: '/contact' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-2xl font-display"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-full self-start"
            style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-ink)' }}
            onClick={() => setMenuOpen(false)}
          >
            Start a Project →
          </Link>
        </div>
      )}
    </header>
  )
}
