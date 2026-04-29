import { Navbar } from '@/components/nav/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { WorkGrid } from '@/components/sections/WorkGrid'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WorkGrid />
      </main>
      <Footer />
    </>
  )
}
