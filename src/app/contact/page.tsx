import { ContactPage } from '@/components/sections/ContactPage'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/sections/Footer'

export const metadata = {
  title: 'Contact — THE PIVOT',
  description: 'Start a project, book a demo, or get in touch with The Pivot.',
}

export default function Contact() {
  return (
    <>
      <Navbar />
      <main>
        <ContactPage />
      </main>
      <Footer />
    </>
  )
}
