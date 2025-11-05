import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";
import louisePhoto from "@assets/f3eb7900-b9cc-4ee1-825d-e70b55b90da7_1761205448052.jpg";

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 lg:py-32" data-testid="section-about">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-4"
            data-testid="text-about-title"
          >
            🌸 About Me
          </h2>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-6 md:p-8 lg:p-12 space-y-6 text-base md:text-lg text-foreground leading-relaxed">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-4">
              <img 
                src={louisePhoto} 
                alt="Louise - Happy Faces Belfast"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-primary/20"
                data-testid="image-profile"
              />
              <p className="text-xl md:text-2xl font-semibold text-primary text-center md:text-left">
                Hi, I'm Louise — the face behind Happy Faces Belfast! 🎨
              </p>
            </div>

            <p>
              I've been face painting since 2010, and over the years I've had the joy of bringing colour, sparkle, and smiles to every kind of occasion — from birthday parties and festivals to corporate events, hen parties, communions, and christenings. No party is ever too big or too small!
            </p>

            <p>
              Face painting is more than just a job for me — it's a passion. I love the creativity, the laughter, and seeing that moment when someone looks in the mirror and their eyes light up. I'm always up for a challenge and love trying out new designs to keep things fresh and exciting. With my own kids keeping me in the loop, I stay up to date with the latest trends (they're quick to tell me what's in and what's not!).
            </p>

            <div className="bg-accent/20 border-l-4 border-primary p-4 md:p-6 rounded-md flex items-start gap-3">
              <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <p className="text-foreground">
                Your safety and comfort are important to me — I'm fully insured with Public Liability insurance, and my certificate can be provided upon request.
              </p>
            </div>

            <p>
              Whether it's a small birthday gathering or a large festival crowd, I bring the same energy, creativity, and attention to detail to make sure everyone leaves with a happy face. 💫
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
