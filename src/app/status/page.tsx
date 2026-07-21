import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/sections/Footer'

export const metadata = {
  title: 'Status — THE PIVOT',
  description: 'Current status of The Pivot\'s website and client-facing systems.',
}

const SYSTEMS = [
  'Website',
  'Contact & inquiry forms',
  'Client project portal',
  'Email delivery',
]

export default function StatusPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', paddingTop: '160px', paddingBottom: '120px' }}>
        <div style={{ maxWidth: '40rem', margin: '0 auto', padding: '0 clamp(20px, 4vw, 64px)' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              letterSpacing: '-0.02em',
              color: 'var(--color-ink)',
              marginBottom: '1.5rem',
            }}
          >
            System Status
          </h1>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 20px',
              borderRadius: 10,
              backgroundColor: 'rgba(80,160,110,0.12)',
              marginBottom: '3rem',
            }}
          >
            <span style={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: '#4caf6f', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-ink)' }}>
              All systems operational
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {SYSTEMS.map((system, i) => (
              <div
                key={system}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '18px 0',
                  borderTop: i === 0 ? '1px solid rgba(10,33,31,0.1)' : undefined,
                  borderBottom: '1px solid rgba(10,33,31,0.1)',
                }}
              >
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.98rem', color: 'var(--color-ink)' }}>
                  {system}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#4caf6f' }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(10,33,31,0.55)' }}>
                    Operational
                  </span>
                </span>
              </div>
            ))}
          </div>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              color: 'rgba(10,33,31,0.5)',
              marginTop: '2.5rem',
              lineHeight: 1.6,
            }}
          >
            Experiencing an issue that isn&apos;t reflected here? Let us know at hello.thepivot@proton.me.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
