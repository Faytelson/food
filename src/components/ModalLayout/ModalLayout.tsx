import { createPortal } from "react-dom";
import styles from "./ModalLayout.module.scss";
import clsx from "clsx";

export type ModalLayoutProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const ModalLayout = ({ isOpen, onClose, children }: ModalLayoutProps) => {
  return createPortal(
    <div
      className={clsx(styles["modal-layout"], {
        [styles["modal-layout_open"]]: isOpen,
      })}
      onClick={onClose}
    >
      <div
        className={clsx(styles["modal-layout__popup"])}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles["modal-layout__close-btn"]}
          onClick={onClose}
          aria-label="Закрыть окно"
        />
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default ModalLayout;
