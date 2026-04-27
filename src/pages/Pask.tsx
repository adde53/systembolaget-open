import { HolidayPage } from '@/components/HolidayPage';
export default function Pask() {
  return <HolidayPage
    title="Har Systembolaget öppet på påsk 2026? – Stängt långfredag till annandag"
    h1="Har Systembolaget öppet på påsk?"
    description="Systembolaget är stängt från långfredagen till och med annandag påsk 2026. Handla senast skärtorsdagen. Komplett guide."
    canonical="/systembolaget-pask"
    keywords="systembolaget påsk, systembolaget öppet påsk, systembolaget påskafton, systembolaget långfredagen"
    answer="Nej, Systembolaget är stängt under hela påskhelgen – från långfredagen till och med annandag påsk. Det innebär fyra sammanhängande stängda dagar."
    closedDays={['Långfredagen (fredag 3 april 2026)', 'Påskafton (lördag 4 april 2026)', 'Påskdagen (söndag 5 april 2026)', 'Annandag påsk (måndag 6 april 2026)']}
    tip="Påsken innebär fyra stängda dagar i rad. Handla senast skärtorsdagen för att vara säker. Tänk på att det blir extra mycket folk i butikerna."
    lastShoppingDay="Skärtorsdag 2 april 2026 (öppet 10:00–19:00)"
  />;
}

