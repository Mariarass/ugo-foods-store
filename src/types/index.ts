export type ProductType = 'balls' | 'granola' | 'dessert';

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  category: string;
  price: number;
  description: string;
  ingredients: string[];
  protein: string;
  packageImage: string;
  bgColor: string;
  accentColor: string;
  badgeColor: string;
  image?: string;
  noAddedSugar?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}
