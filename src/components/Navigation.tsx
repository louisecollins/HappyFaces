import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Palette } from "lucide-react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    // If we're not on the home page, navigate to home with hash
    if (location !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    // Otherwise, scroll to section on current page
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
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "Home", section: "hero", isPage: false },
    { label: "About", section: "about", isPage: false },
    { label: "Services", section: "services", isPage: false },
    { label: "Gallery", section: "gallery", isPage: false },
    { label: "Reviews", section: "reviews", isPage: false },
    { label: "Events", section: "events", isPage: false },
    { label: "Contact", section: "contact", isPage: false },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm border-b" : "bg-transparent"
      }`}
      data-testid="header-navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          <Link href="/">
            <button
              className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-2 py-1 -ml-2"
              data-testid="button-logo"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary via-chart-2 to-chart-3 rounded-full flex items-center justify-center">
                <Palette className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
              </div>
            </button>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => 
              link.isPage ? (
                <Link key={link.section} href={`/${link.section}`}>
                  <Button
                    variant="ghost"
                    data-testid={`button-nav-${link.section}`}
                  >
                    {link.label}
                  </Button>
                </Link>
              ) : (
                <Button
                  key={link.section}
                  variant="ghost"
                  onClick={() => handleNavClick(link.section)}
                  data-testid={`button-nav-${link.section}`}
                >
                  {link.label}
                </Button>
              )
            )}
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <nav className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => 
              link.isPage ? (
                <Link key={link.section} href={`/${link.section}`}>
                  <Button
                    variant="ghost"
                    className="justify-start w-full"
                    data-testid={`button-nav-mobile-${link.section}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Button>
                </Link>
              ) : (
                <Button
                  key={link.section}
                  variant="ghost"
                  onClick={() => handleNavClick(link.section)}
                  className="justify-start"
                  data-testid={`button-nav-mobile-${link.section}`}
                >
                  {link.label}
                </Button>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
