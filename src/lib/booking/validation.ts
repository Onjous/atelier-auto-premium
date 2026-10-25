import { services } from '@/data/services';
import { vehicleSizes } from '@/data/pricing';
import type { BookingDraft, BookingStep, ValidationErrors } from './types';

export const SCHEDULE_RULES = {
  minLeadDays: 2,
  maxAdvanceDays: 180,
  maxRangeDays: 21,
  closedWeekdays: [0] as number[], // Sunday
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9\s()-]{7,20}$/;

export function toISODate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1);
}

export function addDays(d: Date, days: number): Date {
  const next = new Date(d);
  next.setDate(next.getDate() + days);
  return next;
}

const dayDiff = (a: Date, b: Date) => Math.round((b.getTime() - a.getTime()) / 86_400_000);

export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** Whether a calendar day can be chosen, relative to `today`. */
export function isSelectableDate(date: Date, today: Date): boolean {
  const t = startOfDay(today);
  const diff = dayDiff(t, startOfDay(date));
  return (
    diff >= SCHEDULE_RULES.minLeadDays &&
    diff <= SCHEDULE_RULES.maxAdvanceDays &&
    !SCHEDULE_RULES.closedWeekdays.includes(date.getDay())
  );
}

export function validateStep(step: BookingStep, draft: BookingDraft, today: Date = new Date()): ValidationErrors {
  const errors: ValidationErrors = {};

  if (step === 'service') {
    if (draft.serviceIds.length === 0) errors.services = 'Choose at least one service.';
    else if (draft.serviceIds.some((id) => !services.some((s) => s.id === id))) errors.services = 'One of the selected services is not available.';
    else if (!packagesAreConsistent(draft)) errors.services = 'One of the selected packages does not match its service.';
  }

  if (step === 'vehicle') {
    if (!draft.vehicle.brand.trim()) errors['vehicle.brand'] = 'Select or enter the vehicle make.';
    if (draft.vehicle.model.trim().length < 1) errors['vehicle.model'] = 'Enter the model.';
    if (draft.vehicle.year) {
      const y = Number(draft.vehicle.year);
      const max = today.getFullYear() + 1;
      if (!/^\d{4}$/.test(draft.vehicle.year) || y < 1950 || y > max) errors['vehicle.year'] = `Enter a year between 1950 and ${max}.`;
    }
    if (!draft.vehicle.size || !vehicleSizes.some((s) => s.id === draft.vehicle.size)) errors['vehicle.size'] = 'Choose the vehicle size.';
  }

  if (step === 'schedule') {
    const { mode, start, end } = draft.schedule;
    if (!start) errors['schedule.start'] = mode === 'range' ? 'Choose the first day of your window.' : 'Choose a preferred date.';
    else if (!isSelectableDate(parseISODate(start), today)) errors['schedule.start'] = 'That date is not available. Choose another day.';
    if (mode === 'range' && start) {
      if (!end) errors['schedule.end'] = 'Choose the last day of your window.';
      else {
        const span = dayDiff(parseISODate(start), parseISODate(end));
        if (span < 1) errors['schedule.end'] = 'The window must end after it starts.';
        else if (span > SCHEDULE_RULES.maxRangeDays) errors['schedule.end'] = `Keep the window within ${SCHEDULE_RULES.maxRangeDays} days.`;
        else if (!isSelectableDate(parseISODate(end), today)) errors['schedule.end'] = 'That end date is not available.';
      }
    }
  }

  if (step === 'contact') {
    const c = draft.contact;
    if (c.name.trim().length < 2) errors['contact.name'] = 'Enter your full name.';
    if (!EMAIL.test(c.email.trim())) errors['contact.email'] = 'Enter a valid email address, e.g. name@domain.com.';
    if (c.preference === 'phone' && !c.phone.trim()) errors['contact.phone'] = 'Enter a phone number, or choose email as your preference.';
    else if (c.phone.trim() && !PHONE.test(c.phone.trim())) errors['contact.phone'] = 'Enter a valid phone number, including country code.';
    if (c.notes.length > 1000) errors['contact.notes'] = 'Keep notes under 1,000 characters.';
    if (!c.consent) errors['contact.consent'] = 'Please confirm you agree to be contacted about this inquiry.';
  }

  return errors;
}

/** Validates every input step — used before submission. */
export function validateDraft(draft: BookingDraft, today: Date = new Date()): ValidationErrors {
  return (['service', 'vehicle', 'schedule', 'contact'] as const).reduce<ValidationErrors>(
    (acc, step) => ({ ...acc, ...validateStep(step, draft, today) }),
    {},
  );
}

export const hasErrors = (e: ValidationErrors) => Object.keys(e).length > 0;

/** Packages must belong to a selected service. */
export function packagesAreConsistent(draft: BookingDraft): boolean {
  return Object.entries(draft.packages).every(([serviceId, pkgId]) => {
    const service = services.find((s) => s.id === serviceId);
    return !pkgId || (service !== undefined && service.packageIds.includes(pkgId));
  });
}
