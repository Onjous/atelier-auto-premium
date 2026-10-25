import { ProjectCard } from '@/components/sections/shared/ProjectCard';
import { toCardData } from '@/components/sections/shared/project-card-data';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealHeading } from '@/components/ui/RevealHeading';
import { TextLink } from '@/components/ui/Button';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { projects } from '@/data/portfolio';

/** Asymmetric editorial layout: each slot has its own span, ratio and offset. */
const layout = [
  { slot: 'col-span-12 md:col-span-7', aspect: 'aspect-[5/4]', sizes: '(min-width: 768px) 56vw, 100vw' },
  { slot: 'col-span-10 col-start-3 md:col-span-4 md:col-start-9 md:mt-40', aspect: 'aspect-[4/5]', sizes: '(min-width: 768px) 32vw, 80vw' },
  { slot: 'col-span-10 md:col-span-4 md:col-start-2 md:-mt-12', aspect: 'aspect-[4/5]', sizes: '(min-width: 768px) 32vw, 80vw' },
  { slot: 'col-span-12 md:col-span-6 md:col-start-7 md:mt-32', aspect: 'aspect-[16/11]', sizes: '(min-width: 768px) 48vw, 100vw' },
  { slot: 'col-span-12', aspect: 'aspect-[16/10] md:aspect-[21/9]', sizes: '100vw' },
];

export function SelectedWork() {
  const featured = projects.filter((p) => p.featured).slice(0, layout.length);
  return (
    <section aria-labelledby="work-title" className="section-y border-t border-line bg-ink-850">
      <div className="shell">
        <div className="mb-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow index="05">Selected work</Eyebrow>
            <RevealHeading
              id="work-title"
              className="t-h2 mt-8"
              lines={[
                'Recent',
                <>
                  <span className="accent text-champagne-soft">studies</span>.
                </>,
              ]}
            />
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <TextLink href="/portfolio" className="text-bone">
              All work ({projects.length})
            </TextLink>
            <DemoNotice>Demonstration projects illustrated with licensed photography.</DemoNotice>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-[var(--col-gap)] gap-y-16 md:gap-y-24">
          {featured.map((p, i) => {
            const l = layout[i]!;
            return (
              <ProjectCard
                key={p.id}
                project={toCardData(p)}
                index={`W—${String(i + 1).padStart(2, '0')}`}
                aspect={l.aspect}
                sizes={l.sizes}
                className={l.slot}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
