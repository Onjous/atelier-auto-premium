import { describe, expect, it } from 'vitest';
import { matchesQuery, normalize } from '@/lib/search';

describe('normalize', () => {
  it('lower-cases, strips diacritics and punctuation', () => {
    expect(normalize('Huracán — GT3 RS!')).toBe('huracan gt3 rs');
    expect(normalize('Šimon Caban')).toBe('simon caban');
  });
});

describe('matchesQuery', () => {
  it('matches everything for an empty query', () => {
    expect(matchesQuery('   ', ['anything'])).toBe(true);
  });
  it('requires every term to be present (AND semantics)', () => {
    expect(matchesQuery('porsche ceramic', ['Porsche 911', 'Ceramic Coating'])).toBe(true);
    expect(matchesQuery('porsche ferrari', ['Porsche 911'])).toBe(false);
  });
  it('is accent-insensitive', () => {
    expect(matchesQuery('huracan', ['Lamborghini Huracán'])).toBe(true);
  });
});
