import { site } from '@/data/site';
import { cn } from '@/lib/cn';

/** Monogram: an open chevron crossed by a single "light line". */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden className={cn('size-7', className)} fill="none">
      <path d="M4 24 L14 4 L24 24" stroke="currentColor" strokeWidth="1.25" />
      <path d="M2 17.5 H26" stroke="var(--color-champagne)" strokeWidth="1.25" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  const [first, ...rest] = site.name.split(' ');
  return (
    <span className={cn('flex items-center gap-3', className)}>
      <LogoMark />
      <span className="text-[0.8rem] font-medium tracking-[0.34em] whitespace-nowrap uppercase">
        {first}
        {rest.length > 0 && <span className="font-light text-mist"> {rest.join(' ')}</span>}
      </span>
    </span>
  );
}
