import { SEOHead } from '@/components/SEOHead';
import { PageLayout } from '@/components/PageLayout';
import { StatusDisplay } from '@/components/StatusDisplay';
import { OpeningHours } from '@/components/OpeningHours';
import { UpcomingHolidays } from '@/components/UpcomingHolidays';

export default function OppenIdag() {
  const today = new Date().toLocaleDateString('sv-SE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <SEOHead
        title="Systembolaget öppet idag? Se om det är öppet just nu"
        description={`Är Systembolaget öppet idag ${today}? Se aktuell status, öppettider och kommande helgdagar då Systembolaget håller stängt.`}
        canonical="/systembolaget-oppen-idag"
        keywords="systembolaget öppet idag, är systembolaget öppet idag, har systembolaget öppet idag, systembolaget idag, systembolaget öppet just nu"
      />
      <PageLayout currentPath="/systembolaget-oppen-idag">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
          Är Systembolaget öppet idag?
        </h1>

        <p className="text-muted-foreground mb-6 text-center capitalize">{today}</p>

        {/* Live status */}
        <div className="mb-8">
          <StatusDisplay />
        </div>

        {/* Upcoming holidays */}
        <div className="w-full max-w-2xl mb-8">
          <UpcomingHolidays />
        </div>

        <div className="w-full max-w-2xl space-y-8">
          {/* Direct answer for featured snippet */}
          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Systembolagets öppettider idag</h2>
            <p className="text-foreground text-lg mb-3">
              Systembolaget har <strong>öppet måndag–fredag 10:00–19:00</strong> och{' '}
              <strong>lördagar 10:00–15:00</strong>. På söndagar och röda dagar är alla butiker stängda.
            </p>
            <p className="text-muted-foreground">
              Tiderna kan variera något mellan butiker. Kontrollera alltid din lokala butik för exakta tider.
            </p>
          </section>

          {/* Full opening hours */}
          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Veckans öppettider</h2>
            <OpeningHours />
          </section>

          {/* When is it closed */}
          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">När har Systembolaget stängt?</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>🚫 <strong>Söndagar</strong> – alltid stängt, inga undantag</li>
              <li>🚫 <strong>Röda dagar</strong> – stängt på alla helgdagar</li>
              <li>🚫 <strong>Midsommarafton, julafton, nyårsafton</strong> – stängt</li>
              <li>⏰ <strong>Dag före röd dag</strong> – ofta kortare öppettider (10:00–15:00)</li>
            </ul>
          </section>

          {/* Tips */}
          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tips: Planera ditt besök</h2>
            <p className="text-muted-foreground mb-3">
              Om Systembolaget är stängt idag kan du beställa på{' '}
              <a href="https://www.systembolaget.se" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                systembolaget.se
              </a>{' '}
              för leverans till närmaste butik eller ombud.
            </p>
            <p className="text-muted-foreground">
              Tänk på att det kan ta 1–3 arbetsdagar innan din beställning finns att hämta.
            </p>
          </section>
        </div>
      </PageLayout>
    </>
  );
}

