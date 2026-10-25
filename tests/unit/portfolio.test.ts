import { describe, expect, it } from 'vitest';
import { projects } from '@/data/portfolio';
import { emptyFilters, facetCount, filterProjects, hasActiveFilters, relatedProjects } from '@/lib/portfolio';

describe('filterProjects', () => {
  it('returns everything with empty filters', () => {
    expect(filterProjects(projects, emptyFilters)).toHaveLength(projects.length);
  });

  it('filters by service type, brand and vehicle class together', () => {
    const r = filterProjects(projects, { ...emptyFilters, work: 'ppf', brand: 'porsche' });
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((p) => p.workTypes.includes('ppf') && p.vehicle.brand === 'porsche')).toBe(true);
    const suv = filterProjects(projects, { ...emptyFilters, segment: 'suv' });
    expect(suv.every((p) => p.segment === 'suv')).toBe(true);
  });

  it('searches across model, brand label and service labels', () => {
    expect(filterProjects(projects, { ...emptyFilters, query: 'huracan' }).map((p) => p.slug)).toEqual(['lamborghini-huracan-ppf']);
    expect(filterProjects(projects, { ...emptyFilters, query: 'mercedes interior' }).length).toBe(1);
  });

  it('returns an empty list when nothing matches', () => {
    expect(filterProjects(projects, { ...emptyFilters, brand: 'bmw', work: 'ppf' })).toEqual([]);
  });
});

describe('facetCount', () => {
  it('counts results for an option given the other active filters', () => {
    const f = { ...emptyFilters, brand: 'ferrari' as const };
    expect(facetCount(projects, f, 'work', 'ppf')).toBe(filterProjects(projects, { ...f, work: 'ppf' }).length);
  });
});

describe('hasActiveFilters', () => {
  it('treats whitespace-only queries as inactive', () => {
    expect(hasActiveFilters({ ...emptyFilters, query: '  ' })).toBe(false);
    expect(hasActiveFilters({ ...emptyFilters, brand: 'audi' })).toBe(true);
  });
});

describe('relatedProjects', () => {
  it('excludes the project itself and prefers shared work types', () => {
    const base = projects[0]!;
    const related = relatedProjects(projects, base);
    expect(related).toHaveLength(3);
    expect(related.some((p) => p.id === base.id)).toBe(false);
    expect(related[0]!.workTypes.some((w) => base.workTypes.includes(w))).toBe(true);
  });
});
