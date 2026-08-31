import { MetadataRoute } from 'next';
import { services } from '@/lib/data/services';
import { insights } from '@/lib/data/insights';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shivi.in';

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/who-we-help',
    '/insights',
    '/workshops',
    '/contact',
    '/privacy-policy',
    '/coaching-disclaimer',
    '/terms',
    '/refund-policy',
    '/cookie-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const insightRoutes = insights.map((i) => ({
    url: `${baseUrl}/insights/${i.slug}`,
    lastModified: new Date(i.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...insightRoutes];
}
