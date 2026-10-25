import type { Metadata } from 'next';
import { getMedia } from '@/data/media';
import { site } from '@/data/site';
import type { Article, FaqItem, MediaId, Service } from '@/types/content';

export const absoluteUrl = (path = '/') => new URL(path, site.url).toString();

interface PageMeta {
  title: string;
  description: string;
  path: string;
  image?: MediaId;
  type?: 'website' | 'article';
  publishedTime?: string;
}

export function buildMetadata({ title, description, path, image, type = 'website', publishedTime }: PageMeta): Metadata {
  const ogImage = image
    ? { url: getMedia(image).src, width: getMedia(image).width, height: getMedia(image).height, alt: getMedia(image).alt }
    : { url: '/og-default.jpg', width: 1200, height: 630, alt: site.name };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} — ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      locale: 'en_GB',
      type,
      images: [ogImage],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: 'summary_large_image', title: `${title} — ${site.name}`, description, images: [ogImage.url] },
  };
}

type JsonLd = Record<string, unknown>;

/** Business entity. Address, rating and registration fields are intentionally omitted until real data exists. */
export function businessJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutomotiveBusiness',
    '@id': absoluteUrl('/#business'),
    name: site.name,
    description: site.description,
    url: site.url,
    image: absoluteUrl('/og-default.jpg'),
    currenciesAccepted: site.currency,
    areaServed: 'PL',
    knowsAbout: ['Paint protection film', 'Ceramic coating', 'Paint correction', 'Automotive detailing'],
  };
}

export function serviceJsonLd(service: Service, priceFrom: number): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.summary,
    serviceType: service.name,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { '@id': absoluteUrl('/#business') },
    offers: {
      '@type': 'Offer',
      priceCurrency: site.currency,
      price: priceFrom,
      description: 'Sample starting price for demonstration; final price confirmed after inspection.',
    },
  };
}

export function faqJsonLd(items: FaqItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function articleJsonLd(article: Article): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.dek,
    datePublished: article.publishedAt,
    author: { '@type': 'Organization', name: article.author },
    publisher: { '@id': absoluteUrl('/#business') },
    image: absoluteUrl(getMedia(article.heroImage).src),
    mainEntityOfPage: absoluteUrl(`/journal/${article.slug}`),
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: absoluteUrl(t.path) })),
  };
}
