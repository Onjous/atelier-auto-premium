import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

type Variant = 'solid' | 'ghost';

interface ButtonLinkProps extends Omit<React.ComponentProps<typeof Link>, 'className'> {
  variant?: Variant;
  className?: string;
  icon?: boolean;
}

export function ButtonLink({ variant = 'solid', className, icon = true, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={cn('btn', variant === 'ghost' && 'btn-ghost', className)} {...props}>
      <span>{children}</span>
      {icon && <ArrowRight aria-hidden className="btn-icon size-4" strokeWidth={1.5} />}
    </Link>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: boolean;
}

export function Button({ variant = 'solid', className, icon = false, children, type = 'button', ...props }: ButtonProps) {
  return (
    <button type={type} className={cn('btn', variant === 'ghost' && 'btn-ghost', className)} {...props}>
      <span>{children}</span>
      {icon && <ArrowRight aria-hidden className="btn-icon size-4" strokeWidth={1.5} />}
    </button>
  );
}

export function TextLink({ className, children, ...props }: React.ComponentProps<typeof Link>) {
  return (
    <Link className={cn('link-line t-eyebrow', className)} {...props}>
      {children}
      <ArrowRight aria-hidden className="size-3.5" strokeWidth={1.5} />
    </Link>
  );
}
