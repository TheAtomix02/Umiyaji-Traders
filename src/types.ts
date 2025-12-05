export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  isNew?: boolean;
  details?: string[]; // Added for modal details
}

export interface Collection {
  id: string;
  title: string;
  image: string;
  description: string;
}

export interface Post {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  category: string;
}

export interface CartItem extends Product {
    cartId: string;
    size: string;
}

export type ViewState = 'HOME' | 'SHOP' | 'LOOKBOOK' | 'JOURNAL' | 'ABOUT' | 'CONTACT';