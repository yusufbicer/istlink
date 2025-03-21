
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

  // Get authorization header
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: 'Missing authorization header' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
    )
  }

  // Verify the user is authenticated
  const token = authHeader.replace('Bearer ', '')
  const { data: { user }, error: authError } = await supabase.auth.getUser(token)
  
  if (authError || !user) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
    )
  }

  // Get the request URL
  const url_obj = new URL(req.url)
  const path = url_obj.pathname.split('/').pop()

  try {
    if (req.method === 'GET') {
      if (path === 'my-consolidations') {
        // Get user's consolidations
        const { data, error } = await supabase
          .from('consolidations')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (error) throw error

        return new Response(
          JSON.stringify({ data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      } else if (path && path !== 'consolidations') {
        // Get a specific consolidation
        const { data, error } = await supabase
          .from('consolidations')
          .select('*')
          .eq('id', path)
          .single()

        if (error) throw error

        // Check if the user owns this consolidation or is an admin
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()

        if (data.user_id !== user.id && profile?.role !== 'admin') {
          return new Response(
            JSON.stringify({ error: 'You do not have permission to view this consolidation' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 }
          )
        }

        return new Response(
          JSON.stringify({ data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      } else {
        // Check if the user is an admin
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()

        if (profile?.role !== 'admin') {
          return new Response(
            JSON.stringify({ error: 'You do not have permission to view all consolidations' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 }
          )
        }

        // Get all consolidations (admin only)
        const { data, error } = await supabase
          .from('consolidations')
          .select('*, profiles(name)')
          .order('created_at', { ascending: false })

        if (error) throw error

        return new Response(
          JSON.stringify({ data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    } else if (req.method === 'POST') {
      // Create a new consolidation
      const { consolidation_type, total_amount } = await req.json()
      
      // Calculate fee based on consolidation type
      let fee_amount = 0
      
      if (consolidation_type === 'first-trial') {
        fee_amount = 299
      } else if (consolidation_type === 'regular') {
        fee_amount = Math.min(total_amount * 0.02, 999)
      } else if (consolidation_type === 'volume') {
        fee_amount = Math.min(total_amount * 0.015, 699)
      } else {
        return new Response(
          JSON.stringify({ error: 'Invalid consolidation type' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
      }
      
      // Insert the new consolidation
      const { data, error } = await supabase
        .from('consolidations')
        .insert({
          user_id: user.id,
          consolidation_type,
          total_amount,
          fee_amount,
          status: 'pending'
        })
        .select()

      if (error) throw error

      return new Response(
        JSON.stringify({ data: data[0] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } else if (req.method === 'PATCH' && path) {
      // Update a consolidation
      const updates = await req.json()
      
      // Check if the user is an admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profile?.role !== 'admin') {
        return new Response(
          JSON.stringify({ error: 'You do not have permission to update consolidations' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 }
        )
      }
      
      // Update the consolidation
      const { data, error } = await supabase
        .from('consolidations')
        .update(updates)
        .eq('id', path)
        .select()

      if (error) throw error

      return new Response(
        JSON.stringify({ data: data[0] }),
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
