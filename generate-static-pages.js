/**
 * generate-static-pages.js
 *
 * Post-build script that creates static HTML files for each SPA route.
 * GitHub Pages will serve these with 200 status so Googlebot can index them.
 *
 * Each page gets its own directory with an index.html containing:
 * - Correct <title>, <meta description>, <canonical>, OG tags
 * - The same JS/CSS bundle references as the main index.html
 * - Static HTML content for SEO (visible before JS hydrates)
 */

import fs from 'fs';
import path from 'path';

const DIST = path.resolve('dist');
const BASE_URL = 'https://arsystembolagetoppet.se';

// Read the built index.html to extract the asset references
const builtHtml = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8');

// Extract the <script> and <link> tags that Vite injected (the hashed asset refs)
const scriptMatch = builtHtml.match(/<script type="module" crossorigin src="[^"]+"><\/script>/);
const cssMatch = builtHtml.match(/<link rel="stylesheet" crossorigin href="[^"]+">/);
const assetScript = scriptMatch ? scriptMatch[0] : '';
const assetCss = cssMatch ? cssMatch[0] : '';

// Define all routes with their SEO metadata and static body content
const pages = [
  {
    path: '/systembolaget-oppettider',
    title: 'Systembolaget öppettider 2026 – Alla veckodagar & helgdagar',
    description: 'Kompletta öppettider för Systembolaget 2026. Måndag–fredag 10–19, lördag 10–15, söndag stängt. Se alla helgdagar och undantag.',
    keywords: 'systembolaget öppettider, systembolaget öppettider idag, systembolaget tider, öppettider systembolaget',
    h1: 'Systembolaget öppettider 2026',
    body: `<p>Systembolagets ordinarie öppettider: <strong>Måndag–Fredag 10:00–19:00</strong>, <strong>Lördag 10:00–15:00</strong>, <strong>Söndag: Stängt</strong>. Vissa större butiker har öppet till 20:00 på vardagar.</p>
           <h2>Öppettider per dag</h2>
           <ul><li>Måndag: 10:00–19:00</li><li>Tisdag: 10:00–19:00</li><li>Onsdag: 10:00–19:00</li><li>Torsdag: 10:00–19:00</li><li>Fredag: 10:00–19:00</li><li>Lördag: 10:00–15:00</li><li>Söndag: Stängt</li></ul>`,
  },
  {
    path: '/systembolaget-roda-dagar-2026',
    title: 'Systembolaget röda dagar 2026 – Alla helgdagar det är stängt',
    description: 'Komplett lista över alla röda dagar 2026 då Systembolaget är stängt. Jul, påsk, midsommar, nyår och fler. Planera dina inköp i tid.',
    keywords: 'systembolaget röda dagar, systembolaget helgdagar 2026, systembolaget stängt röda dagar',
    h1: 'Systembolaget röda dagar 2026',
    body: `<p><strong>Systembolaget är stängt på alla röda dagar i Sverige.</strong></p>
           <h2>Röda dagar 2026</h2>
           <ul><li>Nyårsdagen – 1 januari</li><li>Trettondedag jul – 6 januari</li><li>Långfredagen – 3 april</li><li>Påskafton – 4 april</li><li>Påskdagen – 5 april</li><li>Annandag påsk – 6 april</li><li>Första maj – 1 maj</li><li>Kristi himmelsfärdsdag – 14 maj</li><li>Sveriges nationaldag – 6 juni</li><li>Midsommarafton – 19 juni</li><li>Midsommardagen – 20 juni</li><li>Alla helgons dag – 31 oktober</li><li>Julafton – 24 december</li><li>Juldagen – 25 december</li><li>Annandag jul – 26 december</li><li>Nyårsafton – 31 december</li></ul>`,
  },
  {
    path: '/systembolaget-sondagsoppet',
    title: 'Är Systembolaget öppet på söndagar? – Svar & alternativ',
    description: 'Nej, Systembolaget har aldrig öppet på söndagar. Läs varför och se vilka alternativ du har. Öppettider lördag och andra dagar.',
    keywords: 'systembolaget söndag, systembolaget öppet söndag, systembolaget söndagsöppet, har systembolaget öppet på söndagar',
    h1: 'Har Systembolaget öppet på söndagar?',
    body: `<p><strong>Nej, Systembolaget är alltid stängt på söndagar.</strong> Det finns inga undantag, oavsett butik. Systembolaget har öppet måndag till lördag.</p>
           <h2>Alternativ på söndagar</h2>
           <ul><li>Handla på lördagen – öppet 10:00–15:00</li><li>Restauranger och barer serverar alkohol på söndagar</li><li>Beställ online via systembolaget.se</li></ul>`,
  },
  {
    path: '/systembolaget-midsommar',
    title: 'Har Systembolaget öppet på midsommar 2026? – Nej, stängt!',
    description: 'Systembolaget är stängt på midsommarafton och midsommardagen 2026. Handla senast torsdagen innan midsommar. Se öppettider.',
    keywords: 'systembolaget midsommar, systembolaget öppet midsommar, systembolaget midsommarafton, midsommar systembolaget öppettider',
    h1: 'Har Systembolaget öppet på midsommar?',
    body: `<p><strong>Nej, Systembolaget är stängt på midsommarafton och midsommardagen.</strong></p>
           <h2>Stängda dagar midsommar 2026</h2>
           <ul><li>Midsommarafton – fredag 19 juni (stängt)</li><li>Midsommardagen – lördag 20 juni (stängt)</li></ul>
           <p>Sista chansen att handla: <strong>Torsdag 18 juni 2026</strong> (öppet 10:00–19:00)</p>`,
  },
  {
    path: '/systembolaget-pask',
    title: 'Har Systembolaget öppet på påsk 2026? – Stängt långfredag till annandag',
    description: 'Systembolaget är stängt från långfredagen till och med annandag påsk 2026. Handla senast skärtorsdagen. Komplett guide.',
    keywords: 'systembolaget påsk, systembolaget öppet påsk, systembolaget påskafton, systembolaget långfredagen',
    h1: 'Har Systembolaget öppet på påsk?',
    body: `<p><strong>Nej, Systembolaget är stängt under hela påskhelgen</strong> – från långfredagen till och med annandag påsk.</p>
           <h2>Stängda dagar påsk 2026</h2>
           <ul><li>Långfredagen – 3 april (stängt)</li><li>Påskafton – 4 april (stängt)</li><li>Påskdagen – 5 april (stängt)</li><li>Annandag påsk – 6 april (stängt)</li></ul>
           <p>Sista chansen att handla: <strong>Skärtorsdag 2 april 2026</strong> (öppet 10:00–19:00)</p>`,
  },
  {
    path: '/systembolaget-jul',
    title: 'Har Systembolaget öppet på jul 2026? – Stängt 24–26 december',
    description: 'Systembolaget är stängt julafton, juldagen och annandag jul 2026. Handla senast 23 december. Se öppettider och tips.',
    keywords: 'systembolaget jul, systembolaget öppet julafton, systembolaget juldagen, systembolaget öppettider jul',
    h1: 'Har Systembolaget öppet på jul?',
    body: `<p><strong>Nej, Systembolaget är stängt under hela julhelgen</strong> – julafton, juldagen och annandag jul.</p>
           <h2>Stängda dagar jul 2026</h2>
           <ul><li>Julafton – 24 december (stängt)</li><li>Juldagen – 25 december (stängt)</li><li>Annandag jul – 26 december (stängt)</li></ul>
           <p>Sista chansen att handla: <strong>Onsdag 23 december 2026</strong> (öppet 10:00–19:00)</p>`,
  },
  {
    path: '/systembolaget-nyar',
    title: 'Har Systembolaget öppet på nyårsafton 2026? – Stängt 31 dec & 1 jan',
    description: 'Systembolaget är stängt nyårsafton 31 december och nyårsdagen 1 januari. Handla senast 30 december. Komplett guide.',
    keywords: 'systembolaget nyår, systembolaget nyårsafton, systembolaget öppet nyår, systembolaget 31 december',
    h1: 'Har Systembolaget öppet på nyår?',
    body: `<p><strong>Nej, Systembolaget är stängt på nyårsafton (31 december) och nyårsdagen (1 januari).</strong></p>
           <h2>Stängda dagar nyår</h2>
           <ul><li>Nyårsafton – 31 december (stängt)</li><li>Nyårsdagen – 1 januari (stängt)</li></ul>
           <p>Sista chansen att handla: <strong>Onsdag 30 december 2026</strong> (öppet 10:00–19:00)</p>`,
  },
  {
    path: '/systembolaget-oppet-imorgon',
    title: 'Har Systembolaget öppet imorgon? – Se öppettider',
    description: 'Kolla snabbt om Systembolaget har öppet imorgon. Se öppettider för imorgon och resten av veckan.',
    keywords: 'systembolaget öppet imorgon, har systembolaget öppet imorgon, systembolaget imorgon',
    h1: 'Har Systembolaget öppet imorgon?',
    body: `<p>Systembolagets öppettider: <strong>Måndag–Fredag 10:00–19:00</strong>, <strong>Lördag 10:00–15:00</strong>, <strong>Söndag: Stängt</strong>.</p>
           <p>Söndagar och röda dagar är alltid stängda.</p>`,
  },
  {
    path: '/nar-stanger-systembolaget',
    title: 'När stänger Systembolaget idag? – Se stängningstid nu',
    description: 'Se exakt när Systembolaget stänger idag. Öppettider vardagar, lördagar och information om helgdagar.',
    keywords: 'när stänger systembolaget, systembolaget stänger, systembolaget stängningstid, hur länge har systembolaget öppet',
    h1: 'När stänger Systembolaget idag?',
    body: `<p>Systembolaget stänger: <strong>Måndag–Fredag kl 19:00</strong>, <strong>Lördag kl 15:00</strong>. Stängt söndag och röda dagar.</p>
           <p>Vissa större butiker stänger kl 20:00 på vardagar.</p>`,
  },
];

function generateHtml(page) {
  const canonical = `${BASE_URL}${page.path}`;

  return `<!doctype html>
<html lang="sv">
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-6LTNE01S7F"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-6LTNE01S7F');
  </script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7151151877146222" crossorigin="anonymous"></script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${page.title}</title>
  <meta name="description" content="${page.description}" />
  <meta name="keywords" content="${page.keywords}" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:title" content="${page.title}" />
  <meta property="og:description" content="${page.description}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:locale" content="sv_SE" />
  <meta property="og:site_name" content="Är Systembolaget öppet?" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${page.title}" />
  <meta name="twitter:description" content="${page.description}" />
  <meta name="theme-color" content="#006650" />
  <meta name="author" content="arsystembolagetoppet.se" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  ${assetScript}
  ${assetCss}
</head>
<body>
  <div id="root">
    <div style="max-width:672px;margin:0 auto;padding:2rem 1rem;font-family:system-ui,sans-serif">
      <nav style="margin-bottom:1rem"><a href="/" style="color:#666;font-size:0.75rem">← Tillbaka till startsidan</a></nav>
      <h1 style="font-size:2rem;font-weight:800;margin-bottom:1rem">${page.h1}</h1>
      ${page.body}
      <hr style="margin:2rem 0"/>
      <nav>
        <p style="font-size:0.875rem;color:#666">Fler sidor:</p>
        <ul style="display:flex;flex-wrap:wrap;gap:0.5rem;list-style:none;padding:0;margin-top:0.5rem">
          <li><a href="/">Är Systembolaget öppet?</a></li>
          <li><a href="/systembolaget-oppettider">Öppettider</a></li>
          <li><a href="/systembolaget-roda-dagar-2026">Röda dagar 2026</a></li>
          <li><a href="/systembolaget-sondagsoppet">Söndagsöppet</a></li>
          <li><a href="/systembolaget-midsommar">Midsommar</a></li>
          <li><a href="/systembolaget-pask">Påsk</a></li>
          <li><a href="/systembolaget-jul">Jul</a></li>
          <li><a href="/systembolaget-nyar">Nyår</a></li>
        </ul>
      </nav>
      <footer style="margin-top:2rem;font-size:0.75rem;color:#888">
        <p>Den här sidan är inte officiellt kopplad till Systembolaget AB.
        Kontrollera alltid din lokala butiks öppettider på <a href="https://www.systembolaget.se/butiker-ombud/butik/" target="_blank" rel="noopener noreferrer">systembolaget.se</a></p>
      </footer>
    </div>
  </div>
</body>
</html>`;
}

// Generate files
let created = 0;
for (const page of pages) {
  const dir = path.join(DIST, page.path.slice(1)); // remove leading /
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, 'index.html');
  fs.writeFileSync(filePath, generateHtml(page), 'utf-8');
  created++;
  console.log(`  ✓ ${page.path}/index.html`);
}

console.log(`\n✅ Generated ${created} static pages for SEO`);

