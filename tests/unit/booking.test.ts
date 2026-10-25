import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { demoReference, toPayload } from '@/lib/booking/gateway';
import { initialDraft, loadDraft, saveDraft } from '@/lib/booking/persistence';
import { emptyDraft, type BookingDraft } from '@/lib/booking/types';
import { isSelectableDate, packagesAreConsistent, parseISODate, toISODate, validateDraft, validateStep } from '@/lib/booking/validation';

// Thursday 22 October 2026 — fixed so date rules are deterministic.
const TODAY = new Date(2026, 9, 22);

const complete = (): BookingDraft => ({
  serviceIds: ['ppf'],
  packages: { ppf: 'ppf-front' },
  vehicle: { brand: 'Porsche', model: '911 GT3', year: '2024', size: 'compact' },
  schedule: { mode: 'date', start: '2026-10-27', end: null, timeOfDay: 'morning' },
  contact: { name: 'Alex Example', email: 'alex@example.com', phone: '', preference: 'email', notes: '', consent: true },
});

describe('date rules', () => {
  it('requires the minimum lead time', () => {
    expect(isSelectableDate(new Date(2026, 9, 23), TODAY)).toBe(false);
    expect(isSelectableDate(new Date(2026, 9, 24), TODAY)).toBe(true);
  });
  it('closes on Sundays', () => {
    expect(isSelectableDate(new Date(2026, 9, 25), TODAY)).toBe(false); // Sunday
  });
  it('limits booking to six months ahead', () => {
    expect(isSelectableDate(new Date(2027, 5, 1), TODAY)).toBe(false);
  });
  it('round-trips ISO dates in local time', () => {
    expect(toISODate(parseISODate('2026-11-03'))).toBe('2026-11-03');
  });
});

describe('validateStep', () => {
  it('requires at least one service', () => {
    expect(validateStep('service', emptyDraft, TODAY).services).toBeDefined();
    expect(validateStep('service', complete(), TODAY)).toEqual({});
  });

  it('validates vehicle make, model, optional year and size', () => {
    const errs = validateStep('vehicle', { ...emptyDraft, vehicle: { brand: '', model: '', year: '19', size: null } }, TODAY);
    expect(Object.keys(errs).sort()).toEqual(['vehicle.brand', 'vehicle.model', 'vehicle.size', 'vehicle.year']);
    expect(validateStep('vehicle', { ...complete(), vehicle: { ...complete().vehicle, year: '' } }, TODAY)).toEqual({});
  });

  it('validates a single date and a date window', () => {
    const d = complete();
    expect(validateStep('schedule', { ...d, schedule: { ...d.schedule, start: null } }, TODAY)['schedule.start']).toBeDefined();
    expect(validateStep('schedule', { ...d, schedule: { ...d.schedule, start: '2026-10-25' } }, TODAY)['schedule.start']).toMatch(/not available/);
    const range = { ...d, schedule: { ...d.schedule, mode: 'range' as const, start: '2026-10-27', end: null } };
    expect(validateStep('schedule', range, TODAY)['schedule.end']).toBeDefined();
    expect(validateStep('schedule', { ...range, schedule: { ...range.schedule, end: '2026-10-26' } }, TODAY)['schedule.end']).toMatch(/after it starts/);
    expect(validateStep('schedule', { ...range, schedule: { ...range.schedule, end: '2026-12-30' } }, TODAY)['schedule.end']).toMatch(/within/);
    expect(validateStep('schedule', { ...range, schedule: { ...range.schedule, end: '2026-11-03' } }, TODAY)).toEqual({});
  });

  it('validates contact details and consent', () => {
    const d = complete();
    const bad = { ...d, contact: { ...d.contact, name: 'A', email: 'nope', phone: 'abc', consent: false } };
    expect(Object.keys(validateStep('contact', bad, TODAY)).sort()).toEqual(['contact.consent', 'contact.email', 'contact.name', 'contact.phone']);
    const phonePref = { ...d, contact: { ...d.contact, preference: 'phone' as const, phone: '' } };
    expect(validateStep('contact', phonePref, TODAY)['contact.phone']).toMatch(/phone number/);
    expect(validateStep('contact', { ...d, contact: { ...d.contact, phone: '+48 600 000 000' } }, TODAY)).toEqual({});
  });

  it('accepts a complete draft', () => {
    expect(validateDraft(complete(), TODAY)).toEqual({});
  });
});

describe('packagesAreConsistent', () => {
  it('rejects a package from another service', () => {
    expect(packagesAreConsistent(complete())).toBe(true);
    expect(packagesAreConsistent({ ...complete(), packages: { ppf: 'ceramic-essential' } })).toBe(false);
  });
});

describe('payload', () => {
  it('trims fields, omits the consent flag and drops packages of deselected services', () => {
    const d = { ...complete(), packages: { ppf: 'ppf-front', ceramic: 'ceramic-essential' }, contact: { ...complete().contact, name: '  Alex  ' } };
    const p = toPayload(d, new Date('2026-10-22T10:00:00Z'));
    expect(p.contact.name).toBe('Alex');
    expect('consent' in p.contact).toBe(false);
    expect(p.packages).toEqual({ ppf: 'ppf-front' });
    expect(p.consentGiven).toBe(true);
    expect(demoReference(p)).toMatch(/^DEMO-[0-9A-Z]{6}$/);
    expect(demoReference(p)).toBe(demoReference(p));
  });
});

describe('persistence', () => {
  let store: Record<string, string>;
  beforeEach(() => {
    store = {};
    vi.stubGlobal('sessionStorage', {
      getItem: (k: string) => store[k] ?? null,
      setItem: (k: string, v: string) => (store[k] = v),
      removeItem: (k: string) => delete store[k],
    });
  });
  afterEach(() => vi.unstubAllGlobals());

  it('never writes contact details to storage', () => {
    saveDraft(complete());
    const raw = Object.values(store)[0]!;
    expect(raw).not.toContain('alex@example.com');
    expect(raw).not.toContain('contact');
    expect(loadDraft()?.vehicle?.model).toBe('911 GT3');
  });

  it('builds a draft from storage plus URL prefill, ignoring invalid values', () => {
    saveDraft({ ...complete(), serviceIds: ['interior'], packages: {} });
    const d = initialDraft('?service=ceramic,bogus&package=ppf-track&size=suv', loadDraft());
    expect(d.serviceIds).toEqual(['interior', 'ceramic', 'ppf']);
    expect(d.packages.ppf).toBe('ppf-track');
    expect(d.vehicle.size).toBe('suv');
    expect(d.contact.email).toBe('');
  });
});
