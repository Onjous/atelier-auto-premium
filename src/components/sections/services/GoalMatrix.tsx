import { serviceGoals, services } from '@/data/services';

const Mark = ({ value }: { value: 'primary' | 'partial' | null }) => {
  if (value === 'primary')
    return (
      <>
        <span aria-hidden className="inline-block size-3 rounded-full bg-ink-900" />
        <span className="sr-only">Primary benefit</span>
      </>
    );
  if (value === 'partial')
    return (
      <>
        <span aria-hidden className="inline-block size-3 rounded-full border border-ink-900 bg-[linear-gradient(90deg,var(--color-ink-900)_50%,transparent_50%)]" />
        <span className="sr-only">Partial benefit</span>
      </>
    );
  return (
    <>
      <span aria-hidden className="inline-block h-px w-3 bg-ink-900/30" />
      <span className="sr-only">Not addressed</span>
    </>
  );
};

export function GoalMatrix() {
  return (
    <div className="mt-14 -mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)]" data-reveal="up" role="region" aria-label="Service comparison table" tabIndex={0}>
      <table className="w-full min-w-[720px] border-collapse text-left">
        <caption className="sr-only">Which outcomes each service addresses</caption>
        <thead>
          <tr className="border-b border-line-ink">
            <th scope="col" className="t-eyebrow w-[28%] pb-5 font-medium text-graphite">
              Outcome
            </th>
            {services.map((s) => (
              <th key={s.id} scope="col" className="t-eyebrow pb-5 text-center font-medium text-graphite">
                {s.shortName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {serviceGoals.map((g) => (
            <tr key={g.goal} className="border-b border-line-ink">
              <th scope="row" className="py-5 pr-6 text-[0.98rem] font-normal">
                {g.goal}
              </th>
              {services.map((s) => (
                <td key={s.id} className="py-5 text-center">
                  <Mark value={g.values[s.id]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="t-meta mt-5 flex flex-wrap gap-6 text-graphite">
        <span className="flex items-center gap-2">
          <span aria-hidden className="flex">
            <Mark value="primary" />
          </span>
          Primary benefit
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden className="flex">
            <Mark value="partial" />
          </span>
          Partial benefit
        </span>
      </p>
    </div>
  );
}
