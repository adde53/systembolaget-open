# -*- coding: utf-8 -*-
"""Write page-data.json with proper UTF-8 Swedish characters."""
import json

pages = [
    {
        "path": "/systembolaget-oppettider",
        "title": "Systembolaget \u00f6ppettider 2026 \u2013 Idag, vardagar & helgdagar",
        "description": "Systembolaget \u00f6ppettider 2026: m\u00e5n\u2013fre 10\u201319, l\u00f6rdag 10\u201315, s\u00f6ndag st\u00e4ngt. Se avvikande tider vid helgdagar och r\u00f6da dagar.",
        "keywords": "systembolaget \u00f6ppettider 2026, systembolaget \u00f6ppettider, systembolaget \u00f6ppettider idag, systembolaget tider",
        "h1": "Systembolaget \u00f6ppettider 2026",
        "body": "<p>Systembolagets ordinarie \u00f6ppettider: <strong>M\u00e5ndag\u2013Fredag 10:00\u201319:00</strong>, <strong>L\u00f6rdag 10:00\u201315:00</strong>, <strong>S\u00f6ndag: St\u00e4ngt</strong>.</p><h2>\u00d6ppettider per dag</h2><ul><li>M\u00e5ndag: 10:00\u201319:00</li><li>Tisdag: 10:00\u201319:00</li><li>Onsdag: 10:00\u201319:00</li><li>Torsdag: 10:00\u201319:00</li><li>Fredag: 10:00\u201319:00</li><li>L\u00f6rdag: 10:00\u201315:00</li><li>S\u00f6ndag: St\u00e4ngt</li></ul>"
    },
    {
        "path": "/systembolaget-roda-dagar-2026",
        "title": "R\u00f6da dagar 2026 \u2013 N\u00e4r har Systembolaget st\u00e4ngt?",
        "description": "Alla r\u00f6da dagar och helgdagar 2026 d\u00e5 Systembolaget h\u00e5ller st\u00e4ngt. Se datum f\u00f6r p\u00e5sk, midsommar, jul och ny\u00e5r.",
        "keywords": "systembolaget r\u00f6da dagar, systembolaget helgdagar 2026, systembolaget st\u00e4ngt r\u00f6da dagar",
        "h1": "Systembolaget r\u00f6da dagar 2026",
        "body": "<p><strong>Systembolaget \u00e4r st\u00e4ngt p\u00e5 alla r\u00f6da dagar i Sverige.</strong></p><h2>R\u00f6da dagar 2026</h2><ul><li>Ny\u00e5rsdagen \u2013 1 januari</li><li>Trettondedag jul \u2013 6 januari</li><li>L\u00e5ngfredagen \u2013 3 april</li><li>P\u00e5skafton \u2013 4 april</li><li>P\u00e5skdagen \u2013 5 april</li><li>Annandag p\u00e5sk \u2013 6 april</li><li>F\u00f6rsta maj \u2013 1 maj</li><li>Kristi himmelsf\u00e4rdsdag \u2013 14 maj</li><li>Sveriges nationaldag \u2013 6 juni</li><li>Midsommarafton \u2013 19 juni</li><li>Midsommardagen \u2013 20 juni</li><li>Alla helgons dag \u2013 31 oktober</li><li>Julafton \u2013 24 december</li><li>Juldagen \u2013 25 december</li><li>Annandag jul \u2013 26 december</li><li>Ny\u00e5rsafton \u2013 31 december</li></ul>"
    },
    {
        "path": "/systembolaget-midsommar",
        "title": "Systembolaget midsommar 2026 \u2013 St\u00e4ngt! Handla innan",
        "description": "Systembolaget \u00e4r st\u00e4ngt midsommarafton och midsommardagen 2026. Se sista dagen att handla och \u00f6ppettider.",
        "keywords": "systembolaget midsommar, systembolaget \u00f6ppet midsommar, systembolaget midsommarafton",
        "h1": "Har Systembolaget \u00f6ppet p\u00e5 midsommar?",
        "body": "<p><strong>Nej, Systembolaget \u00e4r st\u00e4ngt p\u00e5 midsommarafton och midsommardagen.</strong></p><h2>St\u00e4ngda dagar midsommar 2026</h2><ul><li>Midsommarafton \u2013 fredag 19 juni (st\u00e4ngt)</li><li>Midsommardagen \u2013 l\u00f6rdag 20 juni (st\u00e4ngt)</li></ul><p>Sista chansen att handla: <strong>Torsdag 18 juni 2026</strong> (\u00f6ppet 10:00\u201319:00)</p>"
    },
    {
        "path": "/systembolaget-pask",
        "title": "Systembolaget p\u00e5sk 2026 \u2013 St\u00e4ngt 4 dagar i rad",
        "description": "Systembolaget st\u00e4nger fr\u00e5n l\u00e5ngfredagen till annandag p\u00e5sk 2026. Se vilka dagar och sista chansen att handla.",
        "keywords": "systembolaget p\u00e5sk, systembolaget \u00f6ppet p\u00e5sk, systembolaget p\u00e5skafton, systembolaget l\u00e5ngfredagen",
        "h1": "Har Systembolaget \u00f6ppet p\u00e5 p\u00e5sk?",
        "body": "<p><strong>Nej, Systembolaget \u00e4r st\u00e4ngt under hela p\u00e5skhelgen</strong> \u2013 fr\u00e5n l\u00e5ngfredagen till och med annandag p\u00e5sk.</p><h2>St\u00e4ngda dagar p\u00e5sk 2026</h2><ul><li>L\u00e5ngfredagen \u2013 3 april (st\u00e4ngt)</li><li>P\u00e5skafton \u2013 4 april (st\u00e4ngt)</li><li>P\u00e5skdagen \u2013 5 april (st\u00e4ngt)</li><li>Annandag p\u00e5sk \u2013 6 april (st\u00e4ngt)</li></ul><p>Sista chansen att handla: <strong>Sk\u00e4rtorsdag 2 april 2026</strong> (\u00f6ppet 10:00\u201319:00)</p>"
    },
    {
        "path": "/systembolaget-jul",
        "title": "Systembolaget jul 2026 \u2013 St\u00e4ngt 24\u201326 dec, handla innan",
        "description": "Systembolaget \u00e4r st\u00e4ngt julafton, juldagen och annandag jul. Se \u00f6ppettider dagarna f\u00f6re jul och sista chansen att handla.",
        "keywords": "systembolaget jul, systembolaget \u00f6ppet julafton, systembolaget juldagen, systembolaget \u00f6ppettider jul",
        "h1": "Har Systembolaget \u00f6ppet p\u00e5 jul?",
        "body": "<p><strong>Nej, Systembolaget \u00e4r st\u00e4ngt under hela julhelgen</strong> \u2013 julafton, juldagen och annandag jul.</p><h2>St\u00e4ngda dagar jul 2026</h2><ul><li>Julafton \u2013 24 december (st\u00e4ngt)</li><li>Juldagen \u2013 25 december (st\u00e4ngt)</li><li>Annandag jul \u2013 26 december (st\u00e4ngt)</li></ul><p>Sista chansen att handla: <strong>Onsdag 23 december 2026</strong> (\u00f6ppet 10:00\u201319:00)</p>"
    },
    {
        "path": "/systembolaget-nyar",
        "title": "Systembolaget ny\u00e5r 2026 \u2013 St\u00e4ngt ny\u00e5rsafton & ny\u00e5rsdagen",
        "description": "Systembolaget st\u00e4nger ny\u00e5rsafton och ny\u00e5rsdagen. Se sista dagen att handla och \u00f6ppettider runt ny\u00e5r 2026.",
        "keywords": "systembolaget ny\u00e5r, systembolaget ny\u00e5rsafton, systembolaget \u00f6ppet ny\u00e5r, systembolaget 31 december",
        "h1": "Har Systembolaget \u00f6ppet p\u00e5 ny\u00e5r?",
        "body": "<p><strong>Nej, Systembolaget \u00e4r st\u00e4ngt p\u00e5 ny\u00e5rsafton (31 december) och ny\u00e5rsdagen (1 januari).</strong></p><h2>St\u00e4ngda dagar ny\u00e5r</h2><ul><li>Ny\u00e5rsafton \u2013 31 december (st\u00e4ngt)</li><li>Ny\u00e5rsdagen \u2013 1 januari (st\u00e4ngt)</li></ul><p>Sista chansen att handla: <strong>Onsdag 30 december 2026</strong> (\u00f6ppet 10:00\u201319:00)</p>"
    },
    {
        "path": "/systembolaget-oppet-imorgon",
        "title": "Systembolaget \u00f6ppet imorgon? Kolla \u00f6ppettider",
        "description": "Se om Systembolaget har \u00f6ppet imorgon och vilka \u00f6ppettider som g\u00e4ller. Uppdateras dagligen.",
        "keywords": "systembolaget \u00f6ppet imorgon, har systembolaget \u00f6ppet imorgon, systembolaget imorgon",
        "h1": "Har Systembolaget \u00f6ppet imorgon?",
        "body": "<p>Systembolagets \u00f6ppettider: <strong>M\u00e5ndag\u2013Fredag 10:00\u201319:00</strong>, <strong>L\u00f6rdag 10:00\u201315:00</strong>, <strong>S\u00f6ndag: St\u00e4ngt</strong>.</p><p>S\u00f6ndagar och r\u00f6da dagar \u00e4r alltid st\u00e4ngda.</p>"
    },
    {
        "path": "/nar-stanger-systembolaget",
        "title": "N\u00e4r st\u00e4nger Systembolaget idag? Se tid nu",
        "description": "Se exakt n\u00e4r Systembolaget st\u00e4nger idag. St\u00e4ngningstider vardagar, l\u00f6rdagar och avvikande helgdagar.",
        "keywords": "n\u00e4r st\u00e4nger systembolaget, systembolaget st\u00e4nger, systembolaget st\u00e4ngningstid",
        "h1": "N\u00e4r st\u00e4nger Systembolaget idag?",
        "body": "<p>Systembolaget st\u00e4nger: <strong>M\u00e5ndag\u2013Fredag kl 19:00</strong>, <strong>L\u00f6rdag kl 15:00</strong>. St\u00e4ngt s\u00f6ndag och r\u00f6da dagar.</p><p>Vissa st\u00f6rre butiker st\u00e4nger kl 20:00 p\u00e5 vardagar.</p>"
    },
    {
        "path": "/systembolaget-oppet-sondag",
        "title": "\u00c4r Systembolaget \u00f6ppet p\u00e5 s\u00f6ndagar? Nej, alltid st\u00e4ngt",
        "description": "Systembolaget har inte \u00f6ppet p\u00e5 s\u00f6ndagar. Se l\u00f6rdagens \u00f6ppettider (10\u201315) och vad du kan g\u00f6ra ist\u00e4llet.",
        "keywords": "\u00e4r systembolaget \u00f6ppet p\u00e5 s\u00f6ndagar, systembolaget \u00f6ppet s\u00f6ndag, systembolaget s\u00f6ndag, har systembolaget \u00f6ppet p\u00e5 s\u00f6ndagar",
        "h1": "\u00c4r Systembolaget \u00f6ppet p\u00e5 s\u00f6ndagar?",
        "body": "<p><strong>Nej, Systembolaget har aldrig \u00f6ppet p\u00e5 s\u00f6ndagar.</strong> Alla 450+ butiker i hela Sverige \u00e4r st\u00e4ngda varje s\u00f6ndag, \u00e5ret runt. Det finns inga undantag.</p><h2>Systembolagets \u00f6ppettider</h2><ul><li>M\u00e5ndag\u2013Fredag: 10:00\u201319:00</li><li>L\u00f6rdag: 10:00\u201315:00</li><li>S\u00f6ndag: <strong>St\u00e4ngt</strong></li></ul><p>Handla senast <strong>l\u00f6rdag 10:00\u201315:00</strong> om du beh\u00f6ver n\u00e5got till s\u00f6ndagen.</p><h2>Alternativ p\u00e5 s\u00f6ndagar</h2><ul><li>Restauranger och barer serverar alkohol</li><li>Best\u00e4ll online p\u00e5 systembolaget.se</li><li>Taxfree p\u00e5 flygplatser</li></ul>"
    },
    {
        "path": "/systembolaget-1-maj-oppettider",
        "title": "Systembolaget \u00f6ppettider 1 maj 2026 \u2013 St\u00e4ngt, handla dagen innan",
        "description": "Systembolaget har st\u00e4ngt 1 maj (r\u00f6d dag). \u00d6ppettider dagarna runt f\u00f6rsta maj och n\u00e4r du senast kan handla.",
        "keywords": "systembolaget \u00f6ppettider 1 maj, systembolaget 1 maj, systembolaget f\u00f6rsta maj, systembolaget \u00f6ppet 1 maj",
        "h1": "Har Systembolaget \u00f6ppet 1 maj?",
        "body": "<p><strong>Nej, f\u00f6rsta maj \u00e4r en r\u00f6d dag \u2013 Systembolaget \u00e4r st\u00e4ngt.</strong></p><h2>\u00d6ppettider runt 1 maj 2026</h2><ul><li>Torsdag 30 april (Valborgsm\u00e4ssoafton): 10:00\u201319:00</li><li>Fredag 1 maj: <strong>St\u00e4ngt</strong></li><li>L\u00f6rdag 2 maj: 10:00\u201315:00</li></ul><p>Handla senast <strong>torsdag 30 april</strong>.</p>"
    },
    {
        "path": "/systembolaget-pask-oppettider",
        "title": "Systembolaget \u00f6ppettider p\u00e5sk 2026 \u2013 St\u00e4ngt 4 dagar i rad",
        "description": "Systembolaget st\u00e4nger l\u00e5ngfredag till annandag p\u00e5sk. Se dag-f\u00f6r-dag \u00f6ppettider p\u00e5sken 2026 och sista chansen att handla.",
        "keywords": "systembolaget \u00f6ppettider p\u00e5sk 2026, systembolaget p\u00e5sk \u00f6ppettider, systembolaget p\u00e5skafton \u00f6ppettider",
        "h1": "Systembolaget \u00f6ppettider p\u00e5sk 2026",
        "body": "<p><strong>Systembolaget h\u00e5ller st\u00e4ngt fr\u00e5n l\u00e5ngfredagen till och med annandag p\u00e5sk.</strong></p><h2>Dag-f\u00f6r-dag p\u00e5sk 2026</h2><ul><li>Sk\u00e4rtorsdag 2 april: 10:00\u201319:00 (SISTA CHANSEN)</li><li>L\u00e5ngfredagen 3 april: St\u00e4ngt</li><li>P\u00e5skafton 4 april: St\u00e4ngt</li><li>P\u00e5skdagen 5 april: St\u00e4ngt</li><li>Annandag p\u00e5sk 6 april: St\u00e4ngt</li><li>Tisdag 7 april: 10:00\u201319:00 (\u00f6ppnar igen)</li></ul>"
    },
    {
        "path": "/systembolaget-fredag-oppettider",
        "title": "Systembolaget \u00f6ppettider fredag \u2013 \u00d6ppet till 19:00",
        "description": "Systembolaget har \u00f6ppet 10:00\u201319:00 p\u00e5 fredagar. Se om det \u00e4r \u00f6ppet just nu och vilka undantag som g\u00e4ller vid r\u00f6da dagar.",
        "keywords": "systembolaget fredag, systembolaget \u00f6ppettider fredag, systembolaget \u00f6ppet fredag",
        "h1": "Systembolaget \u00f6ppettider fredag",
        "body": "<p>Systembolaget har \u00f6ppet <strong>10:00\u201319:00</strong> p\u00e5 fredagar. Vissa st\u00f6rre butiker kan ha \u00f6ppet till 20:00.</p><h2>Hela veckans \u00f6ppettider</h2><ul><li>M\u00e5ndag\u2013Fredag: 10:00\u201319:00</li><li>L\u00f6rdag: 10:00\u201315:00</li><li>S\u00f6ndag: St\u00e4ngt</li></ul><h2>Undantag p\u00e5 fredagar</h2><p>Om fredagen \u00e4r en r\u00f6d dag (t.ex. l\u00e5ngfredagen, midsommarafton) \u00e4r Systembolaget st\u00e4ngt hela dagen.</p>"
    }
]

with open("page-data.json", "w", encoding="utf-8") as f:
    json.dump({"pages": pages}, f, ensure_ascii=False, indent=2)

print("Done! Wrote page-data.json")

