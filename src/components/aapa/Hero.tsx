import { ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-charcoal-light" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-olive/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Pre-launch badge */}
        <div
          className="inline-flex items-center gap-2 mb-32 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          {/* <span className="badge-premium">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Pre-Launch 2025
          </span> */}
        </div>

        {/* Main headline */}
        <h1
          className="text-display text-foreground mb-6 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          Pure Kashmiri,
          <br />
          <span className="text-primary">Truly Homemade</span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-subheadline max-w-2xl mx-auto mb-4 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          Celebrating 60+ years of Aapa's anchaar-making legacy
        </p>

        <p
          className="text-body max-w-xl mx-auto mb-12 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.8s" }}
        >
          Small-batch, handmade Kashmiri pickles crafted with love, heritage
          recipes, and absolutely no preservatives.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in"
          style={{ animationDelay: "1s" }}
        >
          <a href="#products" className="btn-primary">
            Shop Anchaar
          </a>
          <a href="#story" className="btn-outline">
            Our Story
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#story"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors opacity-0 animate-fade-in"
        style={{ animationDelay: "1.4s" }}
      >
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
