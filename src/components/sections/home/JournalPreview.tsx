import { ArticleCard } from '@/components/sections/shared/ArticleCard';
import { toArticleCard } from '@/components/sections/shared/article-card-data';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealHeading, stagger } from '@/components/ui/RevealHeading';
import { TextLink } from '@/components/ui/Button';
import { articlesByDate } from '@/data/journal';

export function JournalPreview() {
  const [lead, ...rest] = articlesByDate().slice(0, 3);
  return (
    <section aria-labelledby="journal-title" className="section-y">
      <div className="shell">
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow index="09">Journal</Eyebrow>
            <RevealHeading
              id="journal-title"
              className="t-h2 mt-8"
              lines={[
                'Notes on',
                <>
                  <span className="accent text-champagne-soft">care</span>.
                </>,
              ]}
            />
          </div>
          <TextLink href="/journal" className="text-bone">
            All articles
          </TextLink>
        </div>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-x-[var(--col-gap)]">
          {lead && <ArticleCard article={toArticleCard(lead)} variant="feature" sizes="(min-width: 1024px) 55vw, 100vw" className="lg:col-span-7" />}
          <div className="flex flex-col gap-12 lg:col-span-4 lg:col-start-9 lg:pt-24">
            {rest.map((a, i) => (
              <div key={a.slug} data-reveal="up" style={stagger(i)}>
                <ArticleCard article={toArticleCard(a)} sizes="(min-width: 1024px) 14vw, 40vw" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
