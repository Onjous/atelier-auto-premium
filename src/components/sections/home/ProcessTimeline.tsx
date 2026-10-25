'use client';

import { useEffect, useRef, useState } from 'react';
import type { StudioStep } from '@/data/process';
import { cn } from '@/lib/cn';

/**
 * Scroll-linked process: the step nearest the viewport centre becomes active and
 * a hairline fills with progress. Nothing is pinned or hijacked — the page
 * scrolls normally and every step is fully readable at all times.
 */
export function ProcessTimeline({ steps, children }: { steps: StudioStep[]; children: React.ReactNode }) {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const items = Array.from(list.current?.querySelectorAll<HTMLElement>('[data-step]') ?? []);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    items.forEach((el) => io.observe(el));

    let raf = 0;
    const update = () => {
      raf = 0;
      const el = list.current;
      if (!el || !fill.current) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.5 - rect.top) / rect.height));
      fill.current.style.transform = `scaleY(${progress})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const current = steps[active] ?? steps[0];

  return (
    <div className="grid grid-cols-1 gap-x-[var(--col-gap)] lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
          {children}
          <div className="mt-14 hidden items-end gap-4 lg:flex" aria-hidden>
            <span key={current?.index} className="block text-[9rem] leading-[0.8] font-extralight tracking-[-0.06em] tabular-nums animate-[hero-fade_0.8s_var(--ease-expo)_both]">
              {current?.index}
            </span>
            <span className="t-meta pb-3 text-mist">/ {String(steps.length).padStart(2, '0')}</span>
          </div>
          <p className="t-meta mt-6 hidden text-champagne lg:block" aria-live="polite">
            {current?.instrument}
          </p>
        </div>
      </div>

      <ol ref={list} className="relative mt-14 lg:col-span-6 lg:col-start-7 lg:mt-0">
        <span aria-hidden className="absolute top-0 bottom-0 left-0 w-px bg-line" />
        <span ref={fill} aria-hidden className="absolute top-0 bottom-0 left-0 w-px origin-top scale-y-0 bg-champagne" />
        {steps.map((step, i) => (
          <li
            key={step.index}
            data-step={i}
            aria-current={i === active ? 'step' : undefined}
            className={cn(
              'relative pb-16 pl-10 last:pb-0 md:pb-24 md:pl-14',
            )}
          >
            <span
              aria-hidden
              className={cn(
                'absolute top-2 -left-[3px] size-[7px] rounded-full border transition-colors duration-500',
                i <= active ? 'border-champagne bg-champagne' : 'border-line-strong bg-ink-900',
              )}
            />
            <span className="t-meta text-champagne">{step.index}</span>
            <h3
              className={cn(
                'mt-4 text-[clamp(1.6rem,1.2rem+1.5vw,2.6rem)] leading-[1.05] font-light tracking-[-0.03em] uppercase transition-[color,transform] duration-700 ease-[var(--ease-expo)]',
                i === active ? 'text-bone lg:translate-x-2' : 'text-bone lg:text-bone/55',
              )}
            >
              {step.title}
            </h3>
            <p className="mt-5 max-w-lg text-mist">{step.description}</p>
            <p className="t-meta mt-5 text-bone/50 lg:hidden">{step.instrument}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
