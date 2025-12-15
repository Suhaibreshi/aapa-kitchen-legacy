import { Instagram, Mail, MapPin, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-light border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand column */}
          <div>
            <h3 className="font-serif text-2xl text-foreground mb-4">
              The <span className="text-primary">Aapa</span> Foods
            </h3>
            <p className="text-body text-sm mb-6">
              Authentic Kashmiri anchaars, handcrafted with love and 60+ years
              of tradition. No preservatives, just pure heritage.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/theaapafoods"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:Contact@theaapafoods.in"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Email us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif text-lg text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#story"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Shop Anchaar
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Reviews
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/theaapapodcast"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  The Aapa Podcast
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg text-foreground mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span>Anantnag, Kashmir, India</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <a
                  href="mailto:hello@theaapafoods.com"
                  className="hover:text-primary transition-colors"
                >
                  Contact@theaapafoods.in
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Instagram className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <a
                  href="https://instagram.com/theaapafoods"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  @theaapafoods
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} The Aapa Foods. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-destructive" /> in Kashmir
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
