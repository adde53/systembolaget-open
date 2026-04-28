import { Link } from 'react-router-dom';

interface InternalLinksProps {
  exclude?: string;
}

const links = [
  { to: '/', label: 'Är Systembolaget öppet idag?' },
  { to: '/systembolaget-oppettider', label: 'Systembolaget öppettider' },
  { to: '/systembolaget-roda-dagar-2026', label: 'Röda dagar 2026' },
  { to: '/systembolaget-oppet-sondag', label: 'Öppet söndag?' },
  { to: '/systembolaget-midsommar', label: 'Midsommar' },
  { to: '/systembolaget-pask', label: 'Påsk' },
  { to: '/systembolaget-jul', label: 'Jul' },
  { to: '/systembolaget-nyar', label: 'Nyår' },
  { to: '/systembolaget-oppet-imorgon', label: 'Öppet imorgon?' },
  { to: '/nar-stanger-systembolaget', label: 'När stänger Systembolaget?' },
  { to: '/systembolaget-1-maj-oppettider', label: '1 maj öppettider' },
  { to: '/systembolaget-pask-oppettider', label: 'Påsk öppettider' },
  { to: '/systembolaget-fredag-oppettider', label: 'Fredag öppettider' },
  { to: '/systembolaget-oppen-idag', label: 'Öppet idag?' },
  { to: '/systembolaget-oppettider-2026', label: 'Öppettider 2026' },
];

export function InternalLinks({ exclude }: InternalLinksProps) {
  const filtered = links.filter(l => l.to !== exclude);
  return (
    <nav aria-label="Relaterade sidor" className="w-full max-w-2xl mt-8">
      <h2 className="text-lg font-bold text-foreground mb-3">Relaterade sidor</h2>
      <div className="flex flex-wrap gap-2">
        {filtered.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className="bg-card border border-border px-3 py-1.5 rounded-lg text-sm text-foreground hover:bg-accent transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

