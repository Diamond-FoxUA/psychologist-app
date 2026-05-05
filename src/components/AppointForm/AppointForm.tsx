import { useState, useEffect, useRef, type ChangeEvent } from "react";

import css from "./AppointForm.module.css";
import Button from "../Button/Button";
import { toast } from "sonner";

const HOURS = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, "0"),
);
const MIN_BASE = ["00", "30"];

const TIME_OPTIONS = HOURS.flatMap((h) => MIN_BASE.map((m) => `${h} : ${m}`));
// Дублюємо для ефекту нескінченності
const INFINITE_OPTIONS = [...TIME_OPTIONS, ...TIME_OPTIONS, ...TIME_OPTIONS];

export default function AppointForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("00 : 00");

  const pickerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSelect = (timeStr: string) => {
    setSelectedTime(timeStr);
    setIsOpen(false);
  };

  const handleSubmit = (e: ChangeEvent) => {
    e.preventDefault();
    toast.success("Success! Your appointment is locked in.");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      const el = scrollRef.current;
      const activeIndex = INFINITE_OPTIONS.indexOf(
        selectedTime,
        TIME_OPTIONS.length,
      );
      const itemHeight = 36;
      el.scrollTop =
        activeIndex * itemHeight - el.clientHeight / 2 + itemHeight / 2;
    }
  }, [isOpen]);

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.inputContainer}>
        <label className="visually-hidden" htmlFor="name">
          Name
        </label>
        <input className={css.input} id="name" type="text" placeholder="Name" />
      </div>

      <div className={css.dblInputContainer}>
        <label className="visually-hidden" htmlFor="phone">
          Phone Number
        </label>
        <input
          className={css.input}
          type="tel"
          id="phone"
          defaultValue="+380"
        />

        <label className="visually-hidden" htmlFor="time">
          Time
        </label>
        <input
          className={`${css.input} ${css.dateInput}`}
          type="text"
          id="time"
          value={selectedTime}
          readOnly
          onClick={() => setIsOpen(!isOpen)}
        />
        <span className={css.clockBtn}>
          <svg className={css.clockIcon}>
            <use href="/sprite.svg#icon-clock"></use>
          </svg>
        </span>
        {isOpen && (
          <div className={css.wheelPicker} ref={pickerRef}>
            <p className={css.pickerTitle}>Meeting time</p>
            <div className={css.wheelContainer} ref={scrollRef}>
              {INFINITE_OPTIONS.map((timeOption, index) => {
                const [h, m] = timeOption.split(" : ");

                return (
                  <div
                    key={index}
                    className={`${css.cell} ${selectedTime === timeOption ? css.active : ""}`}
                    onClick={() => handleSelect(timeOption)}
                  >
                    <span>{h}</span>
                    <span className={css.timeSeparator}>:</span>
                    <span>{m}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className={css.inputContainer}>
        <label className="visually-hidden" htmlFor="comment">
          Comment
        </label>
        <textarea
          className={css.textarea}
          id="comment"
          placeholder="Comment"
        ></textarea>
      </div>

      <Button type="submit" className={css.sendBtn}>
        Send
      </Button>
    </form>
  );
}
