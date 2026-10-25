import { PageHero } from '@/components/layout/PageHero';
import { JournalBrowser, type BrowsableArticle } from '@/components/sections/journal/JournalBrowser';
import Link from 'next/link';
import { Picture } from '@/components/ui/Picture';
import { toArticleCard } from '@/components/sections/shared/article-card-data';
import { articleCategories, articleHref, articles, articlesByDate, categoryLabel, readingMinutes } from '@/data/journal';
import { formatDate } from '@/lib/format';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Journal',
  description: 'Practical, technically grounded writing on paint protection film, ceramic coatings, paint correction, leather care and seasonal maintenance.',
  path: '/journal',
  image: 'hood-white',
});

export default function JournalPage() {
  const featured = articles.find((a) => a.featured) ?? articlesByDate()[0]!;
  const browsable: BrowsableArticle[] = articlesByDate().map((a) => ({
    ...toArticleCard(a),
    categoryId: a.category,
    searchText: [a.title, a.dek, categoryLabel(a.category), ...a.blocks.flatMap((b) => ('text' in b ? [b.text] : 'items' in b ? b.items : []))].join(' '),
  }));

  return (
    <>
      <PageHero
        variant="type"
        eyebrow="Journal"
        trail={[{ name: 'Journal', path: '/journal' }]}
        title={['Notes on care,', 'written']}
        accent="plainly"
        intro="Technical writing for owners who want to understand what is being done to their car — and why."
      />

      <section aria-labelledby="featured-title" className="pt-16 md:pt-24">
        <div className="shell">
          <article className="group relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-[var(--col-gap)]">
            <div className="light-sweep relative aspect-[16/11] overflow-hidden lg:col-span-7" data-reveal="clip">
              <Picture id={featured.heroImage} sizes="(min-width: 1024px) 56vw, 100vw" className="transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-[1.04]" />
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="t-eyebrow text-champagne">Featured · {categoryLabel(featured.category)}</p>
              <h2 id="featured-title" className="mt-6 text-[clamp(1.9rem,1.3rem+2vw,3.4rem)] leading-[1.04] font-light tracking-[-0.035em]">
                <Link href={articleHref(featured)} className="after:absolute after:inset-0 transition-colors group-hover:text-champagne-soft">
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-6 text-mist">{featured.dek}</p>
              <p className="t-meta mt-8 text-mist">
                <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time> · {readingMinutes(featured)} min read
              </p>
            </div>
          </article>
        </div>
      </section>

      <section aria-label="All articles" className="section-y">
        <div className="shell">
          <JournalBrowser articles={browsable} categories={articleCategories} />
        </div>
      </section>
    </>
  );
}
