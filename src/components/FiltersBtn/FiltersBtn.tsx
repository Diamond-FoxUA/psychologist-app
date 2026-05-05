import css from "./FiltersBtn.module.css";
import type { FilterOption } from "../../types/psychologists";
import { useEffect, useRef, useState } from "react";

interface FilterBtnProps {
  currentFilter: FilterOption;
  onFilterChange: (newFilter: FilterOption) => void;
}

const filterLabels: Record<FilterOption, string> = {
  all: "A to Z",
  "name-desc": "Z to A",
  "price-lt-10": "Less than 10$",
  "price-gt-10": "Greater than 10$",
  popular: "Popular",
  "not-popular": "Not popular",
  "name-asc": "Show all",
};

export default function FiltersBtn({
  currentFilter,
  onFilterChange,
}: FilterBtnProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className={css.container}>
      <label className={css.label} htmlFor="filters">
        Filters
      </label>
      <div
        className={css.dropdownHeader}
        ref={dropdownRef}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={css.currentFilter}>{filterLabels[currentFilter]}</span>
        <span className={`${css.chevron} ${isOpen ? css.rotate : ""}`}>
          <svg className={css.chevronIcon}>
            <use href="/sprite.svg#icon-chevron-up"></use>
          </svg>
        </span>

        {isOpen && (
          <ul className={css.dropdownList}>
            {(Object.keys(filterLabels) as FilterOption[]).map((key) => (
              <li
                className={`${css.dropdownItem} ${currentFilter === key ? css.selected : ""}`}
                key={key}
                onClick={(e) => {
                  e.stopPropagation();
                  onFilterChange(key);
                  setIsOpen((prev) => !prev);
                }}
              >
                {filterLabels[key]}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
