import { useState } from "react";
import Form from "@components/Form";
import Input from "@components/Input";
import FeedbackMessage from "@components/FeedbackMessage";
import ProfileSuccessIcon from "@components/icons/ProfileSuccessIcon";
import { validateInput, type ValidationResult } from "@utils/validateInput";
import { type SubmitStates } from "@components/FormRegister";
import { fetchFeedback } from "@api/feedback";
import clsx from "clsx";
import styles from "./FormFeedback.module.scss";

type InputErrors = {
  name: string | null;
  phone: string | null;
};

type FormData = {
  name: string;
  phone: string;
};

type FormFeedbackProps = {
  title?: string;
  className?: string;
};

const FormFeedback = ({
  title = "Оставьте свои контакты, и я обязательно перезвоню вам!",
  className,
}: FormFeedbackProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
  });

  const [submitState, setSubmitState] = useState<SubmitStates>({ state: "idle" });

  const [inputErrors, setInputErrors] = useState<InputErrors>({
    name: null,
    phone: null,
  });

  const cleanPhone = (phone: string) => {
    return phone.replace(/[^\d+]/g, "");
  };

  const noErrors = Object.values(inputErrors).every((error) => error === null);
  const isValid = noErrors && formData.name !== "" && formData.phone !== "";

  const loading = submitState.state === "loading";
  const error = submitState.state === "error" ? submitState.message : "";
  const success = submitState.state === "success";

  const sendFeedback = async (formData: FormData) => {
    setSubmitState({ state: "loading" });

    fetchFeedback(formData)
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
    const phoneToSend = cleanPhone(formData.phone);
    const dataToSend = {
      ...formData,
      phone: phoneToSend,
    };

    sendFeedback(dataToSend);
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const checkName = (value: string) => {
    return validateInput(value, [
      { type: "required" },
      { type: "minLength", value: 1 },
      { type: "maxLength", value: 50 },
    ]);
  };

  const checkPhone = (value: string) => {
    return validateInput(value, [{ type: "required" }, { type: "phone" }]);
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

  const validateForm = (data: FormData) => {
    const errors: InputErrors = {
      name: null,
      phone: null,
    };

    const nameResult = checkName(data.name);
    if (!nameResult.valid) {
      errors.name = nameResult.error;
    }

    const phoneResult = checkPhone(data.phone);
    if (!phoneResult.valid) {
      errors.phone = phoneResult.error;
    }

    return errors;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
    });

    setInputErrors({
      name: null,
      phone: null,
    });
  };

  return (
    <div className={clsx((styles["form-feedback"], className))}>
      <Form
        title={title}
        buttonText="Отправить"
        loading={loading}
        onSubmit={handleOnSubmit}
        isValid={isValid}
        error={error}
      >
        <Input
          type="text"
          value={formData.name}
          name="name"
          onChange={(value) => {
            handleChange("name", value);
            setErrorsObject("name", value, checkName);
          }}
          placeholder="Ваше имя"
          error={inputErrors.name}
        ></Input>
        <Input
          type="tel"
          value={formData.phone}
          name="password"
          onChange={(value) => {
            handleChange("phone", value);
            setErrorsObject("phone", value, checkPhone);
          }}
          placeholder="Введите пароль"
          error={inputErrors.phone}
        ></Input>
      </Form>
      {success && (
        <FeedbackMessage text="Ваше сообщение отправлено. Я свяжусь с Вами как можно скорее!">
          <ProfileSuccessIcon
            color="accent"
            width={56}
            height={56}
          />
        </FeedbackMessage>
      )}
    </div>
  );
};

export default FormFeedback;
