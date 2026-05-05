import { useState, useEffect } from "react";
import css from "./ScrollBtn.module.css";

export default function ScrollBtn() {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollBtn(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`${css.scrollToTop} ${!showScrollBtn ? css.hidden : ""}`}
      onClick={scrollToTop}
      type="button"
    >
      <svg className={css.scrollIcon}>
        <use href="/sprite.svg#icon-chevron-up"></use>
      </svg>
    </button>
  );
}
