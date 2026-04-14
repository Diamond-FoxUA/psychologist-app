import { Link } from "react-router-dom";

import css from "./MobileMenu.module.css";
import { PATHS } from "../../variables";
import Logo from "../Logo/Logo";
import { createPortal } from "react-dom";
import Button from "../Button/Button";

import type { ModalType } from "../../types/modal";

interface MobileMenuProps {
  onClose: () => void;
  setModal: (type: ModalType) => void;
}

export default function MobileMenu({ onClose, setModal }: MobileMenuProps) {
  const isLoggedIn = false;

  return createPortal(
    <div className={`container ${css.container}`}>
      <div className={css.container}>
        <div className={css.header}>
          <Logo />
        </div>
        <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close mobile menu"
        >
          <svg className={css.icon}>
            <use href="/sprite.svg#icon-close"></use>
          </svg>
        </button>

        <nav className={css.navbar}>
          <ul className={css.navList}>
            <li className={css.navListItem}>
              <Link onClick={onClose} className={css.navLink} to={PATHS.home}>
                Home
              </Link>
            </li>
            <li className={css.navListItem}>
              <Link
                onClick={onClose}
                className={css.navLink}
                to={PATHS.psychologists}
              >
                Psychologists
              </Link>
            </li>
            {isLoggedIn && (
              <li className={css.navListItem}>
                <Link
                  onClick={onClose}
                  className={css.navLink}
                  to={PATHS.favourites}
                >
                  Favourites
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {!isLoggedIn && (
          <div className={css.authBtns}>
            <Button
              onClick={() => {
                onClose();
                setModal("login");
              }}
              className={css.authBtn}
              variant="secondary"
            >
              Log in
            </Button>
            <Button
              onClick={() => {
                onClose();
                setModal("register");
              }}
              className={css.authBtn}
            >
              Register
            </Button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
