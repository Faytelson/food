import React from "react";
import RecipeComponent from "./RecipeComponent";
import Text from "@components/Text";
import styles from "./RecipeComponentsList.module.scss";
import clsx from "clsx";

export type RecipeComponentListProps = {
  className?: string;
  title: string;
  items: string[];
  type: "ingredients" | "equipment";
};

const RecipeComponentList: React.FC<RecipeComponentListProps> = ({ className, title, items, type }) => {
  return (
    <article className={clsx(className, styles["recipe-component-list"])}>
      <Text
        className={styles["recipe-component-list__title"]}
        view="p-20"
        tag="h2"
        color="primary"
        weight="medium"
      >
        {title}
      </Text>

      <ul className={styles["recipe-component-list__items"]}>
        {items.map((item) => (
          <li
            key={item}
            className={styles["recipe-component-list__item"]}
          >
            <RecipeComponent iconType={type}>{item}</RecipeComponent>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default RecipeComponentList;
