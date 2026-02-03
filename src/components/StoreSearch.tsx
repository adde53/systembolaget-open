/// <reference types="google.maps" />
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Clock, ExternalLink } from 'lucide-react';

interface StoreResult {
  name: string;
  address: string;
  isOpen: boolean | null;
  openingHours: string[];
  placeId: string;
}

// Helper function to determine if store is open based on current day/time
const parseOpeningHours = (weekdayText: string[]): boolean | null => {
  if (!weekdayText || weekdayText.length === 0) return null;

  const now = new Date();
  const days = ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'];
  const currentDay = days[now.getDay()].toLowerCase();
  const currentTime = now.getHours() * 60 + now.getMinutes(); // minutes since midnight

  // Find today's hours
  const todayHours = weekdayText.find(text =>
    text.toLowerCase().includes(currentDay)
  );

  if (!todayHours) return null;

  // Check if closed
  if (todayHours.toLowerCase().includes('stängt')) return false;

  // Parse time ranges (e.g., "10:00–20:00" or "10.00–20.00")
  const timeMatch = todayHours.match(/(\d{1,2})[:.:](\d{2})[–-](\d{1,2})[:.:](\d{2})/);
  if (!timeMatch) return null;

  const openHour = parseInt(timeMatch[1]);
  const openMin = parseInt(timeMatch[2]);
  const closeHour = parseInt(timeMatch[3]);
  const closeMin = parseInt(timeMatch[4]);

  const openTime = openHour * 60 + openMin;
  const closeTime = closeHour * 60 + closeMin;

  return currentTime >= openTime && currentTime < closeTime;
};

export function StoreSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<StoreResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiReady, setApiReady] = useState(false);

  useEffect(() => {
    // Load Google Maps script dynamically with API key from environment
    const loadGoogleMapsScript = () => {
      // Check if script is already loaded
      if (window.google?.maps?.places) {
        setApiReady(true);
        return;
      }

      // Check if script tag already exists
      if (document.querySelector('script[src*="maps.googleapis.com"]')) {
        // Script is loading, wait for it
        let attempts = 0;
        const maxAttempts = 50;
        const checkLoaded = () => {
          if (window.google?.maps?.places) {
            setApiReady(true);
            setError(null);
          } else {
            attempts++;
            if (attempts < maxAttempts) {
              setTimeout(checkLoaded, 100);
            } else {
              setError('Google Maps kunde inte laddas. Kontrollera att API:et är aktiverat.');
            }
          }
        };
        checkLoaded();
        return;
      }

      // Create and load the script
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      if (!apiKey) {
        setError('Google Maps API-nyckel saknas. Kontakta administratören.');
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.google?.maps?.places) {
          setApiReady(true);
          setError(null);
        }
      };
      script.onerror = () => {
        setError('Google Maps kunde inte laddas. Kontrollera att API:et är aktiverat.');
      };
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  const searchStores = async () => {
    if (!query.trim()) return;
    
    if (!apiReady) {
      setError('Google Maps laddas. Försök igen om en stund.');
      return;
    }

    setLoading(true);
    setError(null);
    setSelectedStore(null);

    try {
      // Use the new Place API searchByText
      const { Place } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;

      const request = {
        textQuery: `Systembolaget ${query}`,
        fields: ['displayName', 'formattedAddress', 'id', 'currentOpeningHours'],
        language: 'sv',
        maxResultCount: 5,
      };

      // @ts-ignore - searchByText is part of the new API
      const { places } = await Place.searchByText(request);

      if (!places || places.length === 0) {
        setLoading(false);
        setError('Inga Systembolaget-butiker hittades. Prova ett annat sökord.');
        return;
      }

      // Filter for Systembolaget stores
      const filteredPlaces = places.filter((place: any) =>
        place.displayName?.toLowerCase().includes('systembolaget')
      );

      if (filteredPlaces.length === 0) {
        setLoading(false);
        setError('Inga Systembolaget-butiker hittades. Prova ett annat sökord.');
        return;
      }

      // Map to our store format
      const stores: StoreResult[] = filteredPlaces.map((place: any) => {
        const weekdayText = place.currentOpeningHours?.weekdayDescriptions || [];
        let isOpenNow: boolean | null = null;

        // Try to get isOpen status
        try {
          isOpenNow = place.currentOpeningHours?.isOpen() ?? null;
        } catch (e) {
          console.log('isOpen() not available, parsing manually');
        }

        // Fallback to manual parsing
        if (isOpenNow === null && weekdayText.length > 0) {
          isOpenNow = parseOpeningHours(weekdayText);
        }

        return {
          name: place.displayName || 'Okänd butik',
          address: place.formattedAddress || '',
          isOpen: isOpenNow,
          openingHours: weekdayText,
          placeId: place.id || '',
        };
      });

      setResults(stores);
      setLoading(false);

    } catch (error) {
      console.error('Search error:', error);
      setError('Ett fel uppstod vid sökning. Försök igen.');
      setLoading(false);
    }
  };

  const getStoreDetails = (store: StoreResult) => {
    // With the new Place API, we already have all data from the search
    // No need to fetch details separately
    setSelectedStore(store);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchStores();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Hidden div for PlacesService - needed for URL fetching */}
      <div ref={mapDivRef} style={{ display: 'none' }} />

      {/* Section heading */}
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold text-foreground mb-2">
          Sök din butik
        </h2>
        <p className="text-sm text-muted-foreground">
          Vill du kolla öppettiderna för en specifik butik?
        </p>
      </div>

      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Sök butik (t.ex. Stockholm, Göteborg...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-4"
        />
      </div>

      {/* Search button */}
      <button
        onClick={searchStores}
        disabled={loading || !query.trim() || !apiReady}
        className="w-full mt-2 bg-primary text-primary-foreground py-2 px-4 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Söker...' : 'Sök butik'}
      </button>

      {/* Error message */}
      {error && (
        <div className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-sm text-destructive font-medium">{error}</p>
          {!apiReady && (
            <p className="text-xs text-muted-foreground mt-2">
              Tips: Kontrollera att Places API är aktiverat i Google Cloud Console.
            </p>
          )}
        </div>
      )}

      {/* Results list */}
      {results.length > 0 && !selectedStore && (
        <div className="mt-4 space-y-3">
          {results.map((store) => (
            <button
              key={store.placeId}
              onClick={() => getStoreDetails(store)}
              className="w-full text-left p-4 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex items-start gap-3">
                {/* JA/NEJ Status Box - Always show */}
                <div className={`shrink-0 px-4 py-2 rounded-lg shadow-md ${
                  store.isOpen === null
                    ? 'bg-warning text-warning-foreground'
                    : store.isOpen
                    ? 'bg-success text-success-foreground'
                    : 'bg-closed text-closed-foreground'
                }`}>
                  <p className="text-2xl font-black">
                    {store.isOpen === null ? '?' : store.isOpen ? 'JA' : 'NEJ'}
                  </p>
                </div>

                {/* Store Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-lg mb-1">{store.name}</p>
                  <div className="flex items-start gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                    <p className="text-sm">{store.address}</p>
                  </div>
                  {store.isOpen === null && store.openingHours.length === 0 && (
                    <p className="text-xs text-warning mt-1">
                      Öppettider ej tillgängliga
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    Klicka för mer info →
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Selected store details */}
      {selectedStore && (
        <div className="mt-4 p-5 bg-card border border-border rounded-lg">
          {/* JA/NEJ Status - Prominent - Always show */}
          <div className="flex justify-center mb-4">
            <div className={`px-8 py-4 rounded-xl shadow-lg ${
              selectedStore.isOpen === null
                ? 'bg-warning text-warning-foreground'
                : selectedStore.isOpen
                ? 'bg-success text-success-foreground'
                : 'bg-closed text-closed-foreground'
            }`}>
              <p className="text-4xl font-black">
                {selectedStore.isOpen === null ? '?' : selectedStore.isOpen ? 'JA' : 'NEJ'}
              </p>
            </div>
          </div>

          {/* Store Name and Address */}
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-foreground mb-1">{selectedStore.name}</h3>
            <p className="text-sm text-muted-foreground">{selectedStore.address}</p>
          </div>

          {/* Opening Hours */}
          {selectedStore.openingHours.length > 0 && (
            <div className="space-y-1 mb-4">
              <div className="flex items-center justify-center gap-1 text-sm font-semibold text-foreground mb-3">
                <Clock className="h-4 w-4" />
                <span>Öppettider</span>
              </div>
              {selectedStore.openingHours.map((hours, index) => (
                <p key={index} className="text-sm text-muted-foreground text-center">
                  {hours}
                </p>
              ))}
            </div>
          )}

          {/* Google Maps Link - Uses native URL for mobile app support */}
          <a
            href={selectedStore.url || `https://www.google.com/maps/place/?q=place_id:${selectedStore.placeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 w-full py-2 px-4 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Visa på Google Maps
            <ExternalLink className="h-4 w-4" />
          </a>

          {/* Back Button */}
          <button
            onClick={() => {
              setSelectedStore(null);
              setResults([]);
              setQuery('');
            }}
            className="block w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Sök igen
          </button>
        </div>
      )}
    </div>
  );
}
