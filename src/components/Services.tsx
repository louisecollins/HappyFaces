import { Button } from "@/components/ui/button";
import { Cake, Users, Briefcase, Heart, Church, School, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Cake,
    title: "Birthday Parties",
    description:
      "Creative designs that bring your child's favourite characters to life, from tigers and superheroes to butterflies and unicorns.",
    testId: "birthday",
  },
  {
    icon: Church,
    title: "Communions & Christenings",
    description:
      "Gentle, colourful face painting to keep the little guests happy while the grown-ups enjoy the celebration.",
    testId: "celebrations",
  },
  {
    icon: Users,
    title: "Community Events",
    description:
      "Add colour and excitement to festivals, fairs and community gatherings with a friendly face painting stand.",
    testId: "community",
  },
  {
    icon: School,
    title: "School Events",
    description:
      "Fun days, fetes and end-of-term parties. Quick, child-friendly designs so every child gets a turn.",
    testId: "school",
  },
  {
    icon: Briefcase,
    title: "Corporate Functions",
    description:
      "Keep families entertained at open days, staff fun days and corporate events with professional face painting.",
    testId: "corporate",
  },
  {
    icon: Heart,
    title: "Charity Events",
    description:
      "Special rates for charities and community organisations, plus a limited amount of free volunteering each year.",
    testId: "charity",
  },
];

export function Services() {
  const scrollToBooking = () => {
    const element = document.getElementById("booking");
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-16 md:py-24 lg:py-32 bg-accent/20" data-testid="section-services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
            data-testid="text-services-title"
          >
            My Services
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional face painting for every kind of occasion. No party is too big or too small!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.testId}
                className="group flex flex-col rounded-xl border bg-card p-6 md:p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-primary/40"
                data-testid={`card-service-${service.testId}`}
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-1">{service.description}</p>
                <button
                  type="button"
                  onClick={scrollToBooking}
                  className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                  data-testid={`button-enquire-${service.testId}`}
                >
                  Enquire about this
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-10 md:mt-14 rounded-xl bg-gradient-to-br from-primary to-chart-2 p-8 md:p-10 text-center text-white">
          <h3 className="font-display text-2xl md:text-3xl font-semibold mb-2">Planning something different?</h3>
          <p className="mx-auto mb-6 max-w-xl text-white/90">
            Hen parties, family days and everything in between. Get in touch and we will sort out the details.
          </p>
          <Button
            size="lg"
            onClick={scrollToBooking}
            className="bg-white text-primary hover:bg-white/90"
            data-testid="button-services-quote"
          >
            Request a Quote
          </Button>
        </div>
      </div>
    </section>
  );
}
