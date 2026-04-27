import { SEOHead } from '@/components/SEOHead';
import { PageLayout } from '@/components/PageLayout';
import { useSystembolagetStatus } from '@/hooks/useSystembolagetStatus';

export default function OppetImorgon() {
  const { currentDate } = useSystembolagetStatus();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDay = tomorrow.getDay();

  const isSunday = tomorrowDay === 0;
  const isSaturday = tomorrowDay === 6;

  let answer: string;
  let hours: string;
  let isOpen: boolean;

  if (isSunday) {
    answer = 'Nej, imorgon är det söndag och Systembolaget är stängt.';
    hours = 'Stängt';
    isOpen = false;
  } else if (isSaturday) {
    answer = 'Ja, imorgon är det lördag. Systembolaget har öppet 10:00–15:00.';
    hours = '10:00 – 15:00';
    isOpen = true;
  } else {
    answer = 'Ja, imorgon har Systembolaget öppet 10:00–19:00.';
    hours = '10:00 – 19:00';
    isOpen = true;
  }

  const tomorrowStr = tomorrow.toLocaleDateString('sv-SE', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <>
      <SEOHead
        title="Har Systembolaget öppet imorgon? – Se öppettider"
        description="Kolla snabbt om Systembolaget har öppet imorgon. Se öppettider för imorgon och resten av veckan."
        canonical="/systembolaget-oppet-imorgon"
        keywords="systembolaget öppet imorgon, har systembolaget öppet imorgon, systembolaget imorgon"
      />
      <PageLayout currentPath="/systembolaget-oppet-imorgon">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
          Har Systembolaget öppet imorgon?
        </h1>

        <div className={`${isOpen ? 'bg-success text-success-foreground' : 'bg-closed text-closed-foreground'} px-12 py-6 rounded-2xl shadow-2xl mb-4`}>
          <p className="text-6xl sm:text-7xl font-black">{isOpen ? 'JA' : 'NEJ'}</p>
        </div>

        <p className="text-sm text-muted-foreground mb-2 capitalize">{tomorrowStr}</p>
        <p className="text-xl font-semibold text-foreground mb-8">{answer}</p>

        <div className="w-full max-w-2xl bg-card border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-4">Imorgons öppettider</h2>
          <div className="flex justify-between py-3">
            <span className="text-foreground font-medium capitalize">{tomorrow.toLocaleDateString('sv-SE', { weekday: 'long' })}</span>
            <span className={`font-semibold ${isOpen ? 'text-foreground' : 'text-closed'}`}>{hours}</span>
          </div>
        </div>
      </PageLayout>
    </>
  );
}

