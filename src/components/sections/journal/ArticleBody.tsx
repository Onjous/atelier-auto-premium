import { Picture } from '@/components/ui/Picture';
import type { ArticleBlock } from '@/types/content';

export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  const leadIndex = blocks.findIndex((b) => b.type === 'p');
  return (
    <div className="prose-atelier">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'p': {
            return (
              <p key={i} className={i === leadIndex ? 'text-[1.15em] text-bone first-letter:float-left first-letter:mt-1 first-letter:mr-3 first-letter:font-serif first-letter:text-[4.2em] first-letter:leading-[0.8] first-letter:text-champagne first-letter:italic' : undefined}>
                {b.text}
              </p>
            );
          }
          case 'h2':
            return (
              <h2 key={i} id={b.id}>
                {b.text}
              </h2>
            );
          case 'h3':
            return <h3 key={i}>{b.text}</h3>;
          case 'ul':
            return (
              <ul key={i}>
                {b.items.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i}>
                {b.items.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ol>
            );
          case 'quote':
            return (
              <blockquote key={i} className="!my-14 border-l border-champagne pl-6 font-serif text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] leading-[1.2] text-bone italic md:-ml-6">
                {b.text}
              </blockquote>
            );
          case 'callout':
            return (
              <aside key={i} className="!my-12 border border-line bg-ink-800 p-6 md:p-8">
                <p className="t-eyebrow text-champagne">{b.title}</p>
                <p className="mt-3 text-bone/90">{b.text}</p>
              </aside>
            );
          case 'figure':
            return (
              <figure key={i} className="!my-14 md:-mr-[12%]">
                <div className="relative aspect-[16/10] overflow-hidden" data-reveal="clip">
                  <Picture id={b.image} sizes="(min-width: 1024px) 50vw, 100vw" />
                </div>
                <figcaption className="t-meta mt-3 text-mist">{b.caption}</figcaption>
              </figure>
            );
          case 'table':
            return (
              <div key={i} className="!my-12 overflow-x-auto" role="region" aria-label={b.caption} tabIndex={0}>
                <table className="w-full min-w-[480px] border-collapse text-left text-[0.92rem]">
                  <caption className="t-meta mb-4 text-left text-mist">{b.caption}</caption>
                  <thead>
                    <tr className="border-b border-line-strong">
                      {b.head.map((h, j) => (
                        <th key={j} scope="col" className="pr-4 pb-3 font-medium text-bone">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r) => (
                      <tr key={r.join('|')} className="border-b border-line">
                        {r.map((c, j) =>
                          j === 0 ? (
                            <th key={j} scope="row" className="py-3 pr-4 font-normal text-mist">
                              {c}
                            </th>
                          ) : (
                            <td key={j} className="py-3 pr-4">
                              {c}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
