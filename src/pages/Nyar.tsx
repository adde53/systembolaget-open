import { HolidayPage } from '@/components/HolidayPage';
export default function Nyar() {
  return <HolidayPage
    title="Systembolaget nyår 2026 – Stängt nyårsafton & nyårsdagen"
    h1="Har Systembolaget öppet på nyår?"
    description="Systembolaget stänger nyårsafton och nyårsdagen. Se sista dagen att handla och öppettider runt nyår 2026."
    canonical="/systembolaget-nyar"
    keywords="systembolaget nyår, systembolaget nyårsafton, systembolaget öppet nyår, systembolaget 31 december"
    answer="Nej, Systembolaget är stängt på nyårsafton (31 december) och nyårsdagen (1 januari). Se till att handla allt du behöver senast den 30 december."
    closedDays={['Nyårsafton – 31 december 2026 (torsdag)', 'Nyårsdagen – 1 januari 2027 (fredag)']}
    tip="Nyårsafton är en av årets mest populära festdagar. Handla champagne och övrigt senast den 30 december. Tänk på att butikerna kan ha extra mycket folk de sista dagarna."
    lastShoppingDay="Onsdag 30 december 2026 (öppet 10:00–19:00)"
  />;
}

