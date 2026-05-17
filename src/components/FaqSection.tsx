import SectionHeading from "@/components/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq } from "@/lib/faqs";

type FaqSectionProps = {
  className?: string;
  faqs: Faq[];
};

const FaqSection = ({ className = "", faqs }: FaqSectionProps) => {
  if (faqs.length === 0) {
    return null;
  }

  return (
    <section className={className}>
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="FAQ"
          title="Maswali ambayo wateja huuliza kabla ya kuanza"
        />

        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card px-6 shadow-soft">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-left font-display text-base font-bold text-secondary hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
