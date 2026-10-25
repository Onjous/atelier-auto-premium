'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Img } from '@/components/ui/Img';
import type { MediaAsset } from '@/data/media';
import { cn } from '@/lib/cn';

export interface ServiceIndexItem {
  id: string;
  index: string;
  name: string;
  tagline: string;
  summary: string;
  href: string;
  fromPrice: string;
  duration: string;
  image: MediaAsset;
}

/**
 * Desktop: a numbered index whose hovered/focused row drives a sticky image stage.
 * Touch / small screens: each row carries its own image — nothing depends on hover.
 */
export function ServicesIndex({ items }: { items: ServiceIndexItem[] }) {
  const [active, setActive] = useState(0);
  const current = items[active] ?? items[0];

  return (
    <div className="grid grid-cols-1 gap-x-[var(--col-gap)] lg:grid-cols-12">
      <ul className="border-t border-line lg:col-span-7">
        {items.map((item, i) => {
          const isActive = i === active;
          return (
            <li key={item.id} className="border-b border-line">
              <Link
                href={item.href}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group block py-8 lg:py-9"
              >
                <div className="relative mb-6 aspect-[16/10] overflow-hidden lg:hidden">
                  <Img asset={item.image} sizes="100vw" />
                </div>
                <div className="flex items-baseline gap-5 md:gap-8">
                  <span className={cn('t-meta w-6 shrink-0 text-champagne transition-colors duration-500', !isActive && 'lg:text-mist')}>
                    {item.index}
                  </span>
                  <h3
                    className={cn(
                      'flex-1 text-[clamp(1.75rem,1.2rem+2.4vw,3.6rem)] leading-[1] font-light tracking-[-0.035em] uppercase transition-[color,transform] duration-700 ease-[var(--ease-expo)]',
                      isActive ? 'lg:translate-x-3 lg:text-bone' : 'lg:text-bone/40',
                    )}
                  >
                    {item.name}
                  </h3>
                  <ArrowUpRight
                    aria-hidden
                    strokeWidth={1.25}
                    className={cn(
                      'size-7 shrink-0 transition-[transform,opacity,color] duration-500 ease-[var(--ease-expo)]',
                      isActive ? 'lg:translate-x-0 lg:text-champagne lg:opacity-100' : 'lg:-translate-x-3 lg:opacity-0',
                    )}
                  />
                </div>
                <div
                  className={cn(
                    'grid transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-expo)]',
                    isActive ? 'lg:grid-rows-[1fr] lg:opacity-100' : 'lg:grid-rows-[0fr] lg:opacity-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-4 pt-4 pl-11 md:flex-row md:items-end md:justify-between md:pl-14">
                      <p className="max-w-md text-mist">{item.summary}</p>
                      <p className="t-meta shrink-0 text-bone/70">
                        From <span className="text-bone">{item.fromPrice}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-[calc(var(--header-h)+2rem)]">
          <div className="light-sweep relative aspect-[4/5] overflow-hidden bg-ink-800">
            {items.map((item, i) => (
              <div
                key={item.id}
                aria-hidden={i !== active}
                className={cn(
                  'absolute inset-0 transition-[opacity,transform] duration-[1100ms] ease-[var(--ease-expo)]',
                  i === active ? 'scale-100 opacity-100' : 'scale-[1.06] opacity-0',
                )}
              >
                <Img asset={item.image} sizes="(min-width: 1024px) 38vw, 1px" alt={i === active ? undefined : ''} />
              </div>
            ))}
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/80 to-transparent" />
            {current && (
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6">
                <p className="max-w-[18rem] font-serif text-2xl leading-tight italic">{current.tagline}</p>
                <p className="t-meta shrink-0 text-right text-bone/70">
                  {current.index} / {String(items.length).padStart(2, '0')}
                  <br />
                  {current.duration}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
