import React from "react";
import RecipeComponent from "./RecipeComponent";
import Text from "@components/Text";
import styles from "./RecipeComponentsList.module.scss";
import clsx from "clsx";

type RecipeComponentData = {
  content: string;
};

type RecipeComponentListProps = {
  className?: string;
  title: string;
  items: RecipeComponentData[];
};

const RecipeComponentList: React.FC<RecipeComponentListProps> = ({ className, title, items }) => {
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
        <li className={styles["recipe-component-list__item"]}>
          {items.map((item) => (
            <RecipeComponent key={item}>{item}</RecipeComponent>
          ))}
        </li>
      </ul>
    </article>
  );
};

export default RecipeComponentList;
