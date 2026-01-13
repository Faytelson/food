import { useState } from "react";
import Form from "@components/Form";
import Input from "@components/Input";
import InputCheckbox from "@components/InputCheckbox";
import AuthPromptHint from "@components/AuthPromptHint";
import ButtonOpenModal from "@components/ButtonOpenModal/ButtonOpenModal";
import Text from "@components/Text";
import MessageIcon from "@components/icons/MessageIcon";
import { validateInput, type ValidationResult } from "@utils/validateInput";
import { register } from "@api/auth";
import styles from "./FormRegister.module.scss";

export type InputErrors = {
  email: string | null;
  password: string | null;
  passwordRepeat: string | null;
};

export type SubmitStates =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success" }
  | { state: "error"; message: string };

const FormRegister = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const [submitState, setSubmitState] = useState<SubmitStates>({ state: "idle" });
  const [isAgreement, setIsAgreement] = useState(false);
  const [inputErrors, setInputErrors] = useState<InputErrors>({
    email: null,
    password: null,
    passwordRepeat: null,
  });

  const noErrors = Object.values(inputErrors).every((error) => error === null);
  const isValid = noErrors && isAgreement;

  const loading = submitState.state === "loading";
  const error = submitState.state === "error" ? submitState.message : "";
  const success = submitState.state === "success";

  const fetchRegister = async () => {
    setSubmitState({ state: "loading" });
    register(formData.email, formData.password)
      .then((data) => {
        console.log(data);
        if (data?.user) {
          setSubmitState({ state: "success" });
          resetForm();
          return;
        }
      })
      .catch((error) => {
        setSubmitState({ state: "error", message: error.message });
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setInputErrors(errors);
    if (Object.values(errors).some((error) => error !== null)) {
      return;
    }
    fetchRegister();
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

  const checkPasswordRepeat = (passwordRepeat: string) => {
    return validateInput(passwordRepeat, [
      { type: "required" },
      { type: "passwordRepeat", value: formData.password },
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
      passwordRepeat: null,
    };

    const emailResult = checkEmail(data.email);
    if (!emailResult.valid) {
      errors.email = emailResult.error;
    }

    const passwordResult = checkPassword(data.password);
    if (!passwordResult.valid) {
      errors.password = passwordResult.error;
    }

    const passwordRepeatResult = checkPasswordRepeat(data.passwordRepeat);
    if (!passwordRepeatResult.valid) {
      errors.passwordRepeat = passwordRepeatResult.error;
    }

    return errors;
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      passwordRepeat: "",
    });

    setInputErrors({
      email: null,
      password: null,
      passwordRepeat: null,
    });

    setIsAgreement(false);
  };

  return (
    <div className={styles["form-register"]}>
      <Form
        title="Регистрация"
        buttonText="Зарегистрироваться"
        loading={loading}
        isValid={isValid}
        onSubmit={handleSubmit}
        error={error}
        afterSlot={
          <AuthPromptHint text="Уже есть аккаунт?">
            <ButtonOpenModal
              modalType="login"
              text="Войти в личный кабинет"
            />
          </AuthPromptHint>
        }
      >
        <div>
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
        </div>
        <Input
          type="password"
          value={formData.password}
          name="password"
          error={inputErrors.password}
          onChange={(password) => {
            handleChange("password", password);
            setErrorsObject("password", password, checkPassword);
          }}
          placeholder="Придумайте пароль"
        ></Input>
        <Input
          type="password"
          value={formData.passwordRepeat}
          error={inputErrors.passwordRepeat}
          onChange={(passwordRepeat) => {
            handleChange("passwordRepeat", passwordRepeat);
            setErrorsObject("passwordRepeat", passwordRepeat, checkPasswordRepeat);
          }}
          placeholder="Повторите пароль"
        ></Input>

        <InputCheckbox
          checked={isAgreement}
          label="Я согласен с обработкой персональных данных"
          onChange={() => setIsAgreement(!isAgreement)}
        />
      </Form>
      {success && (
        <div className={styles["form-register__success-message"]}>
          <MessageIcon
            color="accent"
            width={56}
            height={56}
          />
          <Text
            view="p-18"
            className={styles["form-register__success-message-text"]}
          >
            Письмо отправлено. <br></br> Подтвердите регистрацию по ссылке в письме
          </Text>
        </div>
      )}
    </div>
  );
};

export default FormRegister;
