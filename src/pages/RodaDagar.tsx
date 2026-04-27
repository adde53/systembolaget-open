import { SEOHead } from '@/components/SEOHead';
import { PageLayout } from '@/components/PageLayout';
import { getSwedishHolidays } from '@/lib/swedishHolidays';

export default function RodaDagar() {
  const holidays2026 = getSwedishHolidays(2026);
  const sorted = Array.from(holidays2026.entries())
    .map(([key, h]) => {
      const [month, day] = key.split('-').map(Number);
      return { date: new Date(2026, month - 1, day), name: h.name, closed: h.closed };
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const formatDate = (d: Date) =>
    d.toLocaleDateString('sv-SE', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <>
      <SEOHead
        title="Systembolaget röda dagar 2026 – Alla helgdagar det är stängt"
        description="Komplett lista över alla röda dagar 2026 då Systembolaget är stängt. Jul, påsk, midsommar, nyår och fler. Planera dina inköp i tid."
        canonical="/systembolaget-roda-dagar-2026"
        keywords="systembolaget röda dagar, systembolaget helgdagar 2026, systembolaget stängt röda dagar"
      />
      <PageLayout currentPath="/systembolaget-roda-dagar-2026">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
          Systembolaget röda dagar 2026
        </h1>

        <div className="w-full max-w-2xl space-y-8">
          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <p className="text-foreground mb-6">
              <strong>Systembolaget är stängt på alla röda dagar i Sverige.</strong> Nedan hittar du en
              komplett lista för hela 2026. Planera dina inköp senast dagen innan en röd dag.
            </p>

            <div className="space-y-2">
              {sorted.filter(h => h.closed).map(h => {
                const isPast = h.date < new Date();
                return (
                  <div key={h.name + h.date.toISOString()} className={`flex justify-between py-3 px-4 rounded-lg border ${isPast ? 'opacity-50 bg-muted' : 'bg-accent/50 border-border'}`}>
                    <div>
                      <p className="font-semibold text-foreground">{h.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{formatDate(h.date)}</p>
                    </div>
                    <span className="text-sm font-semibold text-closed self-center">Stängt</span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tips inför röda dagar</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>🛒 Handla senast <strong>dagen innan</strong> en röd dag</li>
              <li>⏰ Förvänta dig <strong>längre köer</strong> dagarna före storhelger</li>
              <li>📱 Kontrollera din lokala butiks öppettider – de kan variera</li>
              <li>🍷 Beställ via <strong>systembolaget.se</strong> i god tid före helger</li>
            </ul>
          </section>
        </div>
      </PageLayout>
    </>
  );
}

