
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

// Use the same table name type as in use-supabase-data.ts
type TableNames = 'blog_posts' | 'consolidated_orders' | 'consolidations' | 'notes' | 
                  'order_items' | 'orders' | 'payments' | 'products' | 'profiles' | 'shipping';

type RealtimeOptions = {
  table: TableNames;
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  filter?: string;
};

export function useSupabaseRealtime<T>({ table, event = '*', filter }: RealtimeOptions) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    // Initial data fetch
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        let query = supabase.from(table as TableNames).select('*');
        
        // Apply filter if provided
        if (filter) {
          const [column, value] = filter.split('=');
          query = query.eq(column, value);
        }
        
        const { data: initialData, error: fetchError } = await query;
        
        if (fetchError) {
          throw fetchError;
        }
        
        setData(initialData as unknown as T[]);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
        console.error('Error fetching initial data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();

    // Set up real-time subscription
    const channelName = `${table}-changes`;
    
    // Fix channel subscription syntax
    const channel = supabase
      .channel(channelName)
      .on('postgres_changes', 
        {
          event: event,
          schema: 'public',
          table: table
        },
        (payload) => {
          console.log('Realtime update:', payload);
          
          if (payload.eventType === 'INSERT') {
            setData((prev) => [...prev, payload.new as unknown as T]);
          } else if (payload.eventType === 'UPDATE') {
            setData((prev) => 
              prev.map((item: any) => 
                item.id === payload.new.id ? (payload.new as unknown as T) : item
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setData((prev) => 
              prev.filter((item: any) => item.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    channelRef.current = channel;

    // Cleanup
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [table, event, filter]);

  return { data, loading, error };
}
