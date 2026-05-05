import { Link, useLocation } from "react-router-dom";
import { PATHS } from "../../variables";
import { useAuth } from "../../hooks/useAuth";
import css from "./Navbar.module.css";

export default function NavBar() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const currentPath = pathname.startsWith("/") ? pathname.slice(1) : pathname;

  return (
    <nav className={css.navbar}>
      <ul className={css.navList}>
        <li className={`${css.navListItem}`}>
          <Link className={css.navLink} to={`/${PATHS.home}`}>
            Home
          </Link>
        </li>
        <li className={`${css.navListItem} ${currentPath === PATHS.psychologists ? css.active : ""}`}>
          <Link className={css.navLink} to={`/${PATHS.psychologists}`}>
            Psychologists
          </Link>
        </li>
        {user && (
          <li className={`${css.navListItem} ${currentPath === PATHS.favourites ? css.active : ""}`}>
            <Link className={css.navLink} to={`/${PATHS.favourites}`}>
              Favourites
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
