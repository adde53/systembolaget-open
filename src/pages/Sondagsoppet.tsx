import { SEOHead } from '@/components/SEOHead';
import { PageLayout } from '@/components/PageLayout';

export default function Sondagsoppet() {
  return (
    <>
      <SEOHead
        title="Är Systembolaget öppet på söndagar? – Svar & alternativ"
        description="Nej, Systembolaget har aldrig öppet på söndagar. Läs varför och se vilka alternativ du har. Öppettider lördag och andra dagar."
        canonical="/systembolaget-sondagsoppet"
        keywords="systembolaget söndag, systembolaget öppet söndag, systembolaget söndagsöppet, har systembolaget öppet på söndagar"
      />
      <PageLayout currentPath="/systembolaget-sondagsoppet">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
          Har Systembolaget öppet på söndagar?
        </h1>

        <div className="bg-closed text-closed-foreground px-12 py-6 rounded-2xl shadow-2xl mb-8">
          <p className="text-6xl sm:text-7xl font-black">NEJ</p>
        </div>

        <div className="w-full max-w-2xl space-y-8">
          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Varför har Systembolaget stängt på söndagar?</h2>
            <p className="text-muted-foreground mb-4">
              Systembolaget är ett statligt monopol och har enligt lag begränsade öppettider.
              Söndagar har alltid varit en stängd dag, och det finns <strong>inga undantag</strong> –
              oavsett vilken butik du besöker i Sverige.
            </p>
            <p className="text-muted-foreground">
              Det politiska beslutet att hålla stängt på söndagar är en del av Systembolagets
              uppdrag att begränsa tillgängligheten till alkohol i syfte att minska skador.
            </p>
          </section>

          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Alternativ på söndagar</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li>🛒 <strong>Handla på lördagen</strong> – Systembolaget har öppet 10:00–15:00 på lördagar</li>
              <li>🍺 <strong>Restauranger och barer</strong> har öppet och serverar alkohol på söndagar</li>
              <li>📦 <strong>Beställ online</strong> via systembolaget.se – leverans till butik eller ombud</li>
              <li>✈️ <strong>Taxfree</strong> – om du är ute och reser kan du handla på flygplatsen</li>
            </ul>
          </section>

          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Öppettider andra dagar</h2>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-foreground font-medium">Måndag – Fredag</span>
                <span className="font-semibold text-foreground">10:00 – 19:00</span>
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
        </div>
      </PageLayout>
    </>
  );
}

