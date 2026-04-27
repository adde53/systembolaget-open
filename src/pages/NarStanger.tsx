import { SEOHead } from '@/components/SEOHead';
import { PageLayout } from '@/components/PageLayout';
import { useSystembolagetStatus } from '@/hooks/useSystembolagetStatus';

export default function NarStanger() {
  const { isOpen, status, todayHours, currentTime } = useSystembolagetStatus();

  const now = new Date();
  const day = now.getDay();

  let closingTime = 'Stängt idag';
  if (day >= 1 && day <= 5) closingTime = '19:00';
  if (day === 6) closingTime = '15:00';

  return (
    <>
      <SEOHead
        title="När stänger Systembolaget idag? – Se stängningstid nu"
        description="Se exakt när Systembolaget stänger idag. Öppettider vardagar, lördagar och information om helgdagar."
        canonical="/nar-stanger-systembolaget"
        keywords="när stänger systembolaget, systembolaget stänger, systembolaget stängningstid, hur länge har systembolaget öppet"
      />
      <PageLayout currentPath="/nar-stanger-systembolaget">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
          När stänger Systembolaget idag?
        </h1>

        <div className="bg-card border border-border px-12 py-8 rounded-2xl shadow-2xl mb-8 text-center">
          {day === 0 ? (
            <p className="text-3xl font-bold text-closed">Stängt idag (söndag)</p>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-2">Stänger idag klockan</p>
              <p className="text-6xl sm:text-7xl font-black text-foreground">{closingTime}</p>
            </>
          )}
        </div>

        <div className="w-full max-w-2xl space-y-8">
          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Stängningstider per dag</h2>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-foreground font-medium">Måndag – Fredag</span>
                <span className="font-semibold text-foreground">Stänger 19:00</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-foreground font-medium">Lördag</span>
                <span className="font-semibold text-foreground">Stänger 15:00</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-foreground font-medium">Söndag & röda dagar</span>
                <span className="font-semibold text-closed">Stängt hela dagen</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Vissa större butiker i stadskärnor kan ha öppet till kl 20:00 på vardagar.
            </p>
          </section>
        </div>
      </PageLayout>
    </>
  );
}

