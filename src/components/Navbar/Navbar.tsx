import { Link } from "react-router-dom";
import { PATHS } from "../../variables";

import css from "./Navbar.module.css";
import { useAuth } from "../../hooks/useAuth";

export default function NavBar() {
  const { user } = useAuth();

  return (
    <nav className={css.navbar}>
      <ul className={css.navList}>
        <li className={css.navListItem}>
          <Link className={css.navLink} to={PATHS.home}>
            Home
          </Link>
        </li>
        <li className={css.navListItem}>
          <Link className={css.navLink} to={PATHS.psychologists}>
            Psychologists
          </Link>
        </li>
        {user && (
          <li className={css.navListItem}>
            <Link className={css.navLink} to={PATHS.favourites}>
              Favourites
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
