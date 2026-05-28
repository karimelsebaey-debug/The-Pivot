import { Navbar } from '@/components/nav/Navbar'
import { HeroCanvas } from '@/components/sections/HeroCanvas'
import { VerticalLoopHero } from '@/components/sections/VerticalLoopHero'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroCanvas />
        <VerticalLoopHero />
      </main>
      <Footer />
    </>
  )
}
