import React from "react";
import RecipeComponentList from "./RecipeComponentsList";
import RecipeDirections from "./RecipeDirections";
import clsx from "clsx";
import styles from "./RecipeDetailSection.module.scss";

export type Direction = {
  id: string | number;
  title: string;
};

type RecipeDetailSectionProps = {
  className?: string;
  ingredients: string[];
  equipments: string[];
  directions: Direction[];
};

const RecipeDetailSection: React.FC<RecipeDetailSectionProps> = ({
  className,
  ingredients,
  equipments,
  directions
}) => {

  return (
    <section className={clsx(styles["recipe-detail-section"], className)}>
      <RecipeComponentList
        title="Ingredients"
        items={ingredients}
        className={styles["recipe-detail-section__ingredients"]}
        type="ingredients"
      ></RecipeComponentList>
      <RecipeComponentList
        title="Equipment"
        items={equipments}
        className={styles["recipe-detail-section__equipment"]}
        type="equipment"
      ></RecipeComponentList>

      <RecipeDirections
        items={directions}
        className={styles["recipe-detail-section__directions"]}
      />
    </section>
  );
};

export default RecipeDetailSection;
