
import { useState, useCallback } from 'react';

interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export function useAsync<T, P extends any[]>(
  asyncFunction: (...args: P) => Promise<T>,
  immediate = false,
  initialArgs?: P
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    isLoading: immediate,
    error: null,
  });

  const execute = useCallback(
    async (...args: P) => {
      setState({ data: null, isLoading: true, error: null });
      try {
        const data = await asyncFunction(...args);
        setState({ data, isLoading: false, error: null });
        return { data, error: null };
      } catch (error) {
        setState({ data: null, isLoading: false, error: error as Error });
        return { data: null, error: error as Error };
      }
    },
    [asyncFunction]
  );

  // Execute the function if immediate is true
  useState(() => {
    if (immediate && initialArgs) {
      execute(...initialArgs);
    }
  });

  return { ...state, execute };
}
