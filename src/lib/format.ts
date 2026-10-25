const pln = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 });

/** "6 900 PLN" — thin-spaced thousands, currency after the amount. */
export function formatPrice(amount: number): string {
  return `${pln.format(amount).replace(/,/g, ' ')} PLN`;
}

const dateFormatter = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(`${iso}T00:00:00Z`));
}

export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}
