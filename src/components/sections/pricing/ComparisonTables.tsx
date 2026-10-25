import { Check, Minus } from 'lucide-react';
import { packageById, packageComparisons } from '@/data/pricing';
import { serviceById } from '@/data/services';

function Cell({ value }: { value: boolean | string | undefined }) {
  if (value === true) return <Check aria-label="Included" className="mx-auto size-4 text-champagne" strokeWidth={1.75} />;
  if (value === false || value === undefined) return <Minus aria-label="Not included" className="mx-auto size-4 text-mist/60" strokeWidth={1.5} />;
  return <span className="text-[0.92rem]">{value}</span>;
}

export function ComparisonTables() {
  return (
    <section aria-labelledby="compare-title" className="section-y border-t border-line">
      <div className="shell">
        <p className="t-eyebrow flex items-center gap-4 text-mist">
          <span className="text-champagne">02</span>
          <span aria-hidden className="h-px w-10 bg-current opacity-40" />
          Package comparison
        </p>
        <h2 id="compare-title" className="t-h2 mt-8">
          Side by <span className="accent text-champagne-soft">side</span>.
        </h2>
        <div className="mt-16 grid grid-cols-1 gap-16 xl:grid-cols-2 xl:gap-[var(--col-gap)]">
          {packageComparisons.map((c) => {
            const ids = Object.keys(c.rows[0]?.values ?? {});
            return (
              <div key={c.serviceId} className="-mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] xl:mx-0 xl:px-0" role="region" aria-label={`${c.title} comparison`} tabIndex={0}>
                <table className="w-full min-w-[560px] border-collapse text-left">
                  <caption className="t-h3 mb-6 text-left">{serviceById(c.serviceId).name}</caption>
                  <thead>
                    <tr className="border-b border-line-strong">
                      <th scope="col" className="t-eyebrow pb-4 font-medium text-mist">
                        <span className="sr-only">Feature</span>
                      </th>
                      {ids.map((id) => (
                        <th key={id} scope="col" className="pb-4 text-center font-normal">
                          {packageById(id)?.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {c.rows.map((r) => (
                      <tr key={r.label} className="border-b border-line">
                        <th scope="row" className="py-4 pr-4 text-[0.95rem] font-normal text-mist">
                          {r.label}
                        </th>
                        {ids.map((id) => (
                          <td key={id} className="py-4 text-center">
                            <Cell value={r.values[id]} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
