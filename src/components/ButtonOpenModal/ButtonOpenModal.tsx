import React from "react";
import { useModal } from "@context/modal/useModal";
import Text from "@components/Text";
import FormLogin from "@components/FormLogin";
import FormRegister from "@components/FormRegister";
import Logout from "@components/Logout";
import clsx from "clsx";
import styles from "./ButtonOpenModal.module.scss";

type ModalType = "login" | "register" |"logout";
export type ButtonOpenModalProps = {
  modalType: ModalType;
  text?: string;
  icon?: React.ReactNode;
  className?: string;
};

const MODAL_COMPONENTS: Record<ModalType, React.FC> = {
  login: FormLogin,
  register: FormRegister,
  logout : Logout,
};

const ButtonOpenModal = ({ modalType, text, icon, className }: ButtonOpenModalProps) => {
  const { openModal } = useModal();
  const ModalComponent = MODAL_COMPONENTS[modalType];

  return (
    <button
      className={clsx(styles["button-open-modal"], className)}
      onClick={() => {
        openModal(<ModalComponent />);
      }}
    >
      {text && <Text className={styles["button-open-modal__text"]}>{text}</Text>}
      {icon}
    </button>
  );
};

export default ButtonOpenModal;
