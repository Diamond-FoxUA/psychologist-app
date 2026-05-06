import css from "./Home.module.css";

import LinkButton from "../../components/LinkButton/LinkButton";
import { PATHS } from "../../variables";

export default function Home() {
  return (
    <section className={`section`}>
      <div className={`container ${css.container}`}>
        <div className={css.contentWrapper}>
          <h1 className={css.title}>
            The road to the <span className="accent">depths</span> of the human
            soul
          </h1>
          <p className={css.paragraph}>
            We help you to reveal your potential, overcome challenges and find a
            guide in your own life with the help of our experienced
            psychologists.
          </p>
          <LinkButton className={css.linkBtn} link={PATHS.psychologists}>
            Get started
            <svg className={css.icon}>
              <use href="/sprite.svg#icon-arrow" />
            </svg>
          </LinkButton>
        </div>
        <div className={css.imageWrapper}>
          <img
            src="/img/hero.webp"
            srcSet="/img/hero.webp 1x,  /img/hero@2x.webp 2x"
            alt="Woman wearing glasses and a white shirt, sitting and holding a pen during a discussion."
            width={464}
            height={526}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />

          <span className={css.squareSmall} aria-label="true">
            <svg className={css.icon}>
              <use href="/sprite.svg#icon-question" />
            </svg>
          </span>

          <span className={css.squareMedium} aria-label="true">
            <svg className={css.icon}>
              <use href="/sprite.svg#icon-users" />
            </svg>
          </span>

          <div className={css.rectangle}>
            <div className={css.squareLarge}>
              <svg className={css.icon}>
                <use href="/sprite.svg#icon-check" />
              </svg>
            </div>

            <div className={css.rectangleText}>
              <p>Experienced psychologists</p>
              <p aria-label="15 thousand psychologists">15,000</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
