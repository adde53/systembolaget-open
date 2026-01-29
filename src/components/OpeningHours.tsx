export function OpeningHours() {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm max-w-sm w-full">
      <h2 className="text-lg font-semibold text-foreground mb-4">Vanliga öppettider</h2>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Måndag – Fredag</span>
          <span className="font-medium text-foreground">10:00 – 19:00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Lördag</span>
          <span className="font-medium text-foreground">10:00 – 15:00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Söndag</span>
          <span className="font-medium text-foreground">Stängt</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Öppettider kan variera mellan butiker. Större butiker i städer har ofta 
          öppet till 20:00 på vardagar och 17:00 på lördagar.
        </p>
      </div>
    </div>
  );
}
