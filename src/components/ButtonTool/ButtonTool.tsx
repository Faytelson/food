import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import styles from "./ButtonTool.module.scss";

// import HeartIcon from "@assets/icons/heart.svg?react";
import ProfileIcon from "@assets/icons/user.svg?react";

export type ButtonToolVariant = "favorite" | "profile";

export type ButtonToolProps = {
  className?: string;
  variant: ButtonToolVariant;
  onClick?: () => void;
  to?: string;
};

const ButtonTool: React.FC<ButtonToolProps> = ({ className, onClick, to }) => {
  if (to) {
    return (
      <Link
        to={to}
        className={clsx(className, styles["button-tool"])}
      >
        <ProfileIcon></ProfileIcon>
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={clsx(className, "button-tool")}
    >
      <ProfileIcon />
    </button>
  );
};

export default ButtonTool;
