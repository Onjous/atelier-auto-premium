/** Lower-case, strip diacritics and punctuation so "Huracán" matches "huracan". */
export function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/** True when every term in the query appears somewhere in the haystack fields. */
export function matchesQuery(query: string, fields: string[]): boolean {
  const terms = normalize(query).split(' ').filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = normalize(fields.join(' '));
  return terms.every((t) => haystack.includes(t));
}
