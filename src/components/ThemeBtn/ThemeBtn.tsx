import css from "./ThemeBtn.module.css";
import { useTheme } from "../../hooks/useTheme";

export default function ThemeBtn() {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    switch (theme) {
      case "green":
        setTheme("blue");
        break;
      case "blue":
        setTheme("orange");
        break;
      default:
        setTheme("green");
    }
  };

  return (
    <button className={css.btn} onClick={handleClick}>
      <svg className={css.icon}>
        <use href="/sprite.svg#icon-brush"></use>
      </svg>
    </button>
  );
}
