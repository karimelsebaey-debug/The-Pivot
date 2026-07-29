import type { Metadata } from 'next'
import { Instrument_Serif, Inter_Tight, DM_Mono } from 'next/font/google'
import { LenisProvider } from '@/lib/lenis'
import { PageTransition } from '@/components/ui/PageTransition'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const interTight = Inter_Tight({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const dmMono = DM_Mono({
  weight: ['300', '400'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.thepivot.online'),
  title: 'THE PIVOT — The Turning Point For Your Creative Ambition',
  description:
    'A full-service creative platform. We deliver impact, not files.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'THE PIVOT',
    description: 'The Turning Point For Your Creative Ambition.',
    siteName: 'THE PIVOT',
    url: '/',
    type: 'website',
    images: [
      {
        url: '/preloader-bg.jpg',
        width: 2752,
        height: 1536,
        alt: 'THE PIVOT — creative agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'THE PIVOT',
    description: 'The Turning Point For Your Creative Ambition.',
    images: ['/preloader-bg.jpg'],
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'THE PIVOT',
  url: 'https://www.thepivot.online',
  logo: 'https://www.thepivot.online/logo.png',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${interTight.variable} ${dmMono.variable}`}
      style={{ background: '#0A211F' }}
    >
      <body style={{ background: '#0A211F' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <LenisProvider>
          <PageTransition>{children}</PageTransition>
        </LenisProvider>
      </body>
    </html>
  )
}
