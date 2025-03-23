
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
}

// Order service functions
export const orderService = {
  // Will be implemented with Supabase
  getOrders: async (filterByUser: boolean = true): Promise<Order[]> => {
    // This will be replaced with Supabase queries
    return [];
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
