import { faqs } from './FAQ';

export function SchemaMarkup() {
  const today = new Date().toISOString().split('T')[0];
  
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Systembolaget",
    "description": "Sveriges statliga detaljhandelsmonopol för försäljning av alkoholdrycker",
    "url": "https://www.systembolaget.se",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "10:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "15:00"
      }
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Är Systembolaget öppet idag? Se öppettider nu",
    "description": "Kolla om Systembolaget är öppet idag, dagens öppettider och avvikande tider för helger och röda dagar.",
    "datePublished": "2024-01-01",
    "dateModified": today,
    "inLanguage": "sv-SE",
    "url": "https://arsystembolagetoppet.se/",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Är Systembolaget öppet?",
      "url": "https://arsystembolagetoppet.se/"
    }
  };

  // Speakable schema for voice search (Google Assistant)
  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", ".status-answer"]
    },
    "url": "https://arsystembolagetoppet.se/"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
    </>
  );
}
