import React from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  styleType?: "default" | "light";
  loading?: boolean;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  styleType = "default",
  loading = false,
  className,
  children,
  disabled = false,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        styleType == "light" ? styles["button_light"] : "",
        disabled ? styles["button_disabled"] : "",
        loading ? styles["button_loading"] : "",
        className,
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
