import { useState, useEffect, useCallback } from 'react';
import { fetchDynamicContent, ApiResponse } from '../services/api.ts';

interface UseDynamicContentOptions<T> {
  endpoint: string;
  fallbackData: T;
  autoFetch?: boolean;
}

export function useDynamicContent<T>({
  endpoint,
  fallbackData,
  autoFetch = true,
}: UseDynamicContentOptions<T>) {
  const [data, setData] = useState<T>(fallbackData);
  const [loading, setLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'live_api' | 'cached_catalog'>('cached_catalog');

  const executeFetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res: ApiResponse<T> = await fetchDynamicContent<T>(endpoint, fallbackData);
      setData(res.data);
      setSource(res.source);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown network error');
      setData(fallbackData);
    } finally {
      setLoading(false);
    }
  }, [endpoint, fallbackData]);

  useEffect(() => {
    if (autoFetch) {
      executeFetch();
    }
  }, [autoFetch, executeFetch]);

  return {
    data,
    loading,
    error,
    source,
    refetch: executeFetch,
  };
}
