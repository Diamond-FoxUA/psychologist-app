import { useState } from "react";

import css from "./Header.module.css";
import Logo from "../../Logo/Logo";
import NavBar from "../../Navbar/Navbar";
import Button from "../../Button/Button";
import MobileMenu from "../../MobileMenu/MobileMenu";

export default function Header() {
  const isLoggedIn = false;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <>
      <header className={css.header}>
        <div className={`container ${css.container}`}>
          <Logo />
          <NavBar />

          <button
            className={css.burgerBtn}
            onClick={toggleMobileMenu}
            aria-label="Open navigation menu"
          >
            <svg className={css.icon}>
              <use href="/sprite.svg#icon-menu" className={css.burgerIcon} />
            </svg>
          </button>

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
      </header>

      {isMobileMenuOpen && <MobileMenu onClose={toggleMobileMenu}></MobileMenu>}
    </>
  );
}
