import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/sections/Footer'

export const metadata = {
  title: 'Perspectives — THE PIVOT',
  description: 'Thinking on creativity, strategy, AI, and what it takes to build a brand that lasts.',
}

export default function Perspectives() {
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
            Ideas & Thinking
          </p>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 7vw, 8rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: 'var(--color-ink)',
            marginBottom: '2rem',
          }}>
            Perspectives.
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
            Thinking on creativity, strategy, AI, and what it takes to build
            a brand that lasts — coming soon.
          </p>

          <div style={{
            borderTop: '1px solid var(--color-border)',
            paddingTop: '4rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1px',
            backgroundColor: 'var(--color-border)',
          }}>
            {[
              { tag: 'Strategy', title: 'Why most briefs are already wrong before the work starts' },
              { tag: 'AI', title: 'What AI-powered creative actually means for agencies in 2025' },
              { tag: 'Brand', title: 'The difference between a logo and a brand identity' },
              { tag: 'Finance', title: "How to read a P&L if you've never run a business before" },
            ].map((post) => (
              <div key={post.title} style={{
                backgroundColor: 'var(--color-bg)',
                padding: 'clamp(28px, 3vw, 48px) 0',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '24px',
              }}>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-ink)',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  whiteSpace: 'nowrap',
                  marginTop: '4px',
                  flexShrink: 0,
                }}>
                  {post.tag}
                </span>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
                  letterSpacing: '-0.02em',
                  color: 'var(--color-ink)',
                  opacity: 0.35,
                  lineHeight: 1.2,
                }}>
                  {post.title}
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
