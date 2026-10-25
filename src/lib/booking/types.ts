import type { ServiceId, VehicleSizeId } from '@/types/content';

export const bookingSteps = ['service', 'vehicle', 'schedule', 'contact', 'review', 'done'] as const;
export type BookingStep = (typeof bookingSteps)[number];

export type TimeOfDay = 'morning' | 'afternoon' | 'any';
export type ContactPreference = 'email' | 'phone';

export interface BookingDraft {
  serviceIds: ServiceId[];
  /** Optional package choice per selected service. */
  packages: Partial<Record<ServiceId, string>>;
  vehicle: { brand: string; model: string; year: string; size: VehicleSizeId | null };
  schedule: { mode: 'date' | 'range'; start: string | null; end: string | null; timeOfDay: TimeOfDay };
  contact: { name: string; email: string; phone: string; preference: ContactPreference; notes: string; consent: boolean };
}

export const emptyDraft: BookingDraft = {
  serviceIds: [],
  packages: {},
  vehicle: { brand: '', model: '', year: '', size: null },
  schedule: { mode: 'date', start: null, end: null, timeOfDay: 'any' },
  contact: { name: '', email: '', phone: '', preference: 'email', notes: '', consent: false },
};

/** Field path → message. Paths match input ids, e.g. "vehicle.model". */
export type ValidationErrors = Partial<Record<string, string>>;

/** The shape a CRM or booking backend would receive. */
export interface InquiryPayload {
  services: ServiceId[];
  packages: Partial<Record<ServiceId, string>>;
  vehicle: BookingDraft['vehicle'];
  schedule: BookingDraft['schedule'];
  contact: Omit<BookingDraft['contact'], 'consent'>;
  consentGiven: true;
  submittedAt: string;
  source: 'website';
}
