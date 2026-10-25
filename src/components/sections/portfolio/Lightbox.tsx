'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { Img } from '@/components/ui/Img';
import type { MediaAsset } from '@/data/media';

export interface LightboxItem {
  id: string;
  image: MediaAsset;
  title: string;
  caption: string;
  href?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  index: number | null;
  onChange: (index: number | null) => void;
}

/** Native <dialog>: modal focus containment, Escape and backdrop handled by the platform. */
export function Lightbox({ items, index, onChange }: LightboxProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const item = index === null ? null : items[index];
  const open = item !== null && item !== undefined;

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const step = (delta: number) => {
    if (index === null || items.length === 0) return;
    onChange((index + delta + items.length) % items.length);
  };

  return (
    <dialog
      ref={dialog}
      aria-label={item ? `${item.title} — image ${(index ?? 0) + 1} of ${items.length}` : 'Image viewer'}
      onClose={() => onChange(null)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') step(1);
        if (e.key === 'ArrowLeft') step(-1);
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onChange(null);
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-ink-950/97 p-0 text-bone backdrop:bg-ink-950/80 open:flex open:flex-col"
    >
      {item && (
        <>
          <div className="shell flex items-center justify-between gap-6 py-4" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
            <p className="t-meta text-mist" aria-live="polite">
              <span className="text-bone">{String((index ?? 0) + 1).padStart(2, '0')}</span> / {String(items.length).padStart(2, '0')}
            </p>
            <button type="button" onClick={() => onChange(null)} className="grid grid-cols-1 size-12 place-items-center border border-line-strong transition-colors hover:border-bone" aria-label="Close image viewer" autoFocus>
              <X aria-hidden className="size-5" strokeWidth={1.25} />
            </button>
          </div>

          <div
            className="relative min-h-0 flex-1 touch-pan-y"
            onPointerDown={(e) => {
              if (e.pointerType !== 'mouse') touchX.current = e.clientX;
            }}
            onPointerUp={(e) => {
              if (touchX.current === null) return;
              const dx = e.clientX - touchX.current;
              touchX.current = null;
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            }}
          >
            <div key={item.id} className="absolute inset-x-[var(--gutter)] inset-y-0 animate-[route-in_0.5s_var(--ease-quint)_both]">
              <Img asset={item.image} sizes="100vw" quality={80} className="!object-contain" />
            </div>
            <button type="button" onClick={() => step(-1)} aria-label="Previous image" className="absolute top-1/2 left-3 hidden size-12 -translate-y-1/2 place-items-center border border-line-strong bg-ink-950/60 backdrop-blur transition-colors hover:border-bone sm:grid md:left-6">
              <ArrowLeft aria-hidden className="size-5" strokeWidth={1.25} />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next image" className="absolute top-1/2 right-3 hidden size-12 -translate-y-1/2 place-items-center border border-line-strong bg-ink-950/60 backdrop-blur transition-colors hover:border-bone sm:grid md:right-6">
              <ArrowRight aria-hidden className="size-5" strokeWidth={1.25} />
            </button>
          </div>

          <div className="shell flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between" style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
            <div>
              <p className="text-lg">{item.title}</p>
              <p className="t-meta mt-1 text-mist">{item.caption}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-3 sm:hidden">
                <button type="button" onClick={() => step(-1)} aria-label="Previous image" className="grid grid-cols-1 size-12 place-items-center border border-line-strong">
                  <ArrowLeft aria-hidden className="size-5" strokeWidth={1.25} />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next image" className="grid grid-cols-1 size-12 place-items-center border border-line-strong">
                  <ArrowRight aria-hidden className="size-5" strokeWidth={1.25} />
                </button>
              </div>
              {item.href && (
                <Link href={item.href} className="btn btn-ghost" onClick={() => onChange(null)}>
                  <span>Case study</span>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </dialog>
  );
}
