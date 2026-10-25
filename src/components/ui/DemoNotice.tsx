import { Info } from 'lucide-react';
import { cn } from '@/lib/cn';

interface DemoNoticeProps {
  children: React.ReactNode;
  className?: string;
  tone?: 'dark' | 'paper';
}

/** Marks sample content (prices, testimonials, case studies) as demonstration material. */
export function DemoNotice({ children, className, tone = 'dark' }: DemoNoticeProps) {
  return (
    <p
      className={cn(
        'inline-flex items-start gap-2.5 text-[0.8rem] leading-snug',
        tone === 'dark' ? 'text-mist' : 'text-graphite',
        className,
      )}
    >
      <Info aria-hidden className="mt-px size-3.5 shrink-0 text-champagne" strokeWidth={1.75} />
      <span>{children}</span>
    </p>
  );
}
