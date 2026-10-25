import type generatedMedia from '@/data/media.generated.json';

/** Every processed image has a stable id; unknown ids fail type checking. */
export type MediaId = keyof typeof generatedMedia;

export interface Seo {
  title: string;
  description: string;
}

/* ───────────────────────────── Services ───────────────────────────── */

export type ServiceId = 'ppf' | 'ceramic' | 'correction' | 'exterior' | 'interior' | 'maintenance';

export type ServiceCategory = 'protection' | 'correction' | 'detailing' | 'interior' | 'maintenance';

export interface ProcessStep {
  title: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Service {
  id: ServiceId;
  slug: string;
  index: string;
  name: string;
  shortName: string;
  category: ServiceCategory;
  tagline: string;
  summary: string;
  description: string[];
  heroImage: MediaId;
  previewImage: MediaId;
  gallery: { image: MediaId; caption: string }[];
  benefits: { title: string; description: string }[];
  limitations: string[];
  idealFor: string[];
  process: ProcessStep[];
  duration: string;
  packageIds: string[];
  faqs: FaqItem[];
  related: ServiceId[];
  seo: Seo;
}

/* ───────────────────────────── Pricing ───────────────────────────── */

export type VehicleSizeId = 'compact' | 'sedan' | 'suv' | 'large';

export interface VehicleSize {
  id: VehicleSizeId;
  label: string;
  examples: string;
  multiplier: number;
}

export type ConditionId = 'well-kept' | 'average' | 'attention';

export interface VehicleCondition {
  id: ConditionId;
  label: string;
  description: string;
  factor: number;
}

export interface PricingPackage {
  id: string;
  serviceId: ServiceId;
  name: string;
  summary: string;
  /** Price in PLN for a compact vehicle in well-kept condition. */
  basePrice: number;
  sizeSensitive: boolean;
  conditionSensitive: boolean;
  duration: string;
  features: string[];
  recommended?: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  sizeSensitive: boolean;
  /** When set, the add-on is only offered alongside these services. */
  serviceIds?: ServiceId[];
}

export interface PackageComparison {
  serviceId: ServiceId;
  title: string;
  rows: { label: string; values: Record<string, boolean | string> }[];
}

/* ───────────────────────────── Portfolio ───────────────────────────── */

export type BrandId = 'porsche' | 'ferrari' | 'lamborghini' | 'mercedes-benz' | 'audi' | 'bmw';

export type SegmentId = 'sports' | 'supercar' | 'grand-tourer' | 'performance-saloon' | 'suv';

export type WorkTypeId = 'paint-correction' | 'ceramic-coating' | 'ppf' | 'interior-restoration' | 'full-detailing';

export interface Project {
  id: string;
  slug: string;
  title: string;
  vehicle: { brand: BrandId; model: string };
  segment: SegmentId;
  workTypes: WorkTypeId[];
  image: MediaId;
  /** Process imagery shown on the case study; never of this vehicle. */
  references: MediaId[];
  summary: string;
  brief: string;
  approach: string[];
  result: string;
  specs: { label: string; value: string }[];
  duration: string;
  featured?: boolean;
}

/* ───────────────────────────── Journal ───────────────────────────── */

export type ArticleCategory = 'protection' | 'paint' | 'maintenance' | 'interior' | 'seasonal';

export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string; id: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'quote'; text: string }
  | { type: 'callout'; title: string; text: string }
  | { type: 'figure'; image: MediaId; caption: string }
  | { type: 'table'; caption: string; head: string[]; rows: string[][] };

export interface Article {
  slug: string;
  title: string;
  dek: string;
  category: ArticleCategory;
  publishedAt: string;
  author: string;
  heroImage: MediaId;
  featured?: boolean;
  relatedServices: ServiceId[];
  blocks: ArticleBlock[];
}

/* ───────────────────────────── Misc ───────────────────────────── */

export type FaqTopic = 'booking' | 'protection' | 'correction' | 'aftercare' | 'pricing';

export interface TopicFaq extends FaqItem {
  topic: FaqTopic;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  attribution: string;
  vehicle: string;
  service: ServiceId;
}
