import { PageHero } from '@/components/layout/PageHero';
import { Gallery } from '@/components/sections/portfolio/Gallery';
import { toCardData } from '@/components/sections/shared/project-card-data';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { projects } from '@/data/portfolio';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Portfolio',
  description:
    'Selected paint correction, ceramic coating, PPF and interior work on Porsche, Ferrari, Lamborghini, Mercedes-AMG, Audi RS and BMW M vehicles. Demonstration projects.',
  path: '/portfolio',
  image: 'lamborghini-smoke',
});

export default function PortfolioPage() {
  const cards = Object.fromEntries(projects.map((p) => [p.id, toCardData(p)]));
  return (
    <>
      <PageHero
        variant="type"
        eyebrow={`${projects.length} studies`}
        trail={[{ name: 'Work', path: '/portfolio' }]}
        title={['Selected', 'work, in']}
        accent="detail"
        intro={
          <>
            <p>Filter by service, marque or vehicle class. Each study explains the brief, the approach and the result.</p>
            <DemoNotice className="mt-6">
              Demonstration projects. Photography is licensed stock imagery and the narratives are illustrative — none
              documents a real client vehicle.
            </DemoNotice>
          </>
        }
      />
      <section aria-labelledby="gallery-heading" className="pt-16 pb-[var(--section-y)] md:pt-24">
        <div className="shell">
          <h2 id="gallery-heading" className="sr-only">
            Projects
          </h2>
          <Gallery projects={projects} cards={cards} />
        </div>
      </section>
    </>
  );
}
