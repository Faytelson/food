import React from "react";
import Text from "@components/Text";
import DishIcon from "@components/icons/IconDish";
import LadleIcon from "@components/icons/LadleIcon";
import styles from "./RecipeComponent.module.scss";
import clsx from "clsx";

type RecipeComponentProps = {
  children: string;
  className?: string;
  iconType: string;
};

const RecipeComponent: React.FC<RecipeComponentProps> = ({ className, iconType, children }) => {
  return (
    <div className={clsx(className, styles["recipe-component"])}>
      {iconType === "ingredients" && <DishIcon className={styles["recipe-component__icon"]} />}
      {iconType === "equipment" && <LadleIcon className={styles["recipe-component__icon"]} />}

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
