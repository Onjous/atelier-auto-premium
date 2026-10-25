'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Img } from '@/components/ui/Img';
import type { MediaAsset } from '@/data/media';
import { cn } from '@/lib/cn';

interface BeforeAfterProps {
  before: MediaAsset;
  after: MediaAsset;
  label: string;
  className?: string;
}

const clamp = (v: number) => Math.min(100, Math.max(0, v));

/**
 * Comparison slider. The "before" layer is clipped from the right; the handle
 * is an ARIA slider operable by pointer, touch (horizontal drags only, vertical
 * scrolling is preserved) and keyboard.
 */
export function BeforeAfter({ before, after, label, className }: BeforeAfterProps) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const hinted = useRef(false);

  const fromClientX = useCallback((clientX: number) => {
    const rect = frame.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setPos(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  // One gentle hint the first time the slider is seen.
  useEffect(() => {
    const el = frame.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hinted.current) return;
        hinted.current = true;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1800);
          setPos(50 - Math.sin(t * Math.PI * 2) * 14 * (1 - t));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    const map: Record<string, number> = {
      ArrowLeft: pos - step,
      ArrowDown: pos - step,
      ArrowRight: pos + step,
      ArrowUp: pos + step,
      PageDown: pos - 10,
      PageUp: pos + 10,
      Home: 0,
      End: 100,
    };
    const next = map[e.key];
    if (next !== undefined) {
      e.preventDefault();
      hinted.current = true;
      setPos(clamp(next));
    }
  };

  return (
    <div
      ref={frame}
      className={cn('relative touch-pan-y overflow-hidden bg-ink-800 select-none', dragging ? 'cursor-grabbing' : 'cursor-ew-resize', className)}
      onPointerDown={(e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        hinted.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        setDragging(true);
        fromClientX(e.clientX);
      }}
      onPointerMove={(e) => dragging && fromClientX(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <Img asset={after} sizes="(min-width: 1024px) 90vw, 100vw" quality={80} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Img asset={before} sizes="(min-width: 1024px) 90vw, 100vw" quality={80} />
      </div>

      <span className="t-eyebrow pointer-events-none absolute top-5 left-5 bg-ink-950/70 px-3 py-2 backdrop-blur-sm" aria-hidden>
        Before
      </span>
      <span className="t-eyebrow pointer-events-none absolute top-5 right-5 bg-ink-950/70 px-3 py-2 backdrop-blur-sm" aria-hidden>
        After
      </span>

      <div className="pointer-events-none absolute inset-y-0 w-px bg-bone/90 shadow-[0_0_24px_rgb(240_237_231/0.5)]" style={{ left: `${pos}%` }} aria-hidden />
      <div
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)}% before, ${100 - Math.round(pos)}% after`}
        onKeyDown={onKeyDown}
        className={cn(
          'absolute top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-bone/80 bg-ink-950/60 text-bone backdrop-blur-md transition-[transform,background-color] duration-300',
          dragging && 'scale-90 bg-bone text-ink-900',
        )}
        style={{ left: `${pos}%` }}
      >
        <span className="flex" aria-hidden>
          <ChevronLeft className="size-4" strokeWidth={1.5} />
          <ChevronRight className="size-4" strokeWidth={1.5} />
        </span>
      </div>
    </div>
  );
}
