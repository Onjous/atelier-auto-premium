import { PageHero } from '@/components/layout/PageHero';
import { FinalCta } from '@/components/sections/home/FinalCta';
import { ComparisonTables } from '@/components/sections/pricing/ComparisonTables';
import { PricingExplorer } from '@/components/sections/pricing/PricingExplorer';
import { Accordion } from '@/components/ui/Accordion';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { faqs } from '@/data/faqs';
import { ESTIMATE_ROUNDING, ESTIMATE_SPREAD, vehicleConditions, vehicleSizes } from '@/data/pricing';
import { serviceHref, services } from '@/data/services';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Pricing',
  description:
    'Published starting prices for PPF, ceramic coating, paint correction and detailing, with an itemised estimate calculator. Sample prices in PLN for demonstration.',
  path: '/pricing',
  image: 'red-room',
});

export default function PricingPage() {
  const summaries = services.map((s) => ({ id: s.id, index: s.index, name: s.name, href: serviceHref(s), category: s.category }));
  return (
    <>
      <PageHero
        variant="split"
        image="red-room"
        eyebrow="Pricing"
        trail={[{ name: 'Pricing', path: '/pricing' }]}
        title={['Prices,', 'in the']}
        accent="open"
        intro={
          <>
            <p>Starting prices for every package, adjusted transparently for vehicle size and condition.</p>
            <DemoNotice className="mt-6">All prices on this page are editable sample values in PLN for demonstration.</DemoNotice>
          </>
        }
      />

      <PricingExplorer services={summaries}>
        <ComparisonTables />
      </PricingExplorer>

      <section aria-labelledby="rules-title" className="on-paper section-y bg-paper text-ink-900">
        <div className="shell grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-x-[var(--col-gap)]">
          <div className="lg:col-span-5">
            <p className="t-eyebrow flex items-center gap-4 text-graphite">
              <span>04</span>
              <span aria-hidden className="h-px w-10 bg-current opacity-40" />
              How we price
            </p>
            <h2 id="rules-title" className="t-h2 mt-8">
              No hidden <span className="accent">arithmetic</span>.
            </h2>
            <p className="mt-8 max-w-md text-graphite">
              Every estimate uses the same published rules. Final pricing depends on the vehicle’s actual condition,
              dimensions and the services agreed at inspection.
            </p>
            <pre className="mt-10 overflow-x-auto border border-line-ink bg-paper-deep p-5 font-sans text-[0.85rem] leading-relaxed whitespace-pre-wrap">
              {`package  = base × size multiplier × condition factor
add-on   = price × size multiplier (where noted)
range    = total  →  total × ${(1 + ESTIMATE_SPREAD).toFixed(2)}
rounding = nearest ${ESTIMATE_ROUNDING} PLN per line`}
            </pre>
          </div>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            <table className="w-full border-collapse text-left">
              <caption className="t-eyebrow mb-4 text-left text-graphite">Size multiplier</caption>
              <tbody>
                {vehicleSizes.map((s) => (
                  <tr key={s.id} className="border-b border-line-ink">
                    <th scope="row" className="py-3 pr-4 font-normal">
                      {s.label}
                    </th>
                    <td className="py-3 text-right tabular">× {s.multiplier.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="w-full border-collapse text-left">
              <caption className="t-eyebrow mb-4 text-left text-graphite">Condition factor</caption>
              <tbody>
                {vehicleConditions.map((c) => (
                  <tr key={c.id} className="border-b border-line-ink">
                    <th scope="row" className="py-3 pr-4 font-normal">
                      {c.label}
                    </th>
                    <td className="py-3 text-right tabular">× {c.factor.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="pricing-faq-title" className="section-y">
        <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-[var(--col-gap)]">
          <h2 id="pricing-faq-title" className="t-h2 lg:col-span-4">
            Pricing <span className="accent text-champagne-soft">questions</span>.
          </h2>
          <div className="lg:col-span-7 lg:col-start-6">
            <Accordion items={faqs.filter((f) => f.topic === 'pricing')} />
          </div>
        </div>
      </section>

      <FinalCta title={['An estimate is', 'a']} accent="start" />
    </>
  );
}
