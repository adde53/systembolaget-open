import { StatusDisplay } from '@/components/StatusDisplay';
import { StoreSearch } from '@/components/StoreSearch';
import { OpeningHours } from '@/components/OpeningHours';
import { HolidayInfo } from '@/components/HolidayInfo';
import { FAQ } from '@/components/FAQ';
import { SchemaMarkup } from '@/components/SchemaMarkup';

const Index = () => {
  const today = new Date().toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <SchemaMarkup />
      
      <div className="min-h-screen bg-background">
        {/* Header with update date */}
        <header className="pt-4 px-4 text-center">
          <p className="text-xs text-muted-foreground">
            Uppdaterad: {today}
          </p>
        </header>

        {/* Main content */}
        <main className="flex flex-col items-center px-4 py-8 sm:py-12">
          {/* H1 - Primary keyword */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-8 text-center">
            Är Systembolaget öppet?
          </h1>

          {/* Status display - Direct answer */}
          <StatusDisplay />

          {/* Store search */}
          <div className="mt-8 w-full max-w-md">
            <StoreSearch />
          </div>

          {/* Content sections */}
          <div className="mt-12 sm:mt-16 flex flex-col items-center gap-10 sm:gap-12 w-full px-4">
            <OpeningHours />
            <HolidayInfo />
            <FAQ />
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 px-4 text-center border-t border-border mt-12">
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Den här sidan är inte officiellt kopplad till Systembolaget AB. 
            Kontrollera alltid din lokala butiks öppettider på{' '}
            <a 
              href="https://www.systembolaget.se/butiker-ombud/butik/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              systembolaget.se
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};

export default Index;
