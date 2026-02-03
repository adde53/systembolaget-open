/// <reference types="google.maps" />
import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Clock, ExternalLink } from 'lucide-react';

interface StoreResult {
  name: string;
  address: string;
  isOpen: boolean | null;
  openingHours: string[];
  placeId: string;
}

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
    const checkGoogleMaps = () => {
      if (window.google?.maps?.places) {
        setApiReady(true);
        if (mapDivRef.current && !placesServiceRef.current) {
          placesServiceRef.current = new window.google.maps.places.PlacesService(mapDivRef.current);
        }
      } else {
        setTimeout(checkGoogleMaps, 100);
      }
    };
    checkGoogleMaps();
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
          .map((place) => ({
            name: place.name || 'Okänd butik',
            address: place.formatted_address || '',
            isOpen: place.opening_hours?.isOpen() ?? null,
            openingHours: [],
            placeId: place.place_id || '',
          }));

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
    if (!placesServiceRef.current || !store.placeId) {
      setSelectedStore(store);
      return;
    }

    setLoading(true);

    const request: google.maps.places.PlaceDetailsRequest = {
      placeId: store.placeId,
      fields: ['opening_hours', 'formatted_phone_number'],
      language: 'sv',
    };

    placesServiceRef.current.getDetails(request, (place, status) => {
      setLoading(false);

      if (status === google.maps.places.PlacesServiceStatus.OK && place) {
        setSelectedStore({
          ...store,
          openingHours: place.opening_hours?.weekday_text || [],
          isOpen: place.opening_hours?.isOpen() ?? store.isOpen,
        });
      } else {
        setSelectedStore(store);
        console.error('Place details error:', status);
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
      {/* Hidden div for PlacesService */}
      <div ref={mapDivRef} style={{ display: 'none' }} />

      {/* Search description */}
      <p className="text-sm text-muted-foreground text-center mb-3">
        Vill du kolla öppettiderna för en specifik butik?
      </p>

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
        <p className="text-sm text-destructive mt-3 text-center">{error}</p>
      )}

      {/* Results list */}
      {results.length > 0 && !selectedStore && (
        <div className="mt-4 space-y-2">
          {results.map((store) => (
            <button
              key={store.placeId}
              onClick={() => getStoreDetails(store)}
              className="w-full text-left p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{store.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{store.address}</p>
                  {store.isOpen !== null && (
                    <span className={`text-xs font-medium ${store.isOpen ? 'text-success' : 'text-closed'}`}>
                      {store.isOpen ? '● Öppet nu' : '● Stängt'}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Selected store details */}
      {selectedStore && (
        <div className="mt-4 p-4 bg-card border border-border rounded-lg">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <h3 className="font-semibold text-foreground">{selectedStore.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedStore.address}</p>
            </div>
            {selectedStore.isOpen !== null && (
              <span className={`shrink-0 px-2 py-1 rounded text-xs font-bold ${
                selectedStore.isOpen 
                  ? 'bg-success text-success-foreground' 
                  : 'bg-closed text-closed-foreground'
              }`}>
                {selectedStore.isOpen ? 'ÖPPET' : 'STÄNGT'}
              </span>
            )}
          </div>

          {selectedStore.openingHours.length > 0 && (
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-sm font-medium text-foreground mb-2">
                <Clock className="h-4 w-4" />
                <span>Öppettider</span>
              </div>
              {selectedStore.openingHours.map((hours, index) => (
                <p key={index} className="text-sm text-muted-foreground">
                  {hours}
                </p>
              ))}
            </div>
          )}

          <a
            href={`https://www.google.com/maps/place/?q=place_id:${selectedStore.placeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-3 text-sm text-primary hover:underline"
          >
            Visa på Google Maps
            <ExternalLink className="h-3 w-3" />
          </a>

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
