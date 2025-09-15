import React from "react";
import RecipeMetaItem from "./RecipeMetaItem";
import styles from "./RecipeMetaList.module.scss";
import clsx from "clsx";

type RecipeMeta = {
  term: string;
  description: string;
};

type RecipeMetaListProps = {
  items: RecipeMeta[];
  className?: string;
};

const RecipeMetaList: React.FC<RecipeMetaListProps> = ({ items, className }) => {
  return (
    <dl className={clsx(styles["recipe-meta-list"], className)}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <RecipeMetaItem
            className={styles["recipe-meta-list__item"]}
            term={item.term}
            description={item.description}
          ></RecipeMetaItem>
        </React.Fragment>
      ))}
    </dl>
  );
};

export default RecipeMetaList;
