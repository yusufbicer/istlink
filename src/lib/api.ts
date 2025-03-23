
import { supabase } from "@/integrations/supabase/client";
import { User, UserRole } from "./auth";

// Types that will map to our Supabase schema
export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  orders: number;
  status: "active" | "inactive";
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  company: string;
  status: "pending" | "approved" | "rejected" | "active" | "inactive";
  products: number;
  customers: number;
}

export interface Order {
  id: string;
  customer_id: string;
  supplier_id: string;
  customerName: string;
  supplierName: string;
  amount: number;
  status: string;
  date: string;
  items: number;
}

export interface Invoice {
  id: string;
  order_id: string;
  supplier_id: string;
  customer_id: string;
  amount: number;
  status: "draft" | "pending" | "paid" | "overdue";
  created_at: string;
  due_date: string;
}

export interface Payment {
  id: string;
  invoice_id: string;
  amount: number;
  method: string;
  status: "pending" | "completed" | "failed";
  transaction_id?: string;
  date: string;
}

export interface Shipment {
  id: string;
  orders: string[];
  status: "pending" | "processing" | "shipped" | "delivered";
  origin: string;
  destination: string;
  tracking_number?: string;
  carrier: string;
  weight: number;
  dimensions: string;
  created_at: string;
  delivered_at?: string;
}

export interface Consolidation {
  id: string;
  name: string;
  orders: string[];
  status: string;
  totalWeight: number;
  totalValue: number;
  createdAt: string;
  shippingDate: string | null;
  trackingNumber: string | null;
  hasPayment: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
}

// User service functions
export const userService = {
  // Will be implemented with Supabase
  getCustomers: async (supplierOnly: boolean = false): Promise<Customer[]> => {
    // For now, return mock data
    // This will be replaced with: return supabase.from('customers')...
    return [];
  },
  
  getCustomerById: async (id: string): Promise<Customer | null> => {
    // Will be implemented with Supabase
    return null;
  },

  getSuppliers: async (customerOnly: boolean = false): Promise<Supplier[]> => {
    // Will be implemented with Supabase
    return [];
  },
  
  getSupplierById: async (id: string): Promise<Supplier | null> => {
    // Will be implemented with Supabase
    return null;
  },
}

// Order service functions
export const orderService = {
  // Will be implemented with Supabase
  getOrders: async (filterByUser: boolean = true): Promise<Order[]> => {
    // This will be replaced with Supabase queries
    return [];
  },
  
  createOrder: async (order: Omit<Order, 'id' | 'date'>): Promise<Order | null> => {
    // Will be implemented with Supabase
    return null;
  },
  
  updateOrderStatus: async (id: string, status: string): Promise<Order | null> => {
    // Will be implemented with Supabase
    return null;
  }
}

// Invoice service functions
export const invoiceService = {
  getInvoices: async (filterByUser: boolean = true): Promise<Invoice[]> => {
    // Will be implemented with Supabase
    return [];
  },
  
  createInvoice: async (invoice: Omit<Invoice, 'id' | 'created_at'>): Promise<Invoice | null> => {
    // Will be implemented with Supabase
    return null;
  }
}

// Payment service functions
export const paymentService = {
  getPayments: async (filterByUser: boolean = true): Promise<Payment[]> => {
    // Will be implemented with Supabase
    return [];
  },
  
  createPayment: async (payment: Omit<Payment, 'id' | 'date'>): Promise<Payment | null> => {
    // Will be implemented with Supabase
    return null;
  }
}

// Shipment service functions
export const shipmentService = {
  getShipments: async (filterByUser: boolean = true): Promise<Shipment[]> => {
    // Will be implemented with Supabase
    return [];
  },
  
  createShipment: async (shipment: Omit<Shipment, 'id' | 'created_at'>): Promise<Shipment | null> => {
    // Will be implemented with Supabase
    return null;
  }
}

// Consolidation service functions
export const consolidationService = {
  getConsolidations: async (filterByUser: boolean = true): Promise<Consolidation[]> => {
    // Will be implemented with Supabase
    return [];
  },
  
  createConsolidation: async (
    consolidation: Omit<Consolidation, 'id' | 'createdAt'>
  ): Promise<Consolidation | null> => {
    // Will be implemented with Supabase
    return null;
  }
}

// Note service functions
export const noteService = {
  // Will be implemented with Supabase
  getNotes: async (): Promise<Note[]> => {
    // This will be replaced with Supabase queries
    return [];
  },
  
  createNote: async (note: Omit<Note, 'id' | 'created_at' | 'user_id'>): Promise<Note | null> => {
    // Will be implemented with Supabase
    return null;
  }
}

// Helper to check if a user can access a specific resource
export const checkAccess = (user: User | null, role: UserRole | UserRole[]): boolean => {
  if (!user) return false;
  
  if (Array.isArray(role)) {
    return role.includes(user.role);
  }
  
  return user.role === role || user.role === 'admin'; // Admins have access to everything
}
