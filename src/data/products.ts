import { Product } from '@/contexts/CartContext';
// Public assets should be referenced from the root in Vite.
// Files in `public/` are served at `/` at runtime. Use absolute paths
// and ensure filename casing matches the filesystem.
const Haakh = '/Haakh.jpeg';
const Mixed = '/mixed.jpeg';
export const products: Product[] = [
   {
    id: 'mixed-anchaar',
    name: 'Mixed Anchaar',
    price: 200,
    weight: '350g',
     inStock: false,
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
     inStock: false,
    description: 'A unique Kashmiri delicacy made from traditional collard greens, slow-cooked with aromatic spices passed down through generations.',
    image: Haakh,
    ingredients: ['Haakh (Collard Greens)', 'Mustard Oil', 'Kashmiri Red Chillies', 'Fennel Seeds', 'Asafoetida', 'Rock Salt'],
    tastingNotes: 'Earthy, tangy with a gentle warmth that lingers — perfect with steamed rice.',
  }
 
];

export const comboPrice = 380;
export const comboSavings = (products[0].price + products[1].price) - comboPrice;
