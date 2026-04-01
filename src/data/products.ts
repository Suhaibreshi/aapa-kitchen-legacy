import { Product } from '@/contexts/CartContext';

const Mixed = '/mixed.jpeg';
const MasallaTikki = '/tikki.jpeg';

export const products: Product[] = [
  {
    id: 'mixed-anchaar',
    name: 'Mixed Anchaar',
    price: 200,
    weight: '400g',
    inStock: true,
    description: 'A vibrant medley of seasonal vegetables preserved in time-honored Kashmiri traditions, each bite a celebration of heritage.',
    image: Mixed,
    ingredients: ['Carrots', 'Turnips', 'Cauliflower', 'Green Chillies', 'Mustard Oil', 'Traditional Spice Blend'],
    tastingNotes: 'Bold, crunchy, and deeply spiced — a versatile companion for any meal.',
  },
  {
    id: 'masalla-tikki',
    name: 'Kashmiri Masalla Tikki',
    price: 220,
    weight: '200g',
    inStock: true,
    description: 'Traditional Kashmiri spice cakes made from roasted and ground spices, perfect for adding authentic flavor to curries and rice dishes.',
    image: MasallaTikki,
    ingredients: ['Roasted Cumin', 'Coriander Seeds', 'Kashmiri Red Chillies', 'Black Cardamom', 'Cinnamon', 'Cloves', 'Mace', 'Nutmeg'],
    tastingNotes: 'Warm, aromatic, and deeply flavorful — the soul of Kashmiri cuisine in every bite.',
    variants: [
      { weight: '200g', price: 220 },
      { weight: '300g', price: 320 },
    ],
  }
];
