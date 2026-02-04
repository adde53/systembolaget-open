
Målet: När man valt en butik ska “Öppna i Google Maps” fungera på iOS och alltid peka på exakt rätt plats (inte “Inga resultat”).

## Vad som faktiskt är problemet (orsak)
1) Appen bygger idag (i praktiken) Google Maps-länkar från text (butiksnamn + adress). På mobil kan det ibland ge “Inga resultat” i Google Maps, särskilt om adressformatet blir långt/konstigt eller om Google Maps tolkar sökningen annorlunda i appen.
2) På iOS öppnas `https://www.google.com/maps/...` ofta i webbläsaren istället för direkt i Google Maps-appen, om man inte deep-linkar med `comgooglemaps://...`.

## Lösningsstrategi (robust)
- Sluta förlita oss på “sök-text-länkar” som primär källa.
- Använd exakta koordinater (lat/lng) och/eller Place ID, som vi redan får från Google Places.
- På iOS: försök först öppna Google Maps-appen via deep link (`comgooglemaps://...`). Om appen inte finns/inte öppnar, fallback till webblänk.
- Webblänkens primärvariant ska vara koordinater:  
  `https://www.google.com/maps/search/?api=1&query=LAT,LNG`  
  (detta ger i princip alltid rätt punkt, oavsett namn/adress).

## Ändringar som ska göras (endast frontend)
### 1) Utöka datamodellen för butik
**Fil:** `src/components/StoreSearch.tsx`  
- Utöka `StoreResult` med:
  - `lat?: number`
  - `lng?: number`

### 2) Spara koordinater redan vid sökresultat
I `textSearch(...).map(...)`:
- Läs `place.geometry?.location` och spara:
  - `lat: place.geometry?.location?.lat?.()`
  - `lng: place.geometry?.location?.lng?.()`

Detta gör att vi ofta inte ens behöver ett extra `getDetails`-anrop för att kunna öppna kartan korrekt.

### 3) Förbättra getDetails (om vi ändå hämtar mer info)
I `getStoreDetails`:
- Uppdatera `fields` till att inkludera `geometry` (och gärna `formatted_address` om vi vill snygga adressen):
  - `fields: ['place_id', 'name', 'url', 'geometry', 'formatted_address', 'opening_hours']` (minst `geometry`)
- När svaret kommer: sätt `lat/lng` från `place.geometry.location`.

### 4) Lägg tillbaka/lägg till en tydlig “Öppna i Google Maps”-knapp i butiksvyn
**Fil:** `src/components/StoreSearch.tsx`  
I `selectedStore`-sektionen, lägg en knapp (t.ex. ovanför “← Sök igen”):
- Text: “Öppna i Google Maps”
- Ikon: `ExternalLink` (importen finns redan)

### 5) Implementera en central funktion som bygger “rätt” länk + öppnar på rätt sätt
Skapa en helper i komponenten, t.ex.:
- `buildGoogleMapsWebUrl(store)`:
  - om `lat/lng` finns: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
  - annars om `placeId` finns: `https://www.google.com/maps/place/?q=place_id:${placeId}`
  - annars fallback: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' ' + address)}`
- `openGoogleMaps(store)`:
  - Om iOS:
    - Försök deep link först:
      - om `lat/lng`: `comgooglemaps://?q=${lat},${lng}(${encodeURIComponent(name)})&center=${lat},${lng}&zoom=16`
      - annars om `placeId`: `comgooglemaps://?q=place_id:${placeId}`
      - annars: `comgooglemaps://?q=${encodeURIComponent(name + ' ' + address)}`
    - Kör en fallback efter ~800ms till webUrl (t.ex. `window.location.href = webUrl`) om appen inte öppnas.
  - På andra plattformar:
    - öppna `webUrl` via `window.open(webUrl, '_blank', 'noopener,noreferrer')`.

Viktigt: På iOS är det ofta bättre att använda `window.location.href = appUrl` än `window.open` för deep links.

### 6) (Valfritt men rekommenderat) “Kopiera länk”-fallback
Om användaren kör i en miljö som blockerar öppning:
- Lägg en sekundär knapp “Kopiera kartlänk”
- `navigator.clipboard.writeText(webUrl)` med fallback till en `prompt(...)`.

## Testplan (för att verifiera att det verkligen är fixat)
1) iPhone med Google Maps installerat:
   - Sök “Stockholm”, välj en butik, tryck “Öppna i Google Maps”
   - Förväntat: Google Maps-appen öppnas direkt på exakt rätt butik (inte “Inga resultat”).
2) iPhone utan Google Maps (eller om deep link misslyckas):
   - Förväntat: den öppnar webbkartan med rätt punkt (via koordinater).
3) Kontrollera minst 2–3 städer (t.ex. Stockholm, Göteborg, Malmö) för att säkerställa att koordinatflödet fungerar konsekvent.

## Filer som kommer att ändras
- `src/components/StoreSearch.tsx` (enda filen som behövs för fixen)
