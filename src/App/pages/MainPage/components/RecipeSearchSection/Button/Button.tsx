import React from "react";
// import Loader from '../Loader';
import styles from "./Button.module.scss";
import clsx from "clsx";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
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
        disabled ? styles["button_disabled"] : "",
        loading ? styles["button_loading"] : "",
        className,
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {/* {loading && (
        <Loader
          size="s"
          className="loader_color_white"
        ></Loader>
      )} */}
      {children}
    </button>
  );
};

export default Button;
