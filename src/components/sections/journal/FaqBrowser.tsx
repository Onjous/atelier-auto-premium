'use client';

import { Search } from 'lucide-react';
import { Accordion } from '@/components/ui/Accordion';
import { matchesQuery } from '@/lib/search';
import { replaceSearch, useSearchString } from '@/lib/url-state';
import type { FaqTopic, TopicFaq } from '@/types/content';

export function FaqBrowser({ faqs, topics }: { faqs: TopicFaq[]; topics: { id: FaqTopic; label: string }[] }) {
  const params = new URLSearchParams(useSearchString());
  const topic = topics.some((t) => t.id === params.get('topic')) ? (params.get('topic') as FaqTopic) : null;
  const query = params.get('q') ?? '';

  const set = (next: { topic?: FaqTopic | null; q?: string }) => {
    const sp = new URLSearchParams();
    const t = next.topic === undefined ? topic : next.topic;
    const q = next.q === undefined ? query : next.q;
    if (t) sp.set('topic', t);
    if (q) sp.set('q', q);
    replaceSearch(sp);
  };

  const visible = faqs.filter((f) => (!topic || f.topic === topic) && matchesQuery(query, [f.question, f.answer]));
  const groups = topics.map((t) => ({ ...t, items: visible.filter((f) => f.topic === t.id) })).filter((g) => g.items.length > 0);

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-[var(--col-gap)]">
      <div className="lg:col-span-3">
        <div className="space-y-8 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
          <label className="relative block">
            <span className="t-eyebrow mb-1 block text-mist">Search questions</span>
            <Search aria-hidden className="pointer-events-none absolute bottom-4 left-0 size-4 text-mist" strokeWidth={1.5} />
            <input type="search" value={query} placeholder="Deposit, matte, wash…" className="field-input !min-h-11 !py-2 pl-7" onChange={(e) => set({ q: e.target.value })} />
          </label>
          <div className="-mx-[var(--gutter)] flex scrollbar-none gap-2 overflow-x-auto px-[var(--gutter)] lg:mx-0 lg:flex-col lg:items-start lg:px-0" role="group" aria-label="Filter by topic">
            <button type="button" className="chip shrink-0" aria-pressed={topic === null} onClick={() => set({ topic: null })}>
              All topics
            </button>
            {topics.map((t) => (
              <button key={t.id} type="button" className="chip shrink-0" aria-pressed={topic === t.id} onClick={() => set({ topic: topic === t.id ? null : t.id })}>
                {t.label}
              </button>
            ))}
          </div>
          <p className="t-meta text-mist" role="status" aria-live="polite">
            {visible.length} of {faqs.length} questions
          </p>
        </div>
      </div>
      <div className="space-y-16 lg:col-span-8 lg:col-start-5">
        {groups.length === 0 && (
          <div>
            <p className="t-h3">No questions match “{query}”.</p>
            <p className="mt-3 text-mist">Try another word, or ask the studio directly — we answer every enquiry personally.</p>
          </div>
        )}
        {groups.map((g) => (
          <section key={g.id} aria-labelledby={`topic-${g.id}`}>
            <h2 id={`topic-${g.id}`} className="t-eyebrow mb-6 text-champagne">
              {g.label}
            </h2>
            <Accordion items={g.items} />
          </section>
        ))}
      </div>
    </div>
  );
}
