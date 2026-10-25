import Image from 'next/image';
import type { MediaAsset } from '@/data/media';
import { cn } from '@/lib/cn';

interface ImgProps {
  asset: MediaAsset;
  sizes: string;
  /** Fill the positioned parent (default) or render at intrinsic ratio. */
  fill?: boolean;
  /** Above-the-fold LCP candidate: load eagerly at high fetch priority. */
  priority?: boolean;
  className?: string;
  alt?: string;
  quality?: 70 | 80;
}

/** Presentation-only image: safe to use inside client components (no manifest import). */
export function Img({ asset, sizes, fill = true, priority, className, alt, quality = 70 }: ImgProps) {
  const text = alt ?? asset.alt;
  const common = {
    src: asset.src,
    sizes,
    quality,
    loading: priority ? ('eager' as const) : ('lazy' as const),
    fetchPriority: priority ? ('high' as const) : undefined,
    placeholder: 'blur' as const,
    blurDataURL: asset.blurDataURL,
    style: { objectPosition: asset.position },
  };
  return fill ? (
    <Image {...common} alt={text} fill className={cn('object-cover', className)} />
  ) : (
    <Image {...common} alt={text} width={asset.width} height={asset.height} className={cn('h-auto w-full', className)} />
  );
}
