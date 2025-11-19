import React, { useState, type ReactNode } from "react";
import Text from "@components/Text";
import InputCheckbox from "@components/InputCheckbox";
import Button from "@components/Button";
import Loader from "@components/Loader";
import clsx from "clsx";
import styles from "./Form.module.scss";

export type FormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> & {
  title: string;
  showAgreement: boolean;
  buttonText: string;
  children: ReactNode;
  loading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  ref?: React.Ref<HTMLFormElement>;
  className?: string;
  afterSlot?: ReactNode;
  error?: string;
};

const Form = ({
  title,
  showAgreement,
  buttonText,
  children,
  loading = false,
  onSubmit,
  ref,
  className,
  afterSlot,
  error,
  ...rest
}: FormProps) => {
  const [isAgreement, setIsAgreement] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    onSubmit(e);
  };

  return (
    <form
      className={clsx(className, styles.form)}
      ref={ref}
      onSubmit={handleSubmit}
      {...rest}
    >
      <Text
        tag="h3"
        view="p-20"
        className={styles.form__title}
      >
        {title}
      </Text>

      <fieldset className={styles.form__content}>
        <div className={styles.form__inputs}>{children}</div>

        {showAgreement && (
          <InputCheckbox
            checked={isAgreement}
            label="Я согласен с обработкой персональных данных"
            onChange={() => setIsAgreement(!isAgreement)}
            className={styles.form__checkbox}
          />
        )}

        <Button
          type="submit"
          disabled={loading || showAgreement && !isAgreement}
          className={styles["form__button-submit"]}
        >
          {buttonText}
        </Button>

        {afterSlot}
      </fieldset>

      {loading && (
        <div className={styles["form__loader-wrapper"]}>
          <Loader />
        </div>
      )}

      {error && (
        <Text
          view="p-20"
          color="danger"
          className={styles.form__error}
        >
          {error}
        </Text>
      )}
    </form>
  );
};

export default Form;
