import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import Logo from "../../../public/Logo.png";

const Navbar = () => {
  const { totalItems, setIsOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check if announcement is hidden
    const hidden = localStorage.getItem('ramadan-announcement-hidden');
    setAnnouncementVisible(!hidden);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Our Story", href: "#story" },
    { label: "Products", href: "#products" },
    { label: "Reviews", href: "#reviews" },
  ];

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border/50 h-24"
          : "bg-transparent h-24",
        announcementVisible && !isScrolled ? "top-12" : "top-0"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-full">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3">
          <img
            src={Logo}
            alt="Aapa Foods Logo"
            className="h-44 w-80 md:h-44 md:w-80 object-contain top-5"
          />
          <span className="font-serif text-2xl md:text-3xl font-medium text-foreground ml-[-140px] md:ml-[-180px]">
            The <span className="text-primary">Aapa</span> Foods
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Cart & Mobile Menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2 hover:bg-muted/50 rounded-full transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-5 h-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-muted/50 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/60 backdrop-blur-lg border-b border-border animate-fade-in">
          <div className="px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground hover:text-primary transition-colors py-2 text-lg font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
