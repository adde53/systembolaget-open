import { HolidayPage } from '@/components/HolidayPage';
export default function Midsommar() {
  return <HolidayPage
    title="Systembolaget midsommar 2026 – Stängt! Handla innan"
    h1="Har Systembolaget öppet på midsommar?"
    description="Systembolaget är stängt midsommarafton och midsommardagen 2026. Se sista dagen att handla och öppettider."
    canonical="/systembolaget-midsommar"
    keywords="systembolaget midsommar, systembolaget öppet midsommar, systembolaget midsommarafton, midsommar systembolaget öppettider"
    answer="Nej, Systembolaget är stängt både på midsommarafton och midsommardagen. Midsommar infaller i juni varje år och är en av de mest populära helgerna i Sverige. Se till att handla i god tid!"
    closedDays={['Midsommarafton (fredag 19 juni 2026)', 'Midsommardagen (lördag 20 juni 2026)']}
    tip="Midsommarafton är den dag då flest glömmer att handla. Köerna är ofta mycket långa på torsdagen innan. Handla gärna redan i början av veckan."
    lastShoppingDay="Torsdag 18 juni 2026 (öppet 10:00–19:00)"
  />;
}

