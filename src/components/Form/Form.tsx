import React, { type ReactNode } from "react";
import Text from "@components/Text";
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
  ...rest
}: FormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (loading) {
      e.preventDefault();
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
        {children}

        {showAgreement && <span>я согласен со всем</span>}

        <Button
          type="submit"
          disabled={loading}
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
    </form>
  );
};

export default Form;
