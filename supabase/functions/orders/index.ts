
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1'

// Set up CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Extract JWT token from Authorization header
    const token = authHeader.replace('Bearer ', '');
    
    // Set the auth token for the client
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid token or user not found' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Parse request path and method
    const { pathname } = new URL(req.url);
    const pathParts = pathname.split('/').filter(Boolean);
    
    // Routes
    if (req.method === 'GET') {
      // Get all orders for the user
      if (pathParts.length === 1) {
        // Get user profile to check role
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileError) {
          return new Response(JSON.stringify({ error: 'User profile not found' }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        let query = supabase.from('orders').select(`
          *,
          order_items (*),
          shipping (*)
        `);

        // Filter based on user role
        if (profile.role === 'buyer') {
          query = query.eq('user_id', user.id);
        } else if (profile.role === 'supplier') {
          query = query.eq('supplier_id', user.id);
        }
        // Admin can see all orders, so no additional filter

        const { data: orders, error: ordersError } = await query;
        
        if (ordersError) {
          return new Response(JSON.stringify({ error: ordersError.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify({ orders }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } 
      // Get a specific order
      else if (pathParts.length === 2) {
        const orderId = pathParts[1];
        
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (*),
            shipping (*),
            notes (*)
          `)
          .eq('id', orderId)
          .single();
        
        if (orderError) {
          return new Response(JSON.stringify({ error: orderError.message }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify({ order }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    } 
    // Create order
    else if (req.method === 'POST' && pathParts.length === 1) {
      const { supplierId, items, shippingAddress, totalAmount } = await req.json();
      
      // Start a transaction
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        return new Response(JSON.stringify({ error: sessionError.message }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      // Generate a unique order number
      const orderNumber = `ORD-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000)}`;
      
      // Create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          supplier_id: supplierId,
          status: 'pending',
          order_number: orderNumber,
          total_amount: totalAmount,
          shipping_address: shippingAddress
        })
        .select()
        .single();
      
      if (orderError) {
        return new Response(JSON.stringify({ error: orderError.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      // Add order items
      const orderItems = items.map((item: any) => ({
        order_id: order.id,
        product_id: item.productId,
        quantity: item.quantity,
        unit_price: item.price
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
      
      if (itemsError) {
        return new Response(JSON.stringify({ error: itemsError.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Order created successfully',
        order
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } 
    // Update order status
    else if (req.method === 'PATCH' && pathParts.length === 2) {
      const orderId = pathParts[1];
      const { status } = await req.json();
      
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date() })
        .eq('id', orderId)
        .select()
        .single();
      
      if (orderError) {
        return new Response(JSON.stringify({ error: orderError.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Order status updated',
        order
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Route not found
    return new Response(JSON.stringify({ error: 'Route not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
})
