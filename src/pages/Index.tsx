import { StatusDisplay } from '@/components/StatusDisplay';
import { OpeningHours } from '@/components/OpeningHours';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Question */}
        <h2 className="text-2xl sm:text-3xl font-medium text-muted-foreground mb-8 text-center">
          Är Systembolaget öppet?
        </h2>

        {/* Status display */}
        <StatusDisplay />
      </main>

      {/* Footer with opening hours */}
      <footer className="pb-8 px-4 flex flex-col items-center gap-6">
        <OpeningHours />
        
        <p className="text-xs text-muted-foreground/60 text-center max-w-md">
          Den här sidan är inte officiellt kopplad till Systembolaget. 
          Kontrollera alltid din lokala butiks öppettider på{' '}
          <a 
            href="https://www.systembolaget.se" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-muted-foreground transition-colors"
          >
            systembolaget.se
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Index;
