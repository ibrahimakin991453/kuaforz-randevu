import { useState, useCallback } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "/api/v1";

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const request = useCallback(
    async (url: string, options?: RequestInit) => {
      setState({ data: null, loading: true, error: null });
      try {
        const token = localStorage.getItem("adminToken");
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          ...(options?.headers as Record<string, string>),
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
        const res = await fetch(`${API_BASE}${url}`, {
          ...options,
          headers,
        });
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.error?.message || json.message || "Bir hata oluştu");
        }
        setState({ data: json.data ?? json, loading: false, error: null });
        return json.data ?? json;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Bir hata oluştu";
        setState({ data: null, loading: false, error: message });
        throw err;
      }
    },
    []
  );

  return { ...state, request };
}

export { API_BASE };
