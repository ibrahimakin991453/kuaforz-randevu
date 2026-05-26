import { useState, useCallback } from "react";

export function useDarkMode() {
  const [isDark] = useState(true);

  const toggleDarkMode = useCallback(() => {
    // MVP: dark-only, toggle is no-op
  }, []);

  return { isDark, toggleDarkMode };
}
