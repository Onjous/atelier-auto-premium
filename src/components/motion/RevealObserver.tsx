'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * One IntersectionObserver for the whole page: sets `data-revealed` on every
 * `[data-reveal]` element as it enters the viewport. Re-scans on navigation
 * and on DOM changes (filtered lists, step transitions).
 *
 * The marker is a data attribute rather than a class on purpose: React owns
 * `className` and rewrites it whenever a component re-renders with different
 * classes, which would silently strip an imperatively added class and hide the
 * element again. React never touches attributes it did not render.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('reveal-ready');

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach((el) => el.setAttribute('data-revealed', ''));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', '');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    const scan = () => document.querySelectorAll('[data-reveal]:not([data-revealed])').forEach((el) => io.observe(el));
    scan();

    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
