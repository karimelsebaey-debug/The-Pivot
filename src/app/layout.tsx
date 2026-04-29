import type { Metadata } from 'next'
import { Instrument_Serif, Inter_Tight } from 'next/font/google'
import { LenisProvider } from '@/lib/lenis'
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
      className={`${instrumentSerif.variable} ${interTight.variable}`}
    >
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}
