import css from "./AuthModal.module.css";

import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import AuthForm from "../AuthForm/AuthForm";

interface AuthModalProps {
  type: "login" | "register";
  onClose: () => void;
}

export default function AuthModal({ type, onClose }: AuthModalProps) {
  return (
    <Modal onClose={onClose}>
      {type === "register" && (
        <>
          <div className={css.modalHeader}>
            <h2 className={css.heading}>Registration</h2>
            <p className={css.paragraph}>
              Thank you for your interest in our platform! In order to register,
              we need some information. Please provide us with the following
              information.
            </p>
          </div>
          <AuthForm type={type} />
          <Button type={"submit"}>Sign Up</Button>
        </>
      )}

      {type === "login" && (
        <>
          <h2 className={css.heading}>Log In</h2>
          <p className={css.paragraph}>
            Welcome back! Please enter your credentials to access your account
            and continue your search for a psychologist.
          </p>
          <AuthForm type={type} />
          <Button type={"submit"}>Log In</Button>
        </>
      )}
    </Modal>
  );
}
