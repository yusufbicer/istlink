
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, dynamicTable } from '@/integrations/supabase/client';
import { toast } from './use-toast';
import { useAuth } from '@/lib/auth';

// Generic type for data fetching
type FetchDataOptions<T> = {
  table: keyof Database['public']['Tables'];
  column?: string;
  value?: string | number | boolean;
  order?: { column: string; ascending?: boolean };
  limit?: number;
  select?: string;
  filters?: { column: string; operator: string; value: any }[];
  transformResponse?: (data: T[]) => any;
};

export function useSupabaseData<T>({
  table,
  column,
  value,
  order,
  limit,
  select = '*',
  filters = [],
  transformResponse,
}: FetchDataOptions<T>) {
  const { user } = useAuth();
  const tableName = dynamicTable(table);

  // Function to fetch data
  const fetchData = async () => {
    let query = supabase.from(tableName).select(select);

    // Apply filters
    if (column && value !== undefined) {
      query = query.eq(column, value);
    }

    // Apply additional filters
    filters.forEach(filter => {
      if (filter.operator === 'eq') {
        query = query.eq(filter.column, filter.value);
      } else if (filter.operator === 'neq') {
        query = query.neq(filter.column, filter.value);
      } else if (filter.operator === 'gt') {
        query = query.gt(filter.column, filter.value);
      } else if (filter.operator === 'lt') {
        query = query.lt(filter.column, filter.value);
      } else if (filter.operator === 'gte') {
        query = query.gte(filter.column, filter.value);
      } else if (filter.operator === 'lte') {
        query = query.lte(filter.column, filter.value);
      } else if (filter.operator === 'in') {
        query = query.in(filter.column, filter.value);
      } else if (filter.operator === 'is') {
        query = query.is(filter.column, filter.value);
      }
    });

    // Order results
    if (order) {
      query = query.order(order.column, {
        ascending: order.ascending !== false,
      });
    }

    // Limit results
    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching data:", error);
      throw error;
    }

    return transformResponse ? transformResponse(data as T[]) : data as T[];
  };

  // Use React Query to fetch and cache data
  return useQuery({
    queryKey: [table.toString(), column, value, JSON.stringify(filters), order, limit, select],
    queryFn: fetchData,
    enabled: !!user, // Only fetch if user is authenticated
  });
}

// Hook to create data
export function useSupabaseCreate<T>(table: keyof Database['public']['Tables']) {
  const queryClient = useQueryClient();
  const tableName = dynamicTable(table);

  return useMutation({
    mutationFn: async (data: any) => {
      const { data: result, error } = await supabase
        .from(tableName)
        .insert(data)
        .select();

      if (error) {
        console.error("Error creating data:", error);
        throw error;
      }

      return result as T[];
    },
    onSuccess: () => {
      // Invalidate query cache for this table
      queryClient.invalidateQueries({ queryKey: [table.toString()] });
      toast({
        title: "Success",
        description: "Data created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create data",
        variant: "destructive",
      });
    },
  });
}

// Hook to update data
export function useSupabaseUpdate<T>(table: keyof Database['public']['Tables']) {
  const queryClient = useQueryClient();
  const tableName = dynamicTable(table);

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { data: result, error } = await supabase
        .from(tableName)
        .update(data)
        .eq('id', id)
        .select();

      if (error) {
        console.error("Error updating data:", error);
        throw error;
      }

      return result as T[];
    },
    onSuccess: () => {
      // Invalidate query cache for this table
      queryClient.invalidateQueries({ queryKey: [table.toString()] });
      toast({
        title: "Success",
        description: "Data updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update data",
        variant: "destructive",
      });
    },
  });
}

// Hook to delete data
export function useSupabaseDelete(table: keyof Database['public']['Tables']) {
  const queryClient = useQueryClient();
  const tableName = dynamicTable(table);

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Error deleting data:", error);
        throw error;
      }

      return id;
    },
    onSuccess: () => {
      // Invalidate query cache for this table
      queryClient.invalidateQueries({ queryKey: [table.toString()] });
      toast({
        title: "Success",
        description: "Data deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete data",
        variant: "destructive",
      });
    },
  });
}
