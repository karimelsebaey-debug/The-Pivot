import { ContactPage } from '@/components/sections/ContactPage'
import { Navbar } from '@/components/nav/Navbar'

export const metadata = {
  title: 'Contact — THE PIVOT',
  description: 'Start a project, book a demo, or get in touch with The Pivot.',
}

export default function Contact() {
  return (
    <>
      <Navbar />
      <ContactPage />
    </>
  )
}
