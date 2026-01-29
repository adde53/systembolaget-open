// Swedish public holidays (röda dagar) when Systembolaget is closed
// This covers major holidays - some may have reduced hours

interface Holiday {
  name: string;
  closed: boolean; // true = completely closed, false = may have reduced hours
}

// Calculate Easter Sunday using the Anonymous Gregorian algorithm
function getEasterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDateKey(date: Date): string {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${month}-${day}`;
}

export function getSwedishHolidays(year: number): Map<string, Holiday> {
  const holidays = new Map<string, Holiday>();
  
  // Fixed holidays
  holidays.set('01-01', { name: 'Nyårsdagen', closed: true });
  holidays.set('01-06', { name: 'Trettondedag jul', closed: true });
  holidays.set('05-01', { name: 'Första maj', closed: true });
  holidays.set('06-06', { name: 'Sveriges nationaldag', closed: true });
  holidays.set('12-24', { name: 'Julafton', closed: true });
  holidays.set('12-25', { name: 'Juldagen', closed: true });
  holidays.set('12-26', { name: 'Annandag jul', closed: true });
  holidays.set('12-31', { name: 'Nyårsafton', closed: true });
  
  // Easter-based holidays
  const easter = getEasterSunday(year);
  
  // Långfredagen (Good Friday) - 2 days before Easter
  const goodFriday = addDays(easter, -2);
  holidays.set(formatDateKey(goodFriday), { name: 'Långfredagen', closed: true });
  
  // Påskafton (Easter Eve) - 1 day before Easter
  const easterEve = addDays(easter, -1);
  holidays.set(formatDateKey(easterEve), { name: 'Påskafton', closed: true });
  
  // Påskdagen (Easter Sunday)
  holidays.set(formatDateKey(easter), { name: 'Påskdagen', closed: true });
  
  // Annandag påsk (Easter Monday)
  const easterMonday = addDays(easter, 1);
  holidays.set(formatDateKey(easterMonday), { name: 'Annandag påsk', closed: true });
  
  // Kristi himmelsfärdsdag (Ascension Day) - 39 days after Easter
  const ascension = addDays(easter, 39);
  holidays.set(formatDateKey(ascension), { name: 'Kristi himmelsfärdsdag', closed: true });
  
  // Pingstdagen (Whit Sunday) - 49 days after Easter
  const pentecost = addDays(easter, 49);
  holidays.set(formatDateKey(pentecost), { name: 'Pingstdagen', closed: true });
  
  // Midsommarafton (Midsummer Eve) - Friday between June 19-25
  const midsummerEve = getMidsummerEve(year);
  holidays.set(formatDateKey(midsummerEve), { name: 'Midsommarafton', closed: true });
  
  // Midsommardagen (Midsummer Day)
  const midsummerDay = addDays(midsummerEve, 1);
  holidays.set(formatDateKey(midsummerDay), { name: 'Midsommardagen', closed: true });
  
  // Alla helgons dag (All Saints' Day) - Saturday between Oct 31 - Nov 6
  const allSaints = getAllSaintsDay(year);
  holidays.set(formatDateKey(allSaints), { name: 'Alla helgons dag', closed: true });
  
  return holidays;
}

function getMidsummerEve(year: number): Date {
  // Midsummer Eve is always a Friday between June 19-25
  for (let day = 19; day <= 25; day++) {
    const date = new Date(year, 5, day); // June
    if (date.getDay() === 5) { // Friday
      return date;
    }
  }
  return new Date(year, 5, 19);
}

function getAllSaintsDay(year: number): Date {
  // All Saints' Day is always a Saturday between Oct 31 - Nov 6
  for (let day = 31; day <= 37; day++) {
    const actualDay = day <= 31 ? day : day - 31;
    const month = day <= 31 ? 9 : 10; // October or November
    const date = new Date(year, month, actualDay);
    if (date.getDay() === 6) { // Saturday
      return date;
    }
  }
  return new Date(year, 10, 1);
}

export function isSwedishHoliday(date: Date): Holiday | null {
  const year = date.getFullYear();
  const holidays = getSwedishHolidays(year);
  const dateKey = formatDateKey(date);
  return holidays.get(dateKey) || null;
}

export function getNextHoliday(fromDate: Date): { date: Date; holiday: Holiday } | null {
  const year = fromDate.getFullYear();
  const holidays = getSwedishHolidays(year);
  const nextYearHolidays = getSwedishHolidays(year + 1);
  
  // Combine current year and next year
  const allHolidays: { date: Date; holiday: Holiday }[] = [];
  
  holidays.forEach((holiday, key) => {
    const [month, day] = key.split('-').map(Number);
    allHolidays.push({ date: new Date(year, month - 1, day), holiday });
  });
  
  nextYearHolidays.forEach((holiday, key) => {
    const [month, day] = key.split('-').map(Number);
    allHolidays.push({ date: new Date(year + 1, month - 1, day), holiday });
  });
  
  // Sort by date
  allHolidays.sort((a, b) => a.date.getTime() - b.date.getTime());
  
  // Find next holiday after fromDate
  const fromTime = fromDate.getTime();
  for (const h of allHolidays) {
    if (h.date.getTime() > fromTime && h.holiday.closed) {
      return h;
    }
  }
  
  return null;
}
