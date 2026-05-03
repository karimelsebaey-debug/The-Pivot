import type { Metadata } from 'next'
import { Instrument_Serif, Inter_Tight, Plus_Jakarta_Sans } from 'next/font/google'
import { LenisProvider } from '@/lib/lenis'
import { PageLoader } from '@/components/ui/PageLoader'
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

const plusJakarta = Plus_Jakarta_Sans({
  weight: ['800'],
  subsets: ['latin'],
  variable: '--font-logo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'THE PIVOT — The Turning Point For Your Creative Ambition',
  description:
    'A full-service creative platform. We deliver impact, not files.',
  openGraph: {
    title: 'THE PIVOT',
    description: 'The Turning Point For Your Creative Ambition.',
    siteName: 'THE PIVOT',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${interTight.variable} ${plusJakarta.variable}`}
    >
      <body>
        <PageLoader />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}
