import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { FinalCta } from '@/components/sections/home/FinalCta';
import { ProjectCard } from '@/components/sections/shared/ProjectCard';
import { toCardData } from '@/components/sections/shared/project-card-data';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Picture } from '@/components/ui/Picture';
import { stagger } from '@/components/ui/RevealHeading';
import { getProjectBySlug, projectHref, projectName, projects, segmentLabel, workTypeLabel } from '@/data/portfolio';
import { relatedProjects } from '@/lib/portfolio';
import { buildMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProjectBySlug((await params).slug);
  if (!p) return {};
  return buildMetadata({
    title: `${projectName(p)} — ${p.workTypes.map(workTypeLabel).join(' & ')}`,
    description: `${p.summary} Demonstration case study.`,
    path: projectHref(p),
    image: p.image,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const project = getProjectBySlug((await params).slug);
  if (!project) notFound();

  const position = projects.indexOf(project);
  const next = projects[(position + 1) % projects.length]!;
  const related = relatedProjects(projects, project);

  return (
    <>
      <PageHero
        variant="image"
        image={project.image}
        eyebrow={`Study ${String(position + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`}
        trail={[
          { name: 'Work', path: '/portfolio' },
          { name: projectName(project), path: projectHref(project) },
        ]}
        title={[projectName(project)]}
        intro={<p className="font-serif text-[1.6em] leading-tight italic">{project.title}</p>}
      >
        <dl className="hero-fade mt-12 grid grid-cols-2 gap-6 border-t border-line pt-6 md:grid-cols-4" style={{ '--d': 1100 } as React.CSSProperties}>
          {[
            ['Vehicle', projectName(project)],
            ['Class', segmentLabel(project.segment)],
            ['Services', project.workTypes.map(workTypeLabel).join(', ')],
            ['Studio time', project.duration],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="t-eyebrow text-mist">{k}</dt>
              <dd className="mt-2">{v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <div className="border-b border-line bg-ink-850">
        <div className="shell py-4">
          <DemoNotice>Demonstration case study. The photograph is licensed stock imagery; the narrative is illustrative.</DemoNotice>
        </div>
      </div>

      <section aria-label="Case study" className="section-y">
        <div className="shell grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-x-[var(--col-gap)]">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <Eyebrow index="01">The brief</Eyebrow>
              <p className="t-lead mt-6 text-bone/90" data-reveal="up">
                {project.brief}
              </p>
              <dl className="mt-12 border-t border-line">
                {project.specs.map((s) => (
                  <div key={s.label} className="flex justify-between gap-6 border-b border-line py-4">
                    <dt className="t-eyebrow text-mist">{s.label}</dt>
                    <dd className="text-right">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Eyebrow index="02">The approach</Eyebrow>
            <ol className="mt-8 border-t border-line">
              {project.approach.map((a, i) => (
                <li key={a} className="flex gap-6 border-b border-line py-7" data-reveal="up" style={stagger(i)}>
                  <span className="t-meta mt-1.5 text-champagne">{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-lg leading-relaxed text-bone/90">{a}</p>
                </li>
              ))}
            </ol>

            <div className="mt-16 grid grid-cols-2 gap-[var(--col-gap)]">
              {project.references.map((r, i) => (
                <figure key={r} className={i === 1 ? 'mt-16' : undefined}>
                  <div className="relative aspect-[4/5] overflow-hidden" data-reveal="clip">
                    <Picture id={r} sizes="(min-width: 1024px) 28vw, 50vw" />
                  </div>
                  <figcaption className="t-meta mt-3 text-mist">Representative process imagery — not this vehicle</figcaption>
                </figure>
              ))}
            </div>

            <div className="mt-20">
              <Eyebrow index="03">The result</Eyebrow>
              <p className="mt-8 font-serif text-[clamp(1.8rem,1.2rem+2vw,3rem)] leading-[1.15] italic" data-reveal="up">
                {project.result}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Next study" className="border-t border-line">
        <Link href={projectHref(next)} className="group relative block overflow-hidden bg-ink-950">
          <div className="absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-60">
            <Picture id={next.image} sizes="100vw" className="transition-transform duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-[1.04]" alt="" />
          </div>
          <div className="shell relative flex min-h-[50svh] flex-col justify-end py-16">
            <p className="t-eyebrow text-mist">Next study</p>
            <p className="t-h1 mt-6 flex items-end justify-between gap-8">
              <span>{projectName(next)}</span>
              <ArrowRight aria-hidden className="mb-2 size-10 shrink-0 transition-transform duration-700 group-hover:translate-x-2 md:size-14" strokeWidth={1} />
            </p>
          </div>
        </Link>
      </section>

      <section aria-labelledby="related-work" className="section-y">
        <div className="shell">
          <h2 id="related-work" className="t-eyebrow text-mist">
            Related studies
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-[var(--col-gap)]">
            {related.map((p, i) => (
              <ProjectCard key={p.id} project={toCardData(p)} index={`W—${String(projects.indexOf(p) + 1).padStart(2, '0')}`} aspect={i === 1 ? 'aspect-[4/5]' : 'aspect-[4/3]'} sizes="(min-width: 768px) 30vw, 100vw" />
            ))}
          </div>
        </div>
      </section>

      <FinalCta title={['Commission', 'your']} accent="study" />
    </>
  );
}
