import { useState } from "react";
import Form from "@components/Form";
import Input from "@components/Input";
import AuthPromptHint from "@components/AuthPromptHint";
import ButtonOpenModal from "@components/ButtonOpenModal";

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Implement login logic here
  };

  return (
    <Form
      title="Вход в личный кабинет"
      buttonText="Войти"
      loading={loading}
      onSubmit={handleOnSubmit}
      afterSlot={
        <AuthPromptHint text="Нет аккаунта?">
          <ButtonOpenModal
            modalType="register"
            text="Зарегистрироваться"
          />
        </AuthPromptHint>
      }
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
