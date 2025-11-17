import { useState } from "react";
import Form, { type FormProps } from "@components/Form";
import Input from "@components/Input";

export type FormLoginProps = Omit<FormProps, "title" | "buttonText" | "children" | "showAgreement">;

const FormLogin = ({ onSubmit, loading, ...rest }: FormLoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Form
      title="Вход в личный кабинет"
      showAgreement
      buttonText="Войти"
      loading={loading}
      onSubmit={onSubmit}
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
        placeholder="Введите пароль"
      ></Input>
    </Form>
  );
};

export default FormLogin;
