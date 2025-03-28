
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'supplier' | 'customer';
  created_at?: string;
  updated_at?: string;
}

export interface Supplier {
  id: string;
  user_id: string;
  company_name: string;
  contact_name?: string;
  phone?: string;
  address?: string;
  created_at?: string;
  updated_at?: string;
  user?: User;
}

export interface Customer {
  id: string;
  user_id: string;
  company_name?: string;
  contact_name?: string;
  phone?: string;
  address?: string;
  created_at?: string;
  updated_at?: string;
  user?: User;
}

export interface Order {
  id: string;
  customer_id: string;
  supplier_id: string;
  order_date: string;
  status: string;
  total_amount: number;
  created_at?: string;
  updated_at?: string;
  customer?: Customer;
  supplier?: Supplier;
}

export interface OrderNote {
  id: string;
  order_id: string;
  customer_id: string;
  note_text: string;
  created_at?: string;
  updated_at?: string;
}

export interface Consolidation {
  id: string;
  admin_id: string;
  status: string;
  total_amount: number;
  consolidated_date: string;
  created_at?: string;
  updated_at?: string;
}

export interface ConsolidationOrder {
  consolidation_id: string;
  order_id: string;
}

export interface Payment {
  id: string;
  consolidation_id: string;
  admin_id: string;
  payment_date?: string;
  amount: number;
  payment_method?: string;
  status: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}
