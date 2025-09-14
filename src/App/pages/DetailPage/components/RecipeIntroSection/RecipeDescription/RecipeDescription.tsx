import React from "react";
import Text from "@components/Text";
import clsx from "clsx";
import styles from "./RecipeDescription.module.scss";

type RecipeDescriptionProps = {
  content: React.ReactNode;
  className?: string;
};

const RecipeDescription: React.FC<RecipeDescriptionProps> = ({ content, className }) => {
  return (
    <article className={clsx(styles["recipe-description"], className)}>
      <Text view="p-16" color="primary">
        {content}
      </Text>
    </article>
  );
};

export default RecipeDescription;
