import { Product } from '@/contexts/CartContext';
import { fetchStockData, isItemInStock } from '@/services/googleSheets';

// Public assets should be referenced from the root in Vite.
// Files in `public/` are served at `/` at runtime. Use absolute paths
// and ensure filename casing matches the filesystem.
const Haakh = '/Haakh.jpeg';
const Mixed = '/mixed.jpeg';

// Base products data (without stock info)
const baseProducts: Product[] = [
   {
    id: 'mixed-anchaar',
    name: 'Mixed Anchaar',
    price: 200,
    weight: '350g',
    inStock: true, // This will be updated dynamically
    description: 'A vibrant medley of seasonal vegetables preserved in time-honored Kashmiri traditions, each bite a celebration of heritage.',
    image: Mixed,
    ingredients: ['Carrots', 'Turnips', 'Cauliflower', 'Green Chillies', 'Mustard Oil', 'Traditional Spice Blend'],
    tastingNotes: 'Bold, crunchy, and deeply spiced — a versatile companion for any meal.',
  },
  {
    id: 'haakh-anchaar',
    name: 'Haakh-e-Anchaar',
    price: 200,
    weight: '350g',
    inStock: true, // This will be updated dynamically
    description: 'A unique Kashmiri delicacy made from traditional collard greens, slow-cooked with aromatic spices passed down through generations.',
    image: Haakh,
    ingredients: ['Haakh (Collard Greens)', 'Mustard Oil', 'Kashmiri Red Chillies', 'Fennel Seeds', 'Asafoetida', 'Rock Salt'],
    tastingNotes: 'Earthy, tangy with a gentle warmth that lingers — perfect with steamed rice.',
  }
];

// Function to get products with updated stock based on Google Sheets data
export async function getProductsWithStock(): Promise<Product[]> {
  try {
    const stockData = await fetchStockData();
    console.log('Updating products with stock data:', stockData);
    
    const updatedProducts = baseProducts.map(product => ({
      ...product,
      inStock: isItemInStock(product.id, stockData)
    }));
    
    console.log('Updated products with stock:', updatedProducts);
    return updatedProducts;
  } catch (error) {
    console.error('Failed to update product stock:', error);
    return baseProducts;
  }
}

// Export the base products for fallback
export { baseProducts as products };

export const comboPrice = 380;
export const comboSavings = (baseProducts[0].price + baseProducts[1].price) - comboPrice;
