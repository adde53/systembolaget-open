import { SEOHead } from '@/components/SEOHead';
import { PageLayout } from '@/components/PageLayout';
import { OpeningHours } from '@/components/OpeningHours';
import { StatusDisplay } from '@/components/StatusDisplay';
import { FAQ } from '@/components/FAQ';
import { UpcomingHolidays } from '@/components/UpcomingHolidays';
import { getSwedishHolidays } from '@/lib/swedishHolidays';
import { Link } from 'react-router-dom';

export default function Oppettider2026() {
  const holidays2026 = getSwedishHolidays(2026);
  const sorted = Array.from(holidays2026.entries())
    .map(([key, h]) => {
      const [month, day] = key.split('-').map(Number);
      return { date: new Date(2026, month - 1, day), name: h.name, closed: h.closed };
    })
    .filter(h => h.closed)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const formatDate = (d: Date) =>
    d.toLocaleDateString('sv-SE', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <>
      <SEOHead
        title="Systembolaget öppettider 2026 – Alla tider, helgdagar & röda dagar"
        description="Komplett guide till Systembolagets öppettider 2026. Ordinarie tider mån–lör, stängda dagar, röda dagar, påsk, midsommar, jul och nyår. Uppdaterad för hela 2026."
        canonical="/systembolaget-oppettider-2026"
        keywords="systembolaget öppettider 2026, systembolaget tider 2026, systembolaget helgdagar 2026, systembolaget röda dagar 2026, systembolaget schema 2026"
      />
      <PageLayout currentPath="/systembolaget-oppettider-2026">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
          Systembolaget öppettider 2026
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-8 max-w-2xl">
          Här hittar du allt om Systembolagets öppettider under 2026 – ordinarie tider, helgdagar och röda dagar samlade på ett ställe.
        </p>

        <div className="status-answer mb-8">
          <StatusDisplay />
        </div>

        <div className="w-full max-w-2xl space-y-8">
          {/* Ordinarie öppettider */}
          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ordinarie öppettider 2026</h2>
            <p className="text-muted-foreground mb-4">
              Systembolagets ordinarie öppettider gäller på alla vardagar som inte är röda dagar. De allra flesta butiker i Sverige följer dessa tider:
            </p>
            <div className="space-y-2">
              {['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag'].map(day => (
                <div key={day} className="flex justify-between py-2 border-b border-border">
                  <span className="text-foreground font-medium">{day}</span>
                  <span className="font-semibold text-foreground">10:00 – 19:00</span>
                </div>
              ))}
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-foreground font-medium">Lördag</span>
                <span className="font-semibold text-foreground">10:00 – 15:00</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-foreground font-medium">Söndag</span>
                <span className="font-semibold text-closed">Stängt</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Vissa butiker i stadskärnor kan ha utökade öppettider till kl 20:00 på vardagar.
              Mindre butiker på landsbygden kan stänga tidigare.
            </p>
          </section>

          {/* Kommande helgdagar */}
          <UpcomingHolidays />

          {/* Alla stängda dagar 2026 */}
          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Alla dagar Systembolaget har stängt 2026</h2>
            <p className="text-muted-foreground mb-4">
              Systembolaget håller stängt på samtliga röda dagar samt alla söndagar. Här är alla röda dagar under 2026:
            </p>
            <div className="space-y-2">
              {sorted.map(h => {
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

          {/* Storhelger */}
          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Öppettider vid storhelger 2026</h2>
            <p className="text-muted-foreground mb-4">
              Vid storhelger gäller speciella öppettider. Systembolaget stänger helt på röda dagar och har ofta kortare öppettider dagarna innan. Läs mer om varje storhelg:
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { to: '/systembolaget-pask-oppettider', label: '🐣 Påsk 2026' },
                { to: '/systembolaget-1-maj-oppettider', label: '🌸 1 maj 2026' },
                { to: '/systembolaget-midsommar', label: '🌻 Midsommar 2026' },
                { to: '/systembolaget-jul', label: '🎄 Jul 2026' },
                { to: '/systembolaget-nyar', label: '🎆 Nyår 2026' },
                { to: '/systembolaget-roda-dagar-2026', label: '📅 Röda dagar 2026' },
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border hover:bg-accent/50 transition-colors text-foreground font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>

          {/* Tips */}
          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tips för att aldrig missa öppettiderna</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li>🕐 Systembolaget öppnar alltid <strong>kl 10:00</strong> – ingen butik öppnar tidigare.</li>
              <li>📅 Stängt <strong>alla söndagar och röda dagar</strong> – utan undantag.</li>
              <li>🛒 Dagen innan storhelg har ofta <strong>längre köer</strong> – handla i tid.</li>
              <li>🏪 Systembolagets ombud kan ha <strong>andra öppettider</strong> än vanliga butiker.</li>
              <li>📱 Använd <strong>Systembolagets app</strong> för att se din lokala butiks exakta tider.</li>
              <li>🍷 Beställ via <strong>systembolaget.se</strong> i god tid före helger – leveranstiden kan vara längre.</li>
            </ul>
          </section>

          <FAQ />
        </div>
      </PageLayout>
    </>
  );
}

