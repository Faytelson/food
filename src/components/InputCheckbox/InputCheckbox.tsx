import React from "react";
import Text from "@components/Text";
import clsx from "clsx";
import styles from "./InputCheckbox.module.scss";

type CheckBoxProps = {
  checked: boolean;
  label: string;
  onChange: () => void;
  disabled?: boolean;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "checked" | "onChange">;

const CheckBox = ({
  checked,
  label,
  onChange,
  disabled = false,
  className,
  ...rest
}: CheckBoxProps) => {
  return (
    <label className={clsx(className, styles["input-checkbox"])}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={styles["input-checkbox__input"]}
        {...rest}
      />
      <span
        className={clsx(
          styles["input-checkbox__mark"],
          disabled ? styles["input-checkbox__mark_disabled"] : "",
          checked ? styles["input-checkbox__mark_checked"] : "",
        )}
      ></span>
      {label && (
        <Text
          className={styles["input-checkbox__label"]}
                  tag="span"
                  view="p-14"
        >
          {label}
        </Text>
      )}
    </label>
  );
};

export default CheckBox;
