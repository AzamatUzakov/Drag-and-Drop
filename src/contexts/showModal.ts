import { createContext } from "react";

export interface ModalCTXType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const ModalBtn = createContext<ModalCTXType | null>(null);
