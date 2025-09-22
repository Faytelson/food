import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className={styles["modal"]}
      onClick={onClose}
    >
      <div
        className={styles["modal__content"]}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
