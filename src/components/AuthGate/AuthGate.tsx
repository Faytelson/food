import HeartIcon from "@components/icons/HeartIcon";
import { useAuthContext } from "@context/auth/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useModal } from "@context/modal/useModal";
import FormLogin from "@components/FormLogin";
import styles from "./AuthGate.module.scss";
import clsx from "clsx";

const AuthGate = ({ className }: { className?: string }) => {
  const { session } = useAuthContext();
  const navigate = useNavigate();
  const { openModal } = useModal();

  const handleClick = () => {
    if (session) {
      navigate("/favorites");
    } else {
      openModal(<FormLogin title="Войдите в личный кабинет, чтобы просматривать избранное" />);
    }
  };

  return (
    <button
      className={clsx(className, styles["auth-gate"])}
      onClick={handleClick}
      aria-label="Перейти в избранное"
    >
      <HeartIcon
        width={20}
        height={20}
        color="accent"
        aria-hidden="true"
      ></HeartIcon>
    </button>
  );
};

export default AuthGate;
