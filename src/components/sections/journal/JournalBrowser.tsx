'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import type { ArticleCardData } from '@/components/sections/shared/ArticleCard';
import { Img } from '@/components/ui/Img';
import { matchesQuery } from '@/lib/search';
import { replaceSearch, useSearchString } from '@/lib/url-state';

export interface BrowsableArticle extends ArticleCardData {
  categoryId: string;
  searchText: string;
}

export function JournalBrowser({ articles, categories }: { articles: BrowsableArticle[]; categories: { id: string; label: string }[] }) {
  const search = useSearchString();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const category = categories.some((c) => c.id === params.get('category')) ? params.get('category') : null;
  const query = params.get('q') ?? '';

  const results = articles.filter((a) => (!category || a.categoryId === category) && matchesQuery(query, [a.searchText]));

  const update = (next: { category?: string | null; q?: string }) => {
    const sp = new URLSearchParams();
    const c = next.category === undefined ? category : next.category;
    const q = next.q === undefined ? query : next.q;
    if (c) sp.set('category', c);
    if (q) sp.set('q', q);
    replaceSearch(sp);
  };

  return (
    <div>
      <div className="flex flex-col gap-6 border-y border-line py-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="-mx-[var(--gutter)] flex scrollbar-none gap-2 overflow-x-auto px-[var(--gutter)] lg:mx-0 lg:px-0" role="group" aria-label="Filter articles by category">
          <button type="button" className="chip shrink-0" aria-pressed={category === null} onClick={() => update({ category: null })}>
            All
          </button>
          {categories.map((c) => (
            <button key={c.id} type="button" className="chip shrink-0" aria-pressed={category === c.id} onClick={() => update({ category: category === c.id ? null : c.id })}>
              {c.label}
            </button>
          ))}
        </div>
        <label className="relative block lg:w-80">
          <span className="t-eyebrow mb-1 block text-mist">Search the journal</span>
          <Search aria-hidden className="pointer-events-none absolute bottom-4 left-0 size-4 text-mist" strokeWidth={1.5} />
          <input type="search" value={query} placeholder="Coating, leather, winter…" className="field-input !min-h-11 !py-2 pl-7" onChange={(e) => update({ q: e.target.value })} />
        </label>
      </div>

      <p className="t-meta mt-6 text-mist" role="status" aria-live="polite">
        {results.length} {results.length === 1 ? 'article' : 'articles'}
        {category && ` in ${categories.find((c) => c.id === category)?.label}`}
        {query && ` matching “${query}”`}
      </p>

      {results.length === 0 ? (
        <div className="py-24">
          <p className="t-h3">Nothing here yet.</p>
          <p className="mt-4 max-w-md text-mist">No articles match that search. Try a broader term, or browse every article.</p>
          <button type="button" className="btn btn-ghost mt-8" onClick={() => replaceSearch(new URLSearchParams())}>
            <span>Show all articles</span>
          </button>
        </div>
      ) : (
        <ul className="mt-6 border-t border-line">
          {results.map((a) => (
            <li key={a.slug} className="border-b border-line">
              <article className="group relative grid grid-cols-[6rem_1fr] items-center gap-5 py-7 sm:grid-cols-[10rem_1fr] md:grid-cols-12 md:gap-x-[var(--col-gap)] md:py-9">
                <div className="light-sweep relative aspect-square overflow-hidden md:col-span-2">
                  <Img asset={a.image} sizes="(min-width: 768px) 14vw, 25vw" className="transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-[1.06]" />
                </div>
                <div className="md:col-span-6 md:col-start-4">
                  <p className="t-meta text-champagne">{a.category}</p>
                  <h2 className="mt-2 text-[clamp(1.2rem,0.95rem+1.1vw,2rem)] leading-[1.12] font-light tracking-[-0.02em]">
                    <Link href={a.href} className="after:absolute after:inset-0 transition-colors group-hover:text-champagne-soft">
                      {a.title}
                    </Link>
                  </h2>
                  <p className="mt-3 hidden max-w-xl text-mist sm:block">{a.dek}</p>
                </div>
                <div className="t-meta col-span-2 flex items-center justify-between gap-4 text-mist md:col-span-3 md:col-start-10 md:flex-col md:items-end">
                  <span>
                    <time dateTime={a.date}>{a.dateLabel}</time> · {a.minutes} min
                  </span>
                  <ArrowUpRight aria-hidden className="size-5 transition-[transform,color] duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-champagne" strokeWidth={1.25} />
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
