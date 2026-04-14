import css from "./Header.module.css";

import Logo from "../../Logo/Logo";
import NavBar from "../../Navbar/Navbar";
import Button from "../../Button/Button";
import ThemeBtn from "../../ThemeBtn/ThemeBtn";

import { useAuth } from "../../../hooks/useAuth";

import type { ModalType } from "../../../types/modal";
import { logout } from "../../../services/auth";
import { toast } from "sonner";
interface HeaderProps {
  setModal: (type: ModalType) => void;
}

export default function Header({ setModal }: HeaderProps) {
  const { user } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.success("Logout successfully!");
  };

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

          {!user && (
            <div className={css.authBtns}>
              <Button
                onClick={() => setModal("login")}
                className={css.authBtn}
                variant="secondary"
              >
                Log in
              </Button>
              <Button
                onClick={() => setModal("register")}
                className={css.authBtn}
              >
                Register
              </Button>
              <ThemeBtn />
            </div>
          )}

          {user && (
            <div className={css.userMenu}>
              <div className={css.profile}>
                <span className={css.avatar}>
                  <svg className={css.userIcon}>
                    <use href="/sprite.svg#icon-user"></use>
                  </svg>
                </span>
                <p className={css.username}>{user.displayName}</p>
              </div>
              <Button variant="secondary" onClick={handleLogout}>
                Log out
              </Button>
              <ThemeBtn />
            </div>
          )}
        </div>
      </header>
    </>
  );
}
