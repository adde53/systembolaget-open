import { SEOHead } from '@/components/SEOHead';
import { PageLayout } from '@/components/PageLayout';
import { useSystembolagetStatus } from '@/hooks/useSystembolagetStatus';

export default function FredagOppettider() {
  const now = new Date();
  const day = now.getDay(); // 0=sun, 5=fri
  const isFriday = day === 5;

  return (
    <>
      <SEOHead
        title="Systembolaget öppettider fredag – Öppet till 19:00"
        description="Systembolaget har öppet 10:00–19:00 på fredagar. Se om det är öppet just nu och vilka undantag som gäller vid röda dagar."
        canonical="/systembolaget-fredag-oppettider"
        keywords="systembolaget fredag, systembolaget öppettider fredag, systembolaget öppet fredag, hur länge har systembolaget öppet på fredag"
      />
      <PageLayout currentPath="/systembolaget-fredag-oppettider">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
          Systembolaget öppettider fredag
        </h1>

        <div className="bg-success text-success-foreground px-12 py-6 rounded-2xl shadow-2xl mb-4">
          <p className="text-4xl sm:text-5xl font-black">10:00 – 19:00</p>
        </div>
        <p className="text-sm text-muted-foreground mb-8">Ordinarie fredagsöppettider</p>

        <div className="w-full max-w-2xl space-y-8">
          {isFriday && (
            <section className="bg-success/10 border border-success/30 rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-2">Idag är det fredag!</h2>
              <p className="text-foreground">
                Systembolaget har öppet <strong>10:00–19:00</strong> idag. Vissa större butiker kan ha öppet till 20:00.
              </p>
            </section>
          )}

          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Fredagens öppettider</h2>
            <p className="text-muted-foreground mb-4">
              Fredagar är en av Systembolagets populäraste dagar. De allra flesta butiker har öppet
              enligt de vanliga vardagstiderna:
            </p>
            <div className="bg-accent/50 rounded-lg px-6 py-4 border border-border">
              <div className="flex justify-between items-center">
                <span className="text-foreground font-medium text-lg">Fredag</span>
                <span className="font-bold text-foreground text-lg">10:00 – 19:00</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Större butiker i stadskärnor kan ha öppet till <strong>20:00</strong>.
              Kontrollera alltid din lokala butik.
            </p>
          </section>

          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Hela veckans öppettider</h2>
            <div className="space-y-2">
              {['Måndag', 'Tisdag', 'Onsdag', 'Torsdag'].map(d => (
                <div key={d} className="flex justify-between py-2 border-b border-border">
                  <span className="text-foreground font-medium">{d}</span>
                  <span className="font-semibold text-foreground">10:00 – 19:00</span>
                </div>
              ))}
              <div className="flex justify-between py-2 border-b border-border bg-accent/30 -mx-2 px-2 rounded">
                <span className="text-foreground font-bold">Fredag</span>
                <span className="font-bold text-foreground">10:00 – 19:00</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-foreground font-medium">Lördag</span>
                <span className="font-semibold text-foreground">10:00 – 15:00</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-foreground font-medium">Söndag</span>
                <span className="font-semibold text-closed">Stängt</span>
              </div>
            </div>
          </section>

          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Undantag på fredagar</h2>
            <p className="text-muted-foreground mb-3">
              Om fredagen är en <strong>röd dag</strong> (t.ex. långfredagen, midsommarafton)
              är Systembolaget stängt hela dagen trots att det normalt är en öppetdag.
            </p>
            <p className="text-muted-foreground">
              Fredagar som ofta är röda dagar:
            </p>
            <ul className="mt-2 space-y-1 text-muted-foreground text-sm list-disc list-inside">
              <li>Långfredagen (påsk)</li>
              <li>Midsommarafton (alltid en fredag)</li>
              <li>Julafton, om den infaller på en fredag</li>
            </ul>
          </section>
        </div>
      </PageLayout>
    </>
  );
}

