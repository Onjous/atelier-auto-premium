import {
  ESTIMATE_ROUNDING,
  ESTIMATE_SPREAD,
  addOns as allAddOns,
  pricingPackages,
  vehicleConditions,
  vehicleSizes,
} from '@/data/pricing';
import type { AddOn, ConditionId, PricingPackage, VehicleSizeId } from '@/types/content';

export interface EstimateInput {
  size: VehicleSizeId;
  condition: ConditionId;
  packageIds: string[];
  addOnIds: string[];
}

export interface EstimateLine {
  id: string;
  label: string;
  kind: 'package' | 'addon';
  amount: number;
  /** Human-readable formula, e.g. "6 900 × 1.15 (Sedan)". */
  basis: string;
}

export interface Estimate {
  lines: EstimateLine[];
  subtotal: number;
  low: number;
  high: number;
  sizeMultiplier: number;
  conditionFactor: number;
}

export const roundTo = (value: number, step = ESTIMATE_ROUNDING) => Math.round(value / step) * step;

function sizeOf(id: VehicleSizeId) {
  const size = vehicleSizes.find((s) => s.id === id);
  if (!size) throw new Error(`Unknown vehicle size: ${id}`);
  return size;
}

function conditionOf(id: ConditionId) {
  const condition = vehicleConditions.find((c) => c.id === id);
  if (!condition) throw new Error(`Unknown condition: ${id}`);
  return condition;
}

export function packagePrice(pkg: PricingPackage, size: VehicleSizeId, condition: ConditionId = 'well-kept'): number {
  const m = pkg.sizeSensitive ? sizeOf(size).multiplier : 1;
  const f = pkg.conditionSensitive ? conditionOf(condition).factor : 1;
  return roundTo(pkg.basePrice * m * f);
}

export function addOnPrice(addOn: AddOn, size: VehicleSizeId): number {
  return roundTo(addOn.price * (addOn.sizeSensitive ? sizeOf(size).multiplier : 1));
}

/** Add-ons available given the services of the selected packages. */
export function availableAddOns(packageIds: string[]): AddOn[] {
  const services = new Set(pricingPackages.filter((p) => packageIds.includes(p.id)).map((p) => p.serviceId));
  return allAddOns.filter((a) => !a.serviceIds || a.serviceIds.some((s) => services.has(s)));
}

/**
 * Deterministic, transparent estimate:
 *   line   = round50(base × size multiplier? × condition factor?)
 *   range  = [subtotal, round50(subtotal × (1 + spread))]
 * Unknown ids are ignored; add-ons not applicable to the selection are dropped.
 */
export function calculateEstimate(input: EstimateInput): Estimate {
  const size = sizeOf(input.size);
  const condition = conditionOf(input.condition);
  const lines: EstimateLine[] = [];

  for (const id of input.packageIds) {
    const pkg = pricingPackages.find((p) => p.id === id);
    if (!pkg) continue;
    const parts = [String(pkg.basePrice)];
    if (pkg.sizeSensitive && size.multiplier !== 1) parts.push(`× ${size.multiplier} (${size.label})`);
    if (pkg.conditionSensitive && condition.factor !== 1) parts.push(`× ${condition.factor} (${condition.label})`);
    lines.push({ id, label: pkg.name, kind: 'package', amount: packagePrice(pkg, input.size, input.condition), basis: parts.join(' ') });
  }

  const allowed = new Set(availableAddOns(input.packageIds).map((a) => a.id));
  for (const id of input.addOnIds) {
    const addOn = allAddOns.find((a) => a.id === id);
    if (!addOn || !allowed.has(id)) continue;
    const basis = addOn.sizeSensitive && size.multiplier !== 1 ? `${addOn.price} × ${size.multiplier} (${size.label})` : String(addOn.price);
    lines.push({ id, label: addOn.name, kind: 'addon', amount: addOnPrice(addOn, input.size), basis });
  }

  const subtotal = lines.reduce((sum, l) => sum + l.amount, 0);
  return {
    lines,
    subtotal,
    low: subtotal,
    high: roundTo(subtotal * (1 + ESTIMATE_SPREAD)),
    sizeMultiplier: size.multiplier,
    conditionFactor: condition.factor,
  };
}
