import React from "react";
import Text from "@components/Text";
import styles from "./AuthPromptHint.module.scss";
import clsx from "clsx";

export type AuthPromptHintProps = {
  text?: string;
  children: React.ReactNode;
  className?: string;
};

const AuthPromptHint = ({ text, children, className }: AuthPromptHintProps) => {
  return (
    <div className={clsx(styles["auth-prompt-hint"], className)}>
      <Text className={styles["auth-prompt-hint__text"]}>{text}</Text>
      {children}
    </div>
  );
};

export default AuthPromptHint;
