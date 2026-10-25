import { brandLabel, segmentLabel, workTypeLabel } from '@/data/portfolio';
import type { BrandId, Project, SegmentId, WorkTypeId } from '@/types/content';
import { matchesQuery } from './search';

export interface PortfolioFilters {
  work: WorkTypeId | null;
  brand: BrandId | null;
  segment: SegmentId | null;
  query: string;
}

export const emptyFilters: PortfolioFilters = { work: null, brand: null, segment: null, query: '' };

export function filterProjects(list: Project[], f: PortfolioFilters): Project[] {
  return list.filter(
    (p) =>
      (!f.work || p.workTypes.includes(f.work)) &&
      (!f.brand || p.vehicle.brand === f.brand) &&
      (!f.segment || p.segment === f.segment) &&
      matchesQuery(f.query, [
        p.title,
        brandLabel(p.vehicle.brand),
        p.vehicle.model,
        segmentLabel(p.segment),
        ...p.workTypes.map(workTypeLabel),
        p.summary,
      ]),
  );
}

/** Count of results each option would produce given the other active filters. */
export function facetCount<K extends 'work' | 'brand' | 'segment'>(
  list: Project[],
  f: PortfolioFilters,
  key: K,
  value: NonNullable<PortfolioFilters[K]>,
): number {
  return filterProjects(list, { ...f, [key]: value }).length;
}

export function hasActiveFilters(f: PortfolioFilters): boolean {
  return Boolean(f.work || f.brand || f.segment || f.query.trim());
}

/** Related projects: shared work types score highest, then same brand. */
export function relatedProjects(list: Project[], project: Project, limit = 3): Project[] {
  return list
    .filter((p) => p.id !== project.id)
    .map((p) => ({
      p,
      score: p.workTypes.filter((w) => project.workTypes.includes(w)).length * 2 + (p.vehicle.brand === project.vehicle.brand ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score || a.p.id.localeCompare(b.p.id))
    .slice(0, limit)
    .map(({ p }) => p);
}
