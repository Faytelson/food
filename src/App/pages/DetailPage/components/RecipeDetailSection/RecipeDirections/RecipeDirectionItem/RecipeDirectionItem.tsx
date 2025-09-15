import React from "react";
import Text from "@components/Text";
import styles from "./RecipeDirectionItem.module.scss";
import clsx from "clsx";

type RecipeDirectionItemProps = {
  title: string;
  content: React.ReactNode;
  className?: string;
};

const RecipeDirectionItem: React.FC<RecipeDirectionItemProps> = ({ title, content, className }) => {
  return (
    <div className={clsx(styles.RecipeDirectionItem, className)}>
      <Text
        className={styles["recipe-direction-item__title"]}
        tag="h4"
        view="p-16"
        color="primary"
        weight="medium"
      >
        {title}
      </Text>
      <Text
        color="primary"
        view="p-18"
        className={styles["recipe-direction-item__content"]}
      >
        {content}
      </Text>
    </div>
  );
};

export default RecipeDirectionItem;
