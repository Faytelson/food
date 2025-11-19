import { useState } from "react";
import Form, { type FormProps } from "@components/Form";
import Input from "@components/Input";

export type FormRegisterProps = Omit<
  FormProps,
  "title" | "buttonText" | "children" | "showAgreement"
>;

const FormRegister = ({ onSubmit, loading, ...rest }: FormRegisterProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState("");

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (password !== passwordRepeat) {
      setError("Пароли не совпадают");
      return;
    }
    onSubmit(e);
  };

  return (
    <Form
      title="Регистрация"
      showAgreement
      buttonText="Зарегистрироваться"
      loading={loading}
      onSubmit={handleOnSubmit}
      error={error}
      {...rest}
    >
      <Input
        type="email"
        value={email}
        onChange={(email) => setEmail(email)}
        placeholder="Почта"
      ></Input>
      <Input
        type="password"
        value={password}
        onChange={(password) => setPassword(password)}
        placeholder="Придумайте пароль"
      ></Input>
      <Input
        type="password"
        value={passwordRepeat}
        onChange={(passwordRepeat) => setPasswordRepeat(passwordRepeat)}
        placeholder="Повторите пароль"
      ></Input>
    </Form>
  );
};

export default FormRegister;
