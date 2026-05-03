import { Navbar } from '@/components/nav/Navbar'
import { HeroCanvas } from '@/components/sections/HeroCanvas'
import { Services } from '@/components/sections/Services'
import { WorkGrid } from '@/components/sections/WorkGrid'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroCanvas />
        <Services />
        <WorkGrid />
      </main>
      <Footer />
    </>
  )
}
