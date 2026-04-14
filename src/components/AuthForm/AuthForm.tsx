import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import css from "./AuthForm.module.css";
import Button from "../Button/Button";
import { useState } from "react";

interface AuthFormProps {
  type: "register" | "login";
  onSuccess: () => void;
}

type FormValues = {
  username?: string;
  email: string;
  password: string;
};

const registerSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required").min(6, "Too short"),
});

const loginSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

export default function AuthForm({ type, onSuccess }: AuthFormProps) {
  const isRegister = type === "register";
  const validationSchema = isRegister ? registerSchema : loginSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: FormValues) => {
    console.log(data);
    onSuccess();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      {isRegister && (
        <div>
          <label className="visually-hidden" htmlFor="username">
            Name
          </label>
          <input
            className={css.input}
            id="username"
            placeholder="Name"
            {...register("username")}
          />

          {errors.username && (
            <p key={errors.username.message} className={css.errorMessage}>
              {errors.username.message}
            </p>
          )}
        </div>
      )}
      <div>
        <label className="visually-hidden" htmlFor="email">
          Email
        </label>
        <input
          className={css.input}
          type="email"
          id="email"
          placeholder="Email"
          {...register("email")}
        />

        {errors.email && (
          <p key={errors.email.message} className={css.errorMessage}>
            {errors.email.message}
          </p>
        )}
      </div>
      <div>
        <div className={css.inputContainer}>
          <label className="visually-hidden" htmlFor="password">
            Password
          </label>
          <input
            className={css.input}
            type="password"
            id="password"
            placeholder="Password"
            {...register("password")}
          />
          <button
            className={css.showPassBtn}
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <svg className={css.eyeIcon}>
                <use href="/sprite.svg#icon-eye-off"></use>
              </svg>
            ) : (
              <svg className={css.eyeIcon}>
                <use href="/sprite.svg#icon-eye"></use>
              </svg>
            )}
          </button>
        </div>

        {errors.password && (
          <p key={errors.password.message} className={css.errorMessage}>
            {errors.password.message}
          </p>
        )}
      </div>

      <Button className={css.submitBtn} type={"submit"}>{isRegister ? "Sign Up" : "Log In"}</Button>
    </form>
  );
}
