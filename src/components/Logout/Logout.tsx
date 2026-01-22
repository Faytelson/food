import { useState } from "react";
import Button from "@components/Button";
import Text from "@components/Text";
import ProfileIcon from "@components/icons/ProfileIcon";
import FeedbackMessage from "@components/FeedbackMessage";
import Loader from "@components/Loader";
import { type SubmitStates } from "@components/FormRegister";
import { logout } from "@api/auth";
import { useAuthContext } from "@context/auth/useAuthContext";
import styles from "./Logout.module.scss";

const Logout = () => {
  const [submitState, setSubmitState] = useState<SubmitStates>({ state: "idle" });
  const authContext = useAuthContext();

  const onLogout = async () => {
    setSubmitState({ state: "loading" });
    logout()
      .then(() => {
        setSubmitState({ state: "success" });
      })
      .catch((error) => {
        setSubmitState({ state: "error", message: `Не удалось  разлогиниться: ${error.message}` });
      });
  };

  const loading = submitState.state === "loading";
  const success = submitState.state === "success";
  const error = submitState.state === "error" ? submitState.message : "";

  return (
    <div className={styles.logout}>
      <div className={styles["logout__inner"]}>
        {authContext?.session?.email && (
          <Text
            view="p-18"
            className={styles["logout__title"]}
          >
            Вы зашли как {authContext?.session?.email}
          </Text>
        )}
        <Button
          onClick={onLogout}
          className={styles["logout__button"]}
        >
          Выйти
        </Button>

        {error && (
          <Text
            view="p-20"
            color="danger"
            className={styles["logout__error"]}
          >
            {error}
          </Text>
        )}
      </div>

      {loading && (
        <div className={styles["logout__loader-wrapper"]}>
          <Loader color="var(--color-white)" />
        </div>
      )}

      {success && (
        <FeedbackMessage text="Вы вышли из системы">
          <ProfileIcon
            color="accent"
            width={56}
            height={56}
          />
        </FeedbackMessage>
      )}
    </div>
  );
};

export default Logout;
