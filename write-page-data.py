# -*- coding: utf-8 -*-
"""Write page-data.json with proper UTF-8 Swedish characters."""
import json

pages = [
    {
        "path": "/systembolaget-oppettider",
        "title": "Systembolaget \u00f6ppettider 2026 \u2013 Alla veckodagar & helgdagar",
        "description": "Kompletta \u00f6ppettider f\u00f6r Systembolaget 2026. M\u00e5ndag\u2013fredag 10\u201319, l\u00f6rdag 10\u201315, s\u00f6ndag st\u00e4ngt. Se alla helgdagar och undantag.",
        "keywords": "systembolaget \u00f6ppettider, systembolaget \u00f6ppettider idag, systembolaget tider, \u00f6ppettider systembolaget",
        "h1": "Systembolaget \u00f6ppettider 2026",
        "body": "<p>Systembolagets ordinarie \u00f6ppettider: <strong>M\u00e5ndag\u2013Fredag 10:00\u201319:00</strong>, <strong>L\u00f6rdag 10:00\u201315:00</strong>, <strong>S\u00f6ndag: St\u00e4ngt</strong>.</p><h2>\u00d6ppettider per dag</h2><ul><li>M\u00e5ndag: 10:00\u201319:00</li><li>Tisdag: 10:00\u201319:00</li><li>Onsdag: 10:00\u201319:00</li><li>Torsdag: 10:00\u201319:00</li><li>Fredag: 10:00\u201319:00</li><li>L\u00f6rdag: 10:00\u201315:00</li><li>S\u00f6ndag: St\u00e4ngt</li></ul>"
    },
    {
        "path": "/systembolaget-roda-dagar-2026",
        "title": "Systembolaget r\u00f6da dagar 2026 \u2013 Alla helgdagar det \u00e4r st\u00e4ngt",
        "description": "Komplett lista \u00f6ver alla r\u00f6da dagar 2026 d\u00e5 Systembolaget \u00e4r st\u00e4ngt. Jul, p\u00e5sk, midsommar, ny\u00e5r och fler.",
        "keywords": "systembolaget r\u00f6da dagar, systembolaget helgdagar 2026, systembolaget st\u00e4ngt r\u00f6da dagar",
        "h1": "Systembolaget r\u00f6da dagar 2026",
        "body": "<p><strong>Systembolaget \u00e4r st\u00e4ngt p\u00e5 alla r\u00f6da dagar i Sverige.</strong></p><h2>R\u00f6da dagar 2026</h2><ul><li>Ny\u00e5rsdagen \u2013 1 januari</li><li>Trettondedag jul \u2013 6 januari</li><li>L\u00e5ngfredagen \u2013 3 april</li><li>P\u00e5skafton \u2013 4 april</li><li>P\u00e5skdagen \u2013 5 april</li><li>Annandag p\u00e5sk \u2013 6 april</li><li>F\u00f6rsta maj \u2013 1 maj</li><li>Kristi himmelsf\u00e4rdsdag \u2013 14 maj</li><li>Sveriges nationaldag \u2013 6 juni</li><li>Midsommarafton \u2013 19 juni</li><li>Midsommardagen \u2013 20 juni</li><li>Alla helgons dag \u2013 31 oktober</li><li>Julafton \u2013 24 december</li><li>Juldagen \u2013 25 december</li><li>Annandag jul \u2013 26 december</li><li>Ny\u00e5rsafton \u2013 31 december</li></ul>"
    },
    {
        "path": "/systembolaget-sondagsoppet",
        "title": "\u00c4r Systembolaget \u00f6ppet p\u00e5 s\u00f6ndagar? \u2013 Svar & alternativ",
        "description": "Nej, Systembolaget har aldrig \u00f6ppet p\u00e5 s\u00f6ndagar. L\u00e4s varf\u00f6r och se vilka alternativ du har.",
        "keywords": "systembolaget s\u00f6ndag, systembolaget \u00f6ppet s\u00f6ndag, systembolaget s\u00f6ndags\u00f6ppet",
        "h1": "Har Systembolaget \u00f6ppet p\u00e5 s\u00f6ndagar?",
        "body": "<p><strong>Nej, Systembolaget \u00e4r alltid st\u00e4ngt p\u00e5 s\u00f6ndagar.</strong> Det finns inga undantag. Systembolaget har \u00f6ppet m\u00e5ndag till l\u00f6rdag.</p><h2>Alternativ p\u00e5 s\u00f6ndagar</h2><ul><li>Handla p\u00e5 l\u00f6rdagen \u2013 \u00f6ppet 10:00\u201315:00</li><li>Restauranger och barer serverar alkohol p\u00e5 s\u00f6ndagar</li><li>Best\u00e4ll online via systembolaget.se</li></ul>"
    },
    {
        "path": "/systembolaget-midsommar",
        "title": "Har Systembolaget \u00f6ppet p\u00e5 midsommar 2026? \u2013 Nej, st\u00e4ngt!",
        "description": "Systembolaget \u00e4r st\u00e4ngt p\u00e5 midsommarafton och midsommardagen 2026. Handla senast torsdagen innan midsommar.",
        "keywords": "systembolaget midsommar, systembolaget \u00f6ppet midsommar, systembolaget midsommarafton",
        "h1": "Har Systembolaget \u00f6ppet p\u00e5 midsommar?",
        "body": "<p><strong>Nej, Systembolaget \u00e4r st\u00e4ngt p\u00e5 midsommarafton och midsommardagen.</strong></p><h2>St\u00e4ngda dagar midsommar 2026</h2><ul><li>Midsommarafton \u2013 fredag 19 juni (st\u00e4ngt)</li><li>Midsommardagen \u2013 l\u00f6rdag 20 juni (st\u00e4ngt)</li></ul><p>Sista chansen att handla: <strong>Torsdag 18 juni 2026</strong> (\u00f6ppet 10:00\u201319:00)</p>"
    },
    {
        "path": "/systembolaget-pask",
        "title": "Har Systembolaget \u00f6ppet p\u00e5 p\u00e5sk 2026? \u2013 St\u00e4ngt l\u00e5ngfredag till annandag",
        "description": "Systembolaget \u00e4r st\u00e4ngt fr\u00e5n l\u00e5ngfredagen till och med annandag p\u00e5sk 2026. Handla senast sk\u00e4rtorsdagen.",
        "keywords": "systembolaget p\u00e5sk, systembolaget \u00f6ppet p\u00e5sk, systembolaget p\u00e5skafton, systembolaget l\u00e5ngfredagen",
        "h1": "Har Systembolaget \u00f6ppet p\u00e5 p\u00e5sk?",
        "body": "<p><strong>Nej, Systembolaget \u00e4r st\u00e4ngt under hela p\u00e5skhelgen</strong> \u2013 fr\u00e5n l\u00e5ngfredagen till och med annandag p\u00e5sk.</p><h2>St\u00e4ngda dagar p\u00e5sk 2026</h2><ul><li>L\u00e5ngfredagen \u2013 3 april (st\u00e4ngt)</li><li>P\u00e5skafton \u2013 4 april (st\u00e4ngt)</li><li>P\u00e5skdagen \u2013 5 april (st\u00e4ngt)</li><li>Annandag p\u00e5sk \u2013 6 april (st\u00e4ngt)</li></ul><p>Sista chansen att handla: <strong>Sk\u00e4rtorsdag 2 april 2026</strong> (\u00f6ppet 10:00\u201319:00)</p>"
    },
    {
        "path": "/systembolaget-jul",
        "title": "Har Systembolaget \u00f6ppet p\u00e5 jul 2026? \u2013 St\u00e4ngt 24\u201326 december",
        "description": "Systembolaget \u00e4r st\u00e4ngt julafton, juldagen och annandag jul 2026. Handla senast 23 december.",
        "keywords": "systembolaget jul, systembolaget \u00f6ppet julafton, systembolaget juldagen, systembolaget \u00f6ppettider jul",
        "h1": "Har Systembolaget \u00f6ppet p\u00e5 jul?",
        "body": "<p><strong>Nej, Systembolaget \u00e4r st\u00e4ngt under hela julhelgen</strong> \u2013 julafton, juldagen och annandag jul.</p><h2>St\u00e4ngda dagar jul 2026</h2><ul><li>Julafton \u2013 24 december (st\u00e4ngt)</li><li>Juldagen \u2013 25 december (st\u00e4ngt)</li><li>Annandag jul \u2013 26 december (st\u00e4ngt)</li></ul><p>Sista chansen att handla: <strong>Onsdag 23 december 2026</strong> (\u00f6ppet 10:00\u201319:00)</p>"
    },
    {
        "path": "/systembolaget-nyar",
        "title": "Har Systembolaget \u00f6ppet p\u00e5 ny\u00e5rsafton 2026? \u2013 St\u00e4ngt 31 dec & 1 jan",
        "description": "Systembolaget \u00e4r st\u00e4ngt ny\u00e5rsafton 31 december och ny\u00e5rsdagen 1 januari. Handla senast 30 december.",
        "keywords": "systembolaget ny\u00e5r, systembolaget ny\u00e5rsafton, systembolaget \u00f6ppet ny\u00e5r, systembolaget 31 december",
        "h1": "Har Systembolaget \u00f6ppet p\u00e5 ny\u00e5r?",
        "body": "<p><strong>Nej, Systembolaget \u00e4r st\u00e4ngt p\u00e5 ny\u00e5rsafton (31 december) och ny\u00e5rsdagen (1 januari).</strong></p><h2>St\u00e4ngda dagar ny\u00e5r</h2><ul><li>Ny\u00e5rsafton \u2013 31 december (st\u00e4ngt)</li><li>Ny\u00e5rsdagen \u2013 1 januari (st\u00e4ngt)</li></ul><p>Sista chansen att handla: <strong>Onsdag 30 december 2026</strong> (\u00f6ppet 10:00\u201319:00)</p>"
    },
    {
        "path": "/systembolaget-oppet-imorgon",
        "title": "Har Systembolaget \u00f6ppet imorgon? \u2013 Se \u00f6ppettider",
        "description": "Kolla snabbt om Systembolaget har \u00f6ppet imorgon. Se \u00f6ppettider f\u00f6r imorgon och resten av veckan.",
        "keywords": "systembolaget \u00f6ppet imorgon, har systembolaget \u00f6ppet imorgon, systembolaget imorgon",
        "h1": "Har Systembolaget \u00f6ppet imorgon?",
        "body": "<p>Systembolagets \u00f6ppettider: <strong>M\u00e5ndag\u2013Fredag 10:00\u201319:00</strong>, <strong>L\u00f6rdag 10:00\u201315:00</strong>, <strong>S\u00f6ndag: St\u00e4ngt</strong>.</p><p>S\u00f6ndagar och r\u00f6da dagar \u00e4r alltid st\u00e4ngda.</p>"
    },
    {
        "path": "/nar-stanger-systembolaget",
        "title": "N\u00e4r st\u00e4nger Systembolaget idag? \u2013 Se st\u00e4ngningstid nu",
        "description": "Se exakt n\u00e4r Systembolaget st\u00e4nger idag. \u00d6ppettider vardagar, l\u00f6rdagar och information om helgdagar.",
        "keywords": "n\u00e4r st\u00e4nger systembolaget, systembolaget st\u00e4nger, systembolaget st\u00e4ngningstid",
        "h1": "N\u00e4r st\u00e4nger Systembolaget idag?",
        "body": "<p>Systembolaget st\u00e4nger: <strong>M\u00e5ndag\u2013Fredag kl 19:00</strong>, <strong>L\u00f6rdag kl 15:00</strong>. St\u00e4ngt s\u00f6ndag och r\u00f6da dagar.</p><p>Vissa st\u00f6rre butiker st\u00e4nger kl 20:00 p\u00e5 vardagar.</p>"
    }
]

with open("page-data.json", "w", encoding="utf-8") as f:
    json.dump({"pages": pages}, f, ensure_ascii=False, indent=2)

print("Done! Wrote page-data.json")

