/// <reference types="google.maps" />
import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Clock, ExternalLink } from 'lucide-react';

interface StoreResult {
  name: string;
  address: string;
  isOpen: boolean | null;
  openingHours: string[];
  placeId: string;
  url?: string;
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

  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);
  const mapDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Google Maps script dynamically with API key from environment
    const loadGoogleMapsScript = () => {
      // Check if script is already loaded
      if (window.google?.maps?.places) {
        setApiReady(true);
        // Initialize PlacesService
        if (mapDivRef.current && !placesServiceRef.current) {
          placesServiceRef.current = new window.google.maps.places.PlacesService(mapDivRef.current);
        }
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
            // Initialize PlacesService
            if (mapDivRef.current && !placesServiceRef.current) {
              placesServiceRef.current = new window.google.maps.places.PlacesService(mapDivRef.current);
            }
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
          // Initialize PlacesService
          if (mapDivRef.current && !placesServiceRef.current) {
            placesServiceRef.current = new window.google.maps.places.PlacesService(mapDivRef.current);
          }
        }
      };
      script.onerror = () => {
        setError('Google Maps kunde inte laddas. Kontrollera att API:et är aktiverat.');
      };
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  const searchStores = () => {
    if (!query.trim()) return;
    
    if (!apiReady || !placesServiceRef.current) {
      setError('Google Maps laddas. Försök igen om en stund.');
      return;
    }

    setLoading(true);
    setError(null);
    setSelectedStore(null);

    const request: google.maps.places.TextSearchRequest = {
      query: `Systembolaget ${query}`,
      language: 'sv',
    };

    placesServiceRef.current.textSearch(request, (results, status) => {
      setLoading(false);

      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const stores = results
          .filter((place) =>
            place.name?.toLowerCase().includes('systembolaget')
          )
          .slice(0, 5)
          .map((place) => {
            const weekdayText = place.opening_hours?.weekday_text || [];
            let isOpenNow: boolean | null = null;

            // Try to get isOpen status
            try {
              isOpenNow = place.opening_hours?.isOpen() ?? null;
            } catch (e) {
              console.log('isOpen() not available, parsing manually');
            }

            // Fallback to manual parsing
            if (isOpenNow === null && weekdayText.length > 0) {
              isOpenNow = parseOpeningHours(weekdayText);
            }

            return {
              name: place.name || 'Okänd butik',
              address: place.formatted_address || '',
              isOpen: isOpenNow,
              openingHours: weekdayText,
              placeId: place.place_id || '',
            };
          });

        setResults(stores);

        if (stores.length === 0) {
          setError('Inga Systembolaget-butiker hittades. Prova ett annat sökord.');
        }
      } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        setResults([]);
        setError('Inga butiker hittades.');
      } else {
        setResults([]);
        setError('Ett fel uppstod vid sökning. Försök igen.');
        console.error('Places search error:', status);
      }
    });
  };

  const getStoreDetails = (store: StoreResult) => {
    console.log('getStoreDetails called for:', store.name, 'placeId:', store.placeId);

    // Fetch the Google Maps URL for mobile app support
    if (!placesServiceRef.current || !store.placeId) {
      console.log('PlacesService not ready or no placeId, showing store without URL');
      setSelectedStore(store);
      return;
    }

    // If we already have the URL, just show the store
    if (store.url) {
      console.log('Already have URL:', store.url);
      setSelectedStore(store);
      return;
    }

    console.log('Fetching URL from PlacesService...');
    setLoading(true);

    const request: google.maps.places.PlaceDetailsRequest = {
      placeId: store.placeId,
      fields: ['url', 'name', 'website', 'place_id'],
      language: 'sv',
    };

    placesServiceRef.current.getDetails(request, (place, status) => {
      setLoading(false);
      console.log('PlacesService getDetails response:', {
        status,
        hasUrl: !!place?.url,
        url: place?.url,
        place_id: place?.place_id,
        name: place?.name
      });

      if (status === google.maps.places.PlacesServiceStatus.OK && place) {
        if (place.url) {
          console.log('✅ Got native Google Maps URL:', place.url);
        } else {
          console.log('⚠️ No URL in response, will use fallback');
        }

        setSelectedStore({
          ...store,
          url: place.url || undefined,
        });
      } else {
        // Fallback to showing store without URL
        console.error('❌ Failed to fetch place URL. Status:', status);
        setSelectedStore(store);
      }
    });
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

          {/* Google Maps Link - Using geo: URI for guaranteed mobile compatibility */}
          <a
            href={`geo:0,0?q=${encodeURIComponent(selectedStore.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              console.log('Opening with geo: URI for address:', selectedStore.address);
            }}
            className="flex items-center justify-center gap-1 w-full py-2 px-4 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Visa på Google Maps
            <ExternalLink className="h-4 w-4" />
          </a>

          {/* Info message */}
          <p className="text-xs text-muted-foreground text-center mt-2">
            Öppnar i din karta-app
          </p>

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
