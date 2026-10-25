import type { MetadataRoute } from 'next';
import { articles } from '@/data/journal';
import { projects } from '@/data/portfolio';
import { services } from '@/data/services';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['/', '/services', '/portfolio', '/pricing', '/about', '/journal', '/faq', '/contact', '/book', '/privacy', '/terms', '/credits'];
  return [
    ...staticRoutes.map((path) => ({ url: absoluteUrl(path), changeFrequency: 'monthly' as const, priority: path === '/' ? 1 : 0.7 })),
    ...services.map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...projects.map((p) => ({ url: absoluteUrl(`/portfolio/${p.slug}`), changeFrequency: 'yearly' as const, priority: 0.5 })),
    ...articles.map((a) => ({ url: absoluteUrl(`/journal/${a.slug}`), lastModified: a.publishedAt, changeFrequency: 'yearly' as const, priority: 0.6 })),
  ];
}
