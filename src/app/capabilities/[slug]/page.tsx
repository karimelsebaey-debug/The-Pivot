import { notFound } from 'next/navigation'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/sections/Footer'
import { ServiceHero } from '@/components/sections/ServiceHero'
import { ServiceWorkGrid } from '@/components/sections/ServiceWorkGrid'
import { CategoryHero } from '@/components/sections/CategoryHero'
import { CategoryIntro } from '@/components/sections/CategoryIntro'
import {
  getServiceBySlug,
  getCategoryBySlug,
  ALL_SERVICES,
  SERVICE_CATEGORIES,
} from '@/lib/services-data'

export async function generateStaticParams() {
  const serviceParams  = ALL_SERVICES.map(s => ({ slug: s.slug }))
  const categoryParams = SERVICE_CATEGORIES.map(c => ({ slug: c.slug }))
  return [...serviceParams, ...categoryParams]
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const category = getCategoryBySlug(slug)
  if (category) {
    return {
      title: `${category.title} — THE PIVOT`,
      description: category.description,
    }
  }

  const service = getServiceBySlug(slug)
  if (service) {
    return {
      title: `${service.title} — THE PIVOT`,
      description: service.longDescription,
    }
  }

  return {}
}

export default async function CapabilitiesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const category = getCategoryBySlug(slug)
  if (category) {
    return (
      <>
        <Navbar />
        <main>
          <CategoryHero category={category} />
          <CategoryIntro category={category} />
        </main>
        <Footer />
      </>
    )
  }

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
