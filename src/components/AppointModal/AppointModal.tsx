import Modal from "../Modal/Modal";
import AppointForm from "../AppointForm/AppointForm";

import css from "./AppointModal.module.css";

import type { Psychologist } from "../../types/psychologists";
interface AppointModalProps {
  onClose: () => void;
  psychologist: Psychologist;
}

export default function AppointModal({
  onClose,
  psychologist,
}: AppointModalProps) {
  return (
    <Modal onClose={onClose}>
      <div className={css.container}>
        <h2 className={css.heading}>
          Make an appointment with a psychologists
        </h2>
        <p className={css.paragraph}>
          You are on the verge of changing your life for the better. Fill out
          the short form below to book your personal appointment with a
          professional psychologist. We guarantee confidentiality and respect
          for your privacy.
        </p>
        <div className={css.psychologistContainer}>
          <img
            className={css.avatar}
            src={psychologist.avatar_url}
            alt="psychologist avatar"
          />
          <div className={css.psychologistInfo}>
            <p>Your psychologists</p>
            <h3>{psychologist.name}</h3>
          </div>
        </div>
        <AppointForm onSuccess={onClose}/>
      </div>
    </Modal>
  );
}
