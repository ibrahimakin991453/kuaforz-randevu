import { useState } from "react";
import { useApi } from "./useApi";
import type { Appointment } from "../types";

export function useTrackAppointments() {
  const { request } = useApi<Appointment[]>();
  const [results, setResults] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  async function trackByPhone(phone: string) {
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const data = await request(
        `/appointments/by-phone?phone=${encodeURIComponent(phone)}`
      );
      setResults(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sorgulama başarısız");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return { results, loading, error, searched, trackByPhone };
}
