import React from "react";
import HeartIcon from "@components/icons/HeartIcon";
import ProfileIcon from "@components/icons/ProfileIcon";
import type { IconProps } from "@components/icons/Icon";
import clsx from "clsx";
import styles from "./ButtonTool.module.scss";

export type ButtonToolVariant = "favorite" | "profile";

export type ButtonToolProps = {
  className?: string;
  variant: ButtonToolVariant;
  onClick?: () => void;
  iconProps?: Partial<IconProps>;
};

const iconMap: Record<ButtonToolVariant, React.FC<IconProps>> = {
  favorite: HeartIcon,
  profile: ProfileIcon,
};

const ButtonTool: React.FC<ButtonToolProps> = ({ className, variant, onClick, iconProps }) => {
  const IconComponent = iconMap[variant];

  return (
    <button
      onClick={onClick}
      className={clsx(className, styles["button-tool"])}
    >
      <IconComponent {...iconProps} />
    </button>
  );
};

export default ButtonTool;
