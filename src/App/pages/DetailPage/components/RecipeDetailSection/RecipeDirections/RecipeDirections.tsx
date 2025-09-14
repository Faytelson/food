import React from "react";
import clsx from "clsx";
import Text from "@components/Text";
import RecipeDirectionItem from "./RecipeDirectionItem";
import styles from "./RecipeDirections.module.scss";

type RecipeDirection = {
  title: string;
  content: string;
};

type RecipeDirectionsProps = {
  items: RecipeDirection[];
  className?: string;
};

const RecipeDirections: React.FC<RecipeDirectionsProps> = ({ items, className }) => {
  return (
    <section className={clsx(styles.recipeDirections, className)}>
      <Text
        tag="h2"
        view="p-24"
        color="primary"
        weight="medium"
        className={styles["recipe-directions__title"]}
      >
        Directions
      </Text>
      <ul className={styles["recipe-directions__list"]}>
        {items.map((item, index) => (
          <li
            key={index}
            className={styles["recipe-directions__item"]}
          >
            <RecipeDirectionItem
              title={item.title}
              content={item.content}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecipeDirections;
