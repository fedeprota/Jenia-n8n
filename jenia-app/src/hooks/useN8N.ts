'use client';

import { useState, useCallback } from 'react';
import { callN8N } from '@/lib/n8n';

interface UseN8NOptions {
  endpoint: string;
}

export function useN8N<T = unknown>({ endpoint }: UseN8NOptions) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (body?: unknown, formData?: FormData) => {
      setLoading(true);
      setError(null);
      try {
        const result = await callN8N<T>({
          endpoint,
          body,
          formData,
        });
        setData(result);
        return result;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [endpoint]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, execute, reset };
}
