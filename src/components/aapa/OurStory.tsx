import { useEffect, useRef, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import StoryPopup from "./StoryPopup";
import Heritage from "../../../public/Heritage.jpeg";

const OurStory = () => {
  const { addToCart, updateQuantity, setIsOpen, items } = useCart();
  const [showPopup, setShowPopup] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Force popup to show immediately for testing
  useEffect(() => {
    console.log('OurStory component mounted');
    setTimeout(() => {
      console.log('Forcing popup to show for testing');
      setShowPopup(true);
    }, 1000); // Show after 1 second
  }, []);

  useEffect(() => {
    // Check if popup should be shown immediately (for testing)
    const hasSeenPopup = localStorage.getItem('ramadan-popup-seen');
    console.log('Our Story section visible, hasSeenPopup:', hasSeenPopup);
    
    // Show popup immediately if not seen before, or if testing
    if (!hasSeenPopup) {
      console.log('Showing popup immediately (not waiting for intersection)');
      setShowPopup(true);
      localStorage.setItem('ramadan-popup-seen', 'true');
    }
    
    // Set up Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('Our Story intersection:', entry.isIntersecting, entry.intersectionRatio);
            
            // Trigger fade-up animations
            entry.target.querySelectorAll(".fade-up").forEach((el, i) => {
              setTimeout(() => {
                el.classList.add("visible");
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.1 } // Lower threshold for earlier triggering
    );

    if (sectionRef.current) {
      console.log('Starting observer on Our Story section');
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleClaimOffer = () => {
    console.log('Claim offer clicked!');
    
    // Add 20% extra quantity to existing items in cart
    if (items.length > 0) {
      items.forEach(item => {
        const extraQuantity = Math.round(item.quantity * 0.2); // 20% extra
        const newQuantity = item.quantity + extraQuantity;
        
        // Update the item with extra quantity
        updateQuantity(item.product.id, newQuantity);
      });
    }
    
    setShowPopup(false);
    localStorage.setItem('ramadan-popup-seen', 'true');
    localStorage.setItem('ramadan-extra-applied', 'true');
    
    // Scroll to Products section (Aanchar buy section)
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClosePopup = () => {
    console.log('Close popup clicked!');
    setShowPopup(false);
    localStorage.setItem('ramadan-popup-seen', 'true');
  };

  // Debug: Log when showPopup changes
  useEffect(() => {
    console.log('showPopup state changed:', showPopup);
  }, [showPopup]);

  return (
    <>
      <StoryPopup 
        isVisible={showPopup}
        onClose={handleClosePopup}
        onClaimOffer={handleClaimOffer}
      />
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
                <a
                  href="https://www.instagram.com/saadath.auyk?igsh=MXh3ZWF6cmMwcDUxcg=="
                  className="font-medium text-foreground"
                >
                  Saadath Mohi ud din
                </a>
                <p className="text-sm text-muted-foreground">
                  Founder, The Aapa Foods
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default OurStory;
