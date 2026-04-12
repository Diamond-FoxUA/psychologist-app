import { Link } from "react-router-dom";
import { PATHS } from "../../../variables";

import css from "./Header.module.css";
import NavBar from "../../Navbar/Navbar";
import Button from "../../Button/Button";

export default function Header() {
  return (
    <header className={css.header}>
      <div className={`container ${css.container}`}>
        <Link className={css.logo} to={PATHS.home}>
          <span className="accent">psychologists.</span>services
        </Link>
        <NavBar />
        <button className={css.burgerBtn} aria-label="Open navigation menu">
          <svg className={css.icon}>
            <use href="/sprite.svg#icon-menu" className={css.burgerIcon}/>
          </svg>
        </button>
        <div className={css.authBtns}>
          <Button className={css.authBtn} variant="secondary">
            Log in
          </Button>
          <Button className={css.authBtn}>Register</Button>
        </div>
      </div>
    </header>
  );
}
