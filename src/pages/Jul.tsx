import { HolidayPage } from '@/components/HolidayPage';
export default function Jul() {
  return <HolidayPage
    title="Systembolaget jul 2026 – Stängt 24–26 dec, handla innan"
    h1="Har Systembolaget öppet på jul?"
    description="Systembolaget är stängt julafton, juldagen och annandag jul. Se öppettider dagarna före jul och sista chansen att handla."
    canonical="/systembolaget-jul"
    keywords="systembolaget jul, systembolaget öppet julafton, systembolaget juldagen, systembolaget öppettider jul"
    answer="Nej, Systembolaget är stängt under hela julhelgen – julafton (24 dec), juldagen (25 dec) och annandag jul (26 dec). Planera dina julinköp i god tid!"
    closedDays={['Julafton – 24 december 2026 (torsdag)', 'Juldagen – 25 december 2026 (fredag)', 'Annandag jul – 26 december 2026 (lördag)']}
    tip="Julen är den helg då Systembolaget har allra mest kunder. Handla redan i början av veckan före jul för att undvika köer. Den 23 december är årets mest hektiska dag på Systembolaget."
    lastShoppingDay="Onsdag 23 december 2026 (öppet 10:00–19:00)"
  />;
}

