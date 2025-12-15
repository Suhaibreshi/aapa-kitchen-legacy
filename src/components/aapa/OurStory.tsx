import { useEffect, useRef } from "react";
import Heritage from "../../../public/Heritage.jpeg";
const OurStory = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-up").forEach((el, i) => {
              setTimeout(() => {
                el.classList.add("visible");
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="section-padding bg-charcoal-light relative overflow-hidden"
    >
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <div className="fade-up relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-muted relative">
              <img
                src={Heritage}
                alt="Aapa - The heart of our tradition"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 lg:right-auto lg:-left-6 card-luxury p-6 max-w-xs">
              <p className="font-serif text-lg text-primary mb-1">60+ Years</p>
              <p className="text-sm text-muted-foreground">
                of traditional anchaar-making wisdom
              </p>
            </div>
          </div>

          {/* Content side */}
          <div className="lg:py-8">
            <div className="fade-up mb-6">
              <span className="badge-premium">Our Heritage</span>
            </div>

            <h2 className="fade-up text-headline text-foreground mb-6">
              The Heart Behind
              <br />
              <span className="text-primary">Every Jar</span>
            </h2>

            <div className="divider-ornate mb-8 fade-up lg:mx-0" />

            <div className="space-y-6 text-body">
              <p className="fade-up">
                In a quiet kitchen in Kashmir, our beloved{" "}
                <strong className="text-foreground">Aapa</strong> — grandmother
                to our founder Saadath — has been crafting pickles for over six
                decades. Her hands carry the recipes of generations, each jar a
                testament to patience, love, and the flavors of our homeland.
              </p>

              <p className="fade-up">
                When <em>The Aapa Podcast</em> shared her stories on Instagram,
                the world fell in love with her warmth and wisdom. Messages
                poured in — people longing for a taste of authentic Kashmiri
                heritage.
              </p>

              <p className="fade-up">
                And so,{" "}
                <strong className="text-foreground">The Aapa Foods</strong> was
                born. Not as a business, but as a tribute — a way to share
                Aapa's legacy with those who cherish tradition as much as we do.
              </p>
            </div>

            <div className="fade-up mt-10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                <img
                  src="/saadath.jpeg"
                  alt="Saadath Mohi ud din"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  Saadath Mohi ud din
                </p>
                <p className="text-sm text-muted-foreground">
                  Founder, The Aapa Foods
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
