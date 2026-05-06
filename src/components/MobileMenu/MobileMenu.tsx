import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

import css from "./MobileMenu.module.css";
import { toast } from "sonner";
import { useAuth } from "../../hooks/useAuth";

import { PATHS } from "../../variables";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import ThemeBtn from "../ThemeBtn/ThemeBtn";

import type { ModalType } from "../../types/modal";
import { logout as logoutUser } from "../../services/auth";

interface MobileMenuProps {
  onClose: () => void;
  setModal: (type: ModalType) => void;
}

export default function MobileMenu({ onClose, setModal }: MobileMenuProps) {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logout successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }

    onClose();
    toast.success("Logout successfully!");
  };

  useEffect(() => {
  document.body.classList.add("menu-open");
  return () => document.body.classList.remove("menu-open");
}, []);


  return createPortal(
    <div className={`container`}>
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
            {user && (
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

        {!user && (
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

        {user && (
          <div className={`container ${css.userMenu}`}>
            <Button
              className={css.logoutBtn}
              variant="secondary"
              onClick={handleLogout}
            >
              Log out
            </Button>
            <div className={css.profile}>
              <span className={css.avatar}>
                <svg className={css.userIcon}>
                  <use href="/sprite.svg#icon-user"></use>
                </svg>
              </span>
              <p className={css.username}>{user.displayName}</p>
              <ThemeBtn />
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
