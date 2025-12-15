import { useState, useEffect, useRef } from "react";
import { Plus, Leaf, Clock, Heart } from "lucide-react";
import { products, comboPrice, comboSavings } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import combo from "../../../public/combo.jpeg";

const Products = () => {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleAddCombo = () => {
    products.forEach((product) => addToCart(product, 1));
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      className="section-padding relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="fade-up badge-premium mb-6 inline-block">
            Small-Batch Collection
          </span>
          <h2 className="fade-up text-headline text-foreground mb-4">
            Our <span className="text-primary">Anchaars</span>
          </h2>
          <p className="fade-up text-body max-w-xl mx-auto">
            Each jar is handcrafted in small batches, ensuring the authentic
            taste and quality that Aapa has perfected over 60 years.
          </p>
          <div className="divider-ornate mt-8 fade-up" />
        </div>

        {/* Products grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="fade-up card-luxury overflow-hidden group"
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              {/* Product image */}
              <div className="aspect-square relative overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />

                {/* Badges */}
                {/* <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="badge-premium text-[10px]">Pre-Launch</span>
                </div> */}
              </div>

              {/* Product info */}
              <div className="p-6 lg:p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-serif text-2xl text-foreground mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {product.weight}
                    </p>
                  </div>
                  <p className="font-serif text-2xl text-primary">
                    ₹{product.price}
                  </p>
                </div>

                <p className="text-body text-sm mb-6">{product.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-4 mb-6 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Leaf className="w-3.5 h-3.5 text-olive" />
                    Natural
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    Small-Batch
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-destructive" />
                    Handmade
                  </span>
                </div>

                {/* Tasting notes (expandable) */}
                <button
                  onClick={() =>
                    setSelectedProduct(
                      selectedProduct === product.id ? null : product.id
                    )
                  }
                  className="text-sm text-primary hover:text-primary/80 transition-colors mb-4"
                >
                  {selectedProduct === product.id
                    ? "Hide details"
                    : "View tasting notes →"}
                </button>

                {selectedProduct === product.id && (
                  <div className="mb-6 p-4 bg-muted/50 rounded-lg animate-fade-in">
                    <p className="text-sm text-muted-foreground italic mb-3">
                      "{product.tastingNotes}"
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-foreground">Ingredients:</strong>{" "}
                      {product.ingredients.join(", ")}
                    </p>
                  </div>
                )}

                {/* Add to cart */}
                <button
                  onClick={() => addToCart(product)}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Combo offer */}
        <div className="fade-up card-luxury relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[360px]">
            {/* LEFT: Image */}
            <div className="relative">
              <img
                src={combo} // change path
                alt="Complete Experience Combo"
                className="w-full h-full object-cover"
              />
            </div>

            {/* RIGHT: Content */}
            <div className="flex flex-col justify-center p-8 lg:p-12 text-left">
              <span className="badge-premium mb-4 inline-block bg-primary/20 w-fit">
                Best Value
              </span>

              <h3 className="font-serif text-3xl text-foreground mb-2">
                The Complete Experience
              </h3>

              <p className="text-muted-foreground mb-6">
                Get both anchaars and save ₹{comboSavings}
              </p>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-muted-foreground line-through text-lg">
                  ₹{products[0].price + products[1].price}
                </span>
                <span className="font-serif text-4xl text-primary">
                  ₹{comboPrice}
                </span>
              </div>

              <button
                onClick={handleAddCombo}
                className="btn-primary inline-flex items-center gap-2 w-fit"
              >
                <Plus className="w-4 h-4" />
                Add Combo to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
