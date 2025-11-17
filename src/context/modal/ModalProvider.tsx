import { useState, type ReactNode } from "react";
import ModalLayout from "@components/ModalLayout";
import ModalContext from "@context/modal/ModalContext";

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<ReactNode | null>(null);

  const openModal = (modalContent: ReactNode) => setContent(modalContent);
  const closeModal = () => setContent(null);

  return (
    <ModalContext value={{ openModal, closeModal }}>
      {children}
      <ModalLayout
        isOpen={!!content}
        onClose={closeModal}
      >
        {content}
      </ModalLayout>
    </ModalContext>
  );
};

export default ModalProvider;
