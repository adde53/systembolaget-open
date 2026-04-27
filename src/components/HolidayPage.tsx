import { SEOHead } from '@/components/SEOHead';
import { PageLayout } from '@/components/PageLayout';

interface HolidayPageProps {
  title: string;
  h1: string;
  description: string;
  canonical: string;
  keywords: string;
  answer: string;
  closedDays: string[];
  tip: string;
  lastShoppingDay: string;
}

export function HolidayPage({ title, h1, description, canonical, keywords, answer, closedDays, tip, lastShoppingDay }: HolidayPageProps) {
  return (
    <>
      <SEOHead title={title} description={description} canonical={canonical} keywords={keywords} />
      <PageLayout currentPath={canonical}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">{h1}</h1>

        <div className="bg-closed text-closed-foreground px-12 py-6 rounded-2xl shadow-2xl mb-8">
          <p className="text-6xl sm:text-7xl font-black">NEJ</p>
        </div>

        <div className="w-full max-w-2xl space-y-8">
          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <p className="text-foreground text-lg mb-4">{answer}</p>
          </section>

          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Stängda dagar</h2>
            <ul className="space-y-2">
              {closedDays.map(day => (
                <li key={day} className="flex items-center gap-2 bg-accent/50 rounded-lg px-4 py-3 border border-border">
                  <span className="text-closed font-bold">🔴</span>
                  <span className="text-foreground font-medium">{day}</span>
                  <span className="ml-auto text-sm font-semibold text-closed">Stängt</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tips</h2>
            <p className="text-muted-foreground mb-2">{tip}</p>
            <p className="text-foreground font-semibold">🛒 Sista chansen att handla: <strong>{lastShoppingDay}</strong></p>
          </section>
        </div>
      </PageLayout>
    </>
  );
}

