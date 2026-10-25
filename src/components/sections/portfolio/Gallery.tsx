'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { Expand, Search, X } from 'lucide-react';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { ProjectCard, type ProjectCardData } from '@/components/sections/shared/ProjectCard';
import { brands, segments, workTypes } from '@/data/portfolio';
import { emptyFilters, facetCount, filterProjects, hasActiveFilters, type PortfolioFilters } from '@/lib/portfolio';
import { cn } from '@/lib/cn';
import { replaceSearch, useSearchString } from '@/lib/url-state';
import type { BrandId, Project, SegmentId, WorkTypeId } from '@/types/content';
import { Lightbox } from './Lightbox';

const slots = [
  { span: 'md:col-span-7', aspect: 'aspect-[4/3]', sizes: '(min-width: 768px) 56vw, 100vw' },
  { span: 'md:col-span-5 md:mt-24', aspect: 'aspect-[4/5]', sizes: '(min-width: 768px) 40vw, 100vw' },
  { span: 'md:col-span-4', aspect: 'aspect-[4/5]', sizes: '(min-width: 768px) 32vw, 100vw' },
  { span: 'md:col-span-4 md:mt-16', aspect: 'aspect-[4/5]', sizes: '(min-width: 768px) 32vw, 100vw' },
  { span: 'md:col-span-4', aspect: 'aspect-[4/5]', sizes: '(min-width: 768px) 32vw, 100vw' },
  { span: 'md:col-span-5', aspect: 'aspect-[4/5]', sizes: '(min-width: 768px) 40vw, 100vw' },
  { span: 'md:col-span-7 md:mt-24', aspect: 'aspect-[4/3]', sizes: '(min-width: 768px) 56vw, 100vw' },
];

function readFilters(params: URLSearchParams): PortfolioFilters {
  const pick = <T extends string>(key: string, allowed: { id: T }[]) => {
    const v = params.get(key);
    return allowed.some((a) => a.id === v) ? (v as T) : null;
  };
  return {
    work: pick<WorkTypeId>('service', workTypes),
    brand: pick<BrandId>('brand', brands),
    segment: pick<SegmentId>('class', segments),
    query: params.get('q') ?? '',
  };
}

interface FacetProps<T extends string> {
  label: string;
  options: { id: T; label: string }[];
  value: T | null;
  count: (id: T) => number;
  onChange: (id: T | null) => void;
}

function Facet<T extends string>({ label, options, value, count, onChange }: FacetProps<T>) {
  return (
    <fieldset className="min-w-0">
      <legend className="t-eyebrow mb-3 text-mist">{label}</legend>
      <div className="-mx-[var(--gutter)] flex scrollbar-none gap-2 overflow-x-auto px-[var(--gutter)] md:mx-0 md:flex-wrap md:px-0">
        <button type="button" className="chip shrink-0" aria-pressed={value === null} onClick={() => onChange(null)}>
          All
        </button>
        {options.map((o) => {
          const n = count(o.id);
          return (
            <button key={o.id} type="button" className="chip shrink-0" aria-pressed={value === o.id} disabled={n === 0 && value !== o.id} onClick={() => onChange(value === o.id ? null : o.id)}>
              {o.label}
              <span className="chip-count">{n}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function Gallery({ projects, cards }: { projects: Project[]; cards: Record<string, ProjectCardData> }) {
  const search = useSearchString();
  const filters = useMemo(() => readFilters(new URLSearchParams(search)), [search]);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const results = useMemo(() => filterProjects(projects, filters), [projects, filters]);

  const update = (next: Partial<PortfolioFilters>) => {
    const merged = { ...filters, ...next };
    const sp = new URLSearchParams();
    if (merged.work) sp.set('service', merged.work);
    if (merged.brand) sp.set('brand', merged.brand);
    if (merged.segment) sp.set('class', merged.segment);
    if (merged.query) sp.set('q', merged.query);
    replaceSearch(sp);
  };

  const current = filters;
  const active = hasActiveFilters(current);

  return (
    <MotionProvider>
      <div className="border-y border-line py-6">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1fr_auto] xl:items-end">
          <Facet label="Service" options={workTypes} value={filters.work} count={(id) => facetCount(projects, current, 'work', id)} onChange={(work) => update({ work })} />
          <Facet label="Marque" options={brands} value={filters.brand} count={(id) => facetCount(projects, current, 'brand', id)} onChange={(brand) => update({ brand })} />
          <div className="flex flex-wrap items-end gap-4 xl:w-72 xl:flex-col xl:items-stretch">
            <label className="relative block min-w-56 flex-1">
              <span className="t-eyebrow mb-1 block text-mist">Search</span>
              <Search aria-hidden className="pointer-events-none absolute bottom-4 left-0 size-4 text-mist" strokeWidth={1.5} />
              <input
                type="search"
                value={filters.query}
                placeholder="Model, marque, finish…"
                className="field-input !min-h-11 !py-2 pl-7"
                onChange={(e) => update({ query: e.target.value })}
              />
            </label>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <Facet label="Vehicle class" options={segments} value={filters.segment} count={(id) => facetCount(projects, current, 'segment', id)} onChange={(segment) => update({ segment })} />
          <div className="flex items-center gap-5 self-end">
            <p className="t-meta text-mist" role="status" aria-live="polite">
              Showing <span className="text-bone">{results.length}</span> of {projects.length}
            </p>
            {active && (
              <button
                type="button"
                className="t-eyebrow flex min-h-11 items-center gap-2 text-bone transition-colors hover:text-champagne"
                onClick={() => update({ ...emptyFilters })}
              >
                <X aria-hidden className="size-3.5" strokeWidth={1.5} /> Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="flex flex-col items-start gap-6 border-b border-line py-28">
          <p className="t-h3">No projects match these filters.</p>
          <p className="max-w-md text-mist">Try removing a filter or searching for a marque or service instead — for example “Porsche” or “ceramic”.</p>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => update({ ...emptyFilters })}
          >
            <span>Show all projects</span>
          </button>
        </div>
      ) : (
        <ul className="mt-14 grid grid-cols-1 gap-x-[var(--col-gap)] gap-y-16 md:grid-cols-12 md:gap-y-24">
          <AnimatePresence mode="popLayout" initial={false}>
            {results.map((p, i) => {
              const slot = slots[i % slots.length]!;
              const card = cards[p.id]!;
              return (
                <m.li
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={cn('col-span-1', slot.span)}
                >
                  <ProjectCard
                    project={card}
                    index={`W—${String(projects.indexOf(p) + 1).padStart(2, '0')}`}
                    aspect={slot.aspect}
                    sizes={slot.sizes}
                    reveal={false}
                    overlay={
                      <button
                        type="button"
                        onClick={() => setLightbox(i)}
                        aria-label={`View larger image: ${card.name}`}
                        className="absolute top-4 right-4 grid grid-cols-1 size-11 place-items-center border border-bone/30 bg-ink-950/50 text-bone backdrop-blur transition-[opacity,border-color] duration-500 hover:border-bone focus-visible:opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100"
                      >
                        <Expand aria-hidden className="size-4" strokeWidth={1.5} />
                      </button>
                    }
                  />
                </m.li>
              );
            })}
          </AnimatePresence>
        </ul>
      )}

      <Lightbox
        index={lightbox}
        onChange={setLightbox}
        items={results.map((p) => ({
          id: p.id,
          image: cards[p.id]!.image,
          title: cards[p.id]!.name,
          caption: `${cards[p.id]!.title} · ${cards[p.id]!.services}`,
          href: cards[p.id]!.href,
        }))}
      />
    </MotionProvider>
  );
}
