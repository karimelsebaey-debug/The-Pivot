import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/sections/Footer'
import { PerspectiveSplit } from '@/components/sections/PerspectiveSplit'
import { PerspectiveScrollGroup } from '@/components/sections/PerspectiveScrollGroup'
import { OurValues } from '@/components/sections/OurValues'

export const metadata = {
  title: 'Perspectives — THE PIVOT',
  description: 'Thinking on creativity, strategy, AI, and what it takes to build a brand that lasts.',
}

export default function Perspectives() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
        <PerspectiveScrollGroup>
          <PerspectiveSplit
            image="/images/perspectives/about.jpeg"
            imageAlt="The Pivot team working together"
            imageSide="left"
            label="About The Pivot"
            heading="The creative force *behind brands built to last*"
            fullHeight
          />
          <PerspectiveSplit
            image="/images/perspectives/intro.jpeg"
            imageAlt="The Pivot team on a shoot"
            imageSide="right"
            heading="Not an agency, not a pile of freelancers *— a world-class creative team* ready to move whenever, and however, you need us."
            fullHeight
          />
        </PerspectiveScrollGroup>

        <OurValues />
      </main>
      <Footer />
    </>
  )
}
