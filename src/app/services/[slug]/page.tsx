import { notFound } from 'next/navigation'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/sections/Footer'
import { ServiceHero } from '@/components/sections/ServiceHero'
import { ServiceWorkGrid } from '@/components/sections/ServiceWorkGrid'
import { getServiceBySlug, ALL_SERVICES } from '@/lib/services-data'

export async function generateStaticParams() {
  return ALL_SERVICES.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}
  return {
    title: `${service.title} — THE PIVOT`,
    description: service.longDescription,
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  return (
    <>
      <Navbar />
      <main>
        <ServiceHero service={service} />
        {service.videos.length > 0 && <ServiceWorkGrid service={service} />}
      </main>
      <Footer />
    </>
  )
}
