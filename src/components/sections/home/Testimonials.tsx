'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Testimonial } from '@/types/content';
import { cn } from '@/lib/cn';

/** Manually controlled quotes — no autoplay, so nothing moves while being read. */
export function Testimonials({ items, serviceNames }: { items: Testimonial[]; serviceNames: Record<string, string> }) {
  const [index, setIndex] = useState(0);
  const go = (delta: number) => setIndex((i) => (i + delta + items.length) % items.length);

  return (
    <div>
      <div className="grid grid-cols-1" aria-live="polite" aria-atomic="true">
        {items.map((t, i) => (
          <figure
            key={t.id}
            aria-hidden={i !== index}
            className={cn(
              'col-start-1 row-start-1 transition-[opacity,transform] duration-[900ms] ease-[var(--ease-expo)]',
              i === index ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
            )}
          >
            <blockquote className="font-serif text-[clamp(1.75rem,1.1rem+2.6vw,3.6rem)] leading-[1.12] font-light tracking-[-0.01em] italic">
              <span aria-hidden className="mr-1 text-champagne">“</span>
              {t.quote}
              <span aria-hidden className="text-champagne">”</span>
            </blockquote>
            <figcaption className="t-meta mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-mist">
              <span className="text-bone">{t.attribution}</span>
              <span aria-hidden className="h-px w-6 bg-current" />
              <span>{t.vehicle}</span>
              <span aria-hidden className="h-px w-6 bg-current" />
              <span>{serviceNames[t.service]}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-14 flex items-center gap-6">
        <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="grid grid-cols-1 size-12 place-items-center border border-line-strong transition-colors hover:border-bone">
          <ArrowLeft aria-hidden className="size-4" strokeWidth={1.5} />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="grid grid-cols-1 size-12 place-items-center border border-line-strong transition-colors hover:border-bone">
          <ArrowRight aria-hidden className="size-4" strokeWidth={1.5} />
        </button>
        <p className="t-meta text-mist">
          <span className="text-bone">{String(index + 1).padStart(2, '0')}</span> / {String(items.length).padStart(2, '0')}
        </p>
        <div aria-hidden className="ml-2 hidden h-px flex-1 bg-line sm:block">
          <div className="h-px bg-champagne transition-[width] duration-700 ease-[var(--ease-expo)]" style={{ width: `${((index + 1) / items.length) * 100}%` }} />
        </div>
      </div>
    </div>
  );
}
