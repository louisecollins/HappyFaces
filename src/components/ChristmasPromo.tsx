import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

const designs = [
  { emoji: "🦌", label: "Reindeer" },
  { emoji: "⛄", label: "Snowmen" },
  { emoji: "🍪", label: "Gingerbread" },
  { emoji: "🐧", label: "Penguins" },
  { emoji: "🎄", label: "Holly" },
  { emoji: "🍭", label: "Candy canes" },
  { emoji: "🔔", label: "Baubles" },
];

export function ChristmasPromo() {
  const go = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="christmas"
      className="relative overflow-hidden bg-gradient-to-b from-emerald-800 to-emerald-900 py-14 md:py-20 text-white"
      data-testid="section-christmas"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-1.5 text-sm font-semibold shadow-md mb-5">
          <Gift className="h-4 w-4" aria-hidden="true" />
          Christmas dates are almost full
        </div>
        <h2 className="font-display font-bold text-3xl md:text-5xl mb-4">Festive Face Painting</h2>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
          Make your Christmas party, school event or family get together magical. Enquire early, because the last few
          dates are going fast!
        </p>

        <ul className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3 mb-10" data-testid="list-christmas-designs">
          {designs.map((d) => (
            <li
              key={d.label}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm md:text-base backdrop-blur-sm border border-white/20"
            >
              <span aria-hidden="true">{d.emoji}</span>
              {d.label}
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            size="lg"
            onClick={() => go("booking")}
            className="bg-red-600 text-white hover:bg-red-700 border-red-700"
            data-testid="button-christmas-book"
          >
            Book your Christmas party
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => go("gallery")}
            className="bg-white/10 text-white border-white/40 hover:bg-white/20"
            data-testid="button-christmas-gallery"
          >
            See festive designs
          </Button>
        </div>
      </div>
    </section>
  );
}
