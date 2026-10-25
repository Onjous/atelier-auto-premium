import { cn } from '@/lib/cn';

type Tag = 'h1' | 'h2' | 'h3' | 'p';

interface RevealHeadingProps {
  as?: Tag;
  lines: React.ReactNode[];
  className?: string;
  id?: string;
  /** Extra delay in ms before the first line starts. */
  delay?: number;
}

/** Heading whose lines rise from behind a mask as it enters the viewport. */
export function RevealHeading({ as: Tag = 'h2', lines, className, id, delay = 0 }: RevealHeadingProps) {
  return (
    <Tag id={id} className={cn('reveal-lines', className)} data-reveal="lines" style={{ '--d': delay } as React.CSSProperties}>
      {lines.map((line, i) => (
        <span key={i} className="line" style={{ '--l': i } as React.CSSProperties}>
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

/** Inline style helper for staggered children. */
export const stagger = (i: number, delay = 0) => ({ '--i': i, '--d': delay }) as React.CSSProperties;
