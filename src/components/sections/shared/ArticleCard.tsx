import Link from 'next/link';
import { Img } from '@/components/ui/Img';
import type { MediaAsset } from '@/data/media';
import { cn } from '@/lib/cn';

export interface ArticleCardData {
  slug: string;
  href: string;
  title: string;
  dek: string;
  category: string;
  date: string;
  dateLabel: string;
  minutes: number;
  image: MediaAsset;
}

interface ArticleCardProps {
  article: ArticleCardData;
  variant?: 'feature' | 'compact';
  headingLevel?: 'h2' | 'h3';
  sizes: string;
  className?: string;
}

export function ArticleCard({ article, variant = 'compact', headingLevel: H = 'h3', sizes, className }: ArticleCardProps) {
  const feature = variant === 'feature';
  return (
    <article className={cn('group relative', !feature && 'grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start gap-5 sm:gap-8', className)}>
      <div className={cn('light-sweep relative overflow-hidden bg-ink-800', feature ? 'aspect-[4/3]' : 'aspect-[4/5] sm:aspect-[1/1]')} data-reveal="clip">
        <Img asset={article.image} sizes={sizes} className="transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-[1.04]" />
      </div>
      <div className={cn(feature && 'mt-7')}>
        <p className="t-meta flex flex-wrap items-center gap-x-3 gap-y-1 text-mist">
          <span className="text-champagne">{article.category}</span>
          <span aria-hidden>·</span>
          <time dateTime={article.date}>{article.dateLabel}</time>
          <span aria-hidden>·</span>
          <span>{article.minutes} min read</span>
        </p>
        <H className={cn('mt-3 tracking-[-0.02em]', feature ? 'text-[clamp(1.6rem,1.2rem+1.4vw,2.6rem)] leading-[1.08] font-light' : 'text-lg leading-snug font-normal sm:text-xl')}>
          <Link href={article.href} className="after:absolute after:inset-0 transition-colors group-hover:text-champagne-soft">
            {article.title}
          </Link>
        </H>
        <p className={cn('mt-3 text-mist', feature ? 'max-w-xl' : 'hidden text-[0.95rem] md:line-clamp-2 md:block')}>{article.dek}</p>
      </div>
    </article>
  );
}
