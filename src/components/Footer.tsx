import { Palette, Facebook, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
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
    <footer className="bg-card border-t" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary via-chart-2 to-chart-3 rounded-full flex items-center justify-center">
                <Palette className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                Happy Faces Belfast
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Bringing joy and creativity to Belfast through professional face painting services for all occasions. Experienced party entertainer with 5-star Google reviews.
            </p>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Quick Links</h3>
            <nav className="space-y-2">
              {["hero", "services", "gallery", "reviews", "events", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
                  data-testid={`link-footer-${section}`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Connect</h3>
            <div className="flex gap-3 mb-4">
              <Button
                size="icon"
                variant="outline"
                asChild
                data-testid="button-facebook"
              >
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-5 h-5" />
                </a>
              </Button>
              <Button
                size="icon"
                variant="outline"
                asChild
                data-testid="button-instagram"
              >
                <a href="https://instagram.com/happyfacesbelfast" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-5 h-5" />
                </a>
              </Button>
              <Button
                size="icon"
                variant="outline"
                asChild
                data-testid="button-email"
              >
                <a href="mailto:happy_faces@hotmail.co.uk">
                  <Mail className="w-5 h-5" />
                </a>
              </Button>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="font-semibold">✓</span>
                <span>Fully Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">✓</span>
                <span>100+ Events</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">✓</span>
                <span>5-Star Rated</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Happy Faces Belfast. West Belfast, Northern Ireland. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
