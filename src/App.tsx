import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./components/Header/Header";
import MobileMenu from "./components/MobileMenu/MobileMenu";
import AuthModal from "./components/AuthModal/AuthModal";

import type { ModalType } from "./types/modal";

function App() {
  const [modal, setModal] = useState<ModalType>(null);

  return (
    <>
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
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
