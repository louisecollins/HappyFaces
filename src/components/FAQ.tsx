import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";

// Edit, add or remove questions here. Answers are plain text so they can also
// be used for the search engine (FAQ) data below.
const faqs = [
  {
    q: "How do I book Happy Faces Belfast?",
    a: "Fill in the quote request form on this page with your date, time, location and number of children, or call or WhatsApp me on 07356 088614. I'll get back to you within 24 hours to confirm the details and give you a quote.",
  },
  {
    q: "How much does face painting cost?",
    a: "My rates are charged per hour, and every event is different, so I give a personal quote based on your date, location and how many children you expect. Send a quote request or get in touch and I'll come back to you with a clear price.",
  },
  {
    q: "How long should I book for?",
    a: "I allow about one hour for every 15 children, so a party of 30 would need two hours. The minimum booking is one hour, and after that I can book in half hours, such as 1.5 or 2.5 hours. Not sure? Tell me about your event and I'll recommend the right length.",
  },
  {
    q: "What kinds of events do you cover?",
    a: "Birthday parties, communions, christenings, hen parties, school events, community events, festivals, corporate functions and charity events. No party is too big or too small!",
  },
  {
    q: "Where do you travel to?",
    a: "I'm based in Belfast and cover the Belfast area. Travel costs may apply for events outside Belfast, so tell me your venue or postcode in the quote request and I'll confirm.",
  },
  {
    q: "Should I book more than one painter?",
    a: "It can help. For example, if your party room is booked for one hour and the children then have to move to a separate food room, booking two painters for one hour is often better than one painter for two hours. Everyone gets painted before it's time to eat, and it's easier for everyone. Tell me about your venue and timings and I'll recommend what works best.",
  },
  {
    q: "Not sure how many children are coming?",
    a: "That's ok, I'm pretty flexible. I suggest booking for the most you expect. If fewer children turn up, or some don't want to be painted, I only charge for the time we use. Or I can stay for the full time if the children want seconds or thirds. I'll always agree with you before staying or leaving.",
  },
  {
    q: "What do you need at the venue?",
    a: "I bring my own chair, but I do ask for an adequate sized table to be provided at the venue.",
  },
  {
    q: "Is there an age limit?",
    a: "Children under the age of 3 can't be painted, for insurance reasons. Adults can be painted on request.",
  },
  {
    q: "Can you paint at an outdoor event?",
    a: "Yes. Outdoor events need adequate cover from sun and rain. Please let me know in advance that it's outdoors, so I can bring the right kit and supplies.",
  },
  {
    q: "Are you insured?",
    a: "Yes. I'm fully insured with Public Liability insurance. Venues such as leisure centres often ask for proof of this, and my certificate can be provided on request.",
  },
  {
    q: "How experienced are you?",
    a: "I've been face painting since 2010, and have worked at parties, festivals, corporate events and more across Belfast.",
  },
  {
    q: "Do you offer special rates for charities?",
    a: "Yes. I offer special rates for charities and community organisations, and a limited amount of free volunteering each year. Get in touch to talk about your event.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function FAQ() {
  const scrollToBooking = () => {
    const element = document.getElementById("booking");
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="faq" className="py-16 md:py-24 lg:py-32" data-testid="section-faq">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <h2
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
            data-testid="text-faq-title"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Everything you need to know before booking
          </p>
        </div>

        <Accordion type="single" collapsible className="rounded-xl border bg-card px-4 md:px-6">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} data-testid={`faq-item-${i}`}>
              <AccordionTrigger className="text-left font-display text-base md:text-lg font-semibold">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 text-center">
          <p className="mb-4 text-foreground font-medium">Still have a question?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button onClick={scrollToBooking} data-testid="button-faq-quote">
              Request a Quote
            </Button>
            <Button variant="outline" asChild data-testid="button-faq-whatsapp">
              <a href="https://wa.me/447356088614" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp me
              </a>
            </Button>
            <Button variant="outline" asChild data-testid="button-faq-call">
              <a href="tel:+447356088614">
                <Phone className="w-4 h-4 mr-2" />
                Call me
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
