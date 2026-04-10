import { createContext } from "react";
export type Theme = "green" | "blue" | "orange";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);
