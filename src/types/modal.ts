export type ModalType = "menu" | "register" | "login" | null;

export interface ModalContextState {
  modal: ModalType;
  setModal: (type: ModalType) => void;
}
