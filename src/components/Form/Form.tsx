import React, { type ReactNode } from "react";
import Text from "@components/Text";
import Button from "@components/Button";
import Loader from "@components/Loader";
import clsx from "clsx";
import styles from "./Form.module.scss";

export type FormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> & {
  title: string;
  buttonText: string;
  children: ReactNode;
  loading?: boolean;
  isValid?: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  ref?: React.Ref<HTMLFormElement>;
  className?: string;
  afterSlot?: ReactNode;
  error?: string;
};

const Form = ({
  title,
  buttonText,
  children,
  loading = false,
  isValid = false,
  onSubmit,
  ref,
  className,
  afterSlot,
  error,
  ...rest
}: FormProps) => {
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

      {error && (
        <Text
          view="p-20"
          color="danger"
          className={styles.form__error}
        >
          {error}
        </Text>
      )}

      <fieldset
        className={styles.form__content}
        disabled={loading}
      >
        <div className={styles.form__inputs}>{children}</div>

        <Button
          type="submit"
          disabled={!isValid}
          className={styles["form__button-submit"]}
        >
          {buttonText}
        </Button>

        {afterSlot}
      </fieldset>

      {loading && (
        <div className={styles["form__loader-wrapper"]}>
          <Loader color="var(--color-white)" />
        </div>
      )}
    </form>
  );
};

export default Form;
