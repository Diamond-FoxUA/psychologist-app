import css from "./NotFound.module.css";
import LinkButton from "../../components/LinkButton/LinkButton";

export default function NotFound() {
  return (
    <div className={`container ${css.container}`}>
      <div className={css.title}>
        <h1 className={css.heading}>
          <span className="accent">404</span> | Not Found
        </h1>
      </div>
      <p className={css.paragraph}>Opps.. page not found.</p>
      <LinkButton className={css.btn} variant="secondary" link="/">
        Go to the Homepage
      </LinkButton>
    </div>
  );
}
