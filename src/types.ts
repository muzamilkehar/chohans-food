export interface MenuItem {
  id: string;
  name: string;
  urduName?: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  isPopular?: boolean;
  isSpicy?: boolean;
  isNew?: boolean;
  sizes?: { name: string; price: number }[];
  addOns?: { id: string; name: string; price: number }[];
  serves?: string;
  prepTime?: string;
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  selectedSize?: { name: string; price: number };
  selectedAddOns: { id: string; name: string; price: number }[];
  quantity: number;
  itemTotal: number;
  specialInstructions?: string;
}

export interface Review {
  id: string;
  author: string;
  role?: string;
  rating: number;
  date: string;
  comment: string;
  tags?: string[];
  photosCount?: number;
  avatarBg?: string;
}

export interface PopularTimeSlot {
  hour: string;
  busyness: number; // 0 to 100
  label: string;
}

export interface DealItem {
  id: string;
  title: string;
  urduTitle?: string;
  tag: string;
  price: number;
  originalPrice: number;
  items: string[];
  serves: string;
  image: string;
  badge?: string;
}
