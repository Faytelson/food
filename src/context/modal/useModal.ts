import { useContext } from "react";
import ModalContext from "@context/modal/ModalContext";

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Контекст должен быть использован внутри провайдера");
  return context;
};
