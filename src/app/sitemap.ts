import type { MetadataRoute } from 'next'
import { SERVICE_CATEGORIES, ALL_SERVICES } from '@/lib/services-data'

const SITE_URL = 'https://www.thepivot.online'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/selected-work`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/perspectives`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/terms-of-use`, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const categoryRoutes: MetadataRoute.Sitemap = SERVICE_CATEGORIES.map(cat => ({
    url: `${SITE_URL}/capabilities/${cat.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const serviceRoutes: MetadataRoute.Sitemap = ALL_SERVICES.map(service => ({
    url: `${SITE_URL}/services/${service.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...categoryRoutes, ...serviceRoutes]
}
