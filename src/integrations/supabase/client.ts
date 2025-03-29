
import { createClient } from '@supabase/supabase-js';

// Constants for Supabase connection
const SUPABASE_URL = "https://kszyokancjhnxykowaiv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzenlva2FuY2pobnh5a293YWl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5ODgzMTcsImV4cCI6MjA1ODU2NDMxN30.Jh0rHXXqx1qody_jmrq6rJnV3TU3z97EYE5HkbsaGO8";

// Define database schema types
export type UserRole = 'admin' | 'supplier' | 'customer';

export interface Profile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  created_at?: string;
  updated_at?: string;
}

export interface Supplier {
  id: string;
  user_id: string;
  company_name: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface Customer {
  id: string;
  user_id: string;
  company_name: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface Order {
  id: string;
  customer_id: string;
  supplier_id: string;
  status: string;
  amount: number;
  total_amount: number;
  order_date: string;
  created_at?: string;
  updated_at?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at?: string;
  updated_at?: string;
}

// Create and export the supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'supabase.auth.token',
  },
});

// Helper function to generate UUIDs
export const generateUUID = (): string => {
  return crypto.randomUUID();
};

// Helper function to handle errors
export const handleError = (error: any, message: string = "Operation failed"): { message: string, details: any } => {
  console.error(message, error);
  return {
    message: error?.message || message,
    details: error?.details || error
  };
};

// Auth helpers
export const getCurrentUser = async (): Promise<Profile | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return null;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .maybeSingle();
    
    if (error || !data) return null;
    
    return data as Profile;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

export const getCurrentUserRole = async (): Promise<UserRole | null> => {
  const user = await getCurrentUser();
  return user?.role || null;
};

export const getUserById = async (userId: string): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    
    if (error || !data) return null;
    
    return data as Profile;
  } catch (error) {
    console.error("Error getting user by ID:", error);
    return null;
  }
};

// Supplier helpers
export const getCurrentSupplierId = async (): Promise<string | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return null;
    
    const { data, error } = await supabase
      .from('suppliers')
      .select('id')
      .eq('user_id', session.user.id)
      .maybeSingle();
    
    if (error || !data) return null;
    
    return data.id;
  } catch (error) {
    console.error("Error getting supplier ID:", error);
    return null;
  }
};

// Customer helpers
export const getCurrentCustomerId = async (): Promise<string | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return null;
    
    const { data, error } = await supabase
      .from('customers')
      .select('id')
      .eq('user_id', session.user.id)
      .maybeSingle();
    
    if (error || !data) return null;
    
    return data.id;
  } catch (error) {
    console.error("Error getting customer ID:", error);
    return null;
  }
};
