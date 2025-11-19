import { useModal } from "@context/modal/useModal";
import Popup from "@components/Popup";
import FormRegister from "@components/FormRegister";
import Text from "@components/Text";
import clsx from "clsx";
import styles from "./ButtonOpenRegister.module.scss";

const ButtonOpenRegister = ({ className }: { className?: string }) => {
  const { openModal } = useModal();

  return (
    <button
      className={clsx(styles["button-open-register"], className)}
      onClick={() => {
        openModal(
          <Popup background="light">
            <FormRegister
              loading={false}
              onSubmit={(e) => console.log(e)}
            />
          </Popup>,
        );
      }}
    >
      <Text>Нет аккаунта? Зарегистрироваться</Text>
    </button>
  );
};

export default ButtonOpenRegister;
