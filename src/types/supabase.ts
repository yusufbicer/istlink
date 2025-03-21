
export interface Profile {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  role: 'buyer' | 'supplier' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Supplier {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  country?: string;
  description?: string;
  logo_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  supplier_id: string;
  name: string;
  description?: string;
  price?: number;
  currency?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
  supplier?: Supplier;
}

export interface Order {
  id: string;
  user_id: string;
  status: string;
  total_amount?: number;
  currency?: string;
  shipping_address?: string;
  payment_method?: string;
  tracking_number?: string;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id?: string;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
  product?: Product;
}

export interface Consolidation {
  id: string;
  user_id: string;
  status: string;
  consolidation_type: string;
  total_amount?: number;
  fee_amount?: number;
  currency?: string;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string;
  user_id: string;
  order_id?: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  order_id?: string;
  consolidation_id?: string;
  amount: number;
  currency?: string;
  status: string;
  payment_method?: string;
  transaction_id?: string;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  author_id?: string;
  title: string;
  content: string;
  featured_image?: string;
  slug: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}
