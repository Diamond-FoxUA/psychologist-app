import css from "./AuthForm.module.css";

interface AuthFormProps {
  type: "register" | "login";
}

export default function AuthForm({ type }: AuthFormProps) {
  return (
    <form className={css.form}>
      {type === "register" && (
        <>
          <label className="visually-hidden" htmlFor="username">
            Name
          </label>
          <input
            className={css.input}
            type="text"
            name="username"
            id="username"
            placeholder="Name"
          />
        </>
      )}
      <label className="visually-hidden" htmlFor="email">
        Email
      </label>
      <input
        className={css.input}
        type="email"
        name="email"
        id="email"
        placeholder="Email"
      />
      <label className="visually-hidden" htmlFor="password">
        Password
      </label>
      <input
        className={css.input}
        type="password"
        name="password"
        id="password"
        placeholder="Password"
      />
    </form>
  );
}
