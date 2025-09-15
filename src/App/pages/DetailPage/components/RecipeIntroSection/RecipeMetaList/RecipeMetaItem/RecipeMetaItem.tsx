import React from "react";
import Text from "@components/Text";
import styles from "./RecipeMetaItem.module.scss";
import clsx from "clsx";

type RecipeMetaItemProps = {
  className?: string;
  term: string;
  description: string;
};

const RecipeMetaItem: React.FC<RecipeMetaItemProps> = ({ className, term, description }) => {
  return (
    <dl className={clsx(styles["recipe-meta-item"], className)}>
      <dt className={styles["recipe-meta-item__term"]}>
        <Text
          tag="span"
          view="p-16"
          color="primary"
        >
          {term}
        </Text>
      </dt>
      <dd className={styles["recipe-meta-item__description"]}>
        <Text
          tag="span"
          view="p-16"
          color="accent"
          weight="medium"
        >
          {description}
        </Text>
      </dd>
    </dl>
  );
};

export default RecipeMetaItem;
