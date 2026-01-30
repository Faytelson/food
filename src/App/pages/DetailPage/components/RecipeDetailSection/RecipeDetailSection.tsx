import React from "react";
import RecipeComponentList from "./RecipeComponentsList";
import RecipeDirections, { type RecipeDirectionType } from "./RecipeDirections";
import clsx from "clsx";
import styles from "./RecipeDetailSection.module.scss";

type RecipeDetailSectionProps = {
  className?: string;
  ingredients: string[];
  equipments: string[];
  directions: RecipeDirectionType[];
};

const RecipeDetailSection: React.FC<RecipeDetailSectionProps> = ({
  className,
  ingredients,
  equipments,
  directions,
}) => {
  return (
    <section className={clsx(styles["recipe-detail-section"], className)}>
      <RecipeComponentList
        title="Ингредиенты"
        items={ingredients}
        className={styles["recipe-detail-section__ingredients"]}
        type="ingredients"
      ></RecipeComponentList>
      <RecipeComponentList
        title="Инвентарь"
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
