
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // Create Supabase client
  const url = Deno.env.get('SUPABASE_URL') || ''
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
  const supabase = createClient(url, key)

  // Get the request URL
  const url_obj = new URL(req.url)
  const path = url_obj.pathname.split('/').pop()

  try {
    if (req.method === 'GET') {
      // Handle different GET endpoints
      if (path === 'featured') {
        // Get featured products
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            supplier:suppliers(name)
          `)
          .order('created_at', { ascending: false })
          .limit(6)

        if (error) throw error

        return new Response(
          JSON.stringify({ data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      } 
      
      // Default: return all products
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          supplier:suppliers(name)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      return new Response(
        JSON.stringify({ data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } 
    
    if (req.method === 'POST' && path === 'search') {
      // Handle product search
      const { query, category, sort_by, min_price, max_price } = await req.json()
      
      let productQuery = supabase
        .from('products')
        .select(`
          *,
          supplier:suppliers(name)
        `)
      
      // Apply search filters
      if (query) {
        productQuery = productQuery.or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      }
      
      if (category) {
        productQuery = productQuery.eq('category', category)
      }
      
      if (min_price) {
        productQuery = productQuery.gte('price', min_price)
      }
      
      if (max_price) {
        productQuery = productQuery.lte('price', max_price)
      }
      
      // Apply sorting
      if (sort_by === 'price_low') {
        productQuery = productQuery.order('price', { ascending: true })
      } else if (sort_by === 'price_high') {
        productQuery = productQuery.order('price', { ascending: false })
      } else {
        productQuery = productQuery.order('created_at', { ascending: false })
      }
      
      const { data, error } = await productQuery
      
      if (error) throw error
      
      return new Response(
        JSON.stringify({ data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // If we get here, the endpoint doesn't exist
    return new Response(
      JSON.stringify({ error: 'Endpoint not found' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
    )
  } catch (error) {
    console.error('Error:', error)
    
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
