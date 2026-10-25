import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { RevealHeading, stagger } from '@/components/ui/RevealHeading';
import { startingPrice } from '@/data/pricing';
import { serviceHref, services } from '@/data/services';
import { formatPrice } from '@/lib/format';

export function PricingPreview() {
  return (
    <section aria-labelledby="pricing-title" className="on-paper section-y bg-paper text-ink-900">
      <div className="shell grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-x-[var(--col-gap)]">
        <div className="lg:col-span-4">
          <p className="t-eyebrow flex items-center gap-4 text-graphite" data-reveal="fade">
            <span className="tabular">08</span>
            <span aria-hidden className="h-px w-10 bg-current opacity-40" />
            Pricing
          </p>
          <RevealHeading
            id="pricing-title"
            className="t-h2 mt-8"
            lines={[
              'Transparent',
              <>
                by <span className="accent">design</span>.
              </>,
            ]}
          />
          <p className="mt-8 max-w-sm text-graphite" data-reveal="up">
            Starting prices are published, and our calculator shows exactly how size, condition and add-ons change an
            estimate. The inspection confirms the final figure.
          </p>
          <ButtonLink href="/pricing" className="mt-10">
            Pricing &amp; estimate calculator
          </ButtonLink>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Starting prices by service, compact vehicle in well-kept condition</caption>
            <thead>
              <tr className="t-eyebrow border-b border-line-ink text-graphite">
                <th scope="col" className="pb-4 font-medium">Service</th>
                <th scope="col" className="hidden pb-4 font-medium sm:table-cell">Duration</th>
                <th scope="col" className="pb-4 text-right font-medium">From</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s, i) => (
                <tr key={s.id} className="group border-b border-line-ink" data-reveal="up" style={stagger(i)}>
                  <th scope="row" className="py-5 pr-4 font-normal md:py-6">
                    <Link href={serviceHref(s)} className="flex items-baseline gap-4 md:gap-6">
                      <span className="t-meta text-graphite">{s.index}</span>
                      <span className="text-lg tracking-[-0.01em] transition-colors group-hover:text-graphite md:text-2xl md:font-light">{s.name}</span>
                    </Link>
                  </th>
                  <td className="t-meta hidden py-5 text-graphite sm:table-cell">{s.duration}</td>
                  <td className="py-5 text-right">
                    <span className="inline-flex items-center gap-3 tabular whitespace-nowrap md:text-lg">
                      {formatPrice(startingPrice(s.id))}
                      <ArrowRight aria-hidden className="hidden size-4 -translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 md:block" strokeWidth={1.5} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <DemoNotice tone="paper" className="mt-6">
            Sample prices in PLN for a compact vehicle in well-kept condition — editable demonstration values, not a
            quotation.
          </DemoNotice>
        </div>
      </div>
    </section>
  );
}
