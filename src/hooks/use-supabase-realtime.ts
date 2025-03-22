
import { useEffect, useState } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UseRealtimeOptions {
  table: string;
  schema?: string;
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  filter?: string;
  filterValue?: any;
}

export function useSupabaseRealtime<T>(options: UseRealtimeOptions) {
  const { table, schema = 'public', event = '*', filter, filterValue } = options;
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    
    // Fetch initial data
    const fetchData = async () => {
      try {
        let query = supabase.from(table).select('*');
        
        if (filter && filterValue !== undefined) {
          query = query.eq(filter, filterValue);
        }
        
        const { data: initialData, error: initialError } = await query;
        
        if (initialError) {
          throw initialError;
        }
        
        setData(initialData as T[]);
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
          event,
          schema,
          table
        },
        (payload) => {
          const newRecord = payload.new as T;
          const oldRecord = payload.old as T;
          
          if (payload.eventType === 'INSERT') {
            setData((currentData) => [...currentData, newRecord]);
          } else if (payload.eventType === 'UPDATE') {
            setData((currentData) =>
              currentData.map((item: any) =>
                item.id === newRecord.id ? newRecord : item
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setData((currentData) =>
              currentData.filter((item: any) => item.id !== oldRecord.id)
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
