import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Img } from '@/components/ui/Img';
import type { MediaAsset } from '@/data/media';
import { cn } from '@/lib/cn';

export interface ProjectCardData {
  id: string;
  href: string;
  name: string;
  title: string;
  services: string;
  image: MediaAsset;
}

interface ProjectCardProps {
  project: ProjectCardData;
  index: string;
  aspect: string;
  sizes: string;
  className?: string;
  reveal?: boolean;
  /** Optional control rendered over the image (e.g. lightbox trigger). */
  overlay?: React.ReactNode;
}

export function ProjectCard({ project, index, aspect, sizes, className, reveal = true, overlay }: ProjectCardProps) {
  return (
    <article className={cn('group relative', className)}>
      <div className="relative">
        <Link href={project.href} className="block" aria-label={`${project.name} — ${project.title}. View case study`}>
          <div className={cn('light-sweep relative overflow-hidden bg-ink-800', aspect)} data-reveal={reveal ? 'clip' : undefined}>
            <Img
              asset={project.image}
              sizes={sizes}
              className="transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-[1.04]"
            />
          </div>
        </Link>
        {overlay}
      </div>
      <div className="mt-5 flex items-start gap-5 border-t border-line pt-4">
        <span className="t-meta text-champagne">{index}</span>
        <div className="flex-1">
          <h3 className="text-lg leading-tight font-normal tracking-[-0.01em]">
            <Link href={project.href} className="transition-colors hover:text-champagne-soft">
              {project.name}
            </Link>
          </h3>
          <p className="t-meta mt-1.5 text-mist">
            <span className="font-serif text-[1.05rem] tracking-normal text-bone/80 italic">{project.title}</span> · {project.services}
          </p>
        </div>
        <ArrowUpRight aria-hidden strokeWidth={1.25} className="size-5 text-mist transition-[transform,color] duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-champagne" />
      </div>
    </article>
  );
}
