/**
 * Business configuration. The brand name and every contact detail are
 * provisional placeholders — replace them here and they update site-wide
 * (metadata, structured data, footer, legal pages, booking flow).
 */
export const site = {
  name: 'ATELIER AUTO',
  legalName: 'Atelier Auto (demonstration brand)',
  shortName: 'Atelier Auto',
  motto: 'Precision. Presence. Perfection.',
  description:
    'Precision detailing, paint correction, ceramic coating and paint protection film for vehicles that deserve exceptional care.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://atelier-auto.example',
  locale: 'en',
  currency: 'PLN',
  contact: {
    email: 'studio@example.com',
    phone: '+48 000 000 000',
    phoneHref: '+48000000000',
    addressLines: ['Studio address to be confirmed', 'City, Poland'],
    mapNote: 'Visits by appointment only. Precise directions are shared on confirmation.',
  },
  hours: [
    { days: 'Monday – Friday', time: '08:00 – 18:00' },
    { days: 'Saturday', time: '09:00 – 14:00' },
    { days: 'Sunday', time: 'Closed' },
  ],
  /** Set `href` once real profiles exist; null renders a non-interactive placeholder. */
  social: [
    { label: 'Instagram', href: null },
    { label: 'YouTube', href: null },
    { label: 'LinkedIn', href: null },
  ] as { label: string; href: string | null }[],
  /** Optional hero film — see public/videos/README.md. */
  heroVideo: null as { mp4: string; webm?: string } | null,
} as const;

