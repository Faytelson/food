import { type ReactNode } from "react";
import styles from "./Popup.module.scss";
import clsx from "clsx";

export type PopupProps = {
  styleType?: "sm" | "md" | "lg";
  background?: "white" | "light";
  children: ReactNode;
  className?: string;
};

const Popup = ({ styleType = "sm", background = "white", children, className }: PopupProps) => {
  return (
    <div
      className={clsx(
        styles.popup,
        className,
        styles[`popup_style_${styleType}`],
        styles[`popup_background_${background}`],
      )}
    >
      {children}
    </div>
  );
};

export default Popup;
