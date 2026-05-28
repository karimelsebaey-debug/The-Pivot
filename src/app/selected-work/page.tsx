import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/sections/Footer'

export const metadata = {
  title: 'Selected Work — THE PIVOT',
  description: 'A curated view of our best work across motion, branding, web, and AI.',
}

export default function SelectedWork() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', paddingTop: '120px' }}>
        <div style={{ maxWidth: '1216px', margin: '0 auto', padding: '0 clamp(20px, 4vw, 64px)' }}>

          <p style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: '1.1rem',
            color: 'var(--color-ink)',
            opacity: 0.5,
            marginBottom: '1.5rem',
          }}>
            Our Work
          </p>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 7vw, 8rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: 'var(--color-ink)',
            marginBottom: '2rem',
          }}>
            Selected<br />
            <em>Work.</em>
          </h1>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.15rem',
            lineHeight: 1.7,
            color: 'var(--color-ink)',
            opacity: 0.6,
            maxWidth: '560px',
            marginBottom: '6rem',
          }}>
            Case studies, campaigns, and creative output from across our
            four practice areas — coming soon.
          </p>

          <div style={{
            borderTop: '1px solid var(--color-border)',
            paddingTop: '4rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1px',
            backgroundColor: 'var(--color-border)',
          }}>
            {['Motion Design', 'Brand Identity', 'Web & Digital', 'AI Creative', 'Campaign Strategy', 'Data & Insights'].map((label) => (
              <div key={label} style={{
                backgroundColor: 'var(--color-bg)',
                padding: 'clamp(32px, 4vw, 56px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                minHeight: '220px',
                justifyContent: 'flex-end',
              }}>
                <div style={{
                  width: '40px',
                  height: '2px',
                  backgroundColor: 'var(--color-accent)',
                }} />
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  letterSpacing: '-0.02em',
                  color: 'var(--color-ink)',
                }}>
                  {label}
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--color-ink)',
                  opacity: 0.45,
                }}>
                  Coming soon
                </p>
              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
