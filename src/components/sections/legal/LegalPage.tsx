import { PageHero } from '@/components/layout/PageHero';
import { DemoNotice } from '@/components/ui/DemoNotice';

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
}

export function LegalPage({ title, accent, path, updated, intro, sections }: { title: string[]; accent: string; path: string; updated: string; intro: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero variant="type" eyebrow={`Last updated ${updated}`} trail={[{ name: `${title.join(' ')} ${accent}`, path }]} title={title} accent={accent} intro={intro} />
      <section className="section-y">
        <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-[var(--col-gap)]">
          <nav aria-label="Sections" className="lg:col-span-3">
            <ol className="border-t border-line lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              {sections.map((s, i) => (
                <li key={s.id} className="border-b border-line">
                  <a href={`#${s.id}`} className="flex gap-3 py-3 text-[0.92rem] text-bone/80 transition-colors hover:text-champagne">
                    <span className="t-meta mt-0.5 text-champagne">{String(i + 1).padStart(2, '0')}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="lg:col-span-7 lg:col-start-5">
            <div className="mb-12 border border-line bg-ink-850 p-6">
              <DemoNotice>
                Template text for a demonstration website. It has not been reviewed by a lawyer and must be replaced with
                counsel-approved terms, including the studio’s registered business details, before launch.
              </DemoNotice>
            </div>
            <div className="prose-atelier">
              {sections.map((s) => (
                <section key={s.id} aria-labelledby={s.id}>
                  <h2 id={s.id}>{s.title}</h2>
                  {s.paragraphs.map((p) => (
                    <p key={p.slice(0, 32)}>{p}</p>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
