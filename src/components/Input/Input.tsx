import React from "react";
import clsx from "clsx";
import styles from "./Input.module.scss";

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  value: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;
  className?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className, placeholder, name, id, disabled, ...rest }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    return (
      <div className={clsx(styles.input, className)}>
        <input
          ref={ref}
          type="text"
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
    );
  },
);

export default Input;
