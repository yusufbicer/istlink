
import { supabase, generateUUID, handleError, getCurrentSupplierId, getCurrentCustomerId } from "@/integrations/supabase/client";
import type { User, UserRole } from "./auth";

// Interface definitions
export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  orders: number;
  status: string;
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

// Customer service
export const customerService = {
  getCustomers: async (supplierOnly: boolean = false): Promise<Customer[]> => {
    try {
      console.log("Fetching customers, supplierOnly:", supplierOnly);
      
      let query = supabase.from('customers').select(`
        id,
        user_id,
        company_name,
        status
      `);
      
      if (supplierOnly) {
        const supplierId = await getCurrentSupplierId();
        if (!supplierId) return [];
        
        // Get orders for this supplier to find customers
        const { data: orders } = await supabase
          .from('orders')
          .select('customer_id')
          .eq('supplier_id', supplierId);
        
        if (orders && orders.length > 0) {
          const customerIds = [...new Set(orders.map(order => order.customer_id))];
          query = query.in('id', customerIds);
        } else {
          return [];
        }
      }
      
      const { data, error } = await query;
      
      if (error || !data) {
        console.error("Error fetching customers:", error);
        return [];
      }
      
      // Get profile info and order counts
      const customersWithData = await Promise.all(
        data.map(async (customer) => {
          // Get user profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('name, email')
            .eq('id', customer.user_id)
            .maybeSingle();
          
          // Count orders
          const { count } = await supabase
            .from('orders')
            .select('id', { count: 'exact', head: true })
            .eq('customer_id', customer.id);
          
          return {
            id: customer.id,
            name: profile?.name || 'Unknown',
            email: profile?.email || 'no-email',
            company: customer.company_name || 'Not specified',
            orders: count || 0,
            status: customer.status as string
          };
        })
      );
      
      return customersWithData.filter(Boolean) as Customer[];
    } catch (error) {
      console.error("Error in getCustomers:", error);
      return [];
    }
  },
  
  getCustomerById: async (id: string): Promise<Customer | null> => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select(`
          id,
          company_name,
          status,
          user_id
        `)
        .eq('id', id)
        .maybeSingle();
      
      if (error || !data) return null;
      
      // Get user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('name, email')
        .eq('id', data.user_id)
        .maybeSingle();
      
      // Count orders
      const { count } = await supabase
        .from('orders')
        .select('id', { count: 'exact', head: true })
        .eq('customer_id', id);
      
      return {
        id: data.id,
        name: profile?.name || 'Unknown',
        email: profile?.email || 'no-email',
        company: data.company_name || 'Not specified',
        status: data.status as string,
        orders: count || 0
      };
    } catch (error) {
      console.error("Error in getCustomerById:", error);
      return null;
    }
  },
};

// Order service
export const orderService = {
  getOrders: async (filterByUser: boolean = true): Promise<Order[]> => {
    try {
      console.log("Fetching orders, filterByUser:", filterByUser);
      
      let query = supabase.from('orders').select(`
        id,
        customer_id,
        supplier_id,
        status,
        amount,
        total_amount,
        order_date
      `);
      
      if (filterByUser) {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) return [];
        
        // Get user role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .maybeSingle();
        
        if (!profile) return [];
        
        if (profile.role === 'supplier') {
          const { data: supplier } = await supabase
            .from('suppliers')
            .select('id')
            .eq('user_id', session.user.id)
            .maybeSingle();
          
          if (supplier) {
            query = query.eq('supplier_id', supplier.id);
          }
        } else if (profile.role === 'customer') {
          const { data: customer } = await supabase
            .from('customers')
            .select('id')
            .eq('user_id', session.user.id)
            .maybeSingle();
          
          if (customer) {
            query = query.eq('customer_id', customer.id);
          }
        }
      }
      
      const { data, error } = await query;
      
      if (error || !data) {
        console.error("Error fetching orders:", error);
        return [];
      }
      
      // Get customer and supplier names
      const ordersWithNames = await Promise.all(data.map(async (order) => {
        // Get customer name
        let customerName = "Unknown Customer";
        if (order.customer_id) {
          const { data: customer } = await supabase
            .from('customers')
            .select('company_name')
            .eq('id', order.customer_id)
            .maybeSingle();
          
          if (customer) {
            customerName = customer.company_name;
          }
        }
        
        // Get supplier name
        let supplierName = "Unknown Supplier";
        if (order.supplier_id) {
          const { data: supplier } = await supabase
            .from('suppliers')
            .select('company_name')
            .eq('id', order.supplier_id)
            .maybeSingle();
          
          if (supplier) {
            supplierName = supplier.company_name;
          }
        }
        
        return {
          id: order.id,
          customer_id: order.customer_id,
          supplier_id: order.supplier_id,
          customerName,
          supplierName,
          amount: order.total_amount || order.amount || 0,
          status: order.status || 'pending',
          date: order.order_date || new Date().toISOString(),
          items: 1 // Default value
        };
      }));
      
      return ordersWithNames;
    } catch (error) {
      console.error("Error in getOrders:", error);
      return [];
    }
  },
  
  createOrder: async (orderData: { customer_id: string; supplier_id: string; amount: number }): Promise<{ success: boolean; data?: any; error?: any }> => {
    try {
      console.log("Creating order:", orderData);
      
      const { data, error } = await supabase.functions.invoke('create_order', {
        body: {
          customer_id: orderData.customer_id,
          supplier_id: orderData.supplier_id,
          total_amount: orderData.amount
        }
      });
      
      if (error) {
        return { 
          success: false, 
          error: handleError(error, "Failed to create order") 
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
};

// Note service
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
      
      return data.map((note: any) => ({
        id: note.id,
        title: note.title || 'Note',
        content: note.content,
        created_at: note.created_at,
        user_id: note.user_id
      }));
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
      
      return {
        id: data.id,
        title: data.title || 'Note',
        content: data.content,
        created_at: data.created_at,
        user_id: data.user_id
      };
    } catch (error) {
      console.error("Error in createNote:", error);
      return null;
    }
  }
};

// Helper to check access
export const checkAccess = (user: User | null, role: UserRole | UserRole[]): boolean => {
  if (!user) return false;
  
  if (Array.isArray(role)) {
    return role.includes(user.role);
  }
  
  return user.role === role || user.role === 'admin';
};
