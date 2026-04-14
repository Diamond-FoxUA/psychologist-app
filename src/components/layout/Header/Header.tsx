import css from "./Header.module.css";

import Logo from "../../Logo/Logo";
import NavBar from "../../Navbar/Navbar";
import Button from "../../Button/Button";

import type { ModalType } from "../../../types/modal";
interface HeaderProps {
  setModal: (type: ModalType) => void;
}

export default function Header({ setModal } : HeaderProps) {
  const isLoggedIn = false;

  return (
    <>
      <header className={css.header}>
        <div className={`container ${css.container}`}>
          <Logo />
          <NavBar />

          <button
            className={css.burgerBtn}
            onClick={() => setModal("menu")}
            aria-label="Open navigation menu"
          >
            <svg className={css.icon}>
              <use href="/sprite.svg#icon-menu" className={css.burgerIcon} />
            </svg>
          </button>

          {!isLoggedIn && (
            <div className={css.authBtns}>
              <Button
                onClick={() => setModal("login")}
                className={css.authBtn}
                variant="secondary"
              >
                Log in
              </Button>
              <Button onClick={() => setModal("register")} className={css.authBtn}>
                Register
              </Button>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
