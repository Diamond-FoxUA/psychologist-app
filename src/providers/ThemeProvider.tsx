import { useEffect, useState } from "react";

import type { Theme } from "./ThemeContext";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme");

    if (stored === "green" || stored === "blue" || stored === "orange") {
      return stored;
    }

    return "green";
  });

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
