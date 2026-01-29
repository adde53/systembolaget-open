export function HolidayInfo() {
  return (
    <section className="w-full max-w-2xl" aria-labelledby="holiday-heading">
      <h2 id="holiday-heading" className="text-2xl font-bold text-foreground mb-4">
        Är Systembolaget öppet på helgdagar?
      </h2>
      
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <p className="text-foreground mb-4">
          <strong>Nej, Systembolaget är stängt på alla röda dagar i Sverige.</strong> Detta inkluderar 
          helgdagar som jul, nyår, påsk, midsommar och alla helgons dag. Planera dina inköp i förväg 
          inför storhelger.
        </p>
        
        <h3 className="font-semibold text-foreground mt-4 mb-2">Helgdagar då Systembolaget är stängt:</h3>
        <ul className="text-muted-foreground space-y-1 text-sm list-disc list-inside">
          <li>Nyårsdagen (1 januari)</li>
          <li>Trettondedag jul (6 januari)</li>
          <li>Långfredagen, Påskafton, Påskdagen, Annandag påsk</li>
          <li>Första maj (1 maj)</li>
          <li>Kristi himmelsfärdsdag</li>
          <li>Sveriges nationaldag (6 juni)</li>
          <li>Midsommarafton och Midsommardagen</li>
          <li>Alla helgons dag</li>
          <li>Julafton, Juldagen, Annandag jul (24-26 december)</li>
          <li>Nyårsafton (31 december)</li>
        </ul>
      </div>
    </section>
  );
}
