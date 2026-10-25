import { categoryLabel } from '@/data/journal';
import type { Article, ArticleCategory } from '@/types/content';
import { matchesQuery } from './search';

export function filterArticles(list: Article[], category: ArticleCategory | null, query: string): Article[] {
  return list.filter(
    (a) =>
      (!category || a.category === category) &&
      matchesQuery(query, [
        a.title,
        a.dek,
        categoryLabel(a.category),
        ...a.blocks.flatMap((b) => (b.type === 'h2' || b.type === 'h3' || b.type === 'p' ? [b.text] : [])),
      ]),
  );
}

export function relatedArticles(list: Article[], article: Article, limit = 3): Article[] {
  return list
    .filter((a) => a.slug !== article.slug)
    .map((a) => ({
      a,
      score:
        (a.category === article.category ? 3 : 0) +
        a.relatedServices.filter((s) => article.relatedServices.includes(s)).length,
    }))
    .sort((x, y) => y.score - x.score || y.a.publishedAt.localeCompare(x.a.publishedAt))
    .slice(0, limit)
    .map(({ a }) => a);
}

export function tableOfContents(article: Article) {
  return article.blocks.flatMap((b) => (b.type === 'h2' ? [{ id: b.id, text: b.text }] : []));
}
