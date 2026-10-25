import { describe, expect, it } from 'vitest';
import { articles, readingMinutes } from '@/data/journal';
import { filterArticles, relatedArticles, tableOfContents } from '@/lib/journal';

describe('filterArticles', () => {
  it('filters by category', () => {
    const r = filterArticles(articles, 'protection', '');
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((a) => a.category === 'protection')).toBe(true);
  });

  it('searches body text, not just titles', () => {
    expect(filterArticles(articles, null, 'fingernail').map((a) => a.slug)).toEqual(['how-paint-correction-works']);
  });

  it('combines category and query', () => {
    expect(filterArticles(articles, 'interior', 'ceramic')).toEqual([]);
  });
});

describe('readingMinutes', () => {
  it('reflects substantive articles (≥ 3 minutes each)', () => {
    for (const a of articles) expect(readingMinutes(a)).toBeGreaterThanOrEqual(3);
  });
});

describe('relatedArticles', () => {
  it('never includes the article itself', () => {
    for (const a of articles) expect(relatedArticles(articles, a).some((r) => r.slug === a.slug)).toBe(false);
  });
});

describe('tableOfContents', () => {
  it('lists every h2 with a unique id', () => {
    for (const a of articles) {
      const ids = tableOfContents(a).map((t) => t.id);
      expect(new Set(ids).size).toBe(ids.length);
      expect(ids.length).toBeGreaterThanOrEqual(3);
    }
  });
});
