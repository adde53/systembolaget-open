import { SEOHead } from '@/components/SEOHead';
import { PageLayout } from '@/components/PageLayout';

export default function Valborg() {
  return (
    <>
      <SEOHead
        title="Systembolaget valborgsmässoafton 2026 – Öppettider & tips"
        description="Systembolaget har öppet på valborgsmässoafton 2026 (30 april) men stängt 1 maj. Se öppettider och sista chansen att handla."
        canonical="/systembolaget-valborg-oppettider-2026"
        keywords="systembolaget valborg, systembolaget valborgsmässoafton, systembolaget öppettider valborg, systembolaget 30 april, systembolaget öppet valborg 2026"
      />
      <PageLayout currentPath="/systembolaget-valborg-oppettider-2026">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
          Systembolaget öppettider valborg 2026
        </h1>

        <div className="flex rounded-2xl shadow-2xl mb-8 overflow-hidden w-full max-w-md">
          <div className="bg-success text-success-foreground px-6 py-6 flex-1 text-center">
            <p className="text-2xl sm:text-3xl font-black">ÖPPET</p>
            <p className="text-sm mt-1">30 april</p>
          </div>
          <div className="bg-closed text-closed-foreground px-6 py-6 flex-1 text-center">
            <p className="text-2xl sm:text-3xl font-black">STÄNGT</p>
            <p className="text-sm mt-1">1 maj (röd dag)</p>
          </div>
        </div>

        <p className="text-xl font-semibold text-foreground mb-8 text-center max-w-lg">
          Valborgsmässoafton 2026 infaller på en <strong>torsdag</strong>. Systembolaget har öppet som vanligt – men stänger dagen efter.
        </p>

        <div className="w-full max-w-2xl space-y-8">
          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Öppettider valborgsveckan 2026</h2>
            <div className="space-y-2">
              <div className="flex justify-between py-3 px-4 rounded-lg bg-accent/50 border border-border">
                <div>
                  <p className="font-semibold text-foreground">Tisdag 28 april</p>
                </div>
                <span className="font-semibold text-foreground self-center">10:00 – 19:00</span>
              </div>
              <div className="flex justify-between py-3 px-4 rounded-lg bg-accent/50 border border-border">
                <div>
                  <p className="font-semibold text-foreground">Onsdag 29 april</p>
                </div>
                <span className="font-semibold text-foreground self-center">10:00 – 19:00</span>
              </div>
              <div className="flex justify-between py-3 px-4 rounded-lg bg-success/10 border border-success/30">
                <div>
                  <p className="font-semibold text-foreground">Torsdag 30 april</p>
                  <p className="text-xs text-success font-medium">Valborgsmässoafton – SISTA CHANSEN</p>
                </div>
                <span className="font-semibold text-success self-center">10:00 – 19:00</span>
              </div>
              <div className="flex justify-between py-3 px-4 rounded-lg bg-closed/10 border border-closed/30">
                <div>
                  <p className="font-semibold text-foreground">Fredag 1 maj</p>
                  <p className="text-xs text-closed font-medium">Röd dag – Stängt</p>
                </div>
                <span className="font-semibold text-closed self-center">Stängt</span>
              </div>
              <div className="flex justify-between py-3 px-4 rounded-lg bg-accent/50 border border-border">
                <div>
                  <p className="font-semibold text-foreground">Lördag 2 maj</p>
                </div>
                <span className="font-semibold text-foreground self-center">10:00 – 15:00</span>
              </div>
              <div className="flex justify-between py-3 px-4 rounded-lg border border-border">
                <div>
                  <p className="font-semibold text-foreground">Söndag 3 maj</p>
                </div>
                <span className="font-semibold text-closed self-center">Stängt</span>
              </div>
            </div>
          </section>

          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tips inför valborgsmässoafton</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>🛒 Handla senast <strong>torsdag 30 april</strong> – Systembolaget stänger kl 19:00</li>
              <li>⏰ Räkna med <strong>extra köer</strong> på valborgsmässoafton – många handlar sista minuten</li>
              <li>🔥 Planerar du valborgsfirande? Handla gärna redan tisdag eller onsdag</li>
              <li>📅 Lördagen 2 maj har Systembolaget öppet 10:00–15:00</li>
              <li>🍷 Beställ i förväg via <strong>systembolaget.se</strong> för att slippa kön</li>
            </ul>
          </section>

          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Vanliga frågor om valborg</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground">Har Systembolaget öppet på valborgsmässoafton?</h3>
                <p className="text-muted-foreground mt-1">Ja! Valborgsmässoafton (30 april) är inte en röd dag. Systembolaget har ordinarie öppettider 10:00–19:00.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Stänger Systembolaget tidigare på valborg?</h3>
                <p className="text-muted-foreground mt-1">Nej, de flesta butiker har öppet till 19:00 som vanligt på vardagar. Vissa mindre butiker kan ha kortare tider – kolla din lokala butik.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Varför är Systembolaget stängt 1 maj?</h3>
                <p className="text-muted-foreground mt-1">Första maj (arbetarnas dag) är en röd dag i Sverige. Systembolaget håller stängt på alla röda dagar.</p>
              </div>
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
}

