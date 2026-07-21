import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/sections/Footer'

export const metadata = {
  title: 'Terms of Use — THE PIVOT',
  description: 'The terms that govern your use of the-pivot.studio and our services.',
}

const SECTIONS = [
  {
    id: undefined,
    heading: '1. Acceptance of Terms',
    body: [
      'By accessing or using this website, or by engaging The Pivot for creative, production, or consulting services, you agree to be bound by these Terms of Use. If you do not agree, please do not use the site or our services.',
    ],
  },
  {
    id: undefined,
    heading: '2. Use of Our Website',
    body: [
      'You may browse this site and use our contact and inquiry forms for legitimate business purposes. You agree not to misuse the site — including attempting to disrupt it, scrape it at scale, or use it to submit false or misleading information.',
    ],
  },
  {
    id: undefined,
    heading: '3. Client Work & Deliverables',
    body: [
      'Any services, deliverables, timelines, and pricing beyond what is shown on this site are governed by the separate written agreement (proposal, statement of work, or contract) between The Pivot and the client. Where these Terms and a signed agreement conflict, the signed agreement controls.',
    ],
  },
  {
    id: 'dmca',
    heading: '4. Intellectual Property & DMCA Policy',
    body: [
      'All content on this site — including case studies, imagery, video, and copy — is owned by The Pivot or used with the permission of our clients and partners, and is protected by copyright and other intellectual property laws. You may not reproduce or redistribute it without our written permission.',
      'If you believe material on this site infringes your copyright, send a notice to hello.thepivot@proton.me including: a description of the copyrighted work, the location of the material on our site, your contact details, and a statement made in good faith that the use is not authorized. We will review and respond to valid notices under the Digital Millennium Copyright Act.',
    ],
  },
  {
    id: undefined,
    heading: '5. Disclaimer of Warranties',
    body: [
      'This site and its content are provided "as is," without warranties of any kind, express or implied. We do not guarantee the site will be uninterrupted, error-free, or free of viruses.',
    ],
  },
  {
    id: undefined,
    heading: '6. Limitation of Liability',
    body: [
      'To the fullest extent permitted by law, The Pivot is not liable for any indirect, incidental, or consequential damages arising from your use of this site. Our liability for services rendered is governed by the applicable client agreement.',
    ],
  },
  {
    id: undefined,
    heading: '7. Changes to These Terms',
    body: [
      'We may revise these Terms from time to time. Continued use of the site after changes are posted means you accept the updated Terms.',
    ],
  },
  {
    id: undefined,
    heading: '8. Governing Law',
    body: [
      'These Terms are governed by the laws of the jurisdiction in which The Pivot is registered, without regard to conflict-of-law principles.',
    ],
  },
  {
    id: undefined,
    heading: '9. Contact Us',
    body: [
      'Questions about these Terms can be sent to hello.thepivot@proton.me.',
    ],
  },
]

export default function TermsOfUse() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', paddingTop: '160px', paddingBottom: '120px' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 clamp(20px, 4vw, 64px)' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              letterSpacing: '-0.02em',
              color: 'var(--color-ink)',
              marginBottom: '0.75rem',
            }}
          >
            Terms of Use
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              color: 'rgba(10,33,31,0.5)',
              marginBottom: '3rem',
            }}
          >
            Last updated: January 2026
          </p>

          {SECTIONS.map((section) => (
            <section key={section.heading} id={section.id} style={{ marginBottom: '2.25rem', scrollMarginTop: '120px' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.35rem',
                  letterSpacing: '-0.01em',
                  color: 'var(--color-ink)',
                  marginBottom: '0.75rem',
                }}
              >
                {section.heading}
              </h2>
              {section.body.map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.98rem',
                    lineHeight: 1.7,
                    color: 'rgba(10,33,31,0.75)',
                    marginBottom: '0.85rem',
                  }}
                >
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
