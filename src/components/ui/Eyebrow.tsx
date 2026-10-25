import { cn } from '@/lib/cn';

interface EyebrowProps {
  index?: string;
  children: React.ReactNode;
  className?: string;
  reveal?: boolean;
}

/** "01 ——— Philosophy": the index-and-rule label that opens each section. */
export function Eyebrow({ index, children, className, reveal = true }: EyebrowProps) {
  return (
    <p className={cn('t-eyebrow flex items-center gap-4 text-mist', className)} data-reveal={reveal ? 'fade' : undefined}>
      {index && <span className="tabular text-champagne">{index}</span>}
      {index && <span aria-hidden className="h-px w-10 bg-current opacity-40" />}
      <span>{children}</span>
    </p>
  );
}
