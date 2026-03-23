import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Är Systembolaget öppet idag?",
    answer: "Det beror på vilken dag det är. Systembolaget har öppet måndag till lördag, men är stängt på söndagar och röda dagar. På vardagar (måndag–fredag) är öppettiderna vanligtvis 10:00–19:00, och på lördagar 10:00–15:00. Se svaret högst upp på sidan för att veta om det är öppet just nu."
  },
  {
    question: "Är Systembolaget öppet på lördagar?",
    answer: "Ja, Systembolaget är öppet på lördagar mellan kl 10:00 och 15:00. Vissa större butiker kan ha något längre öppettider."
  },
  {
    question: "Är Systembolaget öppet på söndagar?",
    answer: "Nej, Systembolaget är alltid stängt på söndagar. Det finns inga undantag, oavsett butik."
  },
  {
    question: "Vilka helgdagar har Systembolaget stängt?",
    answer: "Systembolaget är stängt på alla röda dagar i Sverige: nyårsdagen, trettondedag jul, långfredagen, påskafton, påskdagen, annandag påsk, första maj, Kristi himmelsfärdsdag, nationaldagen (6 juni), midsommarafton, midsommardagen, alla helgons dag, julafton, juldagen, annandag jul och nyårsafton."
  },
  {
    question: "Hur sent har Systembolaget öppet på vardagar?",
    answer: "De flesta Systembolag stänger kl 19:00 på vardagar (måndag–fredag). Vissa större butiker i stadskärnor kan ha öppet till 20:00. Kontrollera din lokala butik via sökfunktionen ovan."
  },
  {
    question: "Kan öppettiderna variera mellan olika butiker?",
    answer: "Ja, öppettiderna kan variera något. Större butiker har ofta längre öppettider medan mindre butiker på landsbygden kan ha kortare tider. Använd sökfunktionen på den här sidan för att hitta exakta öppettider för din butik."
  },
  {
    question: "Har Systembolaget öppet på midsommarafton?",
    answer: "Nej, Systembolaget är stängt på midsommarafton. Det är en av de röda dagarna då alla butiker håller stängt. Planera dina inköp senast dagen innan."
  },
  {
    question: "Har Systembolaget öppet på julafton?",
    answer: "Nej, Systembolaget är stängt på julafton (24 december), juldagen (25 december) och annandag jul (26 december). Handla senast den 23 december."
  },
  {
    question: "När öppnar Systembolaget på morgonen?",
    answer: "Systembolaget öppnar kl 10:00 alla dagar de har öppet, det vill säga måndag till lördag. På söndagar och röda dagar är butikerna stängda hela dagen."
  }
];

export function FAQ() {
  return (
    <section className="w-full max-w-2xl" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-bold text-foreground mb-4">
        Vanliga frågor om Systembolagets öppettider
      </h2>
      
      <Accordion type="single" collapsible className="bg-card border border-border rounded-xl overflow-hidden">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-border">
            <AccordionTrigger className="px-6 text-left font-medium text-foreground hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

// Export FAQ data for schema
export { faqs };
