import { Button } from "@/components/ui/button";
import { Sparkles, Calendar, Shield, Phone } from "lucide-react";
import heroImage from "@assets/generated_images/Professional_face_painting_event_scene_9a9dba86.png";

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-chart-2/50 to-chart-3/40" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight"
          data-testid="text-hero-title"
        >
          Happy Faces Belfast
        </h1>
        <p
          className="text-lg md:text-xl lg:text-2xl text-white/95 max-w-3xl mx-auto mb-8"
          data-testid="text-hero-subtitle"
        >
          Professional face painting for birthday parties, community events, and special occasions
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("gallery")}
            className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
            data-testid="button-view-gallery"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            View Gallery
          </Button>
          <Button
            size="lg"
            onClick={() => scrollToSection("booking")}
            className="bg-white text-primary hover:bg-white/90"
            data-testid="button-book-event"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Request a Quote
          </Button>
        </div>

        <div className="mb-12">
          <a
            href="tel:+447356088614"
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-6 py-4 rounded-lg hover:bg-white/20 transition-all text-lg md:text-xl font-semibold"
            data-testid="link-hero-phone"
          >
            <Phone className="w-5 h-5 md:w-6 md:h-6" />
            +44 7356 088614
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-white/90 text-sm md:text-base">
          <div className="flex items-center gap-2" data-testid="text-trust-events">
            <Sparkles className="w-5 h-5" />
            <span>100+ Events</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-white/30" />
          <div className="flex items-center gap-2" data-testid="text-trust-rating">
            <span className="text-yellow-300">★★★★★</span>
            <span>5-Star Rated</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-white/30" />
          <div className="flex items-center gap-2" data-testid="text-trust-insured">
            <Shield className="w-5 h-5" />
            <span>Fully Insured</span>
          </div>
        </div>
      </div>
    </section>
  );
}
