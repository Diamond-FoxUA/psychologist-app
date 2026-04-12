import { Link } from "react-router-dom";
import { useState } from "react";

import css from "./MobileMenu.module.css";
import { PATHS } from "../../variables";
import Logo from "../Logo/Logo";
import { createPortal } from "react-dom";
import Button from "../Button/Button";

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const isLoggedIn = false;

  const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => setIsModalOpen((prev) => !prev);

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

        {!isLoggedIn && <div className={css.authBtns}>
          <Button
            onClick={toggleModal}
            className={css.authBtn}
            variant="secondary"
          >
            Log in
          </Button>
          <Button onClick={toggleModal} className={css.authBtn}>
            Register
          </Button>
        </div>}
      </div>
    </div>,
    document.body,
  );
}
