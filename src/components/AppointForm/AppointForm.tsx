import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import Button from "../Button/Button";
import css from "./AppointForm.module.css";

const phoneRegExp = /^\+380\d{9}$/;

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(phoneRegExp, "Phone number must be in format +380XXXXXXXXX"),
    time: yup.string().required("Time is required"),
    comment: yup.string().required("Comment is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const HOURS = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, "0"),
);
const MIN_BASE = ["00", "30"];
const TIME_OPTIONS = HOURS.flatMap((h) => MIN_BASE.map((m) => `${h} : ${m}`));
const INFINITE_OPTIONS = [...TIME_OPTIONS, ...TIME_OPTIONS, ...TIME_OPTIONS];

interface AppointFormProps {
  onSuccess: () => void;
}

export default function AppointForm({ onSuccess }: AppointFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");

  const pickerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { name: "", phone: "", time: "", comment: "" },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    const cleanTime = selectedTime.replace(/\s/g, "");
    setValue("time", cleanTime);

    if (errors.time && cleanTime) {
      trigger("time");
    }
  }, [selectedTime, setValue, trigger, errors.time]);

  const onSubmit = (data: FormData) => {
    console.log(data);
    toast.success("Success! Your appointment is locked in.");
    onSuccess();
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const singleListHeight = scrollHeight / 3;

    if (scrollTop <= 0) {
      scrollRef.current.scrollTop = singleListHeight;
    } else if (scrollTop + clientHeight >= scrollHeight) {
      scrollRef.current.scrollTop = scrollTop - singleListHeight;
    }
  };

  const handleSelect = (timeStr: string) => {
    setSelectedTime(timeStr);
    setIsOpen(false);
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
      const timeToFocus = selectedTime || "09 : 00";
      const activeIndex = INFINITE_OPTIONS.indexOf(
        timeToFocus,
        TIME_OPTIONS.length,
      );
      const itemHeight = 36;
      el.scrollTop =
        activeIndex * itemHeight - el.clientHeight / 2 + itemHeight / 2;
    }
  }, [isOpen, selectedTime]);

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.inputContainer}>
        <input
          {...register("name")}
          className={`${css.input} ${errors.name ? css.errorInput : ""}`}
          placeholder="Name"
        />
        {errors.name && <p className={css.errorText}>{errors.name.message}</p>}
      </div>

      <div className={css.dblInputContainer}>
        <div className={css.inputWrapper}>
          <input
            {...register("phone")}
            className={`${css.input} ${errors.phone ? css.errorInput : ""}`}
            type="tel"
            placeholder="+380"
          />
          {errors.phone && (
            <p className={css.errorText}>{errors.phone.message}</p>
          )}
        </div>

        <div className={css.inputWrapper}>
          <div className={css.timeInputRelative}>
            <input
              className={`${css.input} ${css.dateInput} ${errors.time ? css.errorInput : ""}`}
              type="text"
              value={selectedTime.replace(/\s/g, "")}
              readOnly
              onClick={() => setIsOpen(!isOpen)}
              placeholder="00:00"
            />
            <span className={css.clockBtn} onClick={() => setIsOpen(!isOpen)}>
              <svg className={css.clockIcon}>
                <use href="/sprite.svg#icon-clock"></use>
              </svg>
            </span>
          </div>
          {errors.time && (
            <p className={css.errorText}>{errors.time.message}</p>
          )}

          {isOpen && (
            <div className={css.wheelPicker} ref={pickerRef}>
              <p className={css.pickerTitle}>Meeting time</p>
              <div
                className={css.wheelContainer}
                ref={scrollRef}
                onScroll={handleScroll}
              >
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
      </div>

      <div className={css.inputContainer}>
        <textarea
          {...register("comment")}
          className={`${css.textarea} ${errors.comment ? css.errorInput : ""}`}
          placeholder="Comment"
        />
      </div>
      {errors.comment && (
        <p className={css.errorText}>{errors.comment.message}</p>
      )}

      <Button type="submit" className={css.sendBtn}>
        Send
      </Button>
    </form>
  );
}
