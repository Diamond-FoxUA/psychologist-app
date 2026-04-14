import "modern-normalize/modern-normalize.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "./reset.css";
import "./main.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.tsx";
import { Toaster } from "sonner";

import { ThemeProvider } from "./providers/ThemeProvider.tsx";
import { AuthProvider } from "./providers/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toaster richColors position="top-right" />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
