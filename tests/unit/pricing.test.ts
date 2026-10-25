import { describe, expect, it } from 'vitest';
import { addOns, packageById, pricingPackages, startingPrice } from '@/data/pricing';
import { addOnPrice, availableAddOns, calculateEstimate, packagePrice, roundTo } from '@/lib/pricing';

const pkg = (id: string) => {
  const p = packageById(id);
  if (!p) throw new Error(id);
  return p;
};

describe('roundTo', () => {
  it('rounds to the nearest 50 PLN', () => {
    expect(roundTo(7934)).toBe(7950);
    expect(roundTo(7924)).toBe(7900);
    expect(roundTo(7925)).toBe(7950);
  });
});

describe('packagePrice', () => {
  it('returns the base price for a compact, well-kept vehicle', () => {
    expect(packagePrice(pkg('ppf-front'), 'compact')).toBe(6900);
  });

  it('scales size-sensitive packages by the size multiplier', () => {
    expect(packagePrice(pkg('ppf-front'), 'sedan')).toBe(roundTo(6900 * 1.15));
    expect(packagePrice(pkg('ppf-front'), 'large')).toBe(roundTo(6900 * 1.5));
  });

  it('applies condition only to condition-sensitive packages', () => {
    expect(packagePrice(pkg('ppf-front'), 'compact', 'attention')).toBe(6900);
    expect(packagePrice(pkg('correction-two-step'), 'compact', 'attention')).toBe(roundTo(3400 * 1.35));
  });

  it('ignores size for packages that are not size-sensitive', () => {
    expect(packagePrice(pkg('interior-leather'), 'large')).toBe(2400);
  });
});

describe('availableAddOns', () => {
  it('only offers service-restricted add-ons with a matching package', () => {
    const none = availableAddOns([]).map((a) => a.id);
    expect(none).not.toContain('matte-film');
    expect(none).toContain('collection');
    expect(availableAddOns(['ppf-front']).map((a) => a.id)).toContain('matte-film');
  });
});

describe('calculateEstimate', () => {
  it('returns an empty estimate when nothing is selected', () => {
    const e = calculateEstimate({ size: 'compact', condition: 'well-kept', packageIds: [], addOnIds: [] });
    expect(e.lines).toHaveLength(0);
    expect(e.subtotal).toBe(0);
    expect(e.high).toBe(0);
  });

  it('sums packages and add-ons and produces a 12% upper bound', () => {
    const e = calculateEstimate({ size: 'suv', condition: 'average', packageIds: ['ppf-front', 'ceramic-advanced'], addOnIds: ['wheels-off', 'glass-coating'] });
    const expected =
      roundTo(6900 * 1.3) + roundTo(4400 * 1.3 * 1.15) + addOnPrice(addOns.find((a) => a.id === 'wheels-off')!, 'suv') + addOnPrice(addOns.find((a) => a.id === 'glass-coating')!, 'suv');
    expect(e.subtotal).toBe(expected);
    expect(e.low).toBe(expected);
    expect(e.high).toBe(roundTo(expected * 1.12));
    expect(e.lines.map((l) => l.kind)).toEqual(['package', 'package', 'addon', 'addon']);
  });

  it('drops unknown ids and add-ons that do not apply to the selection', () => {
    const e = calculateEstimate({ size: 'compact', condition: 'well-kept', packageIds: ['nope', 'interior-refresh'], addOnIds: ['matte-film', 'missing'] });
    expect(e.lines.map((l) => l.id)).toEqual(['interior-refresh']);
  });

  it('explains each line with a readable formula', () => {
    const e = calculateEstimate({ size: 'sedan', condition: 'attention', packageIds: ['correction-enhancement'], addOnIds: [] });
    expect(e.lines[0]?.basis).toBe('1900 × 1.15 (Sedan) × 1.35 (Needs attention)');
  });

  it('is deterministic', () => {
    const input = { size: 'large' as const, condition: 'average' as const, packageIds: ['ppf-full'], addOnIds: ['matte-film'] };
    expect(calculateEstimate(input)).toEqual(calculateEstimate(input));
  });
});

describe('startingPrice', () => {
  it('is the cheapest package of a service', () => {
    const ppf = pricingPackages.filter((p) => p.serviceId === 'ppf').map((p) => p.basePrice);
    expect(startingPrice('ppf')).toBe(Math.min(...ppf));
  });
});
