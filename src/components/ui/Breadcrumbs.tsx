import Link from 'next/link';
import { breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from './JsonLd';

export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="t-meta text-mist">
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, ...trail])} />
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <li>
          <Link href="/" className="transition-colors hover:text-bone">
            Home
          </Link>
        </li>
        {trail.map((t, i) => (
          <li key={t.path} className="flex items-center gap-3">
            <span aria-hidden className="h-px w-4 bg-current opacity-40" />
            {i === trail.length - 1 ? (
              <span aria-current="page" className="text-bone">
                {t.name}
              </span>
            ) : (
              <Link href={t.path} className="transition-colors hover:text-bone">
                {t.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
