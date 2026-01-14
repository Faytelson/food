import { useState } from "react";
import Form from "@components/Form";
import Input from "@components/Input";
import AuthPromptHint from "@components/AuthPromptHint";
import ButtonOpenModal from "@components/ButtonOpenModal";
import Text from "@components/Text";
import ProfileSuccessIcon from "@components/icons/ProfileSuccessIcon";
import { validateInput, type ValidationResult } from "@utils/validateInput";
import { type SubmitStates } from "@components/FormRegister";
import { login } from "@api/auth";
import styles from "./FormLogin.module.scss";

type InputErrors = {
  email: string | null;
  password: string | null;
};

const FormLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [submitState, setSubmitState] = useState<SubmitStates>({ state: "idle" });

  const [inputErrors, setInputErrors] = useState<InputErrors>({
    email: null,
    password: null,
  });

  const noErrors = Object.values(inputErrors).every((error) => error === null);
  const isValid = noErrors && formData.email !== "" && formData.password !== "";

  const loading = submitState.state === "loading";
  const error = submitState.state === "error" ? submitState.message : "";
  const success = submitState.state === "success";

  const fetchLogin = async () => {
    setSubmitState({ state: "loading" });

    login(formData.email, formData.password)
      .then((data) => {
        if (data) {
          setSubmitState({ state: "success" });
          resetForm();
        }
      })
      .catch((err) => {
        setSubmitState({ state: "error", message: err.message });
      });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setInputErrors(errors);
    if (Object.values(errors).some((error) => error !== null)) {
      return;
    }

    fetchLogin();
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const checkEmail = (email: string) => {
    return validateInput(email, [
      { type: "required" },
      { type: "email" },
      { type: "maxLength", value: 50 },
    ]);
  };

  const checkPassword = (password: string) => {
    return validateInput(password, [
      { type: "required" },
      { type: "password" },
      { type: "minLength", value: 8 },
      { type: "maxLength", value: 50 },
    ]);
  };

  const setErrorsObject = (
    field: keyof InputErrors,
    value: string,
    validator: (value: string) => ValidationResult,
  ) => {
    const result = validator(value);
    setInputErrors((prev) => {
      return {
        ...prev,
        [field]: result.valid ? null : result.error,
      };
    });
  };

  const validateForm = (data: typeof formData) => {
    const errors: InputErrors = {
      email: null,
      password: null,
    };

    const emailResult = checkEmail(data.email);
    if (!emailResult.valid) {
      errors.email = emailResult.error;
    }

    const passwordResult = checkPassword(data.password);
    if (!passwordResult.valid) {
      errors.password = passwordResult.error;
    }

    return errors;
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
    });

    setInputErrors({
      email: null,
      password: null,
    });
  };

  return (
    <div className={styles["form-login"]}>
      <Form
        title="Вход в личный кабинет"
        buttonText="Войти"
        loading={loading}
        onSubmit={handleOnSubmit}
        isValid={isValid}
        afterSlot={
          <AuthPromptHint text="Нет аккаунта?">
            <ButtonOpenModal
              modalType="register"
              text="Зарегистрироваться"
            />
          </AuthPromptHint>
        }
        error={error}
      >
        <Input
          type="email"
          value={formData.email}
          name="email"
          onChange={(email) => {
            handleChange("email", email);
            setErrorsObject("email", email, checkEmail);
          }}
          placeholder="Почта"
          error={inputErrors.email}
        ></Input>
        <Input
          type="password"
          value={formData.password}
          name="password"
          onChange={(password) => {
            handleChange("password", password);
            setErrorsObject("password", password, checkPassword);
          }}
          placeholder="Введите пароль"
          error={inputErrors.password}
        ></Input>
      </Form>
      {success && (
        <div className={styles["form-login__success-message"]}>
          <ProfileSuccessIcon
            color="accent"
            width={56}
            height={56}
          />
          <Text
            view="p-18"
            className={styles["form-login__success-message-text"]}
          >
            Вы успешно вошли в систему
          </Text>
        </div>
      )}
    </div>
  );
};

export default FormLogin;
