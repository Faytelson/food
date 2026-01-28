import React from "react";
import Text from "@components/Text";
import clsx from "clsx";
import styles from "./Input.module.scss";

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "password" | "tel";
  afterSlot?: React.ReactNode;
  error?: string | null;
  className?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      onChange,
      type = "text",
      afterSlot,
      error,
      className,
      placeholder,
      name,
      id,
      disabled,
      ...rest
    },
    ref,
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    return (
      <div className={clsx(styles.input, className)}>
        <div className={styles["input__wrapper"]}>
          <input
            ref={ref}
            type={type}
            value={value}
            placeholder={placeholder ? placeholder : "Text"}
            name={name}
            id={id}
            disabled={disabled}
            onChange={handleChange}
            className={styles["input__field"]}
            {...rest}
          />
          {afterSlot && <div className={styles["input__icon"]}>{afterSlot}</div>}
        </div>
        {error && (
          <Text
            view="p-14"
            color="danger"
            className={styles["input__error"]}
          >
            {error}
          </Text>
        )}
      </div>
    );
  },
);

export default Input;
