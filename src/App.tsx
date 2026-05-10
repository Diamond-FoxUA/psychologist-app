import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "./components/Header/Header";
import MobileMenu from "./components/MobileMenu/MobileMenu";
import AuthModal from "./components/AuthModal/AuthModal";

import SEO from "./components/SEO/SEO";

import type { ModalType } from "./types/modal";

function App() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [modal, setModal] = useState<ModalType>(null);

  return (
    <>
      <SEO
        title="Psychologists.Services"
        description="Discover professional guidance to unlock your potential and overcome life's challenges."
        image="https://psychologist-app-lyart.vercel.app/og-image.jpg"
      />

      <Header setModal={setModal} />

      {modal === "menu" && (
        <MobileMenu
          onClose={() => setModal(null)}
          setModal={(type) => setModal(type)}
        />
      )}
      {(modal === "register" || modal === "login") && (
        <AuthModal type={modal} onClose={() => setModal(null)} />
      )}
      <main
        style={
          currentPath === "/"
            ? {
                background:
                  "linear-gradient(148deg, #f3f3f3, var(--secondary-color))",
                backgroundAttachment: "fixed", // This keeps the gradient pinned to the window
                minHeight: "100vh",
              }
            : {
                background: "#f3f3f3",
                minHeight: "100vh",
              }
        }
      >
        <Outlet />
      </main>
    </>
  );
}

export default App;
