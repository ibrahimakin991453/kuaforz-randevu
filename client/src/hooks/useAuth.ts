import { useState, useCallback } from "react";
import { API_BASE } from "./useApi";

const TOKEN_KEY = "adminToken";

export function useAuth() {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY)
  );

  const isAuthenticated = !!token;

  const login = useCallback(async (password: string) => {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const json = await res.json();
    if (!json.success) {
      throw new Error(json.message || "Giriş başarısız");
    }
    localStorage.setItem(TOKEN_KEY, json.token);
    setToken(json.token);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }, []);

  const getToken = useCallback(() => token, [token]);

  return { isAuthenticated, token, login, logout, getToken };
}
