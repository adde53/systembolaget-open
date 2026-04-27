import { SEOHead } from '@/components/SEOHead';
import { PageLayout } from '@/components/PageLayout';

export default function ForstaMaj() {
  return (
    <>
      <SEOHead
        title="Systembolaget öppettider 1 maj 2026 – Stängt, handla dagen innan"
        description="Systembolaget har stängt 1 maj (röd dag). Öppettider dagarna runt första maj och när du senast kan handla."
        canonical="/systembolaget-1-maj-oppettider"
        keywords="systembolaget öppettider 1 maj, systembolaget 1 maj, systembolaget första maj, systembolaget öppet 1 maj"
      />
      <PageLayout currentPath="/systembolaget-1-maj-oppettider">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
          Har Systembolaget öppet 1 maj?
        </h1>

        <div className="bg-closed text-closed-foreground px-12 py-6 rounded-2xl shadow-2xl mb-8">
          <p className="text-6xl sm:text-7xl font-black">NEJ</p>
        </div>

        <p className="text-xl font-semibold text-foreground mb-8 text-center max-w-lg">
          Första maj är en röd dag – Systembolaget är stängt.
        </p>

        <div className="w-full max-w-2xl space-y-8">
          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Öppettider runt 1 maj 2026</h2>
            <p className="text-muted-foreground mb-4">
              Första maj 2026 infaller på en <strong>fredag</strong>. Här är öppettiderna dagarna runt:
            </p>
            <div className="space-y-2">
              <div className="flex justify-between py-3 px-4 rounded-lg bg-accent/50 border border-border">
                <div>
                  <p className="font-semibold text-foreground">Torsdag 30 april</p>
                  <p className="text-xs text-muted-foreground">Valborgsmässoafton</p>
                </div>
                <span className="font-semibold text-foreground self-center">10:00 – 19:00</span>
              </div>
              <div className="flex justify-between py-3 px-4 rounded-lg bg-closed/10 border border-closed/30">
                <div>
                  <p className="font-semibold text-foreground">Fredag 1 maj</p>
                  <p className="text-xs text-closed font-medium">Röd dag</p>
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
            <h2 className="text-2xl font-bold text-foreground mb-4">Tips inför 1 maj</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>🛒 Handla senast <strong>torsdag 30 april</strong> (öppet till 19:00)</li>
              <li>⏰ Valborgsmässoafton har ofta <strong>extra långa köer</strong></li>
              <li>📅 Lördagen efter (2 maj) har Systembolaget öppet 10:00–15:00</li>
              <li>🍷 Beställ i förväg via <strong>systembolaget.se</strong> om du vill vara säker</li>
            </ul>
          </section>
        </div>
      </PageLayout>
    </>
  );
}


