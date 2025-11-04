import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Real face painting work photos
import tiger from "@assets/496152960_9411545818955307_4236555642598842777_n_1761149402381.jpg";
import skeleton1 from "@assets/481245689_976254464607082_595279953436100737_n_1761149402376.jpg";
import skeleton2 from "@assets/482203702_976254364607092_3094305187430253445_n_1761149402376.jpg";
import spiderman1 from "@assets/496594843_9392743620835527_3526028665122173163_n_1761149402380.jpg";
import spiderman2 from "@assets/download (1)_1761149402379.png";
import butterfly1 from "@assets/481237075_976650457900816_6483569182094487567_n_1761149402380.jpg";
import butterfly2 from "@assets/481198199_976558151243380_568436406436809459_n_1761149402378.jpg";
import soccerBall from "@assets/496252948_9395670717209484_5871869548130301651_n_1761149402376.jpg";
import fish from "@assets/481098942_976556507910211_2220721328263584107_n_1761149402378.jpg";
import roses from "@assets/download (2)_1761149402379.png";
import floralLeg from "@assets/496006710_9394168310693058_3140310858811802582_n_1761149402375.jpg";
import eyeDesign from "@assets/497006887_9392743334168889_4139047862030730421_n_1761149402380.jpg";
import clown from "@assets/576343221_1164484135784113_1644491298300390321_n";
import clown2 from "@assets/576481087_1164490185783508_976819221129076280_n;
import greenWitch from "@assets/481276212_976254521273743_3792211147195761437_n";

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const galleryItems = [
    { image: tiger, title: "Tiger Face Paint", category: "Animals" },
    { image: spiderman1, title: "Spider-Man", category: "Superheroes" },
    { image: spiderman2, title: "Spider-Man Duo", category: "Superheroes" },
    { image: butterfly1, title: "Rainbow Butterfly", category: "Fantasy" },
    { image: butterfly2, title: "Purple Butterfly", category: "Fantasy" },
    { image: skeleton1, title: "Skeleton with Bow", category: "Special Effects" },
    { image: skeleton2, title: "Classic Skeleton", category: "Special Effects" },
    { image: soccerBall, title: "Soccer Ball", category: "Sports" },
    { image: fish, title: "Blue Fish", category: "Animals" },
    { image: roses, title: "Rose Garden", category: "Floral" },
    { image: floralLeg, title: "Floral Leg Design", category: "Floral" },
    { image: eyeDesign, title: "Eye Swirl Design", category: "Fantasy" },
      { image: clown, title: "Clown Design", category: "Fantasy" },
      { image: clown2, title: "Clown Design", category: "Fantasy" },
      { image: greenWitch, title: "Witch Design", category: "Fantasy" },
  ];

  const categories = ["All", "Animals", "Fantasy", "Superheroes", "Special Effects", "Sports", "Floral"];

  const filteredItems = selectedCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const openLightbox = (index: number) => {
    setLightboxImage(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextImage = () => {
    if (lightboxImage !== null) {
      setLightboxImage((lightboxImage + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (lightboxImage !== null) {
      setLightboxImage((lightboxImage - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  useEffect(() => {
    if (isHovered || !scrollContainerRef.current) return;

    const interval = setInterval(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const maxScroll = container.scrollWidth - container.clientWidth;
      const currentScroll = container.scrollLeft;

      if (currentScroll >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scroll("right");
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section id="gallery" className="py-16 md:py-24 lg:py-32" data-testid="section-gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
            data-testid="text-gallery-title"
          >
            My Work
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Browse my collection of creative face painting designs
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => {
                  setSelectedCategory(category);
                  scrollContainerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
                }}
                data-testid={`button-category-${category.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div 
          className="-mx-4 sm:mx-0"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 md:gap-6 px-4 sm:px-0 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start"
              >
                <button
                  onClick={() => openLightbox(index)}
                  className="group relative aspect-square overflow-hidden rounded-xl hover-elevate transition-all duration-300 hover:scale-105 w-full block"
                  data-testid={`button-gallery-item-${index}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-display font-semibold text-sm md:text-base">{item.title}</p>
                    <p className="text-xs md:text-sm text-white/80">{item.category}</p>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={lightboxImage !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-4xl p-0 bg-black/95 border-0">
          {lightboxImage !== null && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-50 text-white hover:bg-white/10"
                onClick={closeLightbox}
                data-testid="button-close-lightbox"
              >
                <X className="w-6 h-6" />
              </Button>

              <div className="relative aspect-square max-h-[85vh]">
                <img
                  src={filteredItems[lightboxImage].image}
                  alt={filteredItems[lightboxImage].title}
                  className="w-full h-full object-contain"
                  data-testid="image-lightbox"
                />
              </div>

              <div className="absolute top-1/2 left-4 -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 w-12 h-12"
                  onClick={prevImage}
                  data-testid="button-prev-image"
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
              </div>

              <div className="absolute top-1/2 right-4 -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 w-12 h-12"
                  onClick={nextImage}
                  data-testid="button-next-image"
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </div>

              <div className="p-6 text-center text-white">
                <h3 className="font-display font-semibold text-xl mb-1">
                  {filteredItems[lightboxImage].title}
                </h3>
                <p className="text-white/70">{filteredItems[lightboxImage].category}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
