import { useEffect, useRef, useCallback, useState } from "react";

export function useRealtimePolling<T>(
  fetcher: () => Promise<T[]>,
  intervalMs: number = 10000,
  getKey: (item: T) => string = (item: unknown) => (item as { id?: string }).id || ""
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItems, setNewItems] = useState<T[]>([]);
  const knownIds = useRef<Set<string>>(new Set());
  const mounted = useRef(true);

  const refresh = useCallback(async () => {
    try {
      const result = await fetcher();
      if (!mounted.current) return;

      const fresh: T[] = [];
      for (const item of result) {
        const key = getKey(item);
        if (key && !knownIds.current.has(key)) {
          fresh.push(item);
        }
        if (key) knownIds.current.add(key);
      }

      setData(result);
      if (fresh.length > 0 && !loading) {
        setNewItems(fresh);
      }
    } catch {
      // keep previous data on error
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, [fetcher, getKey, loading]);

  useEffect(() => {
    mounted.current = true;
    refresh();

    const interval = setInterval(refresh, intervalMs);
    return () => {
      mounted.current = false;
      clearInterval(interval);
    };
  }, [refresh, intervalMs]);

  function clearNewItems() {
    setNewItems([]);
  }

  return { data, loading, newItems, clearNewItems, refresh };
}
