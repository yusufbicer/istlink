
import { useState, useEffect, useRef } from 'react';
import { supabase, dynamicTable } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

type RealtimeOptions = {
  table: keyof Database['public']['Tables'];
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  filter?: string;
};

export function useSupabaseRealtime<T>({ table, event = '*', filter }: RealtimeOptions) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const tableName = dynamicTable(table);

  useEffect(() => {
    // Initial data fetch
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        let query = supabase.from(String(tableName)).select('*');
        
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
    const channelName = `${String(table)}-changes`;
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes', 
        {
          event,
          schema: 'public',
          table: String(tableName)
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
