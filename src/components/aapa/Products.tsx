import { useState, useEffect, useRef } from "react";
import { Plus, Leaf, Clock, Heart, ChevronDown } from "lucide-react";
import { products } from "@/data/products";
import { useCart, ProductVariant } from "@/contexts/CartContext";

const Products = () => {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, ProductVariant>>({});
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
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${!product.inStock ? 'opacity-50' : ''}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />

                {!product.inStock && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold">
                    Out of Stock
                  </div>
                )}
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

                {/* Variant dropdown for products with variants */}
                {product.variants && product.variants.length > 0 && (
                  <div className="mb-4">
                    <label className="text-sm text-muted-foreground mb-1 block">Select Size:</label>
                    <div className="relative">
                      <select
                        value={selectedVariants[product.id]?.weight || product.variants[0].weight}
                        onChange={(e) => {
                          const variant = product.variants?.find(v => v.weight === e.target.value);
                          if (variant) {
                            setSelectedVariants(prev => ({ ...prev, [product.id]: variant }));
                          }
                        }}
                        className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                      >
                        {product.variants.map((variant) => (
                          <option key={variant.weight} value={variant.weight}>
                            {variant.weight} - ₹{variant.price}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                )}

                {/* Add to cart */}
                <button
                  onClick={() => {
                    const variant = product.variants ? (selectedVariants[product.id] || product.variants[0]) : undefined;
                    addToCart(product, 1, variant);
                  }}
                  disabled={!product.inStock}
                  className={`w-full flex items-center justify-center gap-2 ${product.inStock ? 'btn-primary' : 'bg-gray-600 text-gray-400 cursor-not-allowed py-3 px-6 rounded-lg'}`}
                >
                  <Plus className="w-4 h-4" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
