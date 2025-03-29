
import { supabase, handleSupabaseError, getCurrentSupplierID, getCurrentCustomerID, generateUUID } from "@/integrations/supabase/client";
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
      
      // First get the relevant customers based on role
      let customersQuery = supabase.from('customers').select(`
        id,
        user_id,
        company_name,
        status
      `);
      
      if (supplierOnly) {
        // Get current supplier ID
        const supplierId = await getCurrentSupplierID();
        if (supplierId) {
          console.log("Filtering customers for supplier:", supplierId);
          
          // Get orders for this supplier
          const { data: orders } = await supabase
            .from('orders')
            .select('customer_id')
            .eq('supplier_id', supplierId);
          
          // If there are orders, get unique customer IDs
          if (orders && orders.length > 0) {
            const customerIds = [...new Set(orders.map(order => order.customer_id))];
            customersQuery = customersQuery.in('id', customerIds);
          } else {
            // No orders for this supplier, return empty array
            return [];
          }
        } else {
          console.log("No supplier ID found for current user");
          return [];
        }
      }
      
      // Execute the query
      const { data, error } = await customersQuery;
      
      if (error) {
        console.error("Error fetching customers:", error);
        return [];
      }
      
      console.log("Customers fetched:", data?.length);
      
      // For each customer, get user information and count their orders
      const customersWithOrderCounts = await Promise.all(
        (data || []).map(async (customer: any) => {
          // Get user profile data
          const { data: userData, error: userError } = await supabase
            .from('profiles')
            .select('name, email')
            .eq('id', customer.user_id)
            .maybeSingle();
            
          if (userError || !userData) {
            console.error("Error fetching user profile:", userError);
            return null;
          }
          
          // Count orders for this customer
          const { count, error: countError } = await supabase
            .from('orders')
            .select('id', { count: 'exact', head: true })
            .eq('customer_id', customer.id);
          
          if (countError) {
            console.error("Error counting orders:", countError);
          }
          
          return {
            id: customer.id,
            name: userData.name,
            email: userData.email,
            company: customer.company_name || 'Not specified',
            orders: count || 0,
            status: customer.status as "active" | "inactive"
          };
        })
      );
      
      // Filter out any null values and return
      return customersWithOrderCounts.filter(Boolean) as Customer[];
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
        .select(`
          id,
          company_name,
          status,
          user_id
        `)
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
      
      // Get user profile data
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('name, email')
        .eq('id', data.user_id)
        .maybeSingle();
        
      if (userError || !userData) {
        console.error("Error fetching user profile:", userError);
        return null;
      }
      
      // Count orders for this customer
      const { count } = await supabase
        .from('orders')
        .select('id', { count: 'exact', head: true })
        .eq('customer_id', id);
      
      // Return the customer data
      return {
        id: data.id,
        name: userData.name,
        email: userData.email,
        company: data.company_name || 'Not specified',
        status: data.status as "active" | "inactive",
        orders: count || 0
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
        id,
        customer_id,
        supplier_id,
        status,
        amount,
        date
      `);
      
      if (filterByUser) {
        // Get current user role
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          console.log("No active session, returning empty orders");
          return [];
        }
        
        // Get user role
        const { data: userData } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        if (!userData) {
          console.log("User role not found, returning empty orders");
          return [];
        }
        
        if (userData.role === 'supplier') {
          // Get supplier ID
          const { data: supplierData } = await supabase
            .from('suppliers')
            .select('id')
            .eq('user_id', session.user.id)
            .single();
          
          if (supplierData) {
            console.log("Filtering orders for supplier:", supplierData.id);
            query = query.eq('supplier_id', supplierData.id);
          }
        } else if (userData.role === 'customer') {
          // Get customer ID
          const { data: customerData } = await supabase
            .from('customers')
            .select('id')
            .eq('user_id', session.user.id)
            .single();
          
          if (customerData) {
            console.log("Filtering orders for customer:", customerData.id);
            query = query.eq('customer_id', customerData.id);
          }
        }
        // For admins, don't filter
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching orders:", error);
        return [];
      }
      
      console.log("Orders fetched:", data?.length);
      
      // Transform to match the expected Order interface with customer and supplier names
      const ordersWithNames = await Promise.all((data || []).map(async (order: any) => {
        // Get customer name
        let customerName = "Unknown Customer";
        if (order.customer_id) {
          const { data: customerData } = await supabase
            .from('customers')
            .select('company_name')
            .eq('id', order.customer_id)
            .maybeSingle();
          if (customerData) {
            customerName = customerData.company_name;
          }
        }
        
        // Get supplier name
        let supplierName = "Unknown Supplier";
        if (order.supplier_id) {
          const { data: supplierData } = await supabase
            .from('suppliers')
            .select('company_name')
            .eq('id', order.supplier_id)
            .maybeSingle();
          if (supplierData) {
            supplierName = supplierData.company_name;
          }
        }
        
        return {
          id: order.id,
          customer_id: order.customer_id,
          supplier_id: order.supplier_id,
          customerName,
          supplierName,
          amount: order.amount || 0,
          status: order.status || 'pending',
          date: order.date || new Date().toISOString(),
          items: 0 // This field needs to be added to the orders table if needed
        };
      }));
      
      return ordersWithNames;
    } catch (error) {
      console.error("Error in getOrders:", error);
      return [];
    }
  },
  
  createOrder: async (orderData: any): Promise<{success: boolean, data?: any, error?: any}> => {
    try {
      console.log("Creating order:", orderData);
      
      // Use the create_order function to create the order
      const { data, error } = await supabase.rpc('create_order', {
        p_customer_id: orderData.customer_id,
        p_supplier_id: orderData.supplier_id,
        p_total_amount: orderData.amount
      });
      
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
}

// Helper to check if a user can access a specific resource
export const checkAccess = (user: User | null, role: UserRole | UserRole[]): boolean => {
  if (!user) return false;
  
  if (Array.isArray(role)) {
    return role.includes(user.role);
  }
  
  return user.role === role || user.role === 'admin'; // Admins have access to everything
}
