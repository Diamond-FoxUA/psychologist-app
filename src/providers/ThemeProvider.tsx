import { useEffect, useState } from "react";

import type { Theme } from "../context/ThemeContext";
import { ThemeContext } from "../context/ThemeContext";

const allowedThemes: Theme[] = ["green", "blue", "orange"];

const getStoredTheme = (): Theme => {
  if (typeof window === "undefined") return "green";

  const stored = localStorage.getItem("theme");

  if (stored && allowedThemes.includes(stored as Theme)) {
    return stored as Theme;
  }

  return "green";
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme());

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
