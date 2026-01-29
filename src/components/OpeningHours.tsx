export function OpeningHours() {
  return (
    <section className="w-full max-w-2xl" aria-labelledby="opening-hours-heading">
      <h2 id="opening-hours-heading" className="text-2xl font-bold text-foreground mb-4">
        Systembolagets öppettider idag
      </h2>
      
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <p className="text-muted-foreground mb-4">
          Systembolagets ordinarie öppettider varierar beroende på veckodag. Här är de vanligaste tiderna:
        </p>
        
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

        <p className="text-sm text-muted-foreground mt-4">
          Större butiker i stadskärnor kan ha längre öppettider, ofta till 20:00 på vardagar.
        </p>
      </div>
    </section>
  );
}
