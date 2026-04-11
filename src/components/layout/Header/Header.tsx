import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
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
          <button className={css.burgerBtn}>
            <ReactSVG src="/sprite.svg#icon-menu" className="icon" />
          </button>
          <div className={css.authBtns}>
            <Button className={css.authBtn} variant="secondary">Log in</Button>
            <Button className={css.authBtn}>Register</Button>
          </div>
      </div>
    </header>
  );
}
