import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { articles } from '@/data/journal';
import { allMedia, getMedia } from '@/data/media';
import { faqs } from '@/data/faqs';
import { projects } from '@/data/portfolio';
import { ESTIMATE_ROUNDING, addOns, packageComparisons, packageById, pricingPackages } from '@/data/pricing';
import { services } from '@/data/services';
import { testimonials } from '@/data/testimonials';
import type { MediaId } from '@/types/content';

const unique = (xs: string[]) => new Set(xs).size === xs.length;

describe('content volume', () => {
  it('meets the brief', () => {
    expect(services).toHaveLength(6);
    expect(projects.length).toBeGreaterThanOrEqual(12);
    expect(articles.length).toBeGreaterThanOrEqual(6);
    expect(projects.filter((p) => p.featured).length).toBeGreaterThanOrEqual(5);
  });
});

describe('identifiers', () => {
  it('are unique', () => {
    expect(unique(services.map((s) => s.id))).toBe(true);
    expect(unique(services.map((s) => s.slug))).toBe(true);
    expect(unique(projects.map((p) => p.id))).toBe(true);
    expect(unique(projects.map((p) => p.slug))).toBe(true);
    expect(unique(articles.map((a) => a.slug))).toBe(true);
    expect(unique(pricingPackages.map((p) => p.id))).toBe(true);
    expect(unique(addOns.map((a) => a.id))).toBe(true);
    expect(unique(faqs.map((f) => f.id))).toBe(true);
    expect(unique(services.flatMap((s) => s.faqs.map((f) => f.id)))).toBe(true);
  });

  it('use URL-safe slugs', () => {
    for (const slug of [...services.map((s) => s.slug), ...projects.map((p) => p.slug), ...articles.map((a) => a.slug)]) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });
});

describe('relations', () => {
  it('service packages exist and belong to the service', () => {
    for (const s of services) {
      expect(s.packageIds.length).toBeGreaterThan(0);
      for (const id of s.packageIds) expect(packageById(id)?.serviceId).toBe(s.id);
    }
    for (const p of pricingPackages) expect(services.find((s) => s.id === p.serviceId)?.packageIds).toContain(p.id);
  });

  it('related services exist and never reference themselves', () => {
    for (const s of services) for (const r of s.related) {
      expect(services.some((x) => x.id === r)).toBe(true);
      expect(r).not.toBe(s.id);
    }
  });

  it('articles, testimonials and add-ons reference real services', () => {
    const ids = new Set(services.map((s) => s.id));
    for (const a of articles) for (const r of a.relatedServices) expect(ids.has(r)).toBe(true);
    for (const t of testimonials) expect(ids.has(t.service)).toBe(true);
    for (const a of addOns) for (const r of a.serviceIds ?? []) expect(ids.has(r)).toBe(true);
  });

  it('comparison tables reference packages of the right service', () => {
    for (const c of packageComparisons) for (const row of c.rows) for (const id of Object.keys(row.values)) expect(packageById(id)?.serviceId).toBe(c.serviceId);
  });
});

describe('pricing data', () => {
  it('uses base prices on the rounding grid so "from" prices match everywhere', () => {
    for (const p of pricingPackages) expect(p.basePrice % ESTIMATE_ROUNDING).toBe(0);
    for (const a of addOns) expect(a.price % ESTIMATE_ROUNDING).toBe(0);
  });
});

describe('media', () => {
  const referenced: MediaId[] = [
    ...services.flatMap((s) => [s.heroImage, s.previewImage, ...s.gallery.map((g) => g.image)]),
    ...projects.flatMap((p) => [p.image, ...p.references]),
    ...articles.flatMap((a) => [a.heroImage, ...a.blocks.flatMap((b) => (b.type === 'figure' ? [b.image] : []))]),
  ];

  it('every referenced image resolves with dimensions and alt text', () => {
    for (const id of referenced) {
      const m = getMedia(id);
      expect(m.width).toBeGreaterThan(0);
      expect(m.alt.length).toBeGreaterThan(10);
    }
  });

  it('every image file exists on disk', () => {
    for (const m of allMedia()) expect(fs.existsSync(path.join(process.cwd(), 'public', m.src))).toBe(true);
  });

  it('a project never uses its own hero as a "representative" reference', () => {
    for (const p of projects) expect(p.references).not.toContain(p.image);
  });

  it('the simulated before image is flagged as simulated', () => {
    expect(getMedia('paint-before-simulated').simulated).toBe(true);
  });
});
