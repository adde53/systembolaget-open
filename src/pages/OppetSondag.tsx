import { SEOHead } from '@/components/SEOHead';
import { PageLayout } from '@/components/PageLayout';

export default function OppetSondag() {
  return (
    <>
      <SEOHead
        title="Är Systembolaget öppet på söndagar? Nej, alltid stängt"
        description="Systembolaget har inte öppet på söndagar. Se lördagens öppettider (10–15) och vad du kan göra istället."
        canonical="/systembolaget-oppet-sondag"
        keywords="är systembolaget öppet på söndagar, systembolaget öppet söndag, systembolaget söndag, har systembolaget öppet på söndagar, systembolaget söndagar"
      />
      <PageLayout currentPath="/systembolaget-oppet-sondag">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
          Är Systembolaget öppet på söndagar?
        </h1>

        <div className="bg-closed text-closed-foreground px-12 py-6 rounded-2xl shadow-2xl mb-4">
          <p className="text-6xl sm:text-7xl font-black">NEJ</p>
        </div>
        <p className="text-xl font-semibold text-foreground mb-8 text-center max-w-lg">
          Systembolaget är stängt varje söndag – inga undantag, oavsett butik.
        </p>

        <div className="w-full max-w-2xl space-y-8">
          {/* Direct answer section — optimized for featured snippet */}
          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Kort svar</h2>
            <p className="text-foreground text-lg">
              <strong>Nej, Systembolaget har aldrig öppet på söndagar.</strong> Alla 450+ butiker
              i hela Sverige är stängda varje söndag, året runt. Det finns inga undantag.
            </p>
          </section>

          {/* Opening hours — what they actually need */}
          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Systembolagets öppettider</h2>
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
              <div className="flex justify-between py-2 bg-closed/10 -mx-2 px-2 rounded">
                <span className="text-foreground font-bold">Söndag</span>
                <span className="font-bold text-closed">Stängt</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Handla senast <strong>lördag 10:00–15:00</strong> om du behöver något till söndagen.
            </p>
          </section>

          {/* Why — satisfies curiosity, adds depth */}
          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Varför har Systembolaget stängt på söndagar?</h2>
            <p className="text-muted-foreground mb-3">
              Systembolaget är ett statligt monopol med uppdrag att begränsa tillgängligheten av alkohol.
              Söndagsstängningen är ett politiskt beslut och gäller <strong>samtliga butiker</strong> i hela Sverige.
            </p>
            <p className="text-muted-foreground">
              Det finns inga planer på att ändra detta. Även Systembolagets ombud på landsbygden
              är stängda på söndagar.
            </p>
          </section>

          {/* Alternatives — gives a reason they needed the page */}
          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Alternativ på söndagar</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li>🛒 <strong>Handla på lördagen</strong> – öppet 10:00–15:00, sista chansen</li>
              <li>🍺 <strong>Restauranger och barer</strong> serverar alkohol på söndagar</li>
              <li>📦 <strong>Beställ online</strong> på systembolaget.se – leverans till butik eller ombud</li>
              <li>✈️ <strong>Taxfree</strong> på flygplatser om du reser</li>
            </ul>
          </section>

          {/* FAQ for additional featured snippet opportunities */}
          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Vanliga frågor om söndagar</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground">Finns det något Systembolaget som har öppet på söndagar?</h3>
                <p className="text-muted-foreground text-sm mt-1">Nej. Alla butiker och ombud i hela Sverige är stängda på söndagar, utan undantag.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Kan jag beställa online på söndagar?</h3>
                <p className="text-muted-foreground text-sm mt-1">Ja, du kan beställa via systembolaget.se dygnet runt. Leverans sker dock tidigast nästa vardag.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">När öppnar Systembolaget efter söndagen?</h3>
                <p className="text-muted-foreground text-sm mt-1">Måndag kl 10:00, om det inte är en röd dag.</p>
              </div>
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
}
