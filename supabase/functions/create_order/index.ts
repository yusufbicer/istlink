
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle preflight CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get request body
    const { customer_id, supplier_id, total_amount } = await req.json();
    
    // Validate inputs
    if (!customer_id || !supplier_id || !total_amount) {
      return new Response(
        JSON.stringify({
          error: 'Missing required fields: customer_id, supplier_id, and total_amount are required'
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Generate a UUID for the order
    const orderId = crypto.randomUUID();
    
    // Insert the order
    const { data, error } = await supabase
      .from('orders')
      .insert({
        id: orderId,
        customer_id,
        supplier_id,
        total_amount,
        amount: total_amount,
        status: 'pending',
        order_date: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating order:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({ id: orderId, success: true }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
