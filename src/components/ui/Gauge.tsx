import { cn } from '@/lib/cn';

interface GaugeProps {
  ticks?: number;
  /** 0–1: position of the highlighted champagne tick. */
  marker?: number;
  className?: string;
  label?: string;
}

/** Instrument-style ruler: the brand's precision motif. Decorative only. */
export function Gauge({ ticks = 41, marker, className, label }: GaugeProps) {
  const markerIndex = marker === undefined ? -1 : Math.round(marker * (ticks - 1));
  return (
    <div aria-hidden className={cn('flex items-end gap-0', className)}>
      <div className="flex w-full items-end justify-between">
        {Array.from({ length: ticks }, (_, i) => (
          <span
            key={i}
            className={cn(
              'w-px',
              i === markerIndex ? 'h-4 bg-champagne' : i % 10 === 0 ? 'h-3 bg-current opacity-50' : i % 5 === 0 ? 'h-2 bg-current opacity-35' : 'h-1.5 bg-current opacity-20',
            )}
          />
        ))}
      </div>
      {label && <span className="t-meta ml-4 shrink-0 opacity-60">{label}</span>}
    </div>
  );
}
