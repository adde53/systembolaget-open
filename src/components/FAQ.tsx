import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Är Systembolaget öppet på lördagar?",
    answer: "Ja, Systembolaget är öppet på lördagar mellan kl 10:00 och 15:00. Större butiker kan ha öppet något längre."
  },
  {
    question: "Är Systembolaget öppet på söndagar?",
    answer: "Nej, Systembolaget är alltid stängt på söndagar. Det finns inga undantag."
  },
  {
    question: "Vilka helgdagar har Systembolaget stängt?",
    answer: "Systembolaget är stängt på alla röda dagar: nyårsdagen, trettondedag jul, långfredagen, påskafton, påskdagen, annandag påsk, första maj, Kristi himmelsfärdsdag, nationaldagen, midsommarafton, midsommardagen, alla helgons dag, julafton, juldagen, annandag jul och nyårsafton."
  },
  {
    question: "Hur sent har Systembolaget öppet på vardagar?",
    answer: "De flesta Systembolag stänger kl 19:00 på vardagar (måndag-fredag). Större butiker i stadskärnor kan ha öppet till 20:00."
  },
  {
    question: "Kan öppettiderna variera mellan olika butiker?",
    answer: "Ja, öppettiderna kan variera något mellan butiker. Större butiker har ofta längre öppettider medan mindre butiker kan ha kortare. Kontrollera alltid din lokala butiks tider på systembolaget.se."
  }
];

export function FAQ() {
  return (
    <section className="w-full max-w-2xl" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-bold text-foreground mb-4">
        Vanliga frågor
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
