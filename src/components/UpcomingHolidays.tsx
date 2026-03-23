import { useMemo } from 'react';
import { getSwedishHolidays } from '@/lib/swedishHolidays';
import { CalendarDays } from 'lucide-react';

interface UpcomingHolidayEntry {
  date: Date;
  name: string;
  dateStr: string;
  dayName: string;
}

const DAY_NAMES = ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'];

export function UpcomingHolidays() {
  const upcoming = useMemo(() => {
    const now = new Date();
    const twoWeeksLater = new Date(now);
    twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);

    const year = now.getFullYear();
    const holidays = getSwedishHolidays(year);
    const nextYearHolidays = year !== twoWeeksLater.getFullYear() ? getSwedishHolidays(year + 1) : null;

    const entries: UpcomingHolidayEntry[] = [];

    const processHolidays = (map: Map<string, { name: string; closed: boolean }>, y: number) => {
      map.forEach((holiday, key) => {
        if (!holiday.closed) return;
        const [month, day] = key.split('-').map(Number);
        const date = new Date(y, month - 1, day);
        // Must be in the future and within 2 weeks
        if (date > now && date <= twoWeeksLater) {
          const dayName = DAY_NAMES[date.getDay()];
          const dateStr = date.toLocaleDateString('sv-SE', { day: 'numeric', month: 'long' });
          entries.push({ date, name: holiday.name, dateStr, dayName });
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
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <CalendarDays className="h-5 w-5 text-closed" />
          <h3 className="font-bold text-foreground text-sm uppercase tracking-wide">
            Kommande helgdagar
          </h3>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Systembolaget är <strong>stängt</strong> dessa dagar:
        </p>
        <ul className="space-y-2">
          {upcoming.map((h) => (
            <li key={h.name + h.dateStr} className="flex items-center justify-between gap-2 bg-accent/50 rounded-lg px-3 py-2">
              <div>
                <p className="text-sm font-semibold text-foreground">{h.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{h.dayName}</p>
              </div>
              <span className="text-sm font-mono font-semibold text-closed whitespace-nowrap">
                {h.dateStr}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
