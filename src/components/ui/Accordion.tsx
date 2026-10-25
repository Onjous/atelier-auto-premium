'use client';

import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  headingLevel?: 'h3' | 'h4';
  tone?: 'dark' | 'paper';
  defaultOpen?: string | null;
}

/** WAI-ARIA accordion: buttons inside headings, one panel open at a time. */
export function Accordion({ items, headingLevel: H = 'h3', tone = 'dark', defaultOpen = null }: AccordionProps) {
  const [open, setOpen] = useState<string | null>(defaultOpen);
  const base = useId();
  const line = tone === 'dark' ? 'border-line' : 'border-line-ink';

  return (
    <div className={cn('border-t', line)}>
      {items.map((item, i) => {
        const isOpen = open === item.id;
        const buttonId = `${base}-b-${item.id}`;
        const panelId = `${base}-p-${item.id}`;
        return (
          <div key={item.id} className={cn('border-b', line)}>
            <H className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="group flex w-full items-start gap-5 py-6 text-left md:gap-8 md:py-7"
              >
                <span className={cn('t-meta mt-1.5 w-6 shrink-0', tone === 'dark' ? 'text-champagne' : 'text-graphite')}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 text-[1.0625rem] leading-snug font-normal tracking-[-0.01em] md:text-xl">{item.question}</span>
                <span
                  aria-hidden
                  className={cn(
                    'mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border transition-[transform,background-color,color] duration-500 ease-[var(--ease-expo)]',
                    line,
                    isOpen && 'rotate-45',
                    isOpen && (tone === 'dark' ? 'bg-bone text-ink-900' : 'bg-ink-900 text-bone'),
                  )}
                >
                  <Plus className="size-4" strokeWidth={1.5} />
                </span>
              </button>
            </H>
            <div id={panelId} role="region" aria-labelledby={buttonId} className="accordion-panel" data-open={isOpen} inert={!isOpen}>
              <div>
                <p className={cn('max-w-[60ch] pr-12 pb-8 pl-11 md:pl-14', tone === 'dark' ? 'text-mist' : 'text-graphite')}>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
