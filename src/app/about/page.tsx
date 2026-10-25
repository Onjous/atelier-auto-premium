import { PageHero } from '@/components/layout/PageHero';
import { Parallax } from '@/components/motion/Parallax';
import { FinalCta } from '@/components/sections/home/FinalCta';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Picture } from '@/components/ui/Picture';
import { RevealHeading, stagger } from '@/components/ui/RevealHeading';
import { site } from '@/data/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'The Studio',
  description: `How ${site.shortName} works: one vehicle per specialist, measured decisions, honest limits and written aftercare.`,
  path: '/about',
  image: 'garage-workshop',
});

const standards = [
  { title: 'One vehicle, one specialist', text: 'The person who inspects your car is the person who works on it. Accountability is never diluted across a shift.' },
  { title: 'Measured, then documented', text: 'Paint readings and photographs are taken before work begins and kept on file — a record that travels with the car.' },
  { title: 'Limits stated up front', text: 'If a scratch will remain or a treatment will not suit how you use the car, you hear it at consultation, not at handover.' },
  { title: 'Aftercare in writing', text: 'Every handover includes a care guide written for your vehicle and your treatment, not a generic leaflet.' },
];

const disciplines = [
  { role: 'Paint specialists', text: 'Inspection, measurement and machine correction. The people who decide how much clear coat can safely be spent.' },
  { role: 'Film installers', text: 'Pattern adjustment and hand installation of protection film, with edge work as the measure of skill.' },
  { role: 'Interior specialists', text: 'Leather, Alcantara and trim care, with material identification before any product touches a surface.' },
  { role: 'Client advisors', text: 'Your single point of contact — from first conversation to scheduling, updates and handover.' },
];

const journey = [
  { stage: 'Before', items: ['Consultation and inspection under studio lights', 'Written scope and estimate', 'Agreed schedule'] },
  { stage: 'During', items: ['Updates at each stage', 'Your car indoors throughout', 'Changes discussed before they happen'] },
  { stage: 'After', items: ['Walk-round handover', 'Written care guide', 'Follow-up after the first weeks'] },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        variant="image"
        image="garage-workshop"
        eyebrow="The studio"
        trail={[{ name: 'Studio', path: '/about' }]}
        title={['Precision,', 'presence,']}
        accent="perfection"
        intro="A studio built around a single question: what does this finish actually need — and what does it not?"
      />

      <div className="border-b border-line bg-ink-850">
        <div className="shell py-4">
          <DemoNotice>
            {site.shortName} is a demonstration brand. This page describes the standards of a studio as designed for this
            website, not an existing business.
          </DemoNotice>
        </div>
      </div>

      <section aria-labelledby="story-title" className="section-y">
        <div className="shell grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-x-[var(--col-gap)]">
          <div className="lg:col-span-6">
            <Eyebrow index="01">Approach</Eyebrow>
            <RevealHeading id="story-title" className="t-h2 mt-8" lines={['Craft is a', <>series of <span className="accent text-champagne-soft">decisions</span>.</>]} />
          </div>
          <div className="prose-atelier lg:col-span-5 lg:col-start-8 lg:pt-20">
            <p data-reveal="up">
              Most detailing is sold as a product: a coating, a film, a package. We think of it as a sequence of
              decisions about a specific car — its paint, its history, how it is driven and where it sleeps.
            </p>
            <p data-reveal="up">
              That is why the studio is deliberately small. Fewer cars, longer bookings, and the same specialist from
              inspection to handover. It is slower. It is also the only way we know to make quality repeatable.
            </p>
          </div>
        </div>

        <div className="shell mt-24 grid grid-cols-12 gap-x-[var(--col-gap)] gap-y-10 md:mt-36">
          <Parallax className="col-span-12 aspect-[16/10] md:col-span-8 md:aspect-[16/9]" amount={0.08}>
            <Picture id="garage-porsche" sizes="(min-width: 768px) 66vw, 100vw" />
          </Parallax>
          <div className="col-span-8 col-start-5 md:col-span-4 md:col-start-9 md:mt-48">
            <div className="relative aspect-[4/5] overflow-hidden" data-reveal="clip">
              <Picture id="garage-portrait" sizes="(min-width: 768px) 30vw, 66vw" />
            </div>
            <p className="t-meta mt-4 text-mist">
              <span className="text-champagne">Fig. 02</span> Controlled light, controlled air, one car per bay.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="standards-title" className="section-y border-t border-line bg-ink-850">
        <div className="shell">
          <Eyebrow index="02">Standards</Eyebrow>
          <h2 id="standards-title" className="sr-only">
            Studio standards
          </h2>
          <ol className="mt-12 border-t border-line">
            {standards.map((s, i) => (
              <li key={s.title} className="grid grid-cols-1 gap-4 border-b border-line py-10 md:grid-cols-12 md:gap-x-[var(--col-gap)] md:py-14" data-reveal="up" style={stagger(i % 2)}>
                <span className="t-meta text-champagne md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-[clamp(1.6rem,1.1rem+2vw,3rem)] leading-[1.05] font-light tracking-[-0.03em] uppercase md:col-span-6">{s.title}</h3>
                <p className="text-mist md:col-span-4 md:col-start-9 md:pt-2">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="disciplines-title" className="section-y">
        <div className="shell grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-x-[var(--col-gap)]">
          <div className="lg:col-span-4">
            <Eyebrow index="03">Disciplines</Eyebrow>
            <RevealHeading id="disciplines-title" className="t-h2 mt-8" lines={['The', <><span className="accent text-champagne-soft">people</span>.</>]} />
            <p className="mt-8 max-w-sm text-mist" data-reveal="up">
              Team profiles will appear here once the studio’s specialists are confirmed. Until then: the roles, and
              what each is responsible for.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {disciplines.map((d, i) => (
              <div key={d.role} className="bg-ink-900 p-8" data-reveal="up" style={stagger(i)}>
                <p className="t-meta text-champagne">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="t-h3 mt-5">{d.role}</h3>
                <p className="mt-3 text-mist">{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="journey-title" className="on-paper section-y bg-paper text-ink-900">
        <div className="shell">
          <p className="t-eyebrow flex items-center gap-4 text-graphite">
            <span>04</span>
            <span aria-hidden className="h-px w-10 bg-current opacity-40" />
            Your experience
          </p>
          <RevealHeading id="journey-title" className="t-h2 mt-8" lines={['Before, during,', <><span className="accent">after</span>.</>]} />
          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-[var(--col-gap)]">
            {journey.map((j, i) => (
              <div key={j.stage} className="border-t border-ink-900 pt-6" data-reveal="up" style={stagger(i)}>
                <h3 className="font-serif text-4xl italic">{j.stage}</h3>
                <ul className="mt-6 space-y-3 text-graphite">
                  {j.items.map((x) => (
                    <li key={x} className="flex gap-3">
                      <span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-current" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta title={['Visit the', 'studio,']} accent="by appointment" />
    </>
  );
}
