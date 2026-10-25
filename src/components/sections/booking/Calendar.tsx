'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { addDays, isSelectableDate, parseISODate, startOfDay, toISODate } from '@/lib/booking/validation';
import { cn } from '@/lib/cn';

interface CalendarProps {
  today: Date;
  start: string | null;
  end: string | null;
  range: boolean;
  onSelect: (iso: string) => void;
  labelledBy: string;
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthFormat = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' });
const dayFormat = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

/** Monday-first month grid; Monday = 0. */
function monthMatrix(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = Array.from({ length: offset }, () => null);
  for (let d = 1; d <= days; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

/**
 * Accessible date picker: day buttons with full-date labels, roving tabindex,
 * arrow / Home / End / PageUp / PageDown navigation. Unavailable days stay
 * focusable (aria-disabled) so keyboard users can move through them.
 */
export function Calendar({ today, start, end, range, onSelect, labelledBy }: CalendarProps) {
  const initial = start ? parseISODate(start) : addDays(startOfDay(today), 2);
  const [view, setView] = useState({ y: initial.getFullYear(), m: initial.getMonth() });
  const [focusDate, setFocusDate] = useState<Date>(initial);
  const grid = useRef<HTMLDivElement>(null);
  const shouldFocus = useRef(false);

  useEffect(() => {
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    grid.current?.querySelector<HTMLButtonElement>(`[data-date="${toISODate(focusDate)}"]`)?.focus();
  }, [focusDate, view]);

  const minMonth = { y: today.getFullYear(), m: today.getMonth() };
  const maxDate = addDays(startOfDay(today), 180);
  const canPrev = view.y > minMonth.y || (view.y === minMonth.y && view.m > minMonth.m);
  const canNext = view.y < maxDate.getFullYear() || (view.y === maxDate.getFullYear() && view.m < maxDate.getMonth());

  const moveFocus = (d: Date) => {
    shouldFocus.current = true;
    setFocusDate(d);
    if (d.getMonth() !== view.m || d.getFullYear() !== view.y) setView({ y: d.getFullYear(), m: d.getMonth() });
  };

  const shiftMonth = (delta: number) => {
    const d = new Date(view.y, view.m + delta, 1);
    setView({ y: d.getFullYear(), m: d.getMonth() });
    setFocusDate(new Date(d.getFullYear(), d.getMonth(), Math.min(focusDate.getDate(), new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate())));
  };

  const onKeyDown = (e: React.KeyboardEvent, d: Date) => {
    const keys: Record<string, () => Date> = {
      ArrowLeft: () => addDays(d, -1),
      ArrowRight: () => addDays(d, 1),
      ArrowUp: () => addDays(d, -7),
      ArrowDown: () => addDays(d, 7),
      Home: () => addDays(d, -((d.getDay() + 6) % 7)),
      End: () => addDays(d, 6 - ((d.getDay() + 6) % 7)),
      PageUp: () => new Date(d.getFullYear(), d.getMonth() - 1, d.getDate()),
      PageDown: () => new Date(d.getFullYear(), d.getMonth() + 1, d.getDate()),
    };
    const next = keys[e.key];
    if (next) {
      e.preventDefault();
      moveFocus(next());
    }
  };

  const s = start ? parseISODate(start) : null;
  const en = end ? parseISODate(end) : null;
  const cells = monthMatrix(view.y, view.m);
  const focusISO = toISODate(focusDate);
  const focusInView = cells.some((c) => c && toISODate(c) === focusISO);

  return (
    <div className="border border-line p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => shiftMonth(-1)} disabled={!canPrev} aria-label="Previous month" className="grid grid-cols-1 size-11 place-items-center border border-line transition-colors hover:border-bone disabled:opacity-30 disabled:hover:border-line">
          <ChevronLeft aria-hidden className="size-4" strokeWidth={1.5} />
        </button>
        <p className="text-lg" aria-live="polite">
          {monthFormat.format(new Date(view.y, view.m, 1))}
        </p>
        <button type="button" onClick={() => shiftMonth(1)} disabled={!canNext} aria-label="Next month" className="grid grid-cols-1 size-11 place-items-center border border-line transition-colors hover:border-bone disabled:opacity-30 disabled:hover:border-line">
          <ChevronRight aria-hidden className="size-4" strokeWidth={1.5} />
        </button>
      </div>

      <div ref={grid} role="group" aria-labelledby={labelledBy} className="mt-5">
        <div className="grid grid-cols-7 gap-1" aria-hidden>
          {WEEKDAYS.map((w) => (
            <span key={w} className="t-meta py-2 text-center text-mist">
              {w}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((d, i) => {
            if (!d) return <span key={`e${i}`} />;
            const iso = toISODate(d);
            const available = isSelectableDate(d, today);
            const isStart = s && toISODate(s) === iso;
            const isEnd = en && toISODate(en) === iso;
            const inRange = range && s && en && d > s && d < en;
            const tabbable = focusInView ? iso === focusISO : d.getDate() === 1;
            return (
              <button
                key={iso}
                type="button"
                data-date={iso}
                tabIndex={tabbable ? 0 : -1}
                aria-label={`${dayFormat.format(d)}${available ? '' : ', unavailable'}`}
                aria-pressed={Boolean(isStart || isEnd)}
                aria-disabled={!available}
                onKeyDown={(e) => onKeyDown(e, d)}
                onFocus={() => setFocusDate(d)}
                onClick={() => available && onSelect(iso)}
                className={cn(
                  'tabular relative grid aspect-square min-h-10 place-items-center text-[0.95rem] transition-colors',
                  !available && 'cursor-not-allowed text-mist/35 line-through decoration-mist/30',
                  available && !isStart && !isEnd && 'hover:bg-ink-700',
                  inRange && 'bg-ink-700 text-bone',
                  (isStart || isEnd) && 'bg-bone text-ink-900',
                )}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>
      </div>
      <p className="t-meta mt-5 text-mist">Sundays closed · earliest booking in two days · up to six months ahead</p>
    </div>
  );
}
