import React from "react";
import Text from "@components/Text";
import styles from "./FeedbackMessage.module.scss";

export type FeedbackMessageProps = {
  text: string;
  children: React.ReactNode;
  afterSlot?: React.ReactNode;
};

const FeedbackMessage = ({ text, children, afterSlot }: FeedbackMessageProps) => {
  return (
    <div className={styles["feedback-message"]}>
      {children}
      <Text
        view="p-18"
        className={styles["feedback-message__text"]}
      >
        {text}
      </Text>
      {afterSlot && <div className={styles["feedback-message__after-slot"]}>{afterSlot}</div>}
    </div>
  );
};

export default FeedbackMessage;
