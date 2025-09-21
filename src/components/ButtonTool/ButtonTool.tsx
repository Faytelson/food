import React from "react";
import { Link } from "react-router-dom";
import type { IconProps } from "@components/icons/Icon";
import clsx from "clsx";
import styles from "./ButtonTool.module.scss";

import HeartIcon from "@components/icons/HeartIcon";
import ProfileIcon from "@components/icons/ProfileIcon";

export type ButtonToolVariant = "favorite" | "profile";

export type ButtonToolProps = {
  className?: string;
  variant: ButtonToolVariant;
  onClick?: () => void;
  iconProps?: Partial<IconProps>;
  to?: string;
};

const iconMap: Record<ButtonToolVariant, React.FC<IconProps>> = {
  favorite: HeartIcon,
  profile: ProfileIcon,
};

const ButtonTool: React.FC<ButtonToolProps> = ({ className, variant, onClick, iconProps, to }) => {
  const IconComponent = iconMap[variant];

  if (to) {
    return (
      <Link
        to={to}
        className={clsx(className, styles["button-tool"])}
      >
        <IconComponent {...iconProps} />
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={clsx(className, "button-tool")}
    >
      <IconComponent {...iconProps} />
    </button>
  );
};

export default ButtonTool;
