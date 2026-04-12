import { Link } from "react-router-dom";
import { PATHS } from "../../variables";
import css from "./Logo.module.css";
 
export default function Logo() {
  return (
    <Link className={css.logo} to={PATHS.home}>
      <span className="accent">psychologists.</span>services
    </Link>
  );
}
