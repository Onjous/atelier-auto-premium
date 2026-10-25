'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';

interface ParallaxProps {
  children: React.ReactNode;
  /** Travel as a fraction of element height, e.g. 0.12 = ±12%. */
  amount?: number;
  /** Absolutely fill the positioned parent instead of sizing by className. */
  fill?: boolean;
  className?: string;
}

/**
 * Scroll-scrubbed vertical drift for the child (usually an oversized image).
 * GSAP is imported lazily and skipped entirely for reduced motion, coarse
 * pointers on small screens, and low-core devices.
 */
export function Parallax({ children, amount = 0.12, fill = false, className }: ParallaxProps) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowPower = (navigator.hardwareConcurrency ?? 8) <= 2;
    const smallTouch = window.matchMedia('(max-width: 767px) and (pointer: coarse)').matches;
    if (reduce || lowPower || smallTouch || !outer.current || !inner.current) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled || !outer.current || !inner.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        gsap.fromTo(
          inner.current,
          { yPercent: -amount * 100 },
          {
            yPercent: amount * 100,
            ease: 'none',
            scrollTrigger: { trigger: outer.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          },
        );
      }, outer);
      cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [amount]);

  return (
    <div ref={outer} className={cn(fill ? 'absolute inset-0' : 'relative', 'overflow-hidden', className)}>
      <div ref={inner} className="absolute inset-x-0 will-change-transform" style={{ top: `-${amount * 100}%`, bottom: `-${amount * 100}%` }}>
        {children}
      </div>
    </div>
  );
}
