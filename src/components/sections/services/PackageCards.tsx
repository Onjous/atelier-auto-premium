import { Check } from 'lucide-react';
import { ButtonLink, TextLink } from '@/components/ui/Button';
import { stagger } from '@/components/ui/RevealHeading';
import { bookingHref } from '@/data/navigation';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/cn';
import type { PricingPackage } from '@/types/content';

export function PackageCards({ packages }: { packages: PricingPackage[] }) {
  return (
    <div className={cn('grid grid-cols-1 gap-px border border-line bg-line', packages.length === 3 ? 'lg:grid-cols-3' : 'md:grid-cols-2')}>
      {packages.map((p, i) => (
        <article key={p.id} className={cn('relative flex flex-col p-7 md:p-9', p.recommended ? 'bg-ink-700' : 'bg-ink-850')} data-reveal="up" style={stagger(i)}>
          {p.recommended && <p className="t-eyebrow absolute top-0 right-7 -translate-y-1/2 bg-champagne px-3 py-1.5 text-ink-900">Most chosen</p>}
          <p className="t-meta text-champagne">{String(i + 1).padStart(2, '0')}</p>
          <h3 className="t-h3 mt-5">{p.name}</h3>
          <p className="mt-3 text-mist lg:min-h-[3.3em]">{p.summary}</p>
          <p className="mt-8 flex items-baseline gap-2 border-t border-line pt-6">
            <span className="t-eyebrow text-mist">From</span>
            <span className="text-3xl font-light tracking-[-0.02em] tabular">{formatPrice(p.basePrice)}</span>
          </p>
          <p className="t-meta mt-2 text-mist">
            Compact vehicle · {p.duration}
            {p.sizeSensitive ? ' · scales with size' : ''}
          </p>
          <ul className="mt-8 flex-1 space-y-3">
            {p.features.map((f) => (
              <li key={f} className="flex gap-3 text-[0.95rem] text-bone/85">
                <Check aria-hidden className="mt-1 size-4 shrink-0 text-champagne" strokeWidth={1.5} />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <ButtonLink href={`${bookingHref}?service=${p.serviceId}&package=${p.id}`} variant={p.recommended ? 'solid' : 'ghost'}>
              Request
            </ButtonLink>
            <TextLink href={`/pricing?package=${p.id}#estimate`} className="text-bone">
              Estimate
            </TextLink>
          </div>
        </article>
      ))}
    </div>
  );
}
