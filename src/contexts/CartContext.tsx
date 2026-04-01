import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface ProductVariant {
  weight: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  weight: string;
  description: string;
  image: string;
  ingredients: string[];
  tastingNotes: string;
  inStock: boolean;
  variants?: ProductVariant[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number, selectedVariant?: ProductVariant) => void;
  removeFromCart: (productId: string, variantWeight?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantWeight?: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  hasOutOfStockItems: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state from localStorage (or empty array if not available)
  const [items, setItems] = useState<CartItem[]>(() => {
    // This will work in your actual app, but not in Claude artifacts
    if (typeof window !== "undefined") {
      try {
        const savedCart = localStorage.getItem("aapafoods-cart");
        return savedCart ? JSON.parse(savedCart) : [];
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
        return [];
      }
    }
    return [];
  });

  const [isOpen, setIsOpen] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("aapafoods-cart", JSON.stringify(items));
      } catch (error) {
        console.error("Error saving cart to localStorage:", error);
      }
    }
  }, [items]);

  const addToCart = (product: Product, quantity = 1, selectedVariant?: ProductVariant) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => 
        item.product.id === product.id && 
        item.selectedVariant?.weight === selectedVariant?.weight
      );
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedVariant?.weight === selectedVariant?.weight
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedVariant }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (productId: string, variantWeight?: string) => {
    setItems((prev) => prev.filter((item) => 
      !(item.product.id === productId && item.selectedVariant?.weight === variantWeight)
    ));
  };

  const updateQuantity = (productId: string, quantity: number, variantWeight?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantWeight);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedVariant?.weight === variantWeight
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + (item.selectedVariant?.price || item.product.price) * item.quantity,
    0
  );

  const hasOutOfStockItems = items.some((item) => !item.product.inStock);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        hasOutOfStockItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
