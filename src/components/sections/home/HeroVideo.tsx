'use client';

import { useEffect, useState } from 'react';

interface HeroVideoProps {
  sources: { mp4: string; webm?: string };
}

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

/** Loads the hero film only on wide screens without reduced-motion or data-saver preferences. */
export function HeroVideo({ sources }: HeroVideoProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1024px)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as NavigatorWithConnection).connection?.saveData === true;
    if (wide && !reduce && !saveData) {
      const id = requestAnimationFrame(() => setEnabled(true));
      return () => cancelAnimationFrame(id);
    }
  }, []);

  if (!enabled) return null;
  return (
    <video className="absolute inset-0 size-full object-cover" autoPlay muted loop playsInline preload="none" aria-hidden>
      {sources.webm && <source src={sources.webm} type="video/webm" />}
      <source src={sources.mp4} type="video/mp4" />
    </video>
  );
}
