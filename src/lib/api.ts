
import { supabase, handleSupabaseError } from "@/integrations/supabase/client";
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
  getCustomers: async (supplierOnly: boolean = false): Promise<Customer[]> => {
    try {
      console.log("Fetching customers, supplierOnly:", supplierOnly);
      let query = supabase.from('customers').select('*');
      
      if (supplierOnly) {
        // Get current user ID
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          console.log("Filtering customers for supplier:", session.user.id);
          query = query.eq('supplier_id', session.user.id);
        }
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching customers:", error);
        return [];
      }
      
      console.log("Customers fetched:", data.length);
      
      // Transform to match the expected Customer interface
      // Explicitly cast status to the union type
      return data.map(customer => ({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        company: customer.company || '',
        status: (customer.status === 'active' ? 'active' : 'inactive') as "active" | "inactive",
        orders: 0 // We'll need to fetch this separately or join
      }));
    } catch (error) {
      console.error("Error in getCustomers:", error);
      return [];
    }
  },
  
  getCustomerById: async (id: string): Promise<Customer | null> => {
    try {
      console.log("Fetching customer by ID:", id);
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) {
        console.error("Error fetching customer:", error);
        return null;
      }
      
      if (!data) {
        console.log("No customer found with ID:", id);
        return null;
      }
      
      // Transform to match the expected Customer interface
      // Explicitly cast status to the union type
      return {
        id: data.id,
        name: data.name,
        email: data.email,
        company: data.company || '',
        status: (data.status === 'active' ? 'active' : 'inactive') as "active" | "inactive",
        orders: 0 // We'll need to fetch this separately
      };
    } catch (error) {
      console.error("Error in getCustomerById:", error);
      return null;
    }
  },
}

// Order service functions
export const orderService = {
  getOrders: async (filterByUser: boolean = true): Promise<Order[]> => {
    try {
      console.log("Fetching orders, filterByUser:", filterByUser);
      let query = supabase.from('orders').select(`
        *,
        customers!orders_customer_id_fkey(name)
      `);
      
      if (filterByUser) {
        // Get current user ID and role
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
          
          if (profile?.role === 'supplier') {
            console.log("Filtering orders for supplier:", session.user.id);
            query = query.eq('supplier_id', session.user.id);
          } else if (profile?.role === 'customer') {
            // For customers, we need to find orders by their customer ID
            console.log("Finding customer ID for user:", session.user.id);
            const { data: customerData } = await supabase
              .from('customers')
              .select('id')
              .eq('user_id', session.user.id)
              .single();
            
            if (customerData?.id) {
              console.log("Filtering orders for customer:", customerData.id);
              query = query.eq('customer_id', customerData.id);
            }
          }
          // For admins, don't filter
        }
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching orders:", error);
        return [];
      }
      
      console.log("Orders fetched:", data.length);
      
      // Transform to match the expected Order interface
      return data.map(order => ({
        id: order.id,
        customer_id: order.customer_id,
        supplier_id: order.supplier_id,
        customerName: order.customers?.name || 'Unknown Customer',
        supplierName: 'Supplier', // We need to fetch this separately
        amount: order.amount,
        status: order.status,
        date: order.date,
        items: order.items
      }));
    } catch (error) {
      console.error("Error in getOrders:", error);
      return [];
    }
  },
  
  createOrder: async (orderData: any): Promise<{success: boolean, data?: any, error?: any}> => {
    try {
      console.log("Creating order:", orderData);
      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select();
        
      if (error) {
        console.error("Error creating order:", error);
        return { 
          success: false, 
          error: handleSupabaseError(error, "Failed to create order") 
        };
      }
      
      return { success: true, data };
    } catch (error) {
      console.error("Error in createOrder:", error);
      return { 
        success: false, 
        error: { message: "An unexpected error occurred" } 
      };
    }
  }
}

// Note service functions
export const noteService = {
  getNotes: async (): Promise<Note[]> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return [];
      
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching notes:", error);
        return [];
      }
      
      return data;
    } catch (error) {
      console.error("Error in getNotes:", error);
      return [];
    }
  },
  
  createNote: async (note: Omit<Note, 'id' | 'created_at' | 'user_id'>): Promise<Note | null> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;
      
      const { data, error } = await supabase
        .from('notes')
        .insert([
          { 
            title: note.title, 
            content: note.content,
            user_id: session.user.id
          }
        ])
        .select()
        .single();
      
      if (error) {
        console.error("Error creating note:", error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error("Error in createNote:", error);
      return null;
    }
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
