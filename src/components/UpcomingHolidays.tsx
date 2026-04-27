import { useMemo } from 'react';
import { getSwedishHolidays } from '@/lib/swedishHolidays';
import { CalendarDays } from 'lucide-react';

interface UpcomingHolidayEntry {
  date: Date;
  name: string;
  dateStr: string;
  dayName: string;
  daysUntil: number;
}

const DAY_NAMES = ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'];

export function UpcomingHolidays() {
  const upcoming = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const sixWeeksLater = new Date(now);
    sixWeeksLater.setDate(sixWeeksLater.getDate() + 42);

    const year = now.getFullYear();
    const holidays = getSwedishHolidays(year);
    const nextYearHolidays = year !== sixWeeksLater.getFullYear() ? getSwedishHolidays(year + 1) : null;

    const entries: UpcomingHolidayEntry[] = [];

    const processHolidays = (map: Map<string, { name: string; closed: boolean }>, y: number) => {
      map.forEach((holiday, key) => {
        if (!holiday.closed) return;
        const [month, day] = key.split('-').map(Number);
        const date = new Date(y, month - 1, day);
        if (date > now && date <= sixWeeksLater) {
          const dayName = DAY_NAMES[date.getDay()];
          const dateStr = date.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' });
          const daysUntil = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          entries.push({ date, name: holiday.name, dateStr, dayName, daysUntil });
        }
      });
    };

    processHolidays(holidays, year);
    if (nextYearHolidays) processHolidays(nextYearHolidays, year + 1);

    entries.sort((a, b) => a.date.getTime() - b.date.getTime());
    return entries;
  }, []);

  if (upcoming.length === 0) return null;

  return (
    <aside className="w-full" aria-label="Kommande helgdagar">
      <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <CalendarDays className="h-5 w-5 text-closed" />
          <h3 className="font-bold text-foreground text-sm uppercase tracking-wide">
            Kommande helgdagar
          </h3>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Systembolaget är <strong>stängt</strong> dessa dagar – planera i tid!
        </p>

        {/* Mobile: horizontal scroll */}
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory sm:hidden -mx-1 px-1">
          {upcoming.map((h) => (
            <div
              key={h.name + h.dateStr}
              className="snap-start shrink-0 w-36 bg-accent/50 border border-border rounded-xl p-3 flex flex-col items-center text-center"
            >
              <span className="text-2xl font-black text-closed tabular-nums">{h.daysUntil}</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
                {h.daysUntil === 1 ? 'dag kvar' : 'dagar kvar'}
              </span>
              <span className="text-sm font-semibold text-foreground leading-tight">{h.name}</span>
              <span className="text-xs text-muted-foreground capitalize mt-0.5">{h.dayName} {h.dateStr}</span>
            </div>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {upcoming.map((h) => (
            <div
              key={h.name + h.dateStr}
              className="bg-accent/50 border border-border rounded-xl p-4 flex items-center gap-4"
            >
              <div className="flex flex-col items-center min-w-[3rem]">
                <span className="text-2xl font-black text-closed tabular-nums leading-none">{h.daysUntil}</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {h.daysUntil === 1 ? 'dag' : 'dagar'}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground leading-tight truncate">{h.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{h.dayName} {h.dateStr}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
