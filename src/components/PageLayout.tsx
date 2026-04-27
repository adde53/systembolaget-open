import { ReactNode } from 'react';
import { InternalLinks } from './InternalLinks';
import { Link } from 'react-router-dom';

interface PageLayoutProps {
  children: ReactNode;
  currentPath: string;
}

export function PageLayout({ children, currentPath }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="pt-4 px-4 text-center">
        <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          ← Tillbaka till startsidan
        </Link>
      </header>
      <main className="px-4 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          {children}
          <InternalLinks exclude={currentPath} />
        </div>
      </main>
      <footer className="py-8 px-4 text-center border-t border-border mt-12">
        <nav aria-label="Extern länk">
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Den här sidan är inte officiellt kopplad till Systembolaget AB.
            Kontrollera alltid din lokala butiks öppettider på{' '}
            <a href="https://www.systembolaget.se/butiker-ombud/butik/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">
              systembolaget.se
            </a>
          </p>
        </nav>
      </footer>
    </div>
  );
}

