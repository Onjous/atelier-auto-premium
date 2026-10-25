'use client';

import { useState } from 'react';

// Browser-only flag: the server never animates, so the first client render matches.
let clientHasMounted = false;

/** Soft cross-fade between routes. Skipped on first load so LCP is never delayed. */
export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => {
    if (typeof window === 'undefined') return false;
    const value = clientHasMounted;
    clientHasMounted = true;
    return value;
  });
  return <div className={animate ? 'route-enter' : undefined}>{children}</div>;
}
