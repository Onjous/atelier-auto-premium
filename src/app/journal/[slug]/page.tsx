import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { ArticleBody } from '@/components/sections/journal/ArticleBody';
import { ReadingProgress } from '@/components/sections/journal/ReadingProgress';
import { ArticleCard } from '@/components/sections/shared/ArticleCard';
import { toArticleCard } from '@/components/sections/shared/article-card-data';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';
import { Picture } from '@/components/ui/Picture';
import { articleHref, articles, categoryLabel, getArticleBySlug, readingMinutes } from '@/data/journal';
import { bookingHref } from '@/data/navigation';
import { serviceById, serviceHref } from '@/data/services';
import { formatDate } from '@/lib/format';
import { relatedArticles, tableOfContents } from '@/lib/journal';
import { articleJsonLd, buildMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArticleBySlug((await params).slug);
  if (!a) return {};
  return buildMetadata({ title: a.title, description: a.dek, path: articleHref(a), image: a.heroImage, type: 'article', publishedTime: a.publishedAt });
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticleBySlug((await params).slug);
  if (!article) notFound();
  const toc = tableOfContents(article);
  const related = relatedArticles(articles, article);

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />
      <ReadingProgress targetId="article-body" />

      <header className="pt-[calc(var(--header-h)+1.5rem)]">
        <div className="shell">
          <div className="hero-fade" style={{ '--d': 200 } as React.CSSProperties}>
            <Breadcrumbs
              trail={[
                { name: 'Journal', path: '/journal' },
                { name: article.title, path: articleHref(article) },
              ]}
            />
          </div>
          <div className="mx-auto mt-16 max-w-5xl text-center md:mt-24">
            <p className="hero-fade t-eyebrow text-champagne" style={{ '--d': 300 } as React.CSSProperties}>
              {categoryLabel(article.category)}
            </p>
            <h1 className="hero-line mt-8 overflow-hidden text-[clamp(2.2rem,1.2rem+4vw,5.5rem)] leading-[1] font-light tracking-[-0.04em]">
              <span>{article.title}</span>
            </h1>
            <p className="hero-fade t-lead mx-auto mt-8 max-w-2xl text-bone/80" style={{ '--d': 800 } as React.CSSProperties}>
              {article.dek}
            </p>
            <p className="hero-fade t-meta mt-8 text-mist" style={{ '--d': 1000 } as React.CSSProperties}>
              {article.author} · <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time> · {readingMinutes(article)} min read
            </p>
          </div>
        </div>
        <div className="hero-fade shell mt-16 md:mt-20" style={{ '--d': 600 } as React.CSSProperties}>
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-[21/9]">
            <div className="hero-image absolute inset-0">
              <Picture id={article.heroImage} sizes="100vw" priority quality={80} />
            </div>
          </div>
        </div>
      </header>

      <div id="article-body" className="section-y">
        <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-[var(--col-gap)]">
          <aside className="lg:col-span-3">
            <nav aria-label="In this article" className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <p className="t-eyebrow text-mist">In this article</p>
              <ol className="mt-5 border-t border-line">
                {toc.map((t, i) => (
                  <li key={t.id} className="border-b border-line">
                    <a href={`#${t.id}`} className="flex gap-3 py-3 text-[0.92rem] text-bone/80 transition-colors hover:text-champagne">
                      <span className="t-meta mt-0.5 text-champagne">{String(i + 1).padStart(2, '0')}</span>
                      {t.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
          <article className="lg:col-span-7 lg:col-start-5">
            <ArticleBody blocks={article.blocks} />

            <aside className="mt-20 border-t border-line pt-10" aria-labelledby="article-services">
              <h2 id="article-services" className="t-eyebrow text-mist">
                Related services
              </h2>
              <ul className="mt-6 border-t border-line">
                {article.relatedServices.map(serviceById).map((s) => (
                  <li key={s.id} className="border-b border-line">
                    <Link href={serviceHref(s)} className="group flex items-center justify-between gap-6 py-5">
                      <span>
                        <span className="t-meta mr-4 text-champagne">{s.index}</span>
                        <span className="text-xl font-light">{s.name}</span>
                      </span>
                      <ArrowUpRight aria-hidden className="size-5 text-mist transition-colors group-hover:text-champagne" strokeWidth={1.25} />
                    </Link>
                  </li>
                ))}
              </ul>
              <ButtonLink href={bookingHref} className="mt-10">
                Book a consultation
              </ButtonLink>
            </aside>
          </article>
        </div>
      </div>

      <section aria-labelledby="related-articles" className="section-y border-t border-line bg-ink-850">
        <div className="shell">
          <h2 id="related-articles" className="t-eyebrow text-mist">
            Continue reading
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-[var(--col-gap)]">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={toArticleCard(a)} variant="feature" sizes="(min-width: 768px) 30vw, 100vw" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
