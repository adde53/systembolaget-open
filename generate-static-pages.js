/**
 * generate-static-pages.js
 * Post-build: creates static HTML per SPA route so GitHub Pages returns 200 (not 404).
 * Reads page metadata from page-data.json (with proper UTF-8 Swedish chars).
 */
import fs from 'fs';
import path from 'path';

const DIST = path.resolve('dist');
const BASE_URL = 'https://www.xn--rsystembolagetppet-ktb88a.se';

// Read built index.html to extract hashed asset references
const builtHtml = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8');
const scriptMatch = builtHtml.match(/<script type="module" crossorigin src="[^"]+"><\/script>/);
const cssMatch = builtHtml.match(/<link rel="stylesheet" crossorigin href="[^"]+">/);
const assetScript = scriptMatch ? scriptMatch[0] : '';
const assetCss = cssMatch ? cssMatch[0] : '';

// Read page data from JSON (preserves Swedish characters)
const pageData = JSON.parse(fs.readFileSync('page-data.json', 'utf-8'));
const pages = pageData.pages;

function generateHtml(page) {
  const canonical = `${BASE_URL}${page.path}`;
  const siteName = '\u00c4r Systembolaget \u00f6ppet?';
  const backLink = '\u2190 Tillbaka till startsidan';
  const footerText = 'Den h\u00e4r sidan \u00e4r inte officiellt kopplad till Systembolaget AB. Kontrollera alltid din lokala butiks \u00f6ppettider p\u00e5';

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
  <meta property="og:site_name" content="${siteName}" />
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
      <nav style="margin-bottom:1rem"><a href="/" style="color:#666;font-size:0.75rem">${backLink}</a></nav>
      <h1 style="font-size:2rem;font-weight:800;margin-bottom:1rem">${page.h1}</h1>
      ${page.body}
      <hr style="margin:2rem 0"/>
      <nav>
        <p style="font-size:0.875rem;color:#666">Fler sidor:</p>
        <ul style="display:flex;flex-wrap:wrap;gap:0.5rem;list-style:none;padding:0;margin-top:0.5rem">
${pages.map(p => `          <li><a href="${p.path}">${p.h1}</a></li>`).join('\n')}
          <li><a href="/">${siteName}</a></li>
        </ul>
      </nav>
      <footer style="margin-top:2rem;font-size:0.75rem;color:#888">
        <p>${footerText} <a href="https://www.systembolaget.se/butiker-ombud/butik/" target="_blank" rel="noopener noreferrer">systembolaget.se</a></p>
      </footer>
    </div>
  </div>
</body>
</html>`;
}

let created = 0;
for (const page of pages) {
  const dir = path.join(DIST, page.path.slice(1));
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, 'index.html');
  fs.writeFileSync(filePath, generateHtml(page), 'utf-8');
  created++;
  console.log(`  OK ${page.path}/index.html`);
}

console.log(`\nGenerated ${created} static pages for SEO`);

// Generate redirect pages
const redirects = [
  { from: '/systembolaget-sondagsoppet', to: '/systembolaget-oppet-sondag' },
];

for (const r of redirects) {
  const dir = path.join(DIST, r.from.slice(1));
  fs.mkdirSync(dir, { recursive: true });
  const html = `<!doctype html>
<html lang="sv">
<head>
  <meta charset="UTF-8"/>
  <link rel="canonical" href="${BASE_URL}${r.to}"/>
  <meta http-equiv="refresh" content="0;url=${r.to}"/>
  <title>Redirect</title>
</head>
<body><a href="${r.to}">Klicka h\u00e4r</a></body>
</html>`;
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
  console.log(`  REDIRECT ${r.from} -> ${r.to}`);
}

