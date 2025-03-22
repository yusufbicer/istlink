
import { useEffect, useState } from 'react';
import { supabase, dynamicTable, type TableName } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

interface UseRealtimeOptions {
  table: string;
  schema?: string;
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  filter?: string;
  filterValue?: any;
}

// Helper type to get row type from table name
type TableRow<T extends string> = T extends TableName 
  ? Tables<T>
  : Record<string, any>;

export function useSupabaseRealtime<T extends { id: string }, TableT extends string = string>(
  options: UseRealtimeOptions
) {
  const { table, schema = 'public', event = '*', filter, filterValue } = options;
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    
    // Fetch initial data
    const fetchData = async () => {
      try {
        // Use the dynamicTable helper for proper type casting
        let query = supabase.from(dynamicTable(table)).select('*');
        
        if (filter && filterValue !== undefined) {
          // @ts-ignore - Using dynamic filtering
          query = query.eq(filter, filterValue);
        }
        
        const { data: initialData, error: initialError } = await query;
        
        if (initialError) {
          throw initialError;
        }
        
        // Ensure initialData has the expected shape with id property
        if (initialData && Array.isArray(initialData) && initialData.every(item => 'id' in item)) {
          // Use explicit type assertion with 'as unknown as T[]' to safely convert
          setData(initialData as unknown as T[]);
        } else {
          console.warn('Data returned from Supabase does not match expected type T');
          setData([]);
        }
        
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err);
        setLoading(false);
      }
    };
    
    fetchData();

    // Set up realtime subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: event as any,
          schema,
          table
        },
        (payload) => {
          // Use explicit type assertions for payload data
          const newRecord = payload.new as unknown as T;
          const oldRecord = payload.old as unknown as T;
          
          if (payload.eventType === 'INSERT') {
            setData((currentData) => [...currentData, newRecord]);
          } else if (payload.eventType === 'UPDATE') {
            setData((currentData) =>
              currentData.map((item) =>
                item.id === newRecord.id ? newRecord : item
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setData((currentData) =>
              currentData.filter((item) => item.id !== oldRecord.id)
            );
          }
        }
      )
      .subscribe();

    // Cleanup
    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, schema, event, filter, filterValue]);

  return { data, loading, error };
}
