import type { Testimonial } from '@/types/content';

/** Fictional sample testimonials for demonstration only — not real customer reviews. */
export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'They showed me the paint readings before touching the car and explained which marks would stay. Being told what was not possible is exactly why I trusted them with the rest.',
    attribution: 'Sample client',
    vehicle: 'Porsche 911 owner',
    service: 'correction',
  },
  {
    id: 't2',
    quote:
      'Three track seasons on the film and the nose still looks untouched. You cannot find the edges unless you know where to look.',
    attribution: 'Sample client',
    vehicle: 'Track-day driver',
    service: 'ppf',
  },
  {
    id: 't3',
    quote:
      'The handover took forty minutes. Lights, readings, a care guide, and a straight answer to every question. It felt more like collecting a car from a factory than from a detailer.',
    attribution: 'Sample client',
    vehicle: 'Grand tourer owner',
    service: 'ceramic',
  },
];
