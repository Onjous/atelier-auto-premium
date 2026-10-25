'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { Img } from '@/components/ui/Img';
import type { MediaAsset } from '@/data/media';
import { vehicleConditions, vehicleSizes } from '@/data/pricing';
import { vehicleMakes } from '@/data/vehicles';
import { demoGateway, toPayload, type InquiryResult } from '@/lib/booking/gateway';
import { clearDraft, initialDraft, loadDraft, saveDraft } from '@/lib/booking/persistence';
import { bookingSteps, emptyDraft, type BookingDraft, type BookingStep, type ValidationErrors } from '@/lib/booking/types';
import { hasErrors, parseISODate, validateDraft, validateStep } from '@/lib/booking/validation';
import { calculateEstimate } from '@/lib/pricing';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/cn';
import type { ServiceId } from '@/types/content';
import { Calendar } from './Calendar';

export interface BookingServiceOption {
  id: ServiceId;
  index: string;
  name: string;
  tagline: string;
  fromPrice: number;
  image: MediaAsset;
  packages: { id: string; name: string }[];
}

const labels: Record<Exclude<BookingStep, 'done'>, string> = {
  service: 'Service',
  vehicle: 'Vehicle',
  schedule: 'Date',
  contact: 'Details',
  review: 'Review',
};

const fieldId = (path: string) => `bk-${path.replace('.', '-')}`;
const longDate = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
const noopSubscribe = () => () => {};

function FieldError({ path, errors }: { path: string; errors: ValidationErrors }) {
  if (!errors[path]) return null;
  return (
    <p id={`${fieldId(path)}-err`} className="field-error">
      {errors[path]}
    </p>
  );
}

const describe = (path: string, errors: ValidationErrors, extra?: string) =>
  [errors[path] ? `${fieldId(path)}-err` : null, extra].filter(Boolean).join(' ') || undefined;

export function BookingFlow({ services }: { services: BookingServiceOption[] }) {
  const isClient = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const [draft, setDraft] = useState<BookingDraft>(emptyDraft);
  const [restored, setRestored] = useState(false);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<InquiryResult | null>(null);
  const [otherMake, setOtherMake] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const summary = useRef<HTMLDivElement>(null);
  const moved = useRef(false);
  const uid = useId();

  // Restore non-personal choices and URL prefill once the browser is available.
  if (isClient && !restored) {
    setRestored(true);
    const next = initialDraft(window.location.search, loadDraft());
    setDraft(next);
    setOtherMake(Boolean(next.vehicle.brand) && !(vehicleMakes as readonly string[]).includes(next.vehicle.brand));
  }

  useEffect(() => {
    if (restored && bookingSteps[step] !== 'done') saveDraft(draft);
  }, [draft, restored, step]);

  useEffect(() => {
    if (!moved.current) return;
    heading.current?.focus({ preventScroll: true });
    heading.current?.closest('section')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  }, [step]);

  const current = bookingSteps[step]!;
  const today = new Date();

  const patch = <K extends keyof BookingDraft>(key: K, value: Partial<BookingDraft[K]> | BookingDraft[K]) =>
    setDraft((d) => ({ ...d, [key]: Array.isArray(value) ? value : typeof value === 'object' && value !== null ? { ...(d[key] as object), ...value } : value }));

  const go = (to: number) => {
    moved.current = true;
    setDirection(to > step ? 1 : -1);
    setErrors({});
    setStep(to);
  };

  const next = () => {
    const errs = validateStep(current, draft, today);
    if (hasErrors(errs)) {
      setErrors(errs);
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    go(step + 1);
  };

  const submit = async () => {
    const errs = validateDraft(draft, today);
    if (hasErrors(errs)) {
      const firstStep = bookingSteps.findIndex((s) => hasErrors(validateStep(s, draft, today)));
      go(firstStep);
      setErrors(validateStep(bookingSteps[firstStep]!, draft, today));
      return;
    }
    setSubmitting(true);
    const res = await demoGateway.submit(toPayload(draft));
    setSubmitting(false);
    setResult(res);
    clearDraft();
    go(bookingSteps.indexOf('done'));
  };

  const restart = () => {
    clearDraft();
    setDraft(emptyDraft);
    setResult(null);
    setOtherMake(false);
    go(0);
  };

  const toggleService = (id: ServiceId) =>
    setDraft((d) => {
      const on = d.serviceIds.includes(id);
      const packages = { ...d.packages };
      if (on) delete packages[id];
      return { ...d, serviceIds: on ? d.serviceIds.filter((s) => s !== id) : [...d.serviceIds, id], packages };
    });

  const selectDate = (iso: string) => {
    const { mode, start, end } = draft.schedule;
    if (mode === 'date' || !start || end) patch('schedule', { start: iso, end: null });
    else if (parseISODate(iso) <= parseISODate(start)) patch('schedule', { start: iso, end: null });
    else patch('schedule', { end: iso });
  };

  const selectedServices = services.filter((s) => draft.serviceIds.includes(s.id));
  const chosenPackages = Object.values(draft.packages).filter((p): p is string => Boolean(p));
  const estimate = draft.vehicle.size && chosenPackages.length ? calculateEstimate({ size: draft.vehicle.size, condition: 'well-kept', packageIds: chosenPackages, addOnIds: [] }) : null;

  const errorList = Object.entries(errors).filter(([, v]) => v);

  const stepContent: Record<BookingStep, React.ReactNode> = {
    service: (
      <fieldset aria-describedby={describe('services', errors)}>
        <legend className="sr-only">Choose one or more services</legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3" id={fieldId('services')} tabIndex={-1}>
          {services.map((s) => {
            const checked = draft.serviceIds.includes(s.id);
            return (
              <label key={s.id} className="group relative block cursor-pointer">
                <input type="checkbox" className="peer sr-only" checked={checked} onChange={() => toggleService(s.id)} />
                <span className={cn('flex h-full flex-col border transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-champagne', checked ? 'border-bone bg-ink-700' : 'border-line hover:border-line-strong')}>
                  <span className="relative block aspect-[16/8] overflow-hidden">
                    <Img asset={s.image} sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 100vw" className={cn('transition-[transform,opacity] duration-700', checked ? 'scale-105 opacity-100' : 'opacity-60 group-hover:opacity-80')} />
                    <span className={cn('absolute top-3 right-3 grid grid-cols-1 size-7 place-items-center border transition-colors', checked ? 'border-bone bg-bone text-ink-900' : 'border-bone/40 bg-ink-950/50')}>
                      {checked && <Check aria-hidden className="size-4" strokeWidth={2} />}
                    </span>
                  </span>
                  <span className="flex flex-1 flex-col p-5">
                    <span className="t-meta text-champagne">{s.index}</span>
                    <span className="mt-2 text-lg">{s.name}</span>
                    <span className="mt-1 text-[0.9rem] text-mist">{s.tagline}</span>
                    <span className="t-meta mt-4 text-mist">from {formatPrice(s.fromPrice)}</span>
                  </span>
                </span>
              </label>
            );
          })}
        </div>
        <FieldError path="services" errors={errors} />

        {selectedServices.length > 0 && (
          <div className="mt-12 space-y-6 border-t border-line pt-8">
            <p className="t-eyebrow text-mist">Package — optional, can be decided at consultation</p>
            {selectedServices.map((s) => (
              <fieldset key={s.id} className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <legend className="mb-2 text-[0.98rem] md:float-left md:mb-0">{s.name}</legend>
                <div className="flex flex-wrap gap-2">
                  {[{ id: '', name: 'Not sure yet' }, ...s.packages].map((p) => (
                    <label key={p.id || 'none'} className="cursor-pointer">
                      <input
                        type="radio"
                        name={`${uid}-pkg-${s.id}`}
                        className="peer sr-only"
                        checked={(draft.packages[s.id] ?? '') === p.id}
                        onChange={() => setDraft((d) => ({ ...d, packages: { ...d.packages, [s.id]: p.id || undefined } }))}
                      />
                      <span className="chip !min-h-10 peer-checked:border-bone peer-checked:bg-bone peer-checked:text-ink-900 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-champagne">{p.name}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        )}
      </fieldset>
    ),

    vehicle: (
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <label htmlFor={fieldId('vehicle.brand')} className="field-label">
            Make
          </label>
          <select
            id={fieldId('vehicle.brand')}
            className="field-input"
            value={otherMake ? '__other' : draft.vehicle.brand}
            aria-invalid={Boolean(errors['vehicle.brand']) && !otherMake}
            aria-describedby={describe('vehicle.brand', errors)}
            onChange={(e) => {
              const v = e.target.value;
              setOtherMake(v === '__other');
              patch('vehicle', { brand: v === '__other' ? '' : v });
            }}
          >
            <option value="">Select a make</option>
            {vehicleMakes.map((mk) => (
              <option key={mk} value={mk}>
                {mk}
              </option>
            ))}
            <option value="__other">Other…</option>
          </select>
          {otherMake && (
            <input
              aria-label="Make (other)"
              className="field-input mt-3"
              placeholder="Enter the make"
              value={draft.vehicle.brand}
              aria-invalid={Boolean(errors['vehicle.brand'])}
              onChange={(e) => patch('vehicle', { brand: e.target.value })}
            />
          )}
          <FieldError path="vehicle.brand" errors={errors} />
        </div>
        <div>
          <label htmlFor={fieldId('vehicle.model')} className="field-label">
            Model
          </label>
          <input id={fieldId('vehicle.model')} className="field-input" placeholder="e.g. 911 GT3 Touring" value={draft.vehicle.model} aria-invalid={Boolean(errors['vehicle.model'])} aria-describedby={describe('vehicle.model', errors)} onChange={(e) => patch('vehicle', { model: e.target.value })} />
          <FieldError path="vehicle.model" errors={errors} />
        </div>
        <div>
          <label htmlFor={fieldId('vehicle.year')} className="field-label">
            Year <span className="normal-case tracking-normal text-mist/70">(optional)</span>
          </label>
          <input id={fieldId('vehicle.year')} className="field-input" inputMode="numeric" maxLength={4} placeholder="2024" value={draft.vehicle.year} aria-invalid={Boolean(errors['vehicle.year'])} aria-describedby={describe('vehicle.year', errors)} onChange={(e) => patch('vehicle', { year: e.target.value.replace(/\D/g, '') })} />
          <FieldError path="vehicle.year" errors={errors} />
        </div>
        <fieldset className="md:col-span-2" id={fieldId('vehicle.size')} tabIndex={-1} aria-describedby={describe('vehicle.size', errors)}>
          <legend className="field-label">Size</legend>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {vehicleSizes.map((s) => (
              <label key={s.id} className="cursor-pointer">
                <input type="radio" name={`${uid}-size`} className="peer sr-only" checked={draft.vehicle.size === s.id} onChange={() => patch('vehicle', { size: s.id })} />
                <span className="block h-full border border-line p-5 transition-colors peer-checked:border-bone peer-checked:bg-ink-700 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-champagne hover:border-line-strong">
                  <span className="block">{s.label}</span>
                  <span className="mt-2 block text-[0.85rem] text-mist">{s.examples}</span>
                </span>
              </label>
            ))}
          </div>
          <FieldError path="vehicle.size" errors={errors} />
        </fieldset>
      </div>
    ),

    schedule: (
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="space-y-10 lg:col-span-5">
          <fieldset>
            <legend className="field-label">Preference</legend>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  ['date', 'Specific date'],
                  ['range', 'Flexible window'],
                ] as const
              ).map(([id, label]) => (
                <label key={id} className="cursor-pointer">
                  <input type="radio" name={`${uid}-mode`} className="peer sr-only" checked={draft.schedule.mode === id} onChange={() => patch('schedule', { mode: id, end: null })} />
                  <span className="chip w-full justify-center peer-checked:border-bone peer-checked:bg-bone peer-checked:text-ink-900 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-champagne">{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="field-label">Drop-off time</legend>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  ['morning', 'Morning'],
                  ['afternoon', 'Afternoon'],
                  ['any', 'Either'],
                ] as const
              ).map(([id, label]) => (
                <label key={id} className="cursor-pointer">
                  <input type="radio" name={`${uid}-tod`} className="peer sr-only" checked={draft.schedule.timeOfDay === id} onChange={() => patch('schedule', { timeOfDay: id })} />
                  <span className="chip w-full justify-center peer-checked:border-bone peer-checked:bg-bone peer-checked:text-ink-900 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-champagne">{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="border-t border-line pt-6" aria-live="polite">
            <p className="t-eyebrow text-mist">{draft.schedule.mode === 'range' ? 'Window' : 'Preferred date'}</p>
            <p className="mt-3 text-xl font-light">
              {draft.schedule.start ? longDate.format(parseISODate(draft.schedule.start)) : 'Not chosen yet'}
              {draft.schedule.mode === 'range' && draft.schedule.start && (
                <>
                  {' → '}
                  {draft.schedule.end ? longDate.format(parseISODate(draft.schedule.end)) : <span className="text-mist">choose an end date</span>}
                </>
              )}
            </p>
            <FieldError path="schedule.start" errors={errors} />
            <FieldError path="schedule.end" errors={errors} />
          </div>
        </div>
        <div className="lg:col-span-7" id={fieldId('schedule.start')} tabIndex={-1}>
          <p id={`${uid}-cal-label`} className="sr-only">
            {draft.schedule.mode === 'range' ? 'Choose the first and last day of your window' : 'Choose a preferred date'}
          </p>
          {isClient && <Calendar today={today} start={draft.schedule.start} end={draft.schedule.end} range={draft.schedule.mode === 'range'} onSelect={selectDate} labelledBy={`${uid}-cal-label`} />}
        </div>
      </div>
    ),

    contact: (
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {(
          [
            ['contact.name', 'Full name', 'text', 'name'],
            ['contact.email', 'Email', 'email', 'email'],
            ['contact.phone', 'Phone', 'tel', 'tel'],
          ] as const
        ).map(([path, label, type, auto]) => {
          const key = path.split('.')[1] as 'name' | 'email' | 'phone';
          return (
            <div key={path}>
              <label htmlFor={fieldId(path)} className="field-label">
                {label}
                {key === 'phone' && draft.contact.preference !== 'phone' && <span className="normal-case tracking-normal text-mist/70"> (optional)</span>}
              </label>
              <input id={fieldId(path)} type={type} autoComplete={auto} className="field-input" value={draft.contact[key]} aria-invalid={Boolean(errors[path])} aria-describedby={describe(path, errors)} onChange={(e) => patch('contact', { [key]: e.target.value })} />
              <FieldError path={path} errors={errors} />
            </div>
          );
        })}
        <fieldset>
          <legend className="field-label">Preferred contact</legend>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                ['email', 'Email'],
                ['phone', 'Phone'],
              ] as const
            ).map(([id, label]) => (
              <label key={id} className="cursor-pointer">
                <input type="radio" name={`${uid}-pref`} className="peer sr-only" checked={draft.contact.preference === id} onChange={() => patch('contact', { preference: id })} />
                <span className="chip w-full justify-center peer-checked:border-bone peer-checked:bg-bone peer-checked:text-ink-900 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-champagne">{label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="md:col-span-2">
          <label htmlFor={fieldId('contact.notes')} className="field-label">
            Anything we should know? <span className="normal-case tracking-normal text-mist/70">(optional)</span>
          </label>
          <textarea id={fieldId('contact.notes')} rows={4} className="field-input resize-y" placeholder="Condition, previous work, goals…" value={draft.contact.notes} aria-invalid={Boolean(errors['contact.notes'])} aria-describedby={describe('contact.notes', errors, `${uid}-notes-count`)} onChange={(e) => patch('contact', { notes: e.target.value })} />
          <p id={`${uid}-notes-count`} className="t-meta mt-2 text-right text-mist">
            {draft.contact.notes.length} / 1000
          </p>
          <FieldError path="contact.notes" errors={errors} />
        </div>
        <div className="md:col-span-2">
          <label className="flex cursor-pointer items-start gap-4">
            <input id={fieldId('contact.consent')} type="checkbox" className="mt-1 size-5 shrink-0 accent-[var(--color-champagne)]" checked={draft.contact.consent} aria-invalid={Boolean(errors['contact.consent'])} aria-describedby={describe('contact.consent', errors)} onChange={(e) => patch('contact', { consent: e.target.checked })} />
            <span className="text-[0.95rem] text-bone/85">
              I agree to be contacted about this inquiry. See the{' '}
              <Link href="/privacy" className="underline decoration-champagne underline-offset-4">
                privacy policy
              </Link>
              .
            </span>
          </label>
          <FieldError path="contact.consent" errors={errors} />
          <p className="mt-6 text-[0.85rem] text-mist">Demonstration: contact details stay in this page’s memory only — they are never stored or sent.</p>
        </div>
      </div>
    ),

    review: (
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <dl className="border-t border-line lg:col-span-7">
          {[
            {
              step: 0,
              term: 'Services',
              value: selectedServices.map((s) => {
                const pkg = s.packages.find((p) => p.id === draft.packages[s.id]);
                return `${s.name}${pkg ? ` — ${pkg.name}` : ''}`;
              }),
            },
            {
              step: 1,
              term: 'Vehicle',
              value: [
                [draft.vehicle.brand, draft.vehicle.model, draft.vehicle.year && `(${draft.vehicle.year})`].filter(Boolean).join(' '),
                vehicleSizes.find((s) => s.id === draft.vehicle.size)?.label ?? '',
              ],
            },
            {
              step: 2,
              term: 'Timing',
              value: [
                draft.schedule.start
                  ? `${longDate.format(parseISODate(draft.schedule.start))}${draft.schedule.end ? ` → ${longDate.format(parseISODate(draft.schedule.end))}` : ''}`
                  : '',
                { morning: 'Morning drop-off', afternoon: 'Afternoon drop-off', any: 'Any drop-off time' }[draft.schedule.timeOfDay],
              ],
            },
            {
              step: 3,
              term: 'Contact',
              value: [draft.contact.name, draft.contact.email, draft.contact.phone, `Prefers ${draft.contact.preference}`].filter(Boolean),
            },
          ].map((row) => (
            <div key={row.term} className="grid grid-cols-[1fr_auto] gap-4 border-b border-line py-6 md:grid-cols-[10rem_1fr_auto]">
              <dt className="t-eyebrow pt-1 text-mist">{row.term}</dt>
              <dd className="col-start-1 row-start-2 md:col-start-2 md:row-start-1">
                {row.value.filter(Boolean).map((v) => (
                  <span key={v} className="block">
                    {v}
                  </span>
                ))}
              </dd>
              <dd className="col-start-2 row-start-1 md:col-start-3">
                <button type="button" className="t-eyebrow min-h-11 text-champagne underline-offset-4 hover:underline" onClick={() => go(row.step)} aria-label={`Edit ${row.term.toLowerCase()}`}>
                  Edit
                </button>
              </dd>
            </div>
          ))}
          {draft.contact.notes && (
            <div className="border-b border-line py-6">
              <dt className="t-eyebrow text-mist">Notes</dt>
              <dd className="mt-2 whitespace-pre-line text-mist">{draft.contact.notes}</dd>
            </div>
          )}
        </dl>
        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="border border-line bg-ink-850 p-6">
            <p className="t-eyebrow text-mist">Indicative estimate</p>
            {estimate ? (
              <>
                <p className="mt-3 text-2xl font-light tabular">
                  {formatPrice(estimate.low)} – {formatPrice(estimate.high)}
                </p>
                <p className="t-meta mt-3 text-mist">Selected packages at {vehicleSizes.find((s) => s.id === draft.vehicle.size)?.label}, {vehicleConditions[0]!.label.toLowerCase()} condition. Sample prices.</p>
              </>
            ) : (
              <p className="mt-3 text-mist">Choose packages in step one for an indicative range — or leave it to the consultation.</p>
            )}
          </div>
          <p className="mt-6 text-[0.85rem] text-mist">
            <span className="text-champagne">Demonstration mode.</span> Submitting will not create a booking, send an email or contact the studio.
          </p>
        </aside>
      </div>
    ),

    done: (
      <div className="max-w-3xl">
        <p className="t-eyebrow text-champagne">Demonstration complete</p>
        <p className="mt-6 text-[clamp(1.6rem,1.2rem+1.6vw,2.8rem)] leading-[1.1] font-light tracking-[-0.03em]">
          Your inquiry passed every check. <span className="text-mist">Nothing was sent — no booking exists and the studio has not received this request.</span>
        </p>
        {result?.status === 'demo' && (
          <>
            <p className="t-meta mt-8 text-mist">
              Demonstration reference <span className="text-bone">{result.reference}</span>
            </p>
            <details className="mt-10 border border-line">
              <summary className="t-eyebrow flex min-h-12 cursor-pointer items-center px-5 text-mist hover:text-bone">View the data a CRM integration would receive</summary>
              <pre className="max-h-80 overflow-auto border-t border-line p-5 text-[0.78rem] leading-relaxed text-bone/80">{JSON.stringify(result.payload, null, 2)}</pre>
            </details>
          </>
        )}
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <button type="button" className="btn" onClick={restart}>
            <span>Start a new inquiry</span>
          </button>
          <Link href="/" className="btn btn-ghost">
            <span>Return home</span>
          </Link>
        </div>
      </div>
    ),
  };

  const visibleSteps = bookingSteps.filter((s): s is Exclude<BookingStep, 'done'> => s !== 'done');

  return (
    <MotionProvider>
      <section aria-labelledby={`${uid}-heading`} className="scroll-mt-[calc(var(--header-h)+1rem)]">
        <nav aria-label="Booking progress" className="border-y border-line py-5">
          <ol className="flex gap-2 sm:gap-6">
            {visibleSteps.map((s, i) => {
              const state = current === 'done' || i < step ? 'complete' : i === step ? 'current' : 'upcoming';
              const content = (
                <>
                  <span className={cn('t-meta', state === 'upcoming' ? 'text-mist' : 'text-champagne')}>{state === 'complete' ? <Check aria-hidden className="inline size-3.5" strokeWidth={2} /> : String(i + 1).padStart(2, '0')}</span>
                  <span className={cn('hidden text-[0.85rem] sm:inline', state === 'current' ? 'text-bone' : 'text-mist')}>{labels[s]}</span>
                  <span className="sr-only">
                    {labels[s]}
                    {state === 'complete' ? ' (completed)' : state === 'current' ? ' (current step)' : ''}
                  </span>
                </>
              );
              return (
                <li key={s} className="flex-1" aria-current={state === 'current' ? 'step' : undefined}>
                  <span aria-hidden className={cn('mb-3 block h-px transition-colors duration-700', state === 'upcoming' ? 'bg-line' : 'bg-champagne')} />
                  {state === 'complete' && current !== 'done' ? (
                    <button type="button" onClick={() => go(i)} className="flex min-h-11 items-center gap-3 hover:text-bone">
                      {content}
                    </button>
                  ) : (
                    <span className="flex min-h-11 items-center gap-3">{content}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="relative mt-12">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <m.div
              key={current}
              custom={direction}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 32 }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: d * -32 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {current !== 'done' && (
                <p className="t-meta text-mist">
                  Step {step + 1} of {visibleSteps.length}
                </p>
              )}
              <h2 id={`${uid}-heading`} ref={heading} tabIndex={-1} className="t-h2 mt-4 outline-none">
                {
                  {
                    service: 'What can we do for you?',
                    vehicle: 'Tell us about the car.',
                    schedule: 'When suits you?',
                    contact: 'How do we reach you?',
                    review: 'Review your inquiry.',
                    done: 'Thank you.',
                  }[current]
                }
              </h2>

              {errorList.length > 0 && (
                <div ref={summary} tabIndex={-1} role="alert" className="mt-8 border border-danger/50 p-5 outline-none">
                  <p className="text-danger">Please check the following:</p>
                  <ul className="mt-3 space-y-1 text-[0.92rem]">
                    {errorList.map(([path, msg]) => (
                      <li key={path}>
                        <a href={`#${fieldId(path)}`} className="text-bone underline decoration-danger/60 underline-offset-4" onClick={(e) => { e.preventDefault(); document.getElementById(fieldId(path))?.focus(); }}>
                          {msg}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-12">{stepContent[current]}</div>

              {current !== 'done' && (
                <div className="mt-16 flex items-center justify-between gap-4 border-t border-line pt-8">
                  {step > 0 ? (
                    <button type="button" className="btn btn-ghost" onClick={() => go(step - 1)}>
                      <ArrowLeft aria-hidden className="size-4" strokeWidth={1.5} />
                      <span>Back</span>
                    </button>
                  ) : (
                    <span />
                  )}
                  {current === 'review' ? (
                    <button type="button" className="btn" onClick={submit} disabled={submitting} aria-busy={submitting}>
                      {submitting && <Loader2 aria-hidden className="size-4 animate-spin" strokeWidth={1.5} />}
                      <span>{submitting ? 'Checking…' : 'Send inquiry (demo)'}</span>
                    </button>
                  ) : (
                    <button type="button" className="btn" onClick={next}>
                      <span>Continue</span>
                      <ArrowRight aria-hidden className="btn-icon size-4" strokeWidth={1.5} />
                    </button>
                  )}
                </div>
              )}
            </m.div>
          </AnimatePresence>
        </div>
      </section>
    </MotionProvider>
  );
}
