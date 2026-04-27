import { SEOHead } from '@/components/SEOHead';
import { PageLayout } from '@/components/PageLayout';

export default function PaskOppettider() {
  return (
    <>
      <SEOHead
        title="Systembolaget öppettider påsk 2026 – Stängt 4 dagar i rad"
        description="Systembolaget stänger långfredag till annandag påsk. Se dag-för-dag öppettider påsken 2026 och sista chansen att handla."
        canonical="/systembolaget-pask-oppettider"
        keywords="systembolaget öppettider påsk 2026, systembolaget påsk öppettider, systembolaget påskafton öppettider, systembolaget långfredagen"
      />
      <PageLayout currentPath="/systembolaget-pask-oppettider">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
          Systembolaget öppettider påsk 2026
        </h1>

        <div className="bg-closed text-closed-foreground px-12 py-6 rounded-2xl shadow-2xl mb-8">
          <p className="text-4xl sm:text-5xl font-black">STÄNGT 4 DAGAR</p>
        </div>

        <p className="text-xl font-semibold text-foreground mb-8 text-center max-w-lg">
          Systembolaget håller stängt från långfredagen till och med annandag påsk.
        </p>

        <div className="w-full max-w-2xl space-y-8">
          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Dag-för-dag öppettider påsk 2026</h2>
            <div className="space-y-2">
              <div className="flex justify-between py-3 px-4 rounded-lg bg-accent/50 border border-border">
                <div>
                  <p className="font-semibold text-foreground">Onsdag 1 april</p>
                  <p className="text-xs text-muted-foreground">Vanlig vardag</p>
                </div>
                <span className="font-semibold text-foreground self-center">10:00 – 19:00</span>
              </div>
              <div className="flex justify-between py-3 px-4 rounded-lg bg-success/10 border border-success/30">
                <div>
                  <p className="font-semibold text-foreground">Torsdag 2 april</p>
                  <p className="text-xs text-success font-medium">Skärtorsdag – SISTA CHANSEN</p>
                </div>
                <span className="font-semibold text-foreground self-center">10:00 – 19:00</span>
              </div>
              {[
                { day: 'Fredag 3 april', name: 'Långfredagen' },
                { day: 'Lördag 4 april', name: 'Påskafton' },
                { day: 'Söndag 5 april', name: 'Påskdagen' },
                { day: 'Måndag 6 april', name: 'Annandag påsk' },
              ].map(d => (
                <div key={d.day} className="flex justify-between py-3 px-4 rounded-lg bg-closed/10 border border-closed/30">
                  <div>
                    <p className="font-semibold text-foreground">{d.day}</p>
                    <p className="text-xs text-closed font-medium">{d.name} – röd dag</p>
                  </div>
                  <span className="font-semibold text-closed self-center">Stängt</span>
                </div>
              ))}
              <div className="flex justify-between py-3 px-4 rounded-lg bg-accent/50 border border-border">
                <div>
                  <p className="font-semibold text-foreground">Tisdag 7 april</p>
                  <p className="text-xs text-muted-foreground">Öppnar igen</p>
                </div>
                <span className="font-semibold text-foreground self-center">10:00 – 19:00</span>
              </div>
            </div>
          </section>

          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tips inför påskhelgen</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>🛒 Handla senast <strong>skärtorsdag 2 april</strong> – sista öppetdagen</li>
              <li>⏰ Skärtorsdagen har ofta <strong>årets längsta köer</strong> vid Systembolaget</li>
              <li>💡 Handla redan onsdag 1 april för att undvika rusning</li>
              <li>📅 Nästa öppetdag: <strong>tisdag 7 april</strong> (10:00–19:00)</li>
              <li>📦 Beställ via <strong>systembolaget.se</strong> senast veckan innan</li>
            </ul>
          </section>
        </div>
      </PageLayout>
    </>
  );
}


