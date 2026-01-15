import React from "react";
import Text from "@components/Text";
import styles from "./FeedbackMessage.module.scss";

export type FeedbackMessageProps = {
  text: string;
  children: React.ReactNode;
};

const FeedbackMessage = ({ text, children }: FeedbackMessageProps) => {
  return (
    <div className={styles["feedback-message"]}>
      {children}
      <Text
        view="p-18"
        className={styles["feedback-message__text"]}
      >
        {text}
      </Text>
    </div>
  );
};

export default FeedbackMessage;
