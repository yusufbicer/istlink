
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/supabase";
import { useToast } from "@/hooks/use-toast";

interface UseProductsProps {
  userId: string | undefined;
  userRole: string | undefined;
}

export const useProducts = ({ userId, userRole }: UseProductsProps) => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      let query = supabase.from('products').select('*');
      
      if (userRole === 'supplier') {
        const { data: supplierData } = await supabase
          .from('suppliers')
          .select('id')
          .eq('user_id', userId)
          .single();
          
        if (supplierData?.id) {
          query = query.eq('supplier_id', supplierData.id);
        }
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      setProducts(data || []);
    } catch (error: any) {
      console.error('Error fetching products:', error.message);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [userId, userRole]);

  return {
    products,
    isLoading,
    refetchProducts: fetchProducts
  };
};
