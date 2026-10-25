'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowRight, Check, Plus, RotateCcw } from 'lucide-react';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { bookingHref } from '@/data/navigation';
import { defaultCondition, defaultSize, packageById, pricingPackages, vehicleConditions, vehicleSizes } from '@/data/pricing';
import { availableAddOns, calculateEstimate, packagePrice } from '@/lib/pricing';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/cn';
import { useSearchString } from '@/lib/url-state';
import type { ConditionId, ServiceCategory, ServiceId, VehicleSizeId } from '@/types/content';

interface ServiceSummary {
  id: ServiceId;
  index: string;
  name: string;
  href: string;
  category: ServiceCategory;
}

const categories: { id: ServiceCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'protection', label: 'Protection' },
  { id: 'correction', label: 'Correction' },
  { id: 'detailing', label: 'Detailing' },
  { id: 'interior', label: 'Interior' },
  { id: 'maintenance', label: 'Maintenance' },
];

function SizeSelector({ name, value, onChange, tone = 'dark' }: { name: string; value: VehicleSizeId; onChange: (v: VehicleSizeId) => void; tone?: 'dark' | 'panel' }) {
  return (
    <fieldset>
      <legend className="t-eyebrow mb-3 text-mist">Vehicle size</legend>
      <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap">
        {vehicleSizes.map((s) => (
          <label key={s.id} className="relative cursor-pointer">
            <input type="radio" name={name} value={s.id} checked={value === s.id} onChange={() => onChange(s.id)} className="peer sr-only" />
            <span
              className={cn(
                'chip w-full justify-center text-center peer-checked:border-bone peer-checked:bg-bone peer-checked:text-ink-900 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-champagne',
                tone === 'panel' && 'md:w-auto',
              )}
            >
              {s.label}
            </span>
          </label>
        ))}
      </div>
      <p className="t-meta mt-3 text-mist">e.g. {vehicleSizes.find((s) => s.id === value)?.examples}</p>
    </fieldset>
  );
}

export function PricingExplorer({ services, children }: { services: ServiceSummary[]; children?: React.ReactNode }) {
  const [size, setSize] = useState<VehicleSizeId>(defaultSize);
  const [condition, setCondition] = useState<ConditionId>(defaultCondition);
  const [selected, setSelected] = useState<string[]>([]);
  const [addOnIds, setAddOnIds] = useState<string[]>([]);
  const [category, setCategory] = useState<ServiceCategory | 'all'>('all');

  // Apply ?package=… once it becomes readable after hydration.
  const search = useSearchString();
  const [appliedSearch, setAppliedSearch] = useState('');
  if (search !== appliedSearch) {
    setAppliedSearch(search);
    const pkg = packageById(new URLSearchParams(search).get('package') ?? '');
    if (pkg) setSelected((prev) => [...prev.filter((id) => packageById(id)?.serviceId !== pkg.serviceId), pkg.id]);
  }

  const togglePackage = (id: string) => {
    const pkg = packageById(id);
    if (!pkg) return;
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev.filter((x) => packageById(x)?.serviceId !== pkg.serviceId), id]));
  };

  const addOns = useMemo(() => availableAddOns(selected), [selected]);
  const estimate = useMemo(() => calculateEstimate({ size, condition, packageIds: selected, addOnIds }), [size, condition, selected, addOnIds]);
  const visibleServices = services.filter((s) => category === 'all' || s.category === category);

  const bookingUrl = useMemo(() => {
    const sp = new URLSearchParams();
    const serviceIds = [...new Set(selected.map((id) => packageById(id)?.serviceId).filter(Boolean))];
    if (serviceIds.length) sp.set('service', serviceIds.join(','));
    if (selected[0]) sp.set('package', selected[0]);
    sp.set('size', size);
    return `${bookingHref}?${sp.toString()}`;
  }, [selected, size]);

  const reset = () => {
    setSelected([]);
    setAddOnIds([]);
    setCondition(defaultCondition);
  };

  return (
    <>
      {/* ───────── Price schedule ───────── */}
      <section aria-labelledby="schedule-title" className="section-y">
        <div className="shell">
          <div className="grid grid-cols-1 gap-10 border-b border-line pb-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <p className="t-eyebrow flex items-center gap-4 text-mist">
                <span className="text-champagne">01</span>
                <span aria-hidden className="h-px w-10 bg-current opacity-40" />
                Price schedule
              </p>
              <h2 id="schedule-title" className="t-h2 mt-8">
                Every package, <span className="accent text-champagne-soft">priced</span>.
              </h2>
            </div>
            <div className="flex flex-col gap-8 lg:col-span-7 lg:items-end">
              <SizeSelector name="schedule-size" value={size} onChange={setSize} />
            </div>
          </div>

          <div className="-mx-[var(--gutter)] mt-8 flex scrollbar-none gap-2 overflow-x-auto px-[var(--gutter)]" role="group" aria-label="Filter by category">
            {categories.map((c) => (
              <button key={c.id} type="button" className="chip shrink-0" aria-pressed={category === c.id} onClick={() => setCategory(c.id)}>
                {c.label}
              </button>
            ))}
          </div>

          <div className="mt-12 space-y-16">
            {visibleServices.map((service) => (
              <div key={service.id} className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-x-[var(--col-gap)]">
                <div className="lg:col-span-4">
                  <h3 className="flex items-baseline gap-4">
                    <span className="t-meta text-champagne">{service.index}</span>
                    <Link href={service.href} className="text-2xl font-light tracking-[-0.02em] transition-colors hover:text-champagne-soft md:text-3xl">
                      {service.name}
                    </Link>
                  </h3>
                </div>
                <ul className="border-t border-line lg:col-span-8">
                  {pricingPackages
                    .filter((p) => p.serviceId === service.id)
                    .map((p) => {
                      const isSelected = selected.includes(p.id);
                      return (
                        <li key={p.id} className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 border-b border-line py-5 md:grid-cols-[1fr_8rem_9rem_auto]">
                          <div>
                            <p className="text-lg">
                              {p.name}
                              {p.recommended && <span className="t-eyebrow mt-1 block text-champagne sm:mt-0 sm:ml-3 sm:inline">Most chosen</span>}
                            </p>
                            <p className="mt-1 text-[0.92rem] text-mist">{p.summary}</p>
                          </div>
                          <p className="t-meta hidden text-mist md:block">{p.duration}</p>
                          <p className="text-right text-lg tabular md:text-xl">
                            <span className="t-meta mr-2 text-mist">from</span>
                            {formatPrice(packagePrice(p, size))}
                          </p>
                          <button
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => togglePackage(p.id)}
                            aria-label={`${isSelected ? 'Remove' : 'Add'} ${service.name} — ${p.name} ${isSelected ? 'from' : 'to'} estimate`}
                            className={cn(
                              'col-span-2 flex min-h-11 items-center justify-center gap-2 border px-4 text-[0.75rem] tracking-[0.16em] uppercase transition-colors md:col-span-1',
                              isSelected ? 'border-champagne bg-champagne text-ink-900' : 'border-line-strong hover:border-bone',
                            )}
                          >
                            {isSelected ? <Check aria-hidden className="size-3.5" strokeWidth={2} /> : <Plus aria-hidden className="size-3.5" strokeWidth={1.5} />}
                            {isSelected ? 'Added' : 'Estimate'}
                          </button>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ))}
          </div>
          <DemoNotice className="mt-10">
            Sample prices in PLN at the selected vehicle size, assuming well-kept condition. Editable demonstration values — not a quotation.
          </DemoNotice>
        </div>
      </section>

      {children}

      {/* ───────── Calculator ───────── */}
      <section id="estimate" aria-labelledby="estimate-title" className="section-y border-t border-line bg-ink-850">
        <div className="shell">
          <p className="t-eyebrow flex items-center gap-4 text-mist">
            <span className="text-champagne">03</span>
            <span aria-hidden className="h-px w-10 bg-current opacity-40" />
            Estimate calculator
          </p>
          <h2 id="estimate-title" className="t-h2 mt-8">
            Your estimate, <span className="accent text-champagne-soft">itemised</span>.
          </h2>

          <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-x-[var(--col-gap)]">
            <div className="space-y-14 lg:col-span-7">
              <SizeSelector name="estimate-size" value={size} onChange={setSize} tone="panel" />

              <fieldset>
                <legend className="t-eyebrow mb-3 text-mist">Paint &amp; interior condition</legend>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {vehicleConditions.map((c) => (
                    <label key={c.id} className="relative cursor-pointer">
                      <input type="radio" name="condition" value={c.id} checked={condition === c.id} onChange={() => setCondition(c.id)} className="peer sr-only" />
                      <span className="block h-full border border-line p-5 transition-colors peer-checked:border-bone peer-checked:bg-ink-700 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-champagne hover:border-line-strong">
                        <span className="flex items-center justify-between">
                          <span>{c.label}</span>
                          <span className="t-meta text-champagne">× {c.factor.toFixed(2)}</span>
                        </span>
                        <span className="mt-2 block text-[0.88rem] text-mist">{c.description}</span>
                      </span>
                    </label>
                  ))}
                </div>
                <p className="t-meta mt-3 text-mist">Applies to correction-sensitive packages only. Confirmed at inspection.</p>
              </fieldset>

              <fieldset>
                <legend className="t-eyebrow mb-3 text-mist">Services — one package per service</legend>
                <div className="border-t border-line">
                  {services.map((service) => (
                    <div key={service.id} className="flex flex-col gap-3 border-b border-line py-4 md:flex-row md:items-center md:justify-between">
                      <p className="text-[0.98rem]">{service.name}</p>
                      <div className="flex flex-wrap gap-2" role="group" aria-label={`${service.name} packages`}>
                        {pricingPackages
                          .filter((p) => p.serviceId === service.id)
                          .map((p) => (
                            <button key={p.id} type="button" className="chip !min-h-10 !px-3.5" aria-pressed={selected.includes(p.id)} onClick={() => togglePackage(p.id)}>
                              {p.name}
                            </button>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="t-eyebrow mb-3 text-mist">Add-ons</legend>
                {addOns.length === 0 ? (
                  <p className="text-mist">Choose a package to see the add-ons available for it.</p>
                ) : (
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {addOns.map((a) => {
                      const checked = addOnIds.includes(a.id);
                      return (
                        <label key={a.id} className={cn('flex cursor-pointer gap-4 border p-4 transition-colors', checked ? 'border-bone bg-ink-700' : 'border-line hover:border-line-strong')}>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => setAddOnIds((prev) => (checked ? prev.filter((x) => x !== a.id) : [...prev, a.id]))}
                            className="mt-1 size-4 shrink-0 accent-[var(--color-champagne)]"
                          />
                          <span>
                            <span className="block">{a.name}</span>
                            <span className="mt-1 block text-[0.85rem] text-mist">{a.description}</span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </fieldset>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9" aria-label="Estimate summary">
              <div className="border border-line bg-ink-900 p-6 md:p-8 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
                <div className="flex items-center justify-between">
                  <p className="t-eyebrow text-mist">Estimate</p>
                  {(selected.length > 0 || addOnIds.length > 0) && (
                    <button type="button" onClick={reset} className="t-eyebrow flex min-h-11 items-center gap-2 text-mist transition-colors hover:text-bone">
                      <RotateCcw aria-hidden className="size-3.5" strokeWidth={1.5} /> Reset
                    </button>
                  )}
                </div>

                {estimate.lines.length === 0 ? (
                  <p className="mt-6 text-mist">Add packages from the schedule or the list to build an itemised estimate.</p>
                ) : (
                  <ul className="mt-6 border-t border-line">
                    {estimate.lines.map((l) => (
                      <li key={l.id} className="flex justify-between gap-4 border-b border-line py-4">
                        <span>
                          <span className="block">{l.label}</span>
                          <span className="t-meta mt-1 block text-mist">{l.basis}</span>
                        </span>
                        <span className="shrink-0 tabular">{formatPrice(l.amount)}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-8" aria-live="polite" aria-atomic="true">
                  <p className="t-eyebrow text-mist">Estimated range</p>
                  <p className="mt-3 text-[clamp(1.8rem,1.4rem+1.4vw,2.6rem)] leading-none font-light tracking-[-0.03em] tabular">
                    {estimate.subtotal === 0 ? '—' : `${formatPrice(estimate.low)} – ${formatPrice(estimate.high)}`}
                  </p>
                </div>

                <Link href={bookingUrl} className={cn('btn mt-8 w-full', estimate.subtotal === 0 && 'pointer-events-none opacity-40')} aria-disabled={estimate.subtotal === 0} tabIndex={estimate.subtotal === 0 ? -1 : undefined}>
                  <span>Request a consultation</span>
                  <ArrowRight aria-hidden className="btn-icon size-4" strokeWidth={1.5} />
                </Link>
                <DemoNotice className="mt-6">
                  A non-binding estimate from sample prices. The upper bound allows for findings at inspection; the final price is confirmed in writing before work starts.
                </DemoNotice>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
