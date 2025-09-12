import React from "react";
import Text from "@components/Text";
import logoImg from "./logo_img.svg";
import styles from "./Logo.module.scss";
import clsx from "clsx";

export type LogoProps = {
  className?: string;
  children: React.ReactNode;
};

const Logo = ({ className, children }: LogoProps) => {
  return (
    <a
      href="#"
      className={clsx(className, styles["logo"])}
    >
      <img
        src={logoImg}
        alt="Main Logo"
        className={styles["logo__img"]}
      />
      <Text
        view="p-20"
        tag="p"
        color="primary"
        weight="bold"
        className={styles["logo__text"]}
      >
        {children}
      </Text>
    </a>
  );
};

export default Logo;
