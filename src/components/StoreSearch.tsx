import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Clock, ExternalLink } from 'lucide-react';

interface StoreResult {
  name: string;
  address: string;
  isOpen: boolean | null;
  openingHours: string[];
  placeId: string;
}

// NOTE: Replace with your Google Places API key (restrict it to your domain in Google Cloud Console)
const GOOGLE_API_KEY = '';

export function StoreSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<StoreResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const searchStores = async () => {
    if (!query.trim()) return;
    
    if (!GOOGLE_API_KEY) {
      setError('Google API-nyckel saknas. Kontakta administratören.');
      return;
    }

    setLoading(true);
    setError(null);
    setSelectedStore(null);

    try {
      // Search for Systembolaget stores using Google Places Text Search
      const searchQuery = `Systembolaget ${query}`;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&key=${GOOGLE_API_KEY}&language=sv`
      );

      if (!response.ok) {
        throw new Error('Kunde inte söka efter butiker');
      }

      const data = await response.json();

      if (data.status === 'REQUEST_DENIED') {
        setError('API-nyckeln är ogiltig eller saknar behörighet.');
        setResults([]);
        return;
      }

      if (data.results && data.results.length > 0) {
        // Filter to only Systembolaget stores
        const stores = data.results
          .filter((place: any) => 
            place.name.toLowerCase().includes('systembolaget')
          )
          .slice(0, 5)
          .map((place: any) => ({
            name: place.name,
            address: place.formatted_address,
            isOpen: place.opening_hours?.open_now ?? null,
            openingHours: [],
            placeId: place.place_id,
          }));

        setResults(stores);
        
        if (stores.length === 0) {
          setError('Inga Systembolaget-butiker hittades. Prova ett annat sökord.');
        }
      } else {
        setResults([]);
        setError('Inga butiker hittades.');
      }
    } catch (err) {
      setError('Ett fel uppstod vid sökning. Försök igen.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStoreDetails = async (store: StoreResult) => {
    if (!GOOGLE_API_KEY) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${store.placeId}&fields=opening_hours,formatted_phone_number&key=${GOOGLE_API_KEY}&language=sv`
      );

      const data = await response.json();

      if (data.result?.opening_hours?.weekday_text) {
        setSelectedStore({
          ...store,
          openingHours: data.result.opening_hours.weekday_text,
          isOpen: data.result.opening_hours.open_now ?? store.isOpen,
        });
      } else {
        setSelectedStore(store);
      }
    } catch (err) {
      setSelectedStore(store);
      console.error('Details error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchStores();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
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
        disabled={loading || !query.trim()}
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
