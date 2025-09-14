import React from "react";
import Text from "@components/Text";
import styles from "./RecipeComponent.module.scss";
import clsx from "clsx";

type RecipeComponentProps = {
  //   iconUrl?: string;
  children: React.ReactNode;
  className?: string;
};

const RecipeComponent: React.FC<RecipeComponentProps> = ({ className, children }) => {
  return (
    <div className={clsx(className, styles["recipe-component"])}>
      <img
        className={styles["recipe-component__icon"]}
        src="https://i.ibb.co/jk2yjRKC/dish-tray-svgrepo-com-1.png"
        alt="Icon"
      />
      <Text
        className={styles["recipe-component__text"]}
        view="p-16"
        color="primary"
      >
        {children}
      </Text>
    </div>
  );
};

export default RecipeComponent;
