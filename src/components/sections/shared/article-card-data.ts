import { articleHref, categoryLabel, readingMinutes } from '@/data/journal';
import { getMedia } from '@/data/media';
import { formatDate } from '@/lib/format';
import type { Article } from '@/types/content';
import type { ArticleCardData } from './ArticleCard';

export const toArticleCard = (a: Article): ArticleCardData => ({
  slug: a.slug,
  href: articleHref(a),
  title: a.title,
  dek: a.dek,
  category: categoryLabel(a.category),
  date: a.publishedAt,
  dateLabel: formatDate(a.publishedAt),
  minutes: readingMinutes(a),
  image: getMedia(a.heroImage),
});
