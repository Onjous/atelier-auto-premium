import { vehicleSizes } from '@/data/pricing';
import { packageById } from '@/data/pricing';
import { services } from '@/data/services';
import type { ServiceId, VehicleSizeId } from '@/types/content';
import { emptyDraft, type BookingDraft } from './types';

const KEY = 'atelier-auto:booking-draft:v1';

/**
 * Only non-personal choices are persisted (service, vehicle, schedule), in
 * sessionStorage, so going back or refreshing does not lose them. Contact
 * details are never written to storage.
 */
export function saveDraft(draft: BookingDraft) {
  try {
    const { contact: _contact, ...rest } = draft;
    void _contact;
    sessionStorage.setItem(KEY, JSON.stringify(rest));
  } catch {
    /* storage unavailable — persistence is a convenience only */
  }
}

export function clearDraft() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

export function loadDraft(): Partial<BookingDraft> | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Partial<BookingDraft>) : null;
  } catch {
    return null;
  }
}

const isService = (id: string): id is ServiceId => services.some((s) => s.id === id);

/** Builds the initial draft from storage, then URL prefill (?service=a,b&package=x&size=y). */
export function initialDraft(search: string, stored: Partial<BookingDraft> | null): BookingDraft {
  const draft: BookingDraft = {
    ...emptyDraft,
    ...stored,
    vehicle: { ...emptyDraft.vehicle, ...stored?.vehicle },
    schedule: { ...emptyDraft.schedule, ...stored?.schedule },
    packages: { ...stored?.packages },
    serviceIds: (stored?.serviceIds ?? []).filter(isService),
    contact: { ...emptyDraft.contact },
  };
  const params = new URLSearchParams(search);
  const fromUrl = (params.get('service') ?? '').split(',').filter(isService);
  if (fromUrl.length) draft.serviceIds = [...new Set([...draft.serviceIds, ...fromUrl])];
  const pkg = packageById(params.get('package') ?? '');
  if (pkg) {
    draft.packages[pkg.serviceId] = pkg.id;
    if (!draft.serviceIds.includes(pkg.serviceId)) draft.serviceIds.push(pkg.serviceId);
  }
  const size = params.get('size');
  if (size && vehicleSizes.some((s) => s.id === size)) draft.vehicle.size = size as VehicleSizeId;
  return draft;
}
