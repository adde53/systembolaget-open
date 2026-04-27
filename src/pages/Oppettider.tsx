import { SEOHead } from '@/components/SEOHead';
import { PageLayout } from '@/components/PageLayout';
import { OpeningHours } from '@/components/OpeningHours';
import { StatusDisplay } from '@/components/StatusDisplay';
import { FAQ } from '@/components/FAQ';

export default function Oppettider() {
  return (
    <>
      <SEOHead
        title="Systembolaget öppettider 2026 – Alla veckodagar & helgdagar"
        description="Kompletta öppettider för Systembolaget 2026. Måndag–fredag 10–19, lördag 10–15, söndag stängt. Se alla helgdagar och undantag."
        canonical="/systembolaget-oppettider"
        keywords="systembolaget öppettider, systembolaget öppettider idag, systembolaget tider, öppettider systembolaget"
      />
      <PageLayout currentPath="/systembolaget-oppettider">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
          Systembolaget öppettider 2026
        </h1>

        <div className="status-answer mb-8">
          <StatusDisplay />
        </div>

        <div className="w-full max-w-2xl space-y-8">
          <OpeningHours />

          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Detaljerade öppettider per dag</h2>
            <p className="text-muted-foreground mb-4">
              Systembolagets öppettider är samma på de allra flesta butiker i Sverige. Här är en komplett översikt:
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
              Mindre butiker på landsbygden kan stänga tidigare. Kontrollera alltid din lokala butik.
            </p>
          </section>

          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Bra att veta om öppettiderna</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li>🕐 Systembolaget öppnar alltid <strong>kl 10:00</strong> – det finns inga butiker som öppnar tidigare.</li>
              <li>📅 Alla butiker är <strong>stängda på söndagar och röda dagar</strong> – utan undantag.</li>
              <li>🛒 Dagen innan en helgdag har ofta <strong>längre köer</strong> – planera dina inköp i förväg.</li>
              <li>🏪 Systembolagets ombud (t.ex. på landsbygden) kan ha <strong>andra öppettider</strong> än vanliga butiker.</li>
            </ul>
          </section>

          <FAQ />
        </div>
      </PageLayout>
    </>
  );
}

