import { Button } from "@/components/ui/button";
import { Sparkles, Calendar, Shield, Phone } from "lucide-react";
import rainbowFace from "@assets/photos/hero_rainbow_face.webp";
import clownGirl from "@assets/photos/hero_clown_girl.webp";
import bunnyArm from "@assets/photos/hero_bunny_arm.webp";
import paintTable from "@assets/photos/hero_paint_table.webp";
import xmasReindeer from "@assets/photos/xmas_reindeer.webp";
import xmasGingerbread from "@assets/photos/xmas_gingerbread.webp";
import xmasPenguin from "@assets/photos/xmas_penguin.webp";
import xmasHolly from "@assets/photos/xmas_holly_boy.webp";
import { Snowfall } from "@/components/Snowfall";
import { isChristmasSeason } from "@/lib/season";

const collage = [
  { src: rainbowFace, alt: "Rainbow face paint design on a smiling child", rotate: "-rotate-3" },
  { src: bunnyArm, alt: "Colourful bunny design painted on an arm", rotate: "rotate-2" },
  { src: paintTable, alt: "Happy Faces paint palettes and brushes set up at an event", rotate: "rotate-3" },
  { src: clownGirl, alt: "Child with a colourful clown face painting design", rotate: "-rotate-2" },
];

const christmasCollage = [
  { src: xmasReindeer, alt: "Reindeer face painting design", rotate: "-rotate-3" },
  { src: xmasGingerbread, alt: "Gingerbread cheek design", rotate: "rotate-2" },
  { src: xmasPenguin, alt: "Cute penguin face painting design", rotate: "rotate-3" },
  { src: xmasHolly, alt: "Holly and candy cane face painting design", rotate: "-rotate-2" },
];

export function Hero() {
  const festive = isChristmasSeason();
  const photos = festive ? christmasCollage : collage;
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
      className={`relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br ${
        festive ? "from-red-700 via-red-600 to-emerald-700" : "from-primary via-chart-2 to-chart-3"
      }`}
      data-testid="section-hero"
    >
      {festive && <Snowfall />}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="text-center lg:text-left">
            {festive && (
              <p
                className="inline-block mb-4 rounded-full bg-white/15 px-4 py-1.5 text-sm md:text-base font-semibold text-white backdrop-blur-sm border border-white/30"
                data-testid="text-hero-christmas-badge"
              >
                🎄 Christmas dates are almost full
              </p>
            )}
            <h1
              className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-tight"
              data-testid="text-hero-title"
            >
              {festive ? "Christmas Face Painting in Belfast" : "Happy Faces Belfast"}
            </h1>
            <p
              className="text-lg md:text-xl lg:text-2xl text-white/95 max-w-xl mx-auto lg:mx-0 mb-8"
              data-testid="text-hero-subtitle"
            >
              {festive
                ? "Festive designs for Christmas parties, school events and family celebrations. Book now before the last dates go!"
                : "Professional face painting for birthday parties, community events, and special occasions"}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6">
              <Button
                size="lg"
                onClick={() => scrollToSection("booking")}
                className="bg-white text-primary hover:bg-white/90"
                data-testid="button-book-event"
              >
                <Calendar className="w-4 h-4 mr-2" />
                {festive ? "Book a Christmas Party" : "Request a Quote"}
              </Button>
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
            </div>

            <div className="mb-10">
              <a
                href="tel:+447356088614"
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-all text-lg font-semibold"
                data-testid="link-hero-phone"
              >
                <Phone className="w-5 h-5" />
                +44 7356 088614
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-white/90 text-sm md:text-base">
              <div className="flex items-center gap-2" data-testid="text-trust-events">
                <Sparkles className="w-5 h-5" />
                <span>100+ Events</span>
              </div>
              <div className="flex items-center gap-2" data-testid="text-trust-rating">
                <span className="text-yellow-300">★★★★★</span>
                <span>5-Star Rated</span>
              </div>
              <div className="flex items-center gap-2" data-testid="text-trust-insured">
                <Shield className="w-5 h-5" />
                <span>Fully Insured</span>
              </div>
            </div>
          </div>

          <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-3 sm:gap-4 lg:max-w-lg" data-testid="hero-collage">
            {photos.map((photo, i) => (
              <div
                key={photo.src}
                className={`overflow-hidden rounded-2xl border-4 border-white shadow-xl ${photo.rotate} ${i % 2 === 1 ? "mt-4 sm:mt-6" : ""}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="aspect-square h-full w-full object-cover"
                  loading={i < 2 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
