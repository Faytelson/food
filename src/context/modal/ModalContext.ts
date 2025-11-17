import { createContext, type ReactNode } from "react";

type ModalContextType = {
  openModal: (node: ReactNode) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export default ModalContext;
