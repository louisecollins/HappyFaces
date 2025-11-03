import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cake, Users, Briefcase, Heart } from "lucide-react";
import birthdayImage from "@assets/generated_images/Birthday_party_face_painting_scene_fe6caa52.png";
import festivalImage from "@assets/generated_images/Community_festival_booth_scene_fd2ae5cb.png";

export function Services() {
  const services = [
    {
      icon: Cake,
      title: "Birthday Parties",
      description: "Make your child's birthday unforgettable with creative face painting designs that bring their favorite characters to life.",
      image: birthdayImage,
      testId: "birthday",
    },
    {
      icon: Users,
      title: "Community Events",
      description: "Add color and excitement to festivals, fairs, and community gatherings with professional face painting entertainment.",
      image: festivalImage,
      testId: "community",
    },
    {
      icon: Briefcase,
      title: "Corporate Functions",
      description: "Engage families at corporate events, open days, and employee appreciation days with fun face painting activities.",
      image: birthdayImage,
      testId: "corporate",
    },
    {
      icon: Heart,
      title: "Charity Events",
      description: "Special rates for charities and community organizations. Giving back to the community with a limited amount of free volunteering each year.",
      image: festivalImage,
      testId: "charity",
    },
  ];

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
            Professional face painting services tailored to your event
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.testId}
                className="overflow-hidden hover-elevate transition-transform duration-300"
                data-testid={`card-service-${service.testId}`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="font-display text-xl md:text-2xl">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
