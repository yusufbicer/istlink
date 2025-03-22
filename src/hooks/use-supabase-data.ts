
import { useState, useEffect } from 'react';
import { supabase, dynamicTable, type TableName } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { Tables } from '@/integrations/supabase/types';

// Define types for the options
interface UseSupabaseDataOptions {
  table: string;
  select?: string;
  filter?: Record<string, any>;
  order?: { column: string; ascending?: boolean };
  limit?: number;
  single?: boolean;
  realtime?: boolean;
}

// Helper type to get row type from table name
type TableRow<T extends string> = T extends TableName 
  ? Tables<T>
  : Record<string, any>;

export function useSupabaseData<T extends string, R = TableRow<T>>(options: UseSupabaseDataOptions) {
  const { 
    table, 
    select = '*', 
    filter, 
    order, 
    limit, 
    single = false,
    realtime = false
  } = options;
  
  const [data, setData] = useState<R | R[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { session } = useAuth();
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Use the dynamicTable helper to cast the string to a valid table name
      let query = supabase.from(dynamicTable(table));
      
      // Continue with the rest of the query building
      // @ts-ignore - Dynamic query building
      query = query.select(select);
      
      // Apply filters if provided
      if (filter) {
        Object.entries(filter).forEach(([key, value]) => {
          if (value !== undefined) {
            if (Array.isArray(value)) {
              // @ts-ignore - Dynamic filtering
              query = query.in(key, value);
            } else {
              // @ts-ignore - Dynamic filtering
              query = query.eq(key, value);
            }
          }
        });
      }
      
      // Apply sorting
      if (order) {
        // @ts-ignore - Dynamic ordering
        query = query.order(order.column, { ascending: order.ascending !== false });
      }
      
      // Apply limit
      if (limit) {
        // @ts-ignore - Dynamic limit
        query = query.limit(limit);
      }
      
      const { data: responseData, error: responseError } = single
        ? // @ts-ignore - Dynamic single selection
          await query.single()
        : await query;
      
      if (responseError) {
        throw responseError;
      }
      
      setData(responseData as R | R[]);
      setError(null);
    } catch (err: any) {
      console.error(`Error fetching data from ${table}:`, err);
      setError(err);
      toast({
        title: "Data fetch error",
        description: err.message || `Failed to fetch data from ${table}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch data if we have a session
    if (session) {
      fetchData();
      
      // Set up realtime subscription if enabled
      if (realtime) {
        const channel = supabase
          .channel('schema-db-changes')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table
            },
            (payload) => {
              // Refresh data on any change
              fetchData();
            }
          )
          .subscribe();
          
        return () => {
          supabase.removeChannel(channel);
        };
      }
    }
  }, [session, table, JSON.stringify(filter), JSON.stringify(order), limit, single, realtime]);

  // CRUD functions
  const create = async (newData: Partial<R>) => {
    try {
      setLoading(true);
      // Use the dynamicTable helper for proper type casting
      const { data: createdData, error: createError } = await supabase
        .from(dynamicTable(table))
        .insert(newData as any)
        .select();
        
      if (createError) {
        throw createError;
      }
      
      toast({
        title: "Success",
        description: "Record created successfully",
      });
      
      fetchData();
      return createdData;
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to create record",
        variant: "destructive",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const update = async (id: string, updates: Partial<R>) => {
    try {
      setLoading(true);
      // Use the dynamicTable helper for proper type casting
      const { data: updatedData, error: updateError } = await supabase
        .from(dynamicTable(table))
        .update(updates as any)
        .eq('id', id)
        .select();
        
      if (updateError) {
        throw updateError;
      }
      
      toast({
        title: "Success",
        description: "Record updated successfully",
      });
      
      fetchData();
      return updatedData;
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to update record",
        variant: "destructive",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const remove = async (id: string) => {
    try {
      setLoading(true);
      // Use the dynamicTable helper for proper type casting
      const { error: deleteError } = await supabase
        .from(dynamicTable(table))
        .delete()
        .eq('id', id);
        
      if (deleteError) {
        throw deleteError;
      }
      
      toast({
        title: "Success",
        description: "Record deleted successfully",
      });
      
      fetchData();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to delete record",
        variant: "destructive",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { 
    data, 
    loading, 
    error,
    refresh: fetchData,
    create,
    update,
    remove
  };
}
