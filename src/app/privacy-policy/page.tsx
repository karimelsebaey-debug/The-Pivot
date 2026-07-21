import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/sections/Footer'

export const metadata = {
  title: 'Privacy Policy — THE PIVOT',
  description: 'How The Pivot collects, uses, and protects your personal information.',
}

const SECTIONS = [
  {
    heading: '1. Information We Collect',
    body: [
      'When you fill out a contact form, request a quote, or book a call with us, we collect the information you provide directly — your name, email address, company, and any project details you share.',
      'When you browse our site, we automatically collect limited technical data through cookies and analytics tools: pages visited, referring URL, device and browser type, and approximate location. This helps us understand how visitors use the site and improve it over time.',
    ],
  },
  {
    heading: '2. How We Use Your Information',
    body: [
      'We use the information we collect to respond to inquiries, prepare proposals, deliver the services you have engaged us for, send updates about your project, and — where you have opted in — share relevant work and offers.',
      'We do not use your information for any purpose beyond running and improving The Pivot and communicating with you about it.',
    ],
  },
  {
    heading: '3. Cookies & Analytics',
    body: [
      'We use cookies and similar technologies to keep the site working properly and to understand aggregate traffic patterns through analytics. You can disable cookies in your browser settings; some parts of the site may work differently as a result.',
    ],
  },
  {
    heading: '4. Sharing Your Information',
    body: [
      'We do not sell your personal information. We may share it with service providers who help us run our business — for example, hosting, email delivery, and analytics providers — under agreements that limit their use of it to the services they provide us.',
      'We may also disclose information where required by law, or to protect the rights, safety, or property of The Pivot and our clients.',
    ],
  },
  {
    heading: '5. Data Retention & Security',
    body: [
      'We keep personal information for as long as needed to fulfil the purposes described here, or as required by law. We use reasonable technical and organizational measures to protect it, though no method of transmission or storage is completely secure.',
    ],
  },
  {
    heading: '6. Your Rights',
    body: [
      'Depending on where you live, you may have the right to access, correct, export, or delete the personal information we hold about you, and to object to or restrict certain processing. To exercise any of these rights, contact us using the details below.',
    ],
  },
  {
    heading: "7. Children's Privacy",
    body: [
      'Our services are directed at businesses and professionals. We do not knowingly collect personal information from children, and we ask that anyone under 16 not submit information through this site.',
    ],
  },
  {
    heading: '8. Changes to This Policy',
    body: [
      'We may update this policy from time to time to reflect changes in our practices or for legal reasons. We will post the updated version here with a new effective date.',
    ],
  },
  {
    heading: '9. Contact Us',
    body: [
      'If you have questions about this policy or how we handle your information, reach out at hello.thepivot@proton.me or through our contact page.',
    ],
  },
]

export default function PrivacyPolicy() {
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
            Privacy Policy
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
            <section key={section.heading} style={{ marginBottom: '2.25rem' }}>
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
