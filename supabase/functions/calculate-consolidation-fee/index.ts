
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ConsolidationFeeRequest {
  amount: number;
  consolidationType: 'first-trial' | 'regular' | 'volume';
}

interface ConsolidationFeeResponse {
  originalAmount: number;
  feePercentage: number;
  feeAmount: number;
  maxFee: number | null;
  appliedFee: number;
  totalAmount: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get request body
    const { amount, consolidationType } = await req.json() as ConsolidationFeeRequest

    // Validate input
    if (!amount || amount <= 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid amount' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    if (!consolidationType) {
      return new Response(
        JSON.stringify({ error: 'Consolidation type is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Calculate fee based on consolidation type
    let feePercentage = 0
    let maxFee: number | null = null
    let feeAmount = 0
    
    switch(consolidationType) {
      case 'first-trial':
        // Fixed fee of $299 for first trial
        feeAmount = 299
        feePercentage = 0 // Not applicable for fixed fee
        break
      case 'regular':
        // 2% with max $999
        feePercentage = 2
        maxFee = 999
        feeAmount = amount * (feePercentage / 100)
        break
      case 'volume':
        // 1.5% with max $699 for 10+ consolidations
        feePercentage = 1.5
        maxFee = 699
        feeAmount = amount * (feePercentage / 100)
        break
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid consolidation type' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
    }

    // Apply maximum fee cap if applicable
    const appliedFee = maxFee !== null ? Math.min(feeAmount, maxFee) : feeAmount
    
    // Calculate total amount
    const totalAmount = amount + appliedFee

    // Return the fee calculation
    const response: ConsolidationFeeResponse = {
      originalAmount: amount,
      feePercentage,
      feeAmount,
      maxFee,
      appliedFee,
      totalAmount
    }

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error calculating consolidation fee:', error)
    
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
