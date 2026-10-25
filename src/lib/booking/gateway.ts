import type { BookingDraft, InquiryPayload } from './types';

export type InquiryResult =
  | { status: 'demo'; reference: string; payload: InquiryPayload }
  | { status: 'sent'; reference: string }
  | { status: 'error'; message: string };

/**
 * Boundary for future CRM / booking-system integration. Swap `demoGateway`
 * for an implementation that POSTs to a server action or API route.
 */
export interface InquiryGateway {
  submit(payload: InquiryPayload): Promise<InquiryResult>;
}

export function toPayload(draft: BookingDraft, now: Date = new Date()): InquiryPayload {
  const { consent: _consent, ...contact } = draft.contact;
  void _consent;
  return {
    services: draft.serviceIds,
    packages: Object.fromEntries(Object.entries(draft.packages).filter(([id]) => draft.serviceIds.some((s) => s === id))),
    vehicle: { ...draft.vehicle, brand: draft.vehicle.brand.trim(), model: draft.vehicle.model.trim() },
    schedule: draft.schedule,
    contact: { ...contact, name: contact.name.trim(), email: contact.email.trim(), phone: contact.phone.trim(), notes: contact.notes.trim() },
    consentGiven: true,
    submittedAt: now.toISOString(),
    source: 'website',
  };
}

/** Stable, non-sensitive reference derived from the payload (FNV-1a). */
export function demoReference(payload: InquiryPayload): string {
  const input = `${payload.services.join(',')}|${payload.vehicle.model}|${payload.schedule.start}|${payload.submittedAt}`;
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return `DEMO-${(hash >>> 0).toString(36).toUpperCase().padStart(6, '0').slice(0, 6)}`;
}

/** Demonstration gateway: nothing leaves the browser. */
export const demoGateway: InquiryGateway = {
  async submit(payload) {
    await new Promise((r) => setTimeout(r, 900));
    return { status: 'demo', reference: demoReference(payload), payload };
  },
};
